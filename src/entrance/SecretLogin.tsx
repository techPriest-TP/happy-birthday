import { AnimatePresence, motion } from "motion/react";
import { Eye, EyeOff, Heart, LockKeyhole, Sparkles } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { pookieConfig as config } from "../data/pookie";
import { StarfieldBackground } from "./StarfieldBackground";

export function SecretLogin({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hints, setHints] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const timerRef = useRef<number | null>(null);
  const entrance = config.birthdayEntrance;

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (password.trim().toLowerCase() === entrance.secretWord.toLowerCase()) {
      setUnlocked(true);
      window.localStorage.setItem("little-universe-unlocked", "true");
      timerRef.current = window.setTimeout(onUnlock, 2900);
      return;
    }
    setAttempts((value) => value + 1);
  };

  return (
    <main className="secret-login">
      <StarfieldBackground />
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div className="secret-login-card" key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.96 }}>
            <div className="heart-lock"><Heart fill="currentColor" /><LockKeyhole size={19} /></div>
            <span className="secret-kicker">A private little doorway</span>
            <h1>A Little Universe Called You</h1>
            <p>Not everyone gets to enter this little universe.</p>
            <small>This universe belongs to someone very special.</small>
            <form onSubmit={submit}>
              <label htmlFor="secret-word">Enter Our Secret Word</label>
              <div className="secret-input-wrap">
                <input id="secret-word" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="off" autoFocus />
                <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide secret word" : "Show secret word"}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {attempts > 0 && <motion.p className="login-feedback" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>{attempts > 1 ? "Think about what you mean to me, baby. ❤️" : "Hmmm... are you sure you're my pookie? 👀"}</motion.p>}
              <button className="unlock-button" type="submit">Unlock our universe <Sparkles size={16} /></button>
            </form>
            <button className="hint-button" onClick={() => setHints((value) => Math.min(value + 1, 2))}>Need a tiny hint, baby? 👀</button>
            {hints > 0 && <p className="tiny-hint">{entrance.hintOne}</p>}
            {hints > 1 && <p className="tiny-hint">{entrance.hintTwo}</p>}
          </motion.div>
        ) : (
          <motion.div className="unlock-reveal" key="unlocked" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <motion.div className="open-heart-lock" animate={{ scale: [1, 1.13, 1] }} transition={{ repeat: 2, duration: 0.7 }}><Heart fill="currentColor" /></motion.div>
            <p>Of course it’s you.</p>
            <h1>{entrance.secretMeaning}. ❤️</h1>
            <span>We’ve been expecting you, Your Majesty.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
