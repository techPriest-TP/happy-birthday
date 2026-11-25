import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  BirthdayLetter,
  Epilogue,
  FinalSurprise,
  LoveGame,
  LoveNotes,
  MemoryMuseum,
  PookieQuiz,
} from "../chapters";
import { ChapterHeader, Confetti, MusicControl } from "../components/experience";
import { ActTransition } from "../components/experience/ActTransition";
import { HiddenCompliments } from "../components/experience/HiddenCompliments";
import {
  RomanticAtmosphere,
  type EmotionalPhase,
} from "../components/experience/RomanticAtmosphere";
import type { TransitionChapter } from "../data/journey";
import { playLoveCue } from "../utils/feedback";
import { BirthdayCinematic, BirthdayPortraitReveal, SecretLogin } from "../entrance";
import { pookieConfig as config } from "../data/pookie";

type ExperienceStage = "login" | "cinematic" | "portrait" | "universe";
const isDevelopment = import.meta.env.DEV;

export default function LittleUniverse() {
  const reducedMotion = useReducedMotion();
  const soundtrackRef = useRef<HTMLAudioElement>(null);
  const [soundtrackStarted, setSoundtrackStarted] = useState(false);
  const [soundtrackMuted, setSoundtrackMuted] = useState(false);
  const [soundtrackUnavailable, setSoundtrackUnavailable] = useState(false);
  const [soundtrackNeedsGesture, setSoundtrackNeedsGesture] = useState(false);
  const [performancePlaying, setPerformancePlaying] = useState(false);
  const [experienceStage, setExperienceStage] = useState<ExperienceStage>(() => {
    if (!config.birthdayEntrance.enabled) return "universe";
    if (isDevelopment) return "login";
    const unlocked = window.localStorage.getItem("little-universe-unlocked") === "true";
    const introSeen = window.localStorage.getItem("little-universe-intro-seen") === "true";
    const flyerSeen = window.localStorage.getItem("little-universe-flyer-seen") === "true";
    if (!unlocked) return "login";
    if (!introSeen) return "cinematic";
    return flyerSeen ? "universe" : "portrait";
  });
  const [chapter, setChapter] = useState(() => {
    if (isDevelopment) return 0;
    const saved = Number(window.localStorage.getItem("little-universe-story-chapter"));
    return Number.isFinite(saved) && saved >= 0 && saved <= 6 ? saved : 0;
  });
  const [maxChapter, setMaxChapter] = useState(() => {
    if (isDevelopment) return 0;
    const saved = Number(window.localStorage.getItem("little-universe-story-progress"));
    return Number.isFinite(saved) && saved >= 0 && saved <= 6 ? saved : 0;
  });
  const [celebrate, setCelebrate] = useState(false);
  const [transitionFrom, setTransitionFrom] = useState<TransitionChapter | null>(null);
  const [collectedKeepsakes, setCollectedKeepsakes] = useState<number[]>(() => {
    if (isDevelopment) return [];
    try {
      return JSON.parse(window.localStorage.getItem("little-universe-story-keepsakes") || "[]");
    } catch {
      return [];
    }
  });
  const emotionalPhase: EmotionalPhase = chapter === 0 ? "memories" : chapter <= 2 ? "playful" : "love";

  useEffect(() => {
    if (isDevelopment) return;
    window.localStorage.setItem("little-universe-story-chapter", String(chapter));
    window.localStorage.setItem("little-universe-story-progress", String(maxChapter));
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }, [chapter, maxChapter, reducedMotion]);

  useEffect(() => {
    if (isDevelopment) return;
    window.localStorage.setItem("little-universe-story-keepsakes", JSON.stringify(collectedKeepsakes));
  }, [collectedKeepsakes]);

  useEffect(() => {
    const resumeSoundtrack = async () => {
      const player = soundtrackRef.current;
      if (
        document.visibilityState !== "visible" ||
        !player ||
        !soundtrackStarted ||
        soundtrackMuted ||
        performancePlaying ||
        soundtrackUnavailable ||
        !player.paused
      ) {
        return;
      }

      try {
        await player.play();
        setSoundtrackNeedsGesture(false);
      } catch {
        setSoundtrackNeedsGesture(true);
      }
    };

    const handleVisibilityChange = () => void resumeSoundtrack();
    const handlePageShow = () => void resumeSoundtrack();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [performancePlaying, soundtrackMuted, soundtrackStarted, soundtrackUnavailable]);

  const goTo = (value: number) => {
    setTransitionFrom(null);
    setChapter(value);
    setMaxChapter((current) => Math.max(current, value));
  };

  const complete = () => {
    setCollectedKeepsakes((current) =>
      current.includes(chapter) ? current : [...current, chapter],
    );
    playLoveCue("collect");
    setCelebrate(true);
    window.setTimeout(() => setCelebrate(false), 2800);
    if (chapter === 2) {
      setTransitionFrom(chapter);
      return;
    }
    goTo(Math.min(chapter + 1, 6));
  };

  const continueTransition = () => {
    if (transitionFrom === null) return;
    goTo(transitionFrom + 1);
  };

  const startSoundtrack = async () => {
    const player = soundtrackRef.current;
    if (!player) return;
    try {
      player.muted = false;
      await player.play();
      setSoundtrackMuted(false);
      setSoundtrackUnavailable(false);
      setSoundtrackNeedsGesture(false);
    } catch {
      setSoundtrackMuted(true);
      setSoundtrackNeedsGesture(true);
    }
    setSoundtrackStarted(true);
  };

  const startSilently = () => {
    setSoundtrackStarted(true);
    setSoundtrackMuted(true);
    setSoundtrackNeedsGesture(false);
  };

  const toggleSoundtrack = async () => {
    const player = soundtrackRef.current;
    if (!player || performancePlaying) return;
    if (player.paused) {
      try {
        player.muted = false;
        await player.play();
        setSoundtrackMuted(false);
        setSoundtrackUnavailable(false);
        setSoundtrackNeedsGesture(false);
      } catch {
        setSoundtrackNeedsGesture(true);
      }
      return;
    }
    player.muted = !player.muted;
    setSoundtrackMuted(player.muted);
  };

  const pauseForPerformance = () => {
    soundtrackRef.current?.pause();
    setSoundtrackStarted(false);
    setPerformancePlaying(true);
  };

  const returnToEntrance = () => {
    const player = soundtrackRef.current;
    if (player) {
      player.pause();
      player.currentTime = 0;
      player.muted = false;
    }
    setPerformancePlaying(false);
    setSoundtrackStarted(false);
    setSoundtrackMuted(false);
    setSoundtrackUnavailable(false);
    setSoundtrackNeedsGesture(false);
    window.localStorage.removeItem("little-universe-unlocked");
    window.localStorage.removeItem("little-universe-intro-seen");
    window.localStorage.removeItem("little-universe-flyer-seen");
    setExperienceStage("login");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const screens = [
    <MemoryMuseum onComplete={complete} />,
    <PookieQuiz onComplete={complete} />,
    <LoveGame onComplete={complete} />,
    <LoveNotes onComplete={complete} />,
    <BirthdayLetter onComplete={complete} />,
    <FinalSurprise
      onComplete={complete}
      onPerformancePlay={pauseForPerformance}
      onPerformanceEnd={() => setPerformancePlaying(false)}
    />,
    <Epilogue
      collectedKeepsakes={collectedKeepsakes}
      onNavigate={goTo}
      onReplay={() => goTo(0)}
      onReplayEntrance={() => setExperienceStage("cinematic")}
    />,
  ];

  let stageContent;
  if (experienceStage === "login") {
    stageContent = <SecretLogin onUnlock={() => setExperienceStage("cinematic")} />;
  } else if (experienceStage === "cinematic") {
    stageContent = (
      <BirthdayCinematic
        onComplete={() => setExperienceStage("portrait")}
        onStartSoundtrack={startSoundtrack}
        onStartSilently={startSilently}
      />
    );
  } else if (experienceStage === "portrait") {
    stageContent = <BirthdayPortraitReveal onContinue={() => setExperienceStage("universe")} />;
  } else {
    stageContent = (
      <div className="app-shell">
        {chapter < 6 && (
          <ChapterHeader
            key={chapter}
            chapter={chapter}
            maxChapter={maxChapter}
            keepsakeCount={collectedKeepsakes.length}
            onNavigate={goTo}
            onBack={() => goTo(Math.max(chapter - 1, 0))}
            onReturnToEntrance={returnToEntrance}
          />
        )}
        <MusicControl />
        <RomanticAtmosphere phase={emotionalPhase} />
        {chapter < 6 && <HiddenCompliments />}
        <AnimatePresence mode="wait">
          <motion.div
            className="chapter-stage"
            key={chapter}
            initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.992, filter: "blur(7px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -15, scale: 1.004, filter: "blur(5px)" }}
            transition={{ duration: reducedMotion ? 0.01 : 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            {screens[chapter]}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>{celebrate && <Confetti />}</AnimatePresence>
        <AnimatePresence>
          {transitionFrom !== null && (
            <ActTransition
              fromChapter={transitionFrom}
              onContinue={continueTransition}
              reducedMotion={Boolean(reducedMotion)}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <>
      <audio
        ref={soundtrackRef}
        src={config.birthdayEntrance.soundtrack}
        preload="auto"
        loop
        onPlay={() => setSoundtrackNeedsGesture(false)}
        onError={() => setSoundtrackUnavailable(true)}
      />
      {stageContent}
      {soundtrackStarted && !performancePlaying && (
        <button
          className="persistent-soundtrack"
          onClick={() => void toggleSoundtrack()}
          disabled={soundtrackUnavailable}
          aria-label={soundtrackMuted || soundtrackNeedsGesture ? "Play our song" : "Mute our song"}
        >
          {soundtrackMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span>
            {soundtrackUnavailable
              ? "Music unavailable"
              : soundtrackNeedsGesture
                ? "Tap to resume our song"
                : soundtrackMuted
                  ? "Play our song"
                  : "Our song is playing"}
          </span>
        </button>
      )}
    </>
  );
}
