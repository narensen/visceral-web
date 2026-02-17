"use client";
import { MarketStock } from "@/types/stock";
import { formatPrice, formatPercentage } from "@/lib/formatPrice";
import { motion } from "framer-motion";
import Link from "next/link";

interface StockRowProps {
  stock: MarketStock;
}

export default function StockRow({ stock }: StockRowProps) {
  const isPositive = stock.percentage_change >= 0;
  const colorClass = isPositive ? "text-positive" : "text-negative";

  return (
    <Link href={`/dashboard/stock/${stock.symbol}`}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="bg-neutral-950/65 border border-neutral-800 rounded-lg p-4 mb-3 hover:border-neutral-700 transition-colors cursor-pointer"
      >
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg">{stock.symbol}</h3>
            <p className="text-neutral-500 text-sm">
              {stock.company_name || stock.name || stock.symbol}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white font-semibold text-lg">
              ${formatPrice(stock.display_price)}
            </p>
            <p className={`text-sm ${colorClass}`}>
              {formatPercentage(stock.percentage_change)}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
