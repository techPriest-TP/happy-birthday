import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useState } from "react";
import { DecorativeSky, Eyebrow, PrimaryButton, Screen } from "../components/experience";

export function LoveGame({ onComplete }: { onComplete: () => void }) {
  const [attempts, setAttempts] = useState(0);
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const positions = [
    { left: "48%", top: "16%" },
    { left: "8%", top: "58%" },
    { left: "54%", top: "62%" },
  ];
  const noMessages = [
    "Madam, please stop fighting your destiny.",
    "Even your phone knows the truth.",
    "Fine. The tribunal will now accept your appeal.",
  ];
  const tryNo = () => {
    if (attempts >= 2) setAnswer("no");
    else setAttempts((value) => value + 1);
  };
  return (
    <Screen className="game-screen">
      <DecorativeSky />
      <div className="centered-chapter game-content">
        <Eyebrow>A highly serious inquiry</Eyebrow>
        <h1>One very important question…</h1>
        {!answer ? (
          <>
            <p className="game-question">Do you love your boyfriend?</p>
            <div className="button-arena">
              <motion.button
                className="yes-button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setAnswer("yes")}
              >
                Yes, obviously <Heart size={18} fill="currentColor" />
              </motion.button>
              <motion.button
                animate={attempts ? positions[attempts - 1] : { left: "48%", top: "58%" }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="no-button"
                onClick={tryNo}
              >
                No, leave me alone
              </motion.button>
            </div>
            <p className="game-message">
              {attempts ? noMessages[attempts - 1] : "Choose wisely. The court is watching."}
            </p>
            <button className="text-button" onClick={onComplete}>
              Skip this deeply unbiased question
            </button>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="answer-reveal"
          >
            <div className="heart-seal">
              <Heart fill="currentColor" />
            </div>
            <h2>{answer === "yes" ? "I knew it." : "Your appeal has been received."}</h2>
            <p>
              {answer === "yes"
                ? "Your response has been officially documented for future reference."
                : "The Relationship Tribunal has decided that I still love you."}
            </p>
            <PrimaryButton onClick={onComplete}>Okay, jokes aside for a minute</PrimaryButton>
          </motion.div>
        )}
      </div>
    </Screen>
  );
}

