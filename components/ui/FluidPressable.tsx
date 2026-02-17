"use client";
import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

interface FluidPressableProps extends MotionProps {
  children: ReactNode;
  onPress?: () => void;
  className?: string;
}

export function FluidPressable({ 
  children, 
  onPress, 
  className = "",
  ...motionProps 
}: FluidPressableProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onPress}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
