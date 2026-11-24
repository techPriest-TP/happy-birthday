import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { actTransitions, type TransitionChapter } from "../../data/journey";
import { pookieConfig as config } from "../../data/pookie";
import { Eyebrow, PrimaryButton } from "../experience";
import { UniverseMap } from "./UniverseMap";

export function ActTransition({
  fromChapter,
  onContinue,
  reducedMotion,
}: {
  fromChapter: TransitionChapter;
  onContinue: () => void;
  reducedMotion: boolean;
}) {
  const copy = actTransitions[fromChapter];

  return (
    <motion.section
      className="act-transition"
      role="dialog"
      aria-modal="true"
      aria-labelledby="act-transition-title"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
    >
      <div className="transition-stars" aria-hidden="true">
        {[...Array(18)].map((_, index) => (
          <i key={index} style={{ left: `${(index * 37) % 96}%`, top: `${(index * 53) % 88}%` }} />
        ))}
      </div>
      <div className="act-transition-inner">
        <UniverseMap unlockedThrough={fromChapter} compact />
        <motion.div
          className="act-transition-copy"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.65, duration: 0.7 }}
        >
          <Eyebrow light>{copy.eyebrow}</Eyebrow>
          <Sparkles className="transition-sparkle" size={19} aria-hidden="true" />
          <h1 id="act-transition-title">{copy.title}</h1>
          <p>{copy.message}</p>
          <div className="transition-signature">
            <span>For {config.nickname}</span>
            <Heart size={13} fill="currentColor" />
          </div>
          <PrimaryButton light onClick={onContinue}>
            {copy.cta}
          </PrimaryButton>
        </motion.div>
      </div>
    </motion.section>
  );
}
