import { type CSSProperties } from "react";

export function StarfieldBackground({ celebratory = false }: { celebratory?: boolean }) {
  return (
    <div className={`cinematic-starfield ${celebratory ? "celebratory" : ""}`} aria-hidden="true">
      {[...Array(34)].map((_, index) => (
        <i
          key={index}
          style={
            {
              "--sx": `${(index * 47 + 5) % 97}%`,
              "--sy": `${(index * 31 + 9) % 91}%`,
              "--ss": `${1 + (index % 3)}px`,
              "--sd": `${2.2 + (index % 5) * 0.65}s`,
              "--sdelay": `${(index % 8) * -0.45}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
