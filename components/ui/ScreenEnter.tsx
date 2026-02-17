"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScreenEnterProps {
  children: ReactNode;
  delay?: number;
}

export function ScreenEnter({ children, delay = 0 }: ScreenEnterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}
