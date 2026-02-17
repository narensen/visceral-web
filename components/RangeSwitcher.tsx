"use client";
import { motion } from "framer-motion";

interface RangeSwitcherProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
  ranges?: string[];
}

export default function RangeSwitcher({
  selectedRange,
  onRangeChange,
  ranges = ["1D", "1W", "1M", "3M", "6M", "1Y"],
}: RangeSwitcherProps) {
  return (
    <div className="flex gap-2 bg-neutral-950/65 border border-neutral-800 rounded-xl p-1">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onRangeChange(range)}
          className="relative px-4 py-2 text-sm font-medium transition-colors"
        >
          {selectedRange === range && (
            <motion.div
              layoutId="activeRange"
              className="absolute inset-0 bg-white rounded-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span
            className={`relative z-10 ${
              selectedRange === range
                ? "text-black"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {range}
          </span>
        </button>
      ))}
    </div>
  );
}
