const attendee = (name, role) => ({ name, role })

export const meetings = [
  {
    id: 'engineering-leadership-sync',
    title: 'Engineering Leadership Sync',
    date: '2026-09-25T10:00:00',
    durationMinutes: 62,
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
    summary: 'The team aligned on Q4 reliability goals, the platform migration sequence, and staffing for the upcoming launch. Incident response improvements remain the top priority.',
    highlights: [
      { time: '04:18', text: 'Reliability goal set: bring payment-service uptime to 99.95% this quarter.' },
      { time: '18:42', text: 'Platform migration will start with the three highest-traffic services.' },
      { time: '39:07', text: 'Launch readiness review is scheduled for October 9.' },
    ],
    actionItems: [
      { owner: 'Marcus Johnson', text: 'Share the revised incident-response rotation with engineering leads.', due: 'Sep 29' },
      { owner: 'Priya Sharma', text: 'Publish migration sequencing and service owners.', due: 'Oct 2' },
      { owner: 'Olivia Chen', text: 'Confirm launch staffing plan with product and design.', due: 'Oct 5' },
    ],
    transcriptSnippet: [
      { time: '00:00', speaker: 'Olivia Chen', text: 'Let’s start with the reliability goal and make sure we’re aligned on what we can commit to for Q4.' },
      { time: '04:18', speaker: 'Priya Sharma', text: 'For payments, I think 99.95% is achievable if we prioritize the retry work and finish the regional failover testing.' },
      { time: '18:42', speaker: 'Marcus Johnson', text: 'We should migrate the three busiest services first. That gives us the clearest read on the tooling before we expand.' },
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
  return meetings.find((meeting) => meeting.id === meetingId)
}
