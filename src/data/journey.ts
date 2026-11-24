export type JourneyStar = {
  chapter: number;
  title: string;
  symbol: string;
  x: number;
  y: number;
};

export const journeyStars: JourneyStar[] = [
  { chapter: 0, title: "Our Memories", symbol: "▣", x: 13, y: 63 },
  { chapter: 1, title: "Pookie Honours", symbol: "★", x: 29, y: 31 },
  { chapter: 2, title: "One Honest Answer", symbol: "∞", x: 45, y: 57 },
  { chapter: 3, title: "Things I Mean", symbol: "✉", x: 62, y: 28 },
  { chapter: 4, title: "If Time Paused", symbol: "☾", x: 80, y: 54 },
  { chapter: 5, title: "All Our Tomorrows", symbol: "♥", x: 52, y: 80 },
];

export const actTransitions = {
  2: {
    eyebrow: "Every version of us led here",
    title: "Now, let me say it properly.",
    message:
      "The jokes, the photographs, the tiny things only we understand—they all lead back to the same truth. There are things about you I never want you to forget.",
    cta: "Tell me what’s in your heart",
  },
} as const;

export type TransitionChapter = keyof typeof actTransitions;
