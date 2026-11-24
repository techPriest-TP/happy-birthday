import { AnimatePresence, motion } from "motion/react";
import { Check, Heart, X } from "lucide-react";
import { useState } from "react";
import { Eyebrow, PrimaryButton, Screen } from "../components/experience";
import { pookieConfig as config } from "../data/pookie";
import { playLoveCue } from "../utils/feedback";

export function LoveLetters({ onComplete }: { onComplete: () => void }) {
  const [opened, setOpened] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const open = (index: number) => {
    setSelected(index);
    setOpened((items) => (items.includes(index) ? items : [...items, index]));
    playLoveCue("reveal");
  };
  return (
    <Screen className="letters-screen">
      <div className="section-intro intimate-intro">
        <Eyebrow>Things I don’t say enough</Eyebrow>
        <h1>Okay baby, jokes aside for a minute…</h1>
        <p>
          There are things I think about you that I don’t always know how to say. Today, I want you
          to hear them.
        </p>
      </div>
      <div className="envelope-list">
        {config.loveNotes.map((note, index) => (
          <motion.button
            initial={{ opacity: 0, x: index % 2 ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.16, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`envelope ${opened.includes(index) ? "opened" : ""}`}
            onClick={() => open(index)}
            key={note.title}
          >
            <span className="envelope-number">0{index + 1}</span>
            <span>
              <small>{note.label}</small>
              <strong>{note.title}</strong>
            </span>
            {opened.includes(index) ? <Check size={18} /> : <Heart size={18} />}
          </motion.button>
        ))}
      </div>
      <PrimaryButton onClick={onComplete}>There’s one more thing to say</PrimaryButton>
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="modal-backdrop letter-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.article
              className="letter-sheet"
              initial={{ y: "50%", rotate: 2 }}
              animate={{ y: 0, rotate: 0 }}
              exit={{ y: "50%", opacity: 0 }}
            >
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close letter"
              >
                <X />
              </button>
              <span className="letter-number">Letter 0{selected + 1}</span>
              <h2>{config.loveNotes[selected].title}</h2>
              <div className="tiny-divider">
                <Heart size={13} fill="currentColor" />
              </div>
              <p>{config.loveNotes[selected].body}</p>
              <p className="letter-signoff">
                Always yours,
                <br />
                <em>{config.boyfriendName}</em>
              </p>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  );
}

