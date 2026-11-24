import { motion } from "motion/react";
import { Download, LockKeyhole } from "lucide-react";
import { journeyStars } from "../../data/journey";
import { pookieConfig as config } from "../../data/pookie";

export function KeepsakeBox({ collected }: { collected: number[] }) {
  return (
    <section className="keepsake-box">
      <div className="keepsake-box-heading">
        <span>Your keepsake box</span>
        <strong>{collected.length}/{journeyStars.length}</strong>
      </div>
      <a className="keepsake-flyer" href={config.birthdayFlyer.image} download={config.birthdayFlyer.downloadName}>
        <img src={config.birthdayFlyer.image} alt="Roseline’s birthday portrait" />
        <span>
          <strong>Your Birthday Love Note</strong>
          <small>Open or save the original portrait</small>
        </span>
        <Download size={17} />
      </a>
      <div className="keepsake-grid">
        {journeyStars.map((keepsake, index) => {
          const owned = collected.includes(keepsake.chapter);
          return (
            <motion.div
              key={keepsake.chapter}
              className={owned ? "keepsake owned" : "keepsake"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.09 }}
            >
              <span>{owned ? keepsake.symbol : <LockKeyhole size={15} />}</span>
              <small>{owned ? keepsake.title : "Still waiting"}</small>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
