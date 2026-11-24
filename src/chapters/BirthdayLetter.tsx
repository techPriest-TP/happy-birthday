import { motion } from "motion/react";
import { Gift, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { DecorativeSky, Eyebrow, PrimaryButton, Screen } from "../components/experience";
import { pookieConfig as config } from "../data/pookie";
import { playLoveCue } from "../utils/feedback";

export function BirthdayLetter({ onComplete }: { onComplete: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Screen className="birthday-letter-screen">
      <DecorativeSky dark />
      {!open ? (
        <div className="centered-chapter light-copy letter-opening">
          <Eyebrow light>Before you go</Eyebrow>
          <h1>
            If I could
            <br />
            <em>pause time…</em>
          </h1>
          <p>There’s something I really want you to know.</p>
          <PrimaryButton light onClick={() => {
            setOpen(true);
            playLoveCue("reveal");
          }}>
            Read my letter <Heart size={16} fill="currentColor" />
          </PrimaryButton>
        </div>
      ) : (
        <motion.article
          className="long-letter"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="letter-date">For {config.herName}, on your birthday</span>
          <div className="letter-monogram">
            <Heart fill="currentColor" />
          </div>
          {config.birthdayLetter.split("\n\n").map((paragraph, index) => (
            <p key={index} className={index === 0 ? "salutation" : ""}>
              {paragraph}
            </p>
          ))}
          <div className="one-more">
            <Sparkles size={20} />
            <h2>But wait… I have one more thing for you.</h2>
            <PrimaryButton light onClick={onComplete}>
              Open your final surprise <Gift size={17} />
            </PrimaryButton>
          </div>
        </motion.article>
      )}
    </Screen>
  );
}

