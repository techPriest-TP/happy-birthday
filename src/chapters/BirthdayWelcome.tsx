import { AnimatePresence, motion } from "motion/react";
import { Gift } from "lucide-react";
import { useState } from "react";
import { DecorativeSky, Eyebrow, PrimaryButton, Screen } from "../components/experience";
import { pookieConfig as config } from "../data/pookie";
import { playLoveCue } from "../utils/feedback";

export function Welcome({ onComplete }: { onComplete: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Screen className="welcome-screen">
      <DecorativeSky />
      <div className="centered-chapter">
        <Eyebrow>A little celebration for one remarkable human</Eyebrow>
        <h1>
          Happy Birthday,
          <br />
          <em>{config.herName}.</em>
        </h1>
        <p className="lead">{config.welcomeMessage}</p>
        <p className="aside">And yes, I made you an entire website. Please act surprised.</p>
        <motion.button
          className={`gift-button ${open ? "gift-open" : ""}`}
          whileTap={{ scale: 0.95, rotate: -2 }}
          onClick={() => {
            setOpen(true);
            playLoveCue("reveal");
          }}
          aria-label="Open your digital birthday gift"
        >
          <span className="gift-lid" />
          <span className="gift-box">
            <Gift size={38} strokeWidth={1.4} />
          </span>
          <span className="gift-tag">
            {open ? "A Little Universe Called You" : "Tap your gift"}
          </span>
        </motion.button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="cta-block"
            >
              <p>{config.introMessage}</p>
              <PrimaryButton onClick={onComplete}>Let’s begin our little adventure</PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Screen>
  );
}

