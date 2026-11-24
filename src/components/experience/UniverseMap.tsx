import { motion } from "motion/react";
import { type CSSProperties } from "react";
import { journeyStars } from "../../data/journey";

type UniverseMapProps = {
  unlockedThrough: number;
  interactive?: boolean;
  onNavigate?: (chapter: number) => void;
  compact?: boolean;
};

export function UniverseMap({
  unlockedThrough,
  interactive = false,
  onNavigate,
  compact = false,
}: UniverseMapProps) {
  return (
    <div className={`universe-map ${compact ? "universe-map-compact" : ""}`}>
      <svg className="constellation-lines" viewBox="0 0 100 100" aria-hidden="true">
        {journeyStars.slice(1).map((star, index) => {
          const previous = journeyStars[index];
          const visible = star.chapter <= unlockedThrough;
          return (
            <motion.line
              key={`${previous.chapter}-${star.chapter}`}
              x1={previous.x}
              y1={previous.y}
              x2={star.x}
              y2={star.y}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: visible ? 1 : 0, opacity: visible ? 0.58 : 0 }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
            />
          );
        })}
      </svg>
      {journeyStars.map((star, index) => {
        const unlocked = star.chapter <= unlockedThrough;
        const style =
          {
            "--star-x": `${star.x}%`,
            "--star-y": `${star.y}%`,
            "--star-delay": `${index * 0.1}s`,
          } as CSSProperties;

        return (
          <motion.button
            type="button"
            key={star.chapter}
            className={`journey-star ${unlocked ? "journey-star-unlocked" : ""}`}
            style={style}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: unlocked ? 1 : 0.18, scale: unlocked ? 1 : 0.72 }}
            transition={{ type: "spring", delay: index * 0.1, stiffness: 170, damping: 16 }}
            disabled={!interactive || !unlocked}
            onClick={() => onNavigate?.(star.chapter)}
            aria-label={unlocked ? `Return to ${star.title}` : `${star.title} is still waiting`}
          >
            <span aria-hidden="true">{star.symbol}</span>
            {interactive && unlocked && <small>{star.title}</small>}
          </motion.button>
        );
      })}
    </div>
  );
}
