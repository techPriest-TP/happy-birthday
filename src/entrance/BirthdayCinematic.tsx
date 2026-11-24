import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Crown, Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { pookieConfig as config } from "../data/pookie";
import { HeartConstellation } from "./HeartConstellation";
import { StarfieldBackground } from "./StarfieldBackground";
import { CinematicAudioController } from "./CinematicAudioController";

export function BirthdayCinematic({
  onComplete,
  onStartSoundtrack,
  onStartSilently,
}: {
  onComplete: () => void;
  onStartSoundtrack: () => Promise<void>;
  onStartSilently: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const entrance = config.birthdayEntrance;
  const [running, setRunning] = useState(false);
  const [scene, setScene] = useState(0);
  const [finalReady, setFinalReady] = useState(false);

  useEffect(() => {
    if (!running) return;
    const duration = reducedMotion ? 900 : entrance.sceneDurations[scene];
    const timer = window.setTimeout(() => {
      if (scene < 4) setScene((value) => value + 1);
      else setFinalReady(true);
    }, duration);
    return () => window.clearTimeout(timer);
  }, [entrance.sceneDurations, reducedMotion, running, scene]);

  const finish = () => {
    window.localStorage.setItem("little-universe-intro-seen", "true");
    onComplete();
  };

  return (
    <main className={`birthday-cinematic cinematic-scene-${scene}`}>
      <StarfieldBackground celebratory={scene >= 3} />
      {entrance.allowSkipping && <button className="skip-intro" onClick={finish}>Skip Intro</button>}
      <CinematicAudioController
        started={running}
        onBeginWithSound={async () => {
          await onStartSoundtrack();
          setRunning(true);
        }}
        onBeginSilently={() => {
          onStartSilently();
          setRunning(true);
        }}
      />
      <AnimatePresence mode="wait">
        {running && scene === 0 && (
          <motion.section className="cinematic-scene" key="awakens" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}>
            <motion.i className="first-star" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.4 }}>✦</motion.i>
            <p>Somewhere in this enormous universe...</p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1.1 }}>A very special star was born.</motion.h1>
          </motion.section>
        )}
        {running && scene === 1 && (
          <motion.section className="cinematic-scene" key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HeartConstellation />
            <motion.h1 initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1, duration: 1 }}>{config.herName}</motion.h1>
            <p>A name the universe will never forget.</p>
            <span>Also known as: {entrance.secretMeaning}. ❤️</span>
          </motion.section>
        )}
        {running && scene === 2 && (
          <motion.section className="cinematic-scene royal-scene" key="royal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="celestial-door"><i /><motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3, duration: 1.1 }}><Crown size={52} /></motion.div></div>
            <p>Ladies and Gentlemen...</p>
            <h1>Her Majesty Has Arrived.</h1>
            {entrance.showRoyalAnnouncement && <span>Everybody comport yourselves. The birthday girl is here. 😂</span>}
          </motion.section>
        )}
        {running && scene === 3 && (
          <motion.section className="cinematic-scene birthday-reveal" key="birthday" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1 }}>
            <div className="birthday-burst" aria-hidden="true">{[...Array(18)].map((_, i) => <i key={i} style={{ transform: `rotate(${i * 20}deg)` }} />)}</div>
            <Sparkles size={24} />
            <p>Today, even the stars are celebrating you.</p>
            <h1><small>Happy Birthday</small>{config.herName}</h1>
            <Heart fill="currentColor" />
          </motion.section>
        )}
        {running && scene === 4 && (
          <motion.section className="cinematic-scene final-cinematic-scene" key="yours" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
            <span className="mini-universe"><Heart fill="currentColor" /><i>✦</i><b>✦</b></span>
            <h1>A Little Universe Called You</h1>
            <p>Because some people deserve more than a birthday message.</p>
            <strong>They deserve a whole universe.</strong>
            <AnimatePresence>{finalReady && <motion.button initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} onClick={finish}>Enter Your Universe <Heart size={17} fill="currentColor" /></motion.button>}</AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
      {running && <div className="cinematic-progress" aria-hidden="true"><span style={{ width: `${((scene + (finalReady ? 1 : 0)) / 5) * 100}%` }} /></div>}
    </main>
  );
}
