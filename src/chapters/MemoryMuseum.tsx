import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";
import { Eyebrow, PhotoPlaceholder, PrimaryButton, Screen } from "../components/experience";
import { pookieConfig as config, type Memory } from "../data/pookie";
import { playLoveCue } from "../utils/feedback";

export function MemoryMuseum({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<Memory | null>(null);
  return (
    <Screen className="museum-screen">
      <div className="section-intro">
        <Eyebrow>Our tiny archive</Eyebrow>
        <h1>Us, Through My Eyes.</h1>
        <p>Some moments are too beautiful to leave inside a camera roll.</p>
      </div>
      <div className="polaroid-stack">
        {config.memories.map((memory, index) => (
          <motion.button
            initial={{ opacity: 0, y: 18, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: index % 2 ? 2 : -2 }}
            transition={{ delay: index * 0.18, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -7, rotate: index % 2 ? 1 : -1 }}
            whileTap={{ scale: 0.975 }}
            className="polaroid"
            key={memory.id}
            onClick={() => {
              setSelected(memory);
              playLoveCue("reveal");
            }}
          >
            <div className="polaroid-image">
              {memory.image ? (
                <img
                  src={memory.image}
                  alt=""
                  loading="lazy"
                  style={{ objectPosition: memory.imagePosition }}
                />
              ) : (
                <PhotoPlaceholder />
              )}
            </div>
            <div>
              <h2>{memory.title}</h2>
              <p>{memory.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>
      <PrimaryButton onClick={onComplete}>I’m ready for my examination</PrimaryButton>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.article
              className="memory-modal"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
            >
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close memory"
              >
                <X />
              </button>
              <div className="memory-hero">
                {selected.image ? (
                  <img src={selected.image} alt={selected.title} />
                ) : (
                  <PhotoPlaceholder />
                )}
              </div>
              <Eyebrow>{selected.date || "A memory worth keeping"}</Eyebrow>
              <h2>{selected.title}</h2>
              <p>{selected.story}</p>
              <button className="soft-button" onClick={() => setSelected(null)}>
                Back to our scrapbook
              </button>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  );
}

