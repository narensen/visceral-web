export const MARKET_CURRENCY: Record<string, string> = {
  US: "$",
  CRYPTO: "$",
  CHINA: "¥",
  INDIA: "₹",
  IN: "₹",
};

export function formatPrice(latest: number): string {
  const safeValue = typeof latest === 'number' && Number.isFinite(latest) ? latest : 0;
  return `${safeValue.toFixed(2)}`;
}

export function formatPriceWithSymbol(latest: number, market?: string): string {
  const symbol = market ? (MARKET_CURRENCY[market?.toUpperCase()] ?? "$") : "$";
  const safeValue = typeof latest === 'number' && Number.isFinite(latest) ? latest : 0;
  return `${symbol}${safeValue.toFixed(2)}`;
}

export function formatPercentage(percentage: number): string {
  const num = Number(percentage);
  const safe = Number.isFinite(num) ? num : 0;
  const sign = safe >= 0 ? '+' : '';
  return `${sign}${safe.toFixed(2)}%`;
}