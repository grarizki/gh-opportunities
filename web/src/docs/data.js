export const DOCS = [
  {
    group: "Getting started",
    pages: [
      { slug: "overview", title: "Overview" },
      { slug: "install", title: "Install" },
      { slug: "quickstart", title: "Quick start" },
      { slug: "config", title: "Config" },
    ],
  },
  {
    group: "Capabilities",
    pages: [
      { slug: "ai", title: "AI analysis" },
      { slug: "agent", title: "Agent integration" },
      { slug: "security", title: "Security gate" },
    ],
  },
  {
    group: "Reference",
    pages: [
      { slug: "scoring", title: "Scoring" },
      { slug: "architecture", title: "Architecture" },
      { slug: "contributing", title: "Contributing" },
    ],
  },
];

export const FLAT = DOCS.flatMap((g) => g.pages);
