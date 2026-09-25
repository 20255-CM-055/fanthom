param(
    [switch]$Watch
)

$ErrorActionPreference = 'Stop'
$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$LogRoot = Join-Path $RepoRoot '.agent-logs'
$StatePath = Join-Path $env:TEMP 'fanthom-agent-capture-state.json'
$SessionRoot = Join-Path $HOME '.copilot\session-state'

New-Item -ItemType Directory -Force -Path $LogRoot | Out-Null

function Read-State {
    if (Test-Path $StatePath) {
        try {
            return Get-Content $StatePath -Raw | ConvertFrom-Json
        } catch {
            return [pscustomobject]@{}
        }
    }
    return [pscustomobject]@{}
}

function Write-State($state) {
    $state | ConvertTo-Json -Depth 5 | Set-Content -Encoding UTF8 $StatePath
}

function Get-SessionLog($sessionId, $startTime, $model) {
    $date = ([datetime]$startTime).ToUniversalTime().ToString('yyyy-MM-dd_HH-mm-ss')
    $safeId = $sessionId -replace '[^a-zA-Z0-9-]', ''
    $path = Join-Path $LogRoot "${date}_${safeId}.md"
    if (-not (Test-Path $path)) {
        @(
            '---'
            "session_id: $sessionId"
            "date: $(([datetime]$startTime).ToUniversalTime().ToString('yyyy-MM-dd'))"
            'author: vamsi'
            "model: $model"
            'tool: github-copilot-cli'
            'project: fanthom'
            'total_exchanges: 0'
            "first_prompt_time: $(([datetime]$startTime).ToUniversalTime().ToString('o'))"
            "last_prompt_time: $(([datetime]$startTime).ToUniversalTime().ToString('o'))"
            '---'
            ''
            "# Session Log - $(([datetime]$startTime).ToUniversalTime().ToString('yyyy-MM-dd'))"
            ''
            "Session: ``$($sessionId.Substring(0, 8))`` | Project: ``fanthom``"
            ''
            '---'
            ''
        ) | Set-Content -Encoding UTF8 $path
    }
    return $path
}

function Add-Entry($path, $sessionId, $number, $kind, $timestamp, $model, $content) {
    $label = if ($kind -eq 'PROMPT') { 'PROMPT' } else { 'RESPONSE' }
    $text = [string]$content
    Add-Content -Encoding UTF8 $path @(
        "[LOG_ENTRY type=$label num=$number session=$($sessionId.Substring(0, 8))]"
        "timestamp: $(([datetime]$timestamp).ToUniversalTime().ToString('o'))"
        "model: $model"
        ''
        $text
        ''
        '---'
        ''
    )
}

function Process-Session($file, $state) {
    $sessionId = Split-Path (Split-Path $file -Parent) -Leaf
    $lines = @(Get-Content $file)
    $offset = 0
    if ($state.PSObject.Properties.Name -contains $sessionId) {
        $offset = [int]$state.$sessionId
    }
    if ($offset -ge $lines.Count) { return }

    $pendingName = "${sessionId}_pendingPrompt"
    $prompt = if ($state.PSObject.Properties.Name -contains $pendingName) { $state.$pendingName } else { $null }
    $responseModel = 'auto'
    $sessionStart = (Get-Item $file).CreationTimeUtc.ToString('o')
    foreach ($line in $lines[$offset..($lines.Count - 1)]) {
        try { $event = $line | ConvertFrom-Json } catch { continue }
        if ($event.type -eq 'session.start') {
            $sessionStart = $event.timestamp
        } elseif ($event.type -eq 'user.message') {
            $prompt = $event
            $state | Add-Member -NotePropertyName $pendingName -NotePropertyValue $prompt -Force
        } elseif ($event.type -eq 'assistant.message' -and $event.data.content -and $event.data.phase -ne 'commentary' -and $prompt) {
            $responseModel = if ($event.data.model) { $event.data.model } else { $responseModel }
            $log = Get-SessionLog $sessionId $sessionStart $responseModel
            $existing = Get-Content $log -Raw
            $number = ([regex]::Matches($existing, '\[LOG_ENTRY type=PROMPT')).Count + 1
            Add-Entry $log $sessionId $number 'PROMPT' $prompt.timestamp $responseModel $prompt.data.content
            Add-Entry $log $sessionId $number 'RESPONSE' $event.timestamp $responseModel $event.data.content
            $prompt = $null
            $state.PSObject.Properties.Remove($pendingName)
        }
    }
    $state | Add-Member -NotePropertyName $sessionId -NotePropertyValue $lines.Count -Force
}

do {
    $state = Read-State
    Get-ChildItem $SessionRoot -Directory -ErrorAction SilentlyContinue |
        ForEach-Object {
            $events = Join-Path $_.FullName 'events.jsonl'
            if (Test-Path $events) { Process-Session $events $state }
        }
    Write-State $state
    if ($Watch) { Start-Sleep -Milliseconds 750 }
} while ($Watch)
