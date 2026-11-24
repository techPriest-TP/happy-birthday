import { motion } from "motion/react";
import { Check, Heart, LockKeyhole, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { DecorativeSky, Eyebrow, PrimaryButton, Screen } from "../components/experience";
import { pookieConfig as config } from "../data/pookie";

const verificationMessages = [
  "Scanning beauty levels…",
  "Checking cuteness records…",
  "Analysing boyfriend's obsession…",
  "Detecting stubbornness…",
  "Calculating how lucky her boyfriend is…",
];

export function Verification({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"intro" | "scanning" | "result">("intro");
  const [scanIndex, setScanIndex] = useState(0);

  useEffect(() => {
    if (phase !== "scanning") return;
    if (scanIndex >= verificationMessages.length) {
      const done = window.setTimeout(() => setPhase("result"), 400);
      return () => window.clearTimeout(done);
    }
    const timer = window.setTimeout(() => setScanIndex((value) => value + 1), 620);
    return () => window.clearTimeout(timer);
  }, [phase, scanIndex]);

  return (
    <Screen className="verification-screen">
      <DecorativeSky dark />
      <div className="verification-orbit">
        <Heart fill="currentColor" size={20} />
      </div>
      <div className="hero-copy light-copy">
        <Eyebrow light>Top secret birthday business</Eyebrow>
        <h1>Excuse me, Miss Birthday Girl.</h1>
        <p>Someone suspiciously beautiful is trying to enter this website.</p>
      </div>

      <motion.section layout className="verification-card">
        <div className="official-stamp">
          <LockKeyhole size={15} /> Official Pookie Verification System
        </div>
        {phase === "intro" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <dl className="case-file">
              <div>
                <dt>Candidate</dt>
                <dd>{config.herName}</dd>
              </div>
              <div>
                <dt>Reason for investigation</dt>
                <dd>Excessive beauty and suspicious levels of cuteness.</dd>
              </div>
            </dl>
            <PrimaryButton onClick={() => setPhase("scanning")}>
              Yes, I’m the fine girl
            </PrimaryButton>
          </motion.div>
        )}
        {phase === "scanning" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="scan-panel">
            <div className="scanner">
              <span />
            </div>
            <p className="scan-message">
              {verificationMessages[Math.min(scanIndex, verificationMessages.length - 1)]}
            </p>
            <div className="mini-progress">
              <span style={{ width: `${(scanIndex / verificationMessages.length) * 100}%` }} />
            </div>
            <button className="text-button" onClick={() => setPhase("result")}>
              Skip the very scientific scan
            </button>
          </motion.div>
        )}
        {phase === "result" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="confirmed">
              <Check size={16} /> Identity confirmed
            </div>
            <div className="results">
              <p>
                <span>Beauty</span>
                <strong>1000%</strong>
              </p>
              <p>
                <span>Cuteness</span>
                <strong>Criminally high</strong>
              </p>
              <p>
                <span>Stubbornness</span>
                <strong>Classified</strong>
              </p>
              <p>
                <span>Boyfriend’s obsession</span>
                <strong>Beyond assistance</strong>
              </p>
              <p>
                <span>Status</span>
                <strong>Extremely adored</strong>
              </p>
            </div>
            <p className="welcome-line">Welcome to your little universe, baby.</p>
            <PrimaryButton onClick={onComplete}>
              Enter my universe <Sparkles size={16} />
            </PrimaryButton>
          </motion.div>
        )}
      </motion.section>
    </Screen>
  );
}

