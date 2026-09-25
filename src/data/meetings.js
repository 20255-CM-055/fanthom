import { readMeetingState, writeMeetingState } from '../utils/meetingState'

const attendee = (name, role) => ({ name, role })

const simulatedMeetingsStorageKey = 'fathom:simulated-meetings'

export const meetings = [
  {
    id: 'engineering-leadership-sync',
    title: 'Engineering Leadership Sync',
    date: '2026-09-25T10:00:00',
    durationMinutes: 62,
    durationSeconds: 3734,
    type: 'Team Meeting',
    status: 'Ready',
    participants: [
      attendee('Olivia Chen', 'VP of Engineering'),
      attendee('Marcus Johnson', 'Engineering Manager'),
      attendee('Priya Sharma', 'Director of Platform'),
      attendee('Ethan Brooks', 'Engineering Manager'),
      attendee('Sofia Martinez', 'Director of Product'),
      attendee('Noah Williams', 'Staff Engineer'),
      attendee('Amara Okafor', 'Engineering Manager'),
      attendee('Liam O’Connor', 'Head of Design'),
    ],
    summary: 'Engineering leaders aligned on reliability targets, a staged infrastructure scale-up, and launch readiness. The team will prioritize authentication resilience and the October mobile release while clarifying ownership across technical debt and hiring.',
    summaryTemplates: {
      general: {
        label: 'General',
        sections: [
          {
            title: 'Overview',
            body: 'Engineering leaders aligned on a reliability-first Q3 closeout and the path to an October 9 mobile release. The discussion connected customer-reported sign-in friction to API availability, while keeping the upcoming infrastructure expansion within a staged rollout.',
          },
          {
            title: 'Key Topics',
            bullets: [
              'Authentication API p95 latency spikes during peak sign-in windows.',
              'SSO rollout sequencing and a clearer customer migration path.',
              'Capacity headroom, mobile release readiness, and staffing for on-call.',
            ],
          },
          {
            title: 'Decisions',
            bullets: [
              'Set an initial target of 99.95% availability for the authentication API.',
              'Scale the three highest-traffic services in stages before expanding regionally.',
              'Keep October 9 as the mobile release target, gated on the release checklist.',
            ],
          },
          {
            title: 'Next Steps',
            bullets: [
              'Publish the SSO rollout plan and migration owners by September 29.',
              'Create a shared API latency dashboard with a baseline and alert thresholds.',
              'Review the mobile release checklist and outstanding technical debt next week.',
            ],
          },
        ],
      },
      projectUpdate: {
        label: 'Project Update',
        sections: [
          { title: 'Status', body: 'Overall: on track with two dependencies to resolve. The mobile release remains planned for October 9; authentication resilience and infrastructure capacity are the critical path.' },
          {
            title: 'Progress',
            bullets: [
              'Regional failover tests are underway for authentication and payments.',
              'The first three high-traffic services have named migration owners.',
              'Mobile QA has a release candidate; final accessibility checks remain.',
            ],
          },
          {
            title: 'Blockers',
            bullets: [
              'Peak-hour authentication latency lacks a shared dashboard and agreed alert thresholds.',
              'SSO migration communications need customer-success review before rollout.',
              'On-call coverage is tight while two platform roles remain open.',
            ],
          },
          {
            title: 'Decisions',
            bullets: [
              'Use 99.95% authentication API availability as the Q3 reliability target.',
              'Scale regional capacity in stages, with a load test before each expansion.',
            ],
          },
          {
            title: 'Next Milestones',
            bullets: [
              'Sep 29 — SSO plan and accountable owners published.',
              'Oct 2 — Latency dashboard and service migration readiness reviewed.',
              'Oct 9 — Mobile launch readiness gate and release decision.',
            ],
          },
        ],
      },
      sales: {
        label: 'Sales',
        sections: [
          {
            title: 'Customer Needs',
            bullets: [
              'Customers need predictable sign-in during high-traffic periods.',
              'IT administrators want an SSO migration path with clear ownership.',
              'Mobile teams need confidence that the October release will not add setup friction.',
            ],
          },
          {
            title: 'Pain Points',
            bullets: [
              'Authentication latency has increased during peak sign-in windows.',
              'SSO setup and handoffs are not yet easy for customer teams to track.',
            ],
          },
          { title: 'Objections', body: 'Customer-facing teams cannot confidently set an SSO migration date until reliability thresholds and escalation ownership are documented.' },
          {
            title: 'Commitments',
            bullets: [
              'Engineering will share a published SSO rollout plan by September 29.',
              'The team will review the 99.95% authentication availability target weekly.',
            ],
          },
          {
            title: 'Next Steps',
            bullets: [
              'Prepare customer-ready SSO setup guidance with Customer Success.',
              'Share the reliability dashboard and escalation path before the next customer review.',
            ],
          },
        ],
      },
      oneOnOne: {
        label: '1:1',
        sections: [
          {
            title: 'Wins',
            bullets: [
              'Regional failover testing has moved into the highest-traffic authentication path.',
              'Service owners are aligned on a staged rather than all-at-once migration.',
            ],
          },
          {
            title: 'Challenges',
            bullets: [
              'Peak sign-in latency is difficult to diagnose without consistent service-level views.',
              'Hiring and on-call capacity remain competing priorities for platform leads.',
            ],
          },
          { title: 'Feedback', body: 'Leads asked for earlier visibility into ownership changes and customer-facing rollout dates so teams can surface risk before release gates.' },
          {
            title: 'Development',
            bullets: [
              'Give service leads more ownership of the reliability review and incident follow-up.',
              'Pair platform engineers with mobile QA for the release-readiness review.',
            ],
          },
          {
            title: 'Follow-ups',
            bullets: [
              'Confirm hiring priorities against the Q4 on-call plan.',
              'Review technical-debt capacity and release risks at next week’s sync.',
            ],
          },
        ],
      },
    },
    highlights: [
      {
        id: 'auth-reliability-target',
        timestamp: 258,
        time: '04:18',
        title: 'A clear reliability target',
        type: 'Decision',
        text: 'Reliability goal set: bring payment-service uptime to 99.95% this quarter.',
        excerpt: '“If we prioritize the retry work and finish regional failover testing, 99.95% is achievable.”',
      },
      {
        id: 'sso-customer-feedback',
        timestamp: 688,
        time: '11:28',
        title: 'SSO is a customer priority',
        type: 'Customer Feedback',
        text: 'Admins want a guided migration and named owner before committing to the new SSO flow.',
        excerpt: '“Our IT teams need to know exactly who owns the migration before they change their sign-in policy.”',
      },
      {
        id: 'infrastructure-sequence',
        timestamp: 1122,
        time: '18:42',
        title: 'Scale the busiest services first',
        type: 'Decision',
        text: 'Platform migration will start with the three highest-traffic services, then expand after load testing.',
        excerpt: '“We should migrate the three busiest services first. That gives us the clearest read on the tooling.”',
      },
      {
        id: 'mobile-release-date',
        timestamp: 1915,
        time: '31:55',
        title: 'Mobile release stays on track',
        type: 'Key Moment',
        text: 'October 9 remains the target, with accessibility and crash-free sessions as release gates.',
        excerpt: '“Let’s keep October 9, and make the release checklist the thing that gives us confidence.”',
      },
      {
        id: 'hiring-owner',
        timestamp: 2390,
        time: '39:50',
        title: 'Protect hiring and on-call capacity',
        type: 'Action Item',
        text: 'Confirm platform hiring priorities against the updated Q4 on-call rotation.',
        excerpt: '“We can’t make the reliability commitment stick if the same two people are carrying every escalation.”',
      },
      {
        id: 'launch-readiness',
        timestamp: 3143,
        time: '52:23',
        title: 'Schedule the launch readiness review',
        type: 'Decision',
        text: 'The cross-functional mobile launch readiness review is scheduled for October 9.',
        excerpt: '“Let’s get product, mobile, and support in the room for the October 9 readiness review.”',
      },
    ],
    actionItems: [
      { id: 'publish-sso-plan', owner: 'Marcus Johnson', text: 'Finalize the SSO rollout plan and confirm customer migration owners.', due: 'Sep 29' },
      { id: 'api-latency-dashboard', owner: 'Priya Sharma', text: 'Create the API latency dashboard with baseline and alert thresholds.', due: 'Sep 30' },
      { id: 'mobile-release-checklist', owner: 'Noah Williams', text: 'Confirm the mobile release checklist and accessibility sign-off.', due: 'Oct 1' },
      { id: 'confirm-hiring-plan', owner: 'Olivia Chen', text: 'Confirm platform hiring priorities against Q4 on-call coverage.', due: 'Oct 5' },
    ],
    transcript: [
      { id: 'segment-001', timestamp: 0, speaker: 'Olivia Chen', text: 'Thanks, everyone. We have a full agenda today: Q3 priorities, authentication reliability, the SSO rollout, and whether we still feel good about the mobile launch date.' },
      { id: 'segment-002', timestamp: 84, speaker: 'Marcus Johnson', text: 'I’d start with the service data. We have a few peak-hour windows where authentication p95 is drifting up, and customers are noticing the extra sign-in time.' },
      { id: 'segment-003', timestamp: 170, speaker: 'Priya Sharma', text: 'The API is healthy on average, but that average is hiding the retry storms. When one region gets behind, the retries make the tail latency much worse.' },
      { id: 'segment-004', timestamp: 258, speaker: 'Priya Sharma', text: 'If we prioritize the retry work and finish regional failover testing, I think 99.95% availability is a credible target for the authentication API this quarter.' },
      { id: 'segment-005', timestamp: 350, speaker: 'Noah Williams', text: 'I agree with the target. We should publish the baseline first, otherwise each service team will interpret a reliability improvement differently.' },
      { id: 'segment-006', timestamp: 443, speaker: 'Ethan Brooks', text: 'Can we separate the authentication endpoint from the rest of the API dashboard? That’s where support has the clearest customer examples.' },
      { id: 'segment-007', timestamp: 528, speaker: 'Amara Okafor', text: 'I have three support threads from enterprise admins about SSO setup. The repeated ask is a guided migration with a person who owns the handoff.' },
      { id: 'segment-008', timestamp: 612, speaker: 'Sofia Martinez', text: 'That tracks with what we heard in discovery. The technical setup is one part; the customer needs to know exactly when their current sign-in stops being supported.' },
      { id: 'segment-009', timestamp: 688, speaker: 'Liam O’Connor', text: 'Our IT teams need to know exactly who owns the migration before they change their sign-in policy. That was the strongest feedback from the last admin interview.' },
      { id: 'segment-010', timestamp: 774, speaker: 'Marcus Johnson', text: 'I’ll make the rollout plan include a customer-success contact, a platform owner, and a rollback step for every migration window.' },
      { id: 'segment-011', timestamp: 858, speaker: 'Olivia Chen', text: 'Good. Let’s make sure the plan says September 29 for the owner review, not that every customer has to be migrated by then.' },
      { id: 'segment-012', timestamp: 945, speaker: 'Priya Sharma', text: 'For the infrastructure work, we can start with the three highest-traffic services. That gives us real load without changing every region at once.' },
      { id: 'segment-013', timestamp: 1032, speaker: 'Noah Williams', text: 'I can pair the service owners with the platform team. We’ll add a load test between each stage so the migration has an explicit go or no-go.' },
      { id: 'segment-014', timestamp: 1122, speaker: 'Marcus Johnson', text: 'We should migrate the three busiest services first. That gives us the clearest read on the tooling before we expand to the rest.' },
      { id: 'segment-015', timestamp: 1210, speaker: 'Ethan Brooks', text: 'One concern is technical debt on the notification workers. We have a few fixes that reduce duplicate sends, but they aren’t on the committed sprint board.' },
      { id: 'segment-016', timestamp: 1295, speaker: 'Amara Okafor', text: 'Support has two recent customer reports where retries created duplicate notifications. Even if the immediate fix is small, it would be useful to keep that work visible.' },
      { id: 'segment-017', timestamp: 1383, speaker: 'Sofia Martinez', text: 'Let’s keep the technical-debt work tied to the customer issue and review the estimate with product. That will make the trade-off clearer than a general cleanup bucket.' },
      { id: 'segment-018', timestamp: 1470, speaker: 'Liam O’Connor', text: 'On mobile, the updated first-run flow is in the release candidate. We still need the accessibility pass and confirmation that sign-in recovery works on smaller screens.' },
      { id: 'segment-019', timestamp: 1558, speaker: 'Noah Williams', text: 'Crash-free sessions are holding above our release bar on the candidate build. The SSO callback is the one path I’d want another end-to-end pass on.' },
      { id: 'segment-020', timestamp: 1644, speaker: 'Priya Sharma', text: 'That callback currently shares a rate limit with the general token endpoint. We can isolate it, but I want a load test before we call the infrastructure change done.' },
      { id: 'segment-021', timestamp: 1730, speaker: 'Olivia Chen', text: 'Let’s keep October 9 as the target, and make the release checklist the thing that gives us confidence. If the SSO test fails, we revisit the scope, not the quality bar.' },
      { id: 'segment-022', timestamp: 1822, speaker: 'Marcus Johnson', text: 'I’ll add the mobile sign-in recovery path and the authentication load test to the release readiness checklist.' },
      { id: 'segment-023', timestamp: 1915, speaker: 'Sofia Martinez', text: 'For customer feedback, we should give Customer Success a short note about the SSO rollout timing once the owner list is final. A reliable date is more useful than a broad launch promise.' },
      { id: 'segment-024', timestamp: 2000, speaker: 'Amara Okafor', text: 'The other recurring feedback is that people don’t know where to report a sign-in issue. We should make the escalation path visible in the migration guide.' },
      { id: 'segment-025', timestamp: 2088, speaker: 'Ethan Brooks', text: 'On hiring, platform still has two open roles. Until those are filled, we need the on-call rotation to account for the engineers who are already covering incident response.' },
      { id: 'segment-026', timestamp: 2175, speaker: 'Olivia Chen', text: 'I’ll review the headcount plan against the Q4 reliability work. I don’t want to add an on-call commitment without checking what the teams can sustainably cover.' },
      { id: 'segment-027', timestamp: 2260, speaker: 'Marcus Johnson', text: 'I can share the revised incident rotation by Monday. We should make the secondary responder explicit for authentication and mobile launch week.' },
      { id: 'segment-028', timestamp: 2390, speaker: 'Noah Williams', text: 'For the latency dashboard, I’ll include the endpoint, region, and retry rate. That should help us tell a regional capacity issue from an application regression.' },
      { id: 'segment-029', timestamp: 2505, speaker: 'Priya Sharma', text: 'And I’ll set the first alert thresholds from the current baseline, then we can adjust them after we have a week of consistent data.' },
      { id: 'segment-030', timestamp: 2610, speaker: 'Liam O’Connor', text: 'Design can review the SSO migration guide before it goes to customers. We can make the rollback and support contact easier to spot without changing the technical steps.' },
      { id: 'segment-031', timestamp: 2730, speaker: 'Sofia Martinez', text: 'For the mobile launch, I’d like one readiness review with product, support, and engineering. That keeps customer messaging and release criteria in the same conversation.' },
      { id: 'segment-032', timestamp: 2850, speaker: 'Olivia Chen', text: 'Let’s schedule that review for October 9 and circulate the checklist two days before. If there are no blockers, we can make the release decision in the room.' },
      { id: 'segment-033', timestamp: 2960, speaker: 'Ethan Brooks', text: 'I’ll take the technical-debt estimate back to the team and identify what can fit without putting the reliability work at risk.' },
      { id: 'segment-034', timestamp: 3143, speaker: 'Marcus Johnson', text: 'Let’s get product, mobile, and support together for the October 9 readiness review. I’ll send the invite with the owners and the go/no-go checklist.' },
      { id: 'segment-035', timestamp: 3280, speaker: 'Amara Okafor', text: 'I’ll make sure the support themes are captured in the rollout notes: the SSO owner, the escalation path, and the sign-in recovery guidance.' },
      { id: 'segment-036', timestamp: 3415, speaker: 'Olivia Chen', text: 'To recap, reliability target and staged migration are agreed. SSO ownership is due Monday, the latency view lands Tuesday, and we’ll check the mobile gates before the October 9 review.' },
    ],
  },
  {
    id: 'customer-discovery-acme',
    title: 'Customer Discovery — Acme',
    date: '2026-09-24T14:30:00',
    durationMinutes: 38,
    type: 'Customer Call',
    status: 'Ready',
    participants: [
      attendee('Jamie Lee', 'Product Manager'),
      attendee('Taylor Reed', 'Account Executive'),
      attendee('Morgan Patel', 'Acme · Operations Lead'),
      attendee('Alex Rivera', 'Acme · RevOps'),
    ],
    summary: 'Acme’s operations team described friction coordinating handoffs across regional sales teams. They are evaluating ways to make follow-up ownership more visible.',
    highlights: [
      { time: '07:12', text: 'Regional handoffs currently happen in spreadsheets.' },
      { time: '24:50', text: 'Acme asked to see a workflow for assigning follow-ups by territory.' },
    ],
    actionItems: [
      { owner: 'Jamie Lee', text: 'Send a mock-up of territory-based follow-up ownership.', due: 'Sep 26' },
    ],
    transcriptSnippet: [
      { time: '00:00', speaker: 'Jamie Lee', text: 'Could you walk us through what happens after a new opportunity changes regions?' },
      { time: '07:12', speaker: 'Morgan Patel', text: 'The handoff itself is in a spreadsheet. The hard part is knowing who owns the next step.' },
      { time: '12:40', speaker: 'Morgan Patel', text: 'Our onboarding stalls when a new region is involved. The customer has already entered their details, but we still have to explain the handoff and who will help them finish setup.' },
      { time: '18:05', speaker: 'Jamie Lee', text: 'That sounds like an onboarding issue as much as a routing issue. We should make the next owner visible before the customer has to ask.' },
    ],
  },
  {
    id: 'q3-product-strategy',
    title: 'Q3 Product Strategy',
    date: '2026-09-24T11:00:00',
    durationMinutes: 54,
    type: 'Team Meeting',
    status: 'Ready',
    participants: [
      attendee('Sofia Martinez', 'Director of Product'),
      attendee('Olivia Chen', 'VP of Engineering'),
      attendee('Jamie Lee', 'Product Manager'),
      attendee('Liam O’Connor', 'Head of Design'),
      attendee('Noah Williams', 'Staff Engineer'),
    ],
    summary: 'Product and engineering reviewed the quarter’s bets, agreeing to protect time for onboarding improvements while narrowing the first version of shared workspaces.',
    highlights: [
      { time: '12:06', text: 'Onboarding completion is the leading indicator for this quarter.' },
      { time: '33:14', text: 'Shared workspaces will launch with role-based access and shared notes.' },
    ],
    actionItems: [
      { owner: 'Jamie Lee', text: 'Draft a one-page scope for shared workspaces.', due: 'Sep 30' },
      { owner: 'Liam O’Connor', text: 'Review onboarding drop-off points with research.', due: 'Oct 1' },
    ],
    transcriptSnippet: [
      { time: '00:00', speaker: 'Sofia Martinez', text: 'The question today is which two outcomes we want every team optimizing for this quarter.' },
      { time: '12:06', speaker: 'Liam O’Connor', text: 'If we improve the first-session experience, the workspace work gets much easier to explain.' },
    ],
  },
  {
    id: 'sprint-planning',
    title: 'Sprint Planning',
    date: '2026-09-23T09:30:00',
    durationMinutes: 46,
    type: 'Team Meeting',
    status: 'Ready',
    participants: [
      attendee('Noah Williams', 'Staff Engineer'),
      attendee('Ethan Brooks', 'Engineering Manager'),
      attendee('Mia Thompson', 'Software Engineer'),
      attendee('Daniel Kim', 'Software Engineer'),
      attendee('Jamie Lee', 'Product Manager'),
      attendee('Ava Wilson', 'QA Engineer'),
    ],
    summary: 'The team planned the next sprint around notification reliability and two customer-requested improvements. The analytics migration is waiting on a data contract review.',
    highlights: [
      { time: '09:32', text: 'Notification delivery fixes are the sprint’s first priority.' },
      { time: '28:03', text: 'Analytics migration will not start until the event contract is signed off.' },
    ],
    actionItems: [
      { owner: 'Daniel Kim', text: 'Post the updated event contract for review.', due: 'Sep 24' },
    ],
    transcriptSnippet: [
      { time: '00:00', speaker: 'Ethan Brooks', text: 'Let’s check capacity before we pull in the two customer requests.' },
      { time: '09:32', speaker: 'Mia Thompson', text: 'The notification retries are still our most visible reliability issue.' },
    ],
  },
  {
    id: 'product-design-review',
    title: 'Product Design Review',
    date: '2026-09-22T15:00:00',
    durationMinutes: 41,
    type: 'Team Meeting',
    status: 'Ready',
    participants: [
      attendee('Liam O’Connor', 'Head of Design'),
      attendee('Jamie Lee', 'Product Manager'),
      attendee('Sofia Martinez', 'Director of Product'),
      attendee('Mia Thompson', 'Software Engineer'),
    ],
    summary: 'The team reviewed a simpler first-run experience and agreed to test two versions of the meeting recap before finalizing the new onboarding flow.',
    highlights: [
      { time: '15:26', text: 'Test the concise recap with first-time users before polishing the editor.' },
    ],
    actionItems: [
      { owner: 'Liam O’Connor', text: 'Prepare two recap variants for the user test.', due: 'Sep 25' },
    ],
    transcriptSnippet: [
      { time: '00:00', speaker: 'Liam O’Connor', text: 'I’ve brought two ways to make the first recap feel useful without asking people to configure anything.' },
    ],
  },
  {
    id: 'weekly-one-to-one-maya',
    title: 'Weekly 1:1 — Maya',
    date: '2026-09-22T10:00:00',
    durationMinutes: 30,
    type: '1:1',
    status: 'Ready',
    participants: [
      attendee('Ethan Brooks', 'Engineering Manager'),
      attendee('Maya Patel', 'Senior Software Engineer'),
    ],
    summary: 'Maya shared progress on the search indexing work and asked for feedback on growing into a technical lead role. They agreed on a small cross-team project for next month.',
    highlights: [
      { time: '10:14', text: 'Maya is interested in leading the search indexing rollout.' },
    ],
    actionItems: [
      { owner: 'Ethan Brooks', text: 'Set up a technical lead shadowing plan with Maya.', due: 'Sep 29' },
    ],
    transcriptSnippet: [
      { time: '00:00', speaker: 'Ethan Brooks', text: 'How has the indexing work felt since we last checked in?' },
    ],
  },
  {
    id: 'customer-success-review',
    title: 'Customer Success Review',
    date: '2026-09-19T13:00:00',
    durationMinutes: 47,
    type: 'Customer Call',
    status: 'Ready',
    participants: [
      attendee('Taylor Reed', 'Account Executive'),
      attendee('Morgan Patel', 'Customer Success'),
      attendee('Casey Nguyen', 'Customer Success'),
      attendee('Jordan Ellis', 'Customer · Admin'),
    ],
    summary: 'The team reviewed adoption with Northstar and identified a need for clearer workspace permissions training before their next department rollout.',
    highlights: [
      { time: '21:32', text: 'The next rollout depends on a short permissions walkthrough for team admins.' },
    ],
    actionItems: [
      { owner: 'Casey Nguyen', text: 'Schedule an admin training before the October rollout.', due: 'Sep 30' },
    ],
    transcriptSnippet: [
      { time: '00:00', speaker: 'Jordan Ellis', text: 'The first team is getting value; for the next group we want to make setup a little less hands-on.' },
      { time: '12:16', speaker: 'Jordan Ellis', text: 'We hit an onboarding issue when the second department joined. Admins were not sure which workspace settings to copy, and the permissions guide came after they had already started setup.' },
      { time: '18:42', speaker: 'Casey Nguyen', text: 'We can add a short onboarding walkthrough before the next rollout and give each admin a clear setup owner.' },
    ],
  },
  {
    id: 'engineering-architecture-review',
    title: 'Engineering Architecture Review',
    date: '2026-09-18T11:00:00',
    durationMinutes: 58,
    type: 'Team Meeting',
    status: 'Ready',
    participants: [
      attendee('Priya Sharma', 'Director of Platform'),
      attendee('Noah Williams', 'Staff Engineer'),
      attendee('Mia Thompson', 'Software Engineer'),
      attendee('Daniel Kim', 'Software Engineer'),
      attendee('Olivia Chen', 'VP of Engineering'),
    ],
    summary: 'Engineering compared two approaches to event processing. The team selected a staged rollout, starting with internal events and adding customer activity after load testing.',
    highlights: [
      { time: '32:44', text: 'Start the event pipeline rollout with internal events.' },
      { time: '45:08', text: 'Run a load test before enabling customer activity events.' },
    ],
    actionItems: [
      { owner: 'Noah Williams', text: 'Write the rollout checklist and load-test criteria.', due: 'Sep 25' },
    ],
    transcriptSnippet: [
      { time: '00:00', speaker: 'Priya Sharma', text: 'Let’s compare the operational cost of each approach, not just the happy path.' },
    ],
  },
]

