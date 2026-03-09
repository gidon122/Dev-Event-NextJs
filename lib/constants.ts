export type EventItems = {
    id: number;
    image: string;
    title: string;
    date: string;
    location: string;
    description: string;
    category: string;
    slug: string;
    time: string;
}

export const events: EventItems[] = [
  {
    id: 1,
    title: "React Conference 2026",
    slug: "react-conference-2026",
    image: "/images/event1.png",
    date: "May 15-17, 2026",
    location: "Las Vegas, USA",
    description: "The premier conference for React developers featuring talks from core team members, advanced workshops, and networking opportunities.",
    category: "Conference",
    time: "09:00 AM",
  },
  {
    id: 2,
    title: "TechCrunch Disrupt 2026",
    slug: "techcrunch-disrupt-2026",
    image: "/images/event2.png",
    date: "June 7-9, 2026",
    location: "San Francisco, USA",
    description: "The world's leading technology conference where startups launch products and the future is predicted.",
    category: "Conference",
    time: "09:00 AM",
  },
  {
    id: 3,
    title: "DevFest Global 2026",
    slug: "devfest-global-2026",
    image: "/images/event3.png",
    date: "June 21-23, 2026",
    location: "Berlin, Germany",
    description: "Community-driven conference with sessions on web, mobile, cloud, and AI technologies from Google Developer Experts.",
    category: "Conference",
    time: "09:00 AM",
  },
  {
    id: 4,
    title: "GitHub Universe 2026",
    slug: "github-universe-2026",
    image: "/images/event4.png",
    date: "July 12-14, 2026",
    location: "San Francisco, USA",
    description: "Join developers, security professionals, and leaders to explore the future of software development and DevSecOps.",
    category: "Conference",
    time: "09:00 AM",
  },
  {
    id: 5,
    title: "Web Summit 2026",
    slug: "web-summit-2026",
    image: "/images/event5.png",
    date: "August 18-20, 2026",
    location: "Lisbon, Portugal",
    description: "Europe's largest tech event bringing together founders, investors, and innovators from around the world.",
    category: "Conference",
    time: "09:00 AM",
  },
  {
    id: 6,
    title: "Node.js Interactive 2026",
    slug: "nodejs-interactive-2026",
    image: "/images/event6.png",
    date: "September 8-11, 2026",
    location: "Austin, Texas, USA",
    description: "The premier conference for the Node.js community featuring keynotes, workshops, and community activities.",
    category: "Conference",
    time: "09:00 AM",
  },
];
