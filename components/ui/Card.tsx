"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, className = "", hoverable = false }: CardProps) {
  const Component = hoverable ? motion.div : "div";
  const hoverProps = hoverable ? { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } } : {};

  return (
    <Component
      className={`bg-neutral-950/65 border border-neutral-800 rounded-2xl p-6 ${
        hoverable ? "cursor-pointer hover:border-neutral-700 transition-colors" : ""
      } ${className}`}
      {...hoverProps}
    >
      {children}
    </Component>
  );
}
