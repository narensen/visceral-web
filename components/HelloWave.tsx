"use client";
import { motion } from "framer-motion";

export function HelloWave() {
  return (
    <motion.span
      animate={{
        rotate: [0, 14, -8, 14, -4, 10, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        repeatDelay: 1,
      }}
      className="inline-block origin-[70%_70%]"
    >
      👋
    </motion.span>
  );
}
