"use client";
import { motion } from "framer-motion";

interface MarketTabsProps {
  activeMarket: string;
  onMarketChange: (market: string) => void;
}

const markets = [
  { id: "US", label: "US" },
  { id: "IN", label: "IN" },
  { id: "CRYPTO", label: "CRYPTO" },
];

export default function MarketTabs({ activeMarket, onMarketChange }: MarketTabsProps) {
  return (
    <div className="flex gap-2 mb-4">
      {markets.map((market) => {
        const isActive = activeMarket === market.id;
        return (
          <motion.button
            key={market.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMarketChange(market.id)}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              isActive
                ? "bg-white text-black"
                : "bg-neutral-950/65 border border-neutral-800 text-neutral-400 hover:border-neutral-700"
            }`}
          >
            {market.label}
          </motion.button>
        );
      })}
    </div>
  );
}
