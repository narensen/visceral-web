"use client";
import { motion } from "framer-motion";

interface LuxuryToggleProps {
  enabled: boolean;
  onToggle: () => void;
  label?: string;
}

export default function LuxuryToggle({ enabled, onToggle, label }: LuxuryToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-3 w-full"
    >
      {label && <span className="text-white flex-1 text-left">{label}</span>}
      <div
        className={`relative w-14 h-8 rounded-full transition-colors ${
          enabled ? "bg-positive" : "bg-neutral-800"
        }`}
      >
        <motion.div
          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
          initial={false}
          animate={{
            left: enabled ? "calc(100% - 28px)" : "4px",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </div>
    </button>
  );
}
