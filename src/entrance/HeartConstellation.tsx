import { motion } from "motion/react";

const points = [
  [50, 82], [20, 49], [18, 28], [31, 18], [50, 34], [69, 18], [82, 28], [80, 49], [50, 82],
];

export function HeartConstellation() {
  const path = points.map(([x, y], index) => `${index ? "L" : "M"}${x} ${y}`).join(" ");
  return (
    <motion.svg className="heart-constellation" viewBox="0 0 100 100" aria-hidden="true">
      <motion.path
        d={path}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
      />
      {points.slice(0, -1).map(([x, y], index) => (
        <motion.circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="1.6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.16, duration: 0.6 }}
        />
      ))}
    </motion.svg>
  );
}
