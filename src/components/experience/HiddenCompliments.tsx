import { AnimatePresence, motion } from "motion/react";
import { Heart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { pookieConfig as config } from "../../data/pookie";
import { playLoveCue } from "../../utils/feedback";

const compliments = [
  "You found one. Just like you somehow found your way into all my favourite thoughts.",
  "Official reminder: your smile has interrupted my train of thought more than once.",
  "Tiny secret: you make ordinary days feel suspiciously special.",
  "If this universe glows, it is mostly because you are standing in it.",
  "No prize here—only confirmation that you are ridiculously loved.",
];

const positions = [
  { left: "5%", top: "24%" },
  { left: "91%", top: "42%" },
  { left: "7%", top: "72%" },
  { left: "88%", top: "82%" },
  { left: "84%", top: "17%" },
];

export function HiddenCompliments() {
  const [selected, setSelected] = useState<number | null>(null);
  const [found, setFound] = useState<number[]>(() => {
    try {
      return JSON.parse(window.localStorage.getItem("little-universe-compliments") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("little-universe-compliments", JSON.stringify(found));
  }, [found]);

  const reveal = (index: number) => {
    setSelected(index);
    setFound((current) => (current.includes(index) ? current : [...current, index]));
    playLoveCue("reveal");
  };

  return (
    <>
      <div className="hidden-compliments" aria-label="Hidden love notes">
        {compliments.map((_, index) => (
          <motion.button
            type="button"
            key={index}
            className={found.includes(index) ? "found" : ""}
            style={positions[index]}
            onClick={() => reveal(index)}
            whileTap={{ scale: 0.82 }}
            aria-label={found.includes(index) ? "Read this tiny love note again" : "A hidden heart"}
          >
            <Heart size={13} fill="currentColor" />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selected !== null && (
          <motion.aside
            className="compliment-toast"
            initial={{ opacity: 0, y: 22, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            role="status"
          >
            <button onClick={() => setSelected(null)} aria-label="Close tiny love note">
              <X size={15} />
            </button>
            <span>For {config.nickname}</span>
            <p>{compliments[selected]}</p>
            <small>{found.length} of {compliments.length} secret hearts found</small>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
