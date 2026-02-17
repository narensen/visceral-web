/**
 * Format stock symbol for display
 * Handles crypto symbols and adds market suffixes
 */
export function displaySymbol(symbol: string): string {
  if (!symbol) return "";
  
  // Remove common suffixes for cleaner display
  const cleanSymbol = symbol
    .replace(/\.NS$/, "") // Nifty suffix
    .replace(/\.BO$/, "") // Bombay suffix
    .replace(/\.L$/, "")  // London suffix
    .replace(/\.SS$/, "") // Shanghai suffix
    .replace(/-USD$/, ""); // Crypto USD pairs
  
  return cleanSymbol;
}

/**
 * Get full symbol with market suffix if needed
 */
export function getFullSymbol(symbol: string, market: string): string {
  const upperMarket = market.toUpperCase();
  
  switch (upperMarket) {
    case "IN":
      return symbol.includes(".") ? symbol : `${symbol}.NS`;
    case "LONDON":
      return symbol.includes(".") ? symbol : `${symbol}.L`;
    case "CHINA":
      return symbol.includes(".") ? symbol : `${symbol}.SS`;
    case "CRYPTO":
      return symbol.includes("-") ? symbol : `${symbol}-USD`;
    default:
      return symbol;
  }
}
