import "server-only";

import type { EventCategory } from "./data";
import type { EventStatus } from "./types";

/**
 * Temporary stand-in for the database, shaped like the future Mongoose
 * Event document (real Date objects, raw fields).
 *
 * Delete this file when the Event model exists and point service.server.ts
 * at the model instead. Nothing outside service.server.ts imports this.
 *
 * Dates are fixed (WAT, +01:00) and will age out after 12 Nov 2026.
 */
export interface EventRecord {
  id: string;
  title: string;
  category: EventCategory;
  description: string;
  startsAt: Date;
  endsAt: Date;
  venue: string;
  capacity: number;
  registeredCount: number;
  status: EventStatus;
  organizerName?: string;
}

export const MOCK_EVENTS: EventRecord[] = [
  {
    id: "evt-react-conference",
    title: "React Conference",
    category: "conference",
    description:
      "A full day of talks on React, Next.js and the tools around them, with speakers from industry and campus.",
    startsAt: new Date("2026-11-01T10:00:00+01:00"),
    endsAt: new Date("2026-11-01T16:00:00+01:00"),
    venue: "Main Auditorium",
    capacity: 100,
    registeredCount: 88,
    status: "live",
    organizerName: "GDSC FUTMINNA",
  },
  {
    id: "evt-ai-hack-night",
    title: "AI Hack Night",
    category: "hackathon",
    description:
      "Build a small AI project overnight in teams of up to four. Mentors will be on hand until midnight.",
    startsAt: new Date("2026-11-05T18:00:00+01:00"),
    endsAt: new Date("2026-11-05T23:00:00+01:00"),
    venue: "ICT Lab",
    capacity: 80,
    registeredCount: 61,
    status: "live",
    organizerName: "Innovation Hub",
  },
  {
    id: "evt-git-github-basics",
    title: "Git and GitHub basics",
    category: "workshop",
    description:
      "Hands-on introduction to version control: commits, branches, pull requests and working in a team.",
    startsAt: new Date("2026-11-09T14:00:00+01:00"),
    endsAt: new Date("2026-11-09T16:00:00+01:00"),
    venue: "Room 204",
    capacity: 60,
    registeredCount: 57,
    status: "live",
    organizerName: "GDSC FUTMINNA",
  },
  {
    id: "evt-career-fair",
    title: "Career Fair",
    category: "social",
    description:
      "Meet employers, collect internship details and get feedback on your CV.",
    startsAt: new Date("2026-11-12T09:00:00+01:00"),
    endsAt: new Date("2026-11-12T15:00:00+01:00"),
    venue: "Sports Complex",
    capacity: 300,
    registeredCount: 300,
    status: "live",
    organizerName: "Student Affairs",
  },
];
