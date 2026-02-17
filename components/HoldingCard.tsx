"use client";
import { Holding } from "@/types/stock";
import { formatPrice, formatPercentage } from "@/lib/formatPrice";
import { motion } from "framer-motion";
import Link from "next/link";

interface HoldingCardProps {
  holding: Holding;
}

export default function HoldingCard({ holding }: HoldingCardProps) {
  const isPositive = holding.percentage_return >= 0;
  const colorClass = isPositive ? "text-positive" : "text-negative";

  return (
    <Link href={`/dashboard/stock/${holding.symbol}`}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="bg-neutral-950/65 border border-neutral-800 rounded-lg p-4 mb-3 hover:border-neutral-700 transition-colors cursor-pointer"
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-white font-semibold text-lg">{holding.symbol}</h3>
            <p className="text-neutral-500 text-sm">{holding.company_name}</p>
          </div>
          <div className="text-right">
            <p className="text-white font-semibold text-lg">
              ${formatPrice(holding.total_value)}
            </p>
            <p className={`text-sm ${colorClass}`}>
              {formatPercentage(holding.percentage_return)}
            </p>
          </div>
        </div>
        <div className="flex justify-between text-sm text-neutral-500">
          <span>{holding.quantity} shares</span>
          <span>Avg: ${formatPrice(holding.avg_price)}</span>
        </div>
      </motion.div>
    </Link>
  );
}
