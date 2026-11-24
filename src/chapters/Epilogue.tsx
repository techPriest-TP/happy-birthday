import { Heart, RotateCcw, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { DecorativeSky, Eyebrow, Screen } from "../components/experience";
import { UniverseMap } from "../components/experience/UniverseMap";
import { KeepsakeBox } from "../components/experience/KeepsakeBox";
import { pookieConfig as config } from "../data/pookie";

function JourneyCounter() {
  const duration = useMemo(() => {
    if (!config.relationshipStartDate) return null;
    const start = new Date(`${config.relationshipStartDate}T00:00:00`);
    const now = new Date();
    if (Number.isNaN(start.getTime()) || start > now) return null;
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    if (days < 0) {
      months -= 1;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return { years, months, days };
  }, []);
  if (!duration) return null;
  return (
    <div className="journey-counter">
      <Eyebrow>Our little journey</Eyebrow>
      <div>
        {Object.entries(duration).map(([key, value]) => (
          <span key={key}>
            <strong>{value}</strong>
            <small>{key}</small>
          </span>
        ))}
      </div>
      <p>Still my favourite adventure.</p>
    </div>
  );
}

export function Epilogue({
  onNavigate,
  onReplay,
  onReplayEntrance,
  collectedKeepsakes,
}: {
  onNavigate: (chapter: number) => void;
  onReplay: () => void;
  onReplayEntrance: () => void;
  collectedKeepsakes: number[];
}) {
  return (
    <Screen className="epilogue-screen">
      <DecorativeSky />
      <div className="section-intro">
        <Eyebrow>Your universe, always here</Eyebrow>
        <h1>Come back whenever you want.</h1>
        <p>The story doesn’t disappear when the candles go out.</p>
      </div>
      <JourneyCounter />
      <KeepsakeBox collected={collectedKeepsakes} />
      <div className="epilogue-constellation">
        <Eyebrow>Every star is a way back</Eyebrow>
        <p>Tap any part of our constellation whenever you want to return to it.</p>
        <UniverseMap unlockedThrough={5} interactive onNavigate={onNavigate} />
      </div>
      <div className="promises">
        <Eyebrow>Our little promises</Eyebrow>
        <div>
          {config.promises.map((promise) => (
            <p key={promise}>
              <Heart size={13} />
              {promise}
            </p>
          ))}
        </div>
      </div>
      <button className="replay-button" onClick={onReplay}>
        <RotateCcw size={17} /> Relive our story from the beginning
      </button>
      {config.birthdayEntrance.allowReplay && (
        <button className="replay-button replay-entrance-button" onClick={onReplayEntrance}>
          <Sparkles size={17} /> Replay the birthday entrance
        </button>
      )}
    </Screen>
  );
}