export function getMeetingById(meetingId) {
  return getMeetings().find((meeting) => meeting.id === meetingId)
}

export function getMeetings() {
  const stored = readMeetingState(simulatedMeetingsStorageKey, [])
  const simulatedMeetings = Array.isArray(stored)
    ? stored.filter((meeting) => meeting && typeof meeting.id === 'string')
    : []
  return [...simulatedMeetings, ...meetings]
}

export function saveSimulatedMeeting({ title, platform, durationSeconds }) {
  const stored = readMeetingState(simulatedMeetingsStorageKey, [])
  const simulatedMeetings = Array.isArray(stored) ? stored : []
  const safeTitle = title.trim() || 'Simulated meeting'
  const duration = Math.max(60, Math.floor(durationSeconds))
  const date = new Date().toISOString()
  const id = `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const meeting = {
    id,
    title: safeTitle,
    date,
    durationSeconds: duration,
    durationMinutes: Math.ceil(duration / 60),
    type: 'Team Meeting',
    status: 'Ready',
    simulatedCapture: true,
    platform,
    participants: [attendee('Jordan Davis', 'Meeting host')],
    summary: `This is a simulated meeting capture for “${safeTitle}” on ${platform}. No audio was recorded and no speech was transcribed.`,
    highlights: [],
    actionItems: [],
    transcript: [
      {
        id: `${id}-segment-1`,
        timestamp: 0,
        time: '00:00',
        speaker: 'Fathom demo',
        text: `Simulated capture started for “${safeTitle}” on ${platform}. No audio or participant speech is captured in this demo.`,
      },
      {
        id: `${id}-segment-2`,
        timestamp: Math.floor(duration / 2),
        time: formatTranscriptTimestamp(Math.floor(duration / 2)),
        speaker: 'Fathom demo',
        text: 'The simulated recording has ended. Connect a meeting capture provider to generate a real transcript and summary.',
      },
    ],
  }
  return writeMeetingState(simulatedMeetingsStorageKey, [meeting, ...simulatedMeetings]) ? meeting : null
}

function formatTranscriptTimestamp(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainder = seconds % 60
  return hours
    ? [hours, minutes, remainder].map((part) => String(part).padStart(2, '0')).join(':')
    : [minutes, remainder].map((part) => String(part).padStart(2, '0')).join(':')
}

function timestampFromClock(clock) {
  const parts = clock.split(':').map(Number)
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  return 0
}

function fallbackSummaryTemplates(meeting, highlights, actionItems) {
  const moments = highlights.map((highlight) => highlight.text)
  const nextSteps = actionItems.map((item) => `${item.text} — ${item.owner} (due ${item.due})`)
  return {
    general: {
      label: 'General',
      sections: [
        { title: 'Overview', body: meeting.summary },
        { title: 'Key Topics', bullets: moments.length ? moments : ['Topics discussed during this conversation.'] },
        { title: 'Decisions', bullets: moments.length ? moments.slice(0, 2) : ['Review the meeting notes for decisions.'] },
        { title: 'Next Steps', bullets: nextSteps.length ? nextSteps : ['No follow-up actions were captured.'] },
      ],
    },
    projectUpdate: {
      label: 'Project Update',
      sections: [
        { title: 'Status', body: meeting.summary },
        { title: 'Progress', bullets: moments.length ? moments : ['Progress discussed during this conversation.'] },
        { title: 'Blockers', bullets: ['No blockers were specifically captured in this call.'] },
        { title: 'Decisions', bullets: moments.length ? moments.slice(0, 2) : ['No explicit decisions were captured.'] },
        { title: 'Next Milestones', bullets: nextSteps.length ? nextSteps : ['No next milestones were captured.'] },
      ],
    },
    sales: {
      label: 'Sales',
      sections: [
        { title: 'Customer Needs', bullets: moments.length ? moments.slice(0, 2) : [meeting.summary] },
        { title: 'Pain Points', body: meeting.summary },
        { title: 'Objections', bullets: ['No explicit objections were captured.'] },
        { title: 'Commitments', bullets: nextSteps.length ? nextSteps : ['No commitments were captured.'] },
        { title: 'Next Steps', bullets: nextSteps.length ? nextSteps : ['No follow-up actions were captured.'] },
      ],
    },
    oneOnOne: {
      label: '1:1',
      sections: [
        { title: 'Wins', bullets: moments.length ? moments.slice(0, 2) : ['Wins discussed during this conversation.'] },
        { title: 'Challenges', body: meeting.summary },
        { title: 'Feedback', bullets: moments.length ? moments : ['No specific feedback was captured.'] },
        { title: 'Development', bullets: ['Continue the development topics discussed during the meeting.'] },
        { title: 'Follow-ups', bullets: nextSteps.length ? nextSteps : ['No follow-ups were captured.'] },
      ],
    },
  }
}

export function getMeetingExperience(meeting) {
  const durationSeconds = meeting.durationSeconds || meeting.durationMinutes * 60
  const transcript = meeting.transcript || meeting.transcriptSnippet.map((segment, index) => {
    const timestamp = timestampFromClock(segment.time)
    return { ...segment, id: `${meeting.id}-segment-${index + 1}`, timestamp }
  })
  const highlights = meeting.highlights.map((highlight, index) => {
    const timestamp = highlight.timestamp ?? timestampFromClock(highlight.time)
    return {
      ...highlight,
      id: highlight.id || `${meeting.id}-highlight-${index + 1}`,
      timestamp,
      endTimestamp: highlight.endTimestamp || Math.min(timestamp + 30, durationSeconds),
      title: highlight.title || highlight.text,
      type: highlight.type || 'Key Moment',
      excerpt: highlight.excerpt || highlight.text,
    }
  })
  const actionItems = meeting.actionItems.map((item, index) => ({
    ...item,
    id: item.id || `${meeting.id}-action-${index + 1}`,
  }))
  return {
    ...meeting,
    durationSeconds,
    transcript,
    highlights,
    actionItems,
    summaryTemplates: meeting.summaryTemplates || fallbackSummaryTemplates(meeting, highlights, actionItems),
  }
}
