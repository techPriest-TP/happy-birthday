import { motion } from "motion/react";
import { Gift, Heart, Pause, Play, Sparkles, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DecorativeSky, Eyebrow, PrimaryButton, Screen } from "../components/experience";
import { pookieConfig as config } from "../data/pookie";
import { playLoveCue } from "../utils/feedback";

function SurpriseContent({
  onPerformancePlay,
  onPerformanceStop,
  onFinished,
}: {
  onPerformancePlay: () => void;
  onPerformanceStop: () => void;
  onFinished: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [videoRevealed, setVideoRevealed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const video = config.surpriseType === "video" && config.media.surpriseVideo;
  const audio = config.surpriseType === "audio" && config.media.surpriseAudio;

  if (video) {
    if (!videoRevealed) {
      return (
        <motion.div className="performance-invitation" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <span className="performance-seal"><Play fill="currentColor" /></span>
          <p>A final birthday performance is waiting for you.</p>
          <h2>From Wizzy, especially for Roseline.</h2>
          <button onClick={() => setVideoRevealed(true)}>
            <Sparkles size={17} /> Reveal Wizzy’s Birthday Performance
          </button>
          <button className="performance-later" onClick={onFinished}>Keep it for me to watch later</button>
        </motion.div>
      );
    }

    return (
      <motion.div className="performance-player" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
        <p>Press play whenever you’re ready, my love.</p>
        <video
          className="surprise-video"
          controls
          playsInline
          preload="auto"
          src={video}
          onPlay={onPerformancePlay}
          onPause={onPerformanceStop}
          onEnded={() => {
            onPerformanceStop();
            onFinished();
          }}
        />
        <button className="performance-later" onClick={onFinished}>Continue without playing for now</button>
      </motion.div>
    );
  }

  if (audio) {
    const toggle = () => {
      const player = audioRef.current;
      if (!player) return;
      if (player.paused) void player.play();
      else player.pause();
      setPlaying(!player.paused);
    };
    return (
      <div className="voice-note">
        <audio ref={audioRef} src={audio} onEnded={() => setPlaying(false)} />
        <button onClick={toggle} aria-label={playing ? "Pause voice note" : "Play voice note"}>
          {playing ? <Pause /> : <Play fill="currentColor" />}
        </button>
        <div>
          <strong>A little voice note for you</strong>
          <div className="waveform">{[...Array(18)].map((_, i) => <i key={i} />)}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bucket-list">
      <p className="bucket-intro">A few pages I hope we get to add to our story:</p>
      {config.futurePlans.map((plan, index) => (
        <div key={plan}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{plan}</p>
          <Star size={14} />
        </div>
      ))}
    </div>
  );
}

export function FinalSurprise({
  onComplete,
  onPerformancePlay,
  onPerformanceEnd,
}: {
  onComplete: () => void;
  onPerformancePlay: () => void;
  onPerformanceEnd: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hasVideo = config.surpriseType === "video" && Boolean(config.media.surpriseVideo);
  const [performanceComplete, setPerformanceComplete] = useState(!hasVideo);

  useEffect(() => {
    if (!hasVideo || !config.media.surpriseVideo) return;
    const preloader = document.createElement("video");
    preloader.preload = "auto";
    preloader.src = config.media.surpriseVideo;
    preloader.load();
    return () => {
      preloader.removeAttribute("src");
      preloader.load();
    };
  }, [hasVideo]);

  return (
    <Screen className="final-screen">
      <DecorativeSky dark />
      <div className="final-content light-copy">
        <Eyebrow light>One last thing, my love</Eyebrow>
        <h1>{open ? "One final performance." : "I left you something."}</h1>
        <p>{open ? "There’s no rush. Press play only when you’re ready." : "I couldn’t put everything I feel into words… so tap the ribbon."}</p>
        {!open ? (
          <motion.button
            whileTap={{ scale: 0.96 }}
            animate={{ rotate: [0, -1.5, 1.5, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 2.4, duration: 0.5 }}
            className="final-gift"
            onClick={() => {
              setOpen(true);
              playLoveCue("reveal");
            }}
          >
            <span className="ribbon vertical" />
            <span className="ribbon horizontal" />
            <Gift size={42} />
            <small>Open me</small>
          </motion.button>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="surprise-panel">
            <SurpriseContent
              onPerformancePlay={onPerformancePlay}
              onPerformanceStop={onPerformanceEnd}
              onFinished={() => setPerformanceComplete(true)}
            />
            {performanceComplete && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="final-message">
                  <Heart fill="currentColor" />
                  <h2>Happy Birthday, My Favourite Human.</h2>
                  <p>This little universe exists because you exist. And somehow, that makes my world a little more beautiful.</p>
                  <span>Made with love by {config.boyfriendName}</span>
                </div>
                <PrimaryButton light onClick={onComplete}>Keep this little universe</PrimaryButton>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </Screen>
  );
}
