/**
 * Financial guide content - educational content for users
 */

export interface GuideSection {
  id: string;
  title: string;
  content: string;
  icon?: string;
}

export interface GuidePage {
  id: string;
  title: string;
  sections: GuideSection[];
}

export const FINANCIAL_GUIDE_CONTENT: GuidePage[] = [
  {
    id: "basics",
    title: "Trading Basics",
    sections: [
      {
        id: "what-is-trading",
        title: "What is Trading?",
        content: "Trading involves buying and selling financial instruments like stocks, with the goal of making a profit. In Visceral, you use paper money to practice trading without real financial risk.",
      },
      {
        id: "stock-market",
        title: "Understanding the Stock Market",
        content: "The stock market is where shares of publicly traded companies are bought and sold. Prices fluctuate based on supply and demand, company performance, and market conditions.",
      },
      {
        id: "market-hours",
        title: "Market Hours",
        content: "US markets are open Monday-Friday, 9:30 AM - 4:00 PM ET. Indian markets operate 9:15 AM - 3:30 PM IST. Cryptocurrency markets are open 24/7.",
      },
    ],
  },
  {
    id: "strategies",
    title: "Trading Strategies",
    sections: [
      {
        id: "day-trading",
        title: "Day Trading",
        content: "Day trading involves buying and selling stocks within the same trading day. It requires quick decision-making and close monitoring of price movements.",
      },
      {
        id: "swing-trading",
        title: "Swing Trading",
        content: "Swing trading involves holding positions for several days to weeks, capitalizing on short to medium-term price movements.",
      },
      {
        id: "long-term",
        title: "Long-Term Investing",
        content: "Long-term investing focuses on holding stocks for years, benefiting from company growth and compound returns. It requires patience and fundamental analysis.",
      },
    ],
  },
  {
    id: "risk",
    title: "Risk Management",
    sections: [
      {
        id: "diversification",
        title: "Diversification",
        content: "Don't put all your eggs in one basket. Spread your investments across different sectors, markets, and asset classes to reduce risk.",
      },
      {
        id: "position-sizing",
        title: "Position Sizing",
        content: "Never invest more than 5-10% of your portfolio in a single stock. This limits potential losses from any one position.",
      },
      {
        id: "stop-loss",
        title: "Stop-Loss Orders",
        content: "Set stop-loss orders to automatically sell if a stock drops below a certain price. This helps limit your losses on losing positions.",
      },
      {
        id: "emotional",
        title: "Emotional Control",
        content: "Fear and greed are your enemies. Stick to your strategy, don't panic sell, and don't chase pumps. Make decisions based on analysis, not emotion.",
      },
    ],
  },
  {
    id: "analysis",
    title: "Stock Analysis",
    sections: [
      {
        id: "fundamental",
        title: "Fundamental Analysis",
        content: "Evaluate a company's financial health, earnings, revenue growth, debt levels, and competitive position. Look at P/E ratios, EPS, and other metrics.",
      },
      {
        id: "technical",
        title: "Technical Analysis",
        content: "Study price charts, patterns, and indicators to predict future price movements. Common indicators include moving averages, RSI, and MACD.",
      },
      {
        id: "news",
        title: "News & Events",
        content: "Stay informed about earnings reports, product launches, regulatory changes, and market news that can impact stock prices.",
      },
    ],
  },
  {
    id: "tips",
    title: "Trading Tips",
    sections: [
      {
        id: "research",
        title: "Always Research First",
        content: "Never buy a stock just because someone recommended it. Do your own research and understand what you're investing in.",
      },
      {
        id: "start-small",
        title: "Start Small",
        content: "When starting out, make smaller trades to learn and build confidence. Increase position sizes as you gain experience.",
      },
      {
        id: "journal",
        title: "Keep a Trading Journal",
        content: "Record your trades, reasons for entering/exiting, and lessons learned. Review regularly to improve your strategy.",
      },
      {
        id: "continuous-learning",
        title: "Continuous Learning",
        content: "Markets evolve constantly. Stay curious, read books, follow market news, and learn from both successes and failures.",
      },
    ],
  },
];
