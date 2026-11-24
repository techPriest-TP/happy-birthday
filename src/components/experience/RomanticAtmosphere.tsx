import { type CSSProperties } from "react";

export type EmotionalPhase = "playful" | "memories" | "love";

const phaseSymbols: Record<EmotionalPhase, string[]> = {
  playful: ["♡", "♥", "·", "♡"],
  memories: ["❀", "·", "✦", "❀"],
  love: ["♥", "♡", "✦", "♥"],
};

export function RomanticAtmosphere({ phase }: { phase: EmotionalPhase }) {
  const symbols = phaseSymbols[phase];

  return (
    <div className={`romantic-atmosphere atmosphere-${phase}`} aria-hidden="true">
      {[...Array(22)].map((_, index) => (
        <i
          key={`${phase}-${index}`}
          style={
            {
              "--fall-x": `${(index * 43 + 7) % 98}%`,
              "--fall-drift": `${((index % 5) - 2) * 34}px`,
              "--fall-return": `${((index % 5) - 2) * -15}px`,
              "--fall-duration": `${11 + (index % 7) * 1.35}s`,
              "--fall-delay": `${-((index * 1.7) % 16)}s`,
              "--fall-size": `${0.62 + (index % 4) * 0.18}rem`,
              "--fall-opacity": `${0.15 + (index % 5) * 0.055}`,
              "--fall-rotate": `${index % 2 ? 26 : -26}deg`,
            } as CSSProperties
          }
        >
          {symbols[index % symbols.length]}
        </i>
      ))}
    </div>
  );
}
