import { AnimatePresence, motion } from "motion/react";
import { Download, Heart, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { pookieConfig as config } from "../data/pookie";

export function BirthdayPortraitReveal({ onContinue }: { onContinue: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [expanded]);

  const continueJourney = () => {
    window.localStorage.setItem("little-universe-flyer-seen", "true");
    onContinue();
  };

  return (
    <main className="birthday-portrait-reveal">
      <div className="portrait-petals" aria-hidden="true">
        {[...Array(16)].map((_, index) => <i key={index}>♡</i>)}
      </div>
      <motion.div className="portrait-reveal-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1 }}>
        <motion.div className="portrait-intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }}>
          <span>A little something from my heart</span>
          <h1>Before we explore your little universe…</h1>
          <p>I made you something.</p>
        </motion.div>
        <motion.button
          className="birthday-flyer-frame"
          initial={{ opacity: 0, scale: 0.9, y: 24, filter: "blur(7px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setExpanded(true)}
          aria-label="View birthday portrait fullscreen"
        >
          <img src={config.birthdayFlyer.image} alt={`A birthday portrait and love note for ${config.herName}`} />
          <span><Sparkles size={14} /> Tap to read it closely</span>
        </motion.button>
        <motion.div className="portrait-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 0.8 }}>
          <a href={config.birthdayFlyer.image} download={config.birthdayFlyer.downloadName} onClick={() => setSaved(true)}>
            <Download size={17} /> Save This Little Love Note
          </a>
          <button onClick={continueJourney}>Continue Our Adventure <Sparkles size={17} /></button>
        </motion.div>
        <AnimatePresence>
          {saved && (
            <motion.p className="portrait-saved-message" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Heart size={14} fill="currentColor" /> Now you have something to remind you how special you are to me, even when I’m not around. 🥹❤️
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {expanded && (
          <motion.div className="flyer-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Birthday portrait fullscreen">
            <button onClick={() => setExpanded(false)} aria-label="Close fullscreen portrait"><X /></button>
            <motion.img src={config.birthdayFlyer.image} alt={`Birthday love note for ${config.herName}`} initial={{ scale: 0.94 }} animate={{ scale: 1 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
