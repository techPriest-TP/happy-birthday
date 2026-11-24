export function playLoveCue(kind: "collect" | "reveal" = "collect") {
  if (typeof window === "undefined") return;

  if ("vibrate" in navigator) navigator.vibrate(kind === "collect" ? [18, 35, 28] : 18);

  try {
    const context = new AudioContext();
    const gain = context.createGain();
    const notes = kind === "collect" ? [523.25, 659.25, 783.99] : [440, 554.37];
    gain.connect(context.destination);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.055, context.currentTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.7);

    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start(context.currentTime + index * 0.1);
      oscillator.stop(context.currentTime + 0.52 + index * 0.1);
    });

    window.setTimeout(() => void context.close(), 1000);
  } catch {
    // Sound is an enhancement; blocked audio should never interrupt the story.
  }
}
