import { motion } from "motion/react";
import { ArrowLeft, ChevronRight, Heart, Image as ImageIcon, LogOut, Music2, Pause } from "lucide-react";
import { type CSSProperties, type ReactNode, useRef, useState } from "react";
import { pookieConfig as config } from "../data/pookie";

export const chapters = [
  "Memory Museum",
  "Pookie Examination",
  "One Important Question",
  "Five Little Letters",
  "If I Could Pause Time",
  "One Last Surprise",
];

export function DecorativeSky({ dark = false }: { dark?: boolean }) {
  return (
    <div className="ambient" aria-hidden="true">
      {[...Array(12)].map((_, index) => (
        <span
          className={dark ? "ambient-star" : "ambient-heart"}
          key={index}
          style={
            {
              "--x": `${(index * 37 + 8) % 96}%`,
              "--y": `${(index * 61 + 4) % 92}%`,
              "--d": `${4 + (index % 5)}s`,
              "--delay": `${(index % 6) * -0.7}s`,
            } as CSSProperties
          }
        >
          {dark ? "✦" : index % 3 === 0 ? "♡" : "·"}
        </span>
      ))}
    </div>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</p>;
}

export function PrimaryButton({
  children,
  onClick,
  light = false,
  disabled = false,
}: {
  children: ReactNode;
  onClick: () => void;
  light?: boolean;
  disabled?: boolean;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`primary-button ${light ? "primary-button-light" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
      <ChevronRight size={18} aria-hidden="true" />
    </motion.button>
  );
}

export function ChapterHeader({
  chapter,
  maxChapter,
  keepsakeCount,
  onNavigate,
  onBack,
  onReturnToEntrance,
}: {
  chapter: number;
  maxChapter: number;
  keepsakeCount: number;
  onNavigate: (value: number) => void;
  onBack: () => void;
  onReturnToEntrance: () => void;
}) {
  const dark = chapter >= 4;
  return (
    <motion.header
      className={`chapter-header ${dark ? "chapter-header-dark" : ""}`}
      initial={{ opacity: 0, y: -9 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="icon-button" onClick={onBack} disabled={chapter === 0} aria-label="Go back">
        <ArrowLeft size={18} />
      </button>
      <div className="progress-wrap">
        <div className="progress-dots" role="progressbar" aria-valuenow={chapter + 1} aria-valuemax={chapters.length}>
          {chapters.map((title, index) => (
            <button
              key={title}
              className={`progress-dot ${index === chapter ? "active" : ""} ${index < chapter ? "done" : ""}`}
              disabled={index > maxChapter}
              aria-label={`Go to chapter ${index + 1}: ${title}`}
              onClick={() => onNavigate(index)}
            />
          ))}
        </div>
        <p>Chapter {chapter + 1} of {chapters.length} · {chapters[chapter]}</p>
      </div>
      <div className="header-actions">
        <div className="header-keepsakes" aria-label={`${keepsakeCount} keepsakes collected`}>
          <Heart size={16} fill="currentColor" aria-hidden="true" />
          <span>{keepsakeCount}</span>
        </div>
        <button
          className="header-entrance-button"
          onClick={onReturnToEntrance}
          aria-label="Return to the secret entrance"
          title="Experience the entrance again"
        >
          <LogOut size={16} aria-hidden="true" />
        </button>
      </div>
    </motion.header>
  );
}

export function PhotoPlaceholder() {
  return (
    <div className="photo-placeholder">
      <ImageIcon size={30} />
      <span>Add your photograph</span>
    </div>
  );
}

export function Screen({ children, className }: { children: ReactNode; className: string }) {
  return <main className={`screen ${className}`}>{children}</main>;
}

export function MusicControl() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  if (!config.media.backgroundMusic) return null;
  const toggle = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) void audioRef.current.play();
    else audioRef.current.pause();
    setPlaying(!audioRef.current.paused);
  };
  return (
    <div className="music-control">
      <audio ref={audioRef} loop src={config.media.backgroundMusic} />
      <button onClick={toggle} aria-label={playing ? "Pause background music" : "Play background music"}>
        {playing ? <Pause size={16} /> : <Music2 size={16} />}
      </button>
      <span>{playing ? "Our song is playing" : "Play our song"}</span>
    </div>
  );
}

export function Confetti() {
  return (
    <motion.div className="confetti" initial={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden="true">
      {[...Array(24)].map((_, index) => (
        <i
          key={index}
          style={
            {
              "--x": `${(index * 41) % 100}vw`,
              "--r": `${index * 47}deg`,
              "--c": ["#dfa5b5", "#d8b878", "#e9e1f5", "#6f2940"][index % 4],
              "--delay": `${(index % 5) * 0.04}s`,
            } as CSSProperties
          }
        />
      ))}
    </motion.div>
  );
}
