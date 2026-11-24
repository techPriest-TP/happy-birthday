import { Music2 } from "lucide-react";

export function CinematicAudioController({
  started,
  onBeginWithSound,
  onBeginSilently,
}: {
  started: boolean;
  onBeginWithSound: () => Promise<void>;
  onBeginSilently: () => void;
}) {
  if (started) return null;

  return (
    <div className="cinematic-start-controls">
      <button className="magic-start" onClick={() => void onBeginWithSound()}>
        <Music2 size={18} /> Tap to Begin the Magic
      </button>
      <button className="silent-start" onClick={onBeginSilently}>
        Continue without sound
      </button>
    </div>
  );
}
