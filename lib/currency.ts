/**
 * Currency symbols mapping for different markets
 */
export const CURRENCY_SYMBOLS: Record<string, string> = {
  US: "$",
  IN: "₹",
  CRYPTO: "$",
  LONDON: "£",
  CHINA: "¥",
};

/**
 * Get currency symbol for a given market
 */
export function getCurrencySymbol(market: string): string {
  return CURRENCY_SYMBOLS[market.toUpperCase()] || "$";
}
