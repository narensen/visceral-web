# Visceral Web - Trading Platform

A modern, responsive web application for paper trading stocks and cryptocurrencies. Built with Next.js 15+ and designed to match the Visceral mobile app experience, now ported with full functionality.

## Features

- 🔐 **Authentication** - Secure login/signup with Supabase
- 📊 **Real-time Market Data** - Live price updates using Supabase realtime subscriptions
- 💼 **Portfolio Management** - Track your paper trading portfolio with detailed analytics
- 🔍 **Stock Search** - Find and analyze stocks across US, Indian, and crypto markets
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile browsers
- 🌙 **Dark Theme** - Sleek dark UI matching the mobile app design language
- 💰 **Trading** - Buy and sell stocks with realistic paper trading
- ⭐ **Watchlist** - Track your favorite stocks across all markets
- 📚 **Financial Guide** - Educational content for learning trading
- 📖 **Almanack** - Trading journal to track decisions and insights
- 📈 **Trade History** - Comprehensive history of all your trades
- 🏆 **Leagues** - Compete with friends (coming soon)
- 👥 **Social Features** - Connect with other traders (coming soon)

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: Supabase (@supabase/ssr)
- **Animations**: Framer Motion (ported from React Native Reanimated)
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Real-time**: Supabase Realtime Subscriptions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account with a project set up

### Installation

1. Clone the repository:
```bash
git clone https://github.com/narensen/visceral-web.git
cd visceral-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
NEXT_PUBLIC_BASE_URL=https://visceral-be.onrender.com
NEXT_PUBLIC_MARKETS_REALTIME_TABLE=market_prices
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
visceral-web/
├── app/                       # Next.js app directory
│   ├── dashboard/            # Protected dashboard pages
│   │   ├── page.tsx         # Home/portfolio page
│   │   ├── markets/         # Markets listing with search
│   │   ├── stock/[ticker]/  # Stock details with trading
│   │   ├── history/         # Trade history
│   │   ├── almanack/        # Trading journal
│   │   ├── social/          # Social features (coming soon)
│   │   ├── leagues/         # Leagues (coming soon)
│   │   └── settings/        # User settings
│   ├── onboarding/          # Onboarding flow
│   │   ├── intent/          # User intent selection
│   │   ├── experience/      # Market experience level
│   │   └── intro/           # App introduction
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── BottomNav.tsx       # Bottom navigation
│   ├── StockRow.tsx        # Stock list item
│   ├── MarketTabs.tsx      # Market tabs selector
│   ├── RangeSwitcher.tsx   # Time range selector
│   ├── TradeModal.tsx      # Buy/sell trading modal
│   ├── FinancialGuideModal.tsx  # Educational guide
│   ├── LuxuryToggle.tsx    # Animated toggle switch
│   ├── HoldingCard.tsx     # Portfolio holding card
│   ├── Modal.tsx           # Modal dialog
│   └── ui/                 # UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       └── Spinner.tsx
├── hooks/                  # Custom React hooks
│   ├── useAuth.ts         # Authentication hook
│   ├── useColorScheme.ts  # Color scheme detection
│   └── useThemeColor.ts   # Theme color utility
├── lib/                   # Utilities and services
│   ├── supabase.ts       # Supabase client
│   ├── api.ts            # API functions
│   ├── trade.ts          # Trading API
│   ├── watchlist.ts      # Watchlist API
│   ├── almanack.ts       # Almanack API
│   ├── formatPrice.ts    # Price formatting
│   ├── currency.ts       # Currency symbols
│   ├── displaySymbol.ts  # Symbol formatting
│   ├── userMetrics.ts    # User streak tracking
│   ├── notifications.ts  # Browser notifications
│   ├── notificationSettings.ts  # Notification preferences
│   ├── financialGuide.ts        # Guide logic
│   ├── financialGuideContent.ts # Guide content
│   └── utils.ts          # General utilities
├── types/                # TypeScript types
│   └── stock.ts         # Stock-related types
├── constants/           # Constants
│   └── theme.ts        # Theme colors and spacing
└── public/             # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

The app connects to a backend API with the following endpoints:

- `GET /markets?region={US|IN|CRYPTO}` - Get market stocks
- `GET /single-stock/{ticker}?range={1d|1w|1mo|3mo|1y}` - Get stock details
- `GET /search?q={query}` - Search for stocks
- `GET /home?user_id={id}` - Get user portfolio data
- `POST /trade/buy` - Buy a stock
- `POST /trade/sell` - Sell a stock
- `GET /trades?user_id={id}` - Get trade history
- `GET /watchlist?user_id={id}` - Get watchlist
- `POST /watchlist` - Add to watchlist
- `DELETE /watchlist/{symbol}` - Remove from watchlist
- `GET /almanack?user_id={id}` - Get almanack entries
- `POST /almanack` - Create almanack entry
- `PUT /almanack/{id}` - Update almanack entry
- `DELETE /almanack/{id}` - Delete almanack entry

## Design System

### Colors

- Background: `#000000` (black)
- Cards: `#0A0A0A` with `#333333` borders
- Text Primary: White
- Text Secondary: `#737373` (neutral-500)
- Positive: `#bbf7d0` (green-200)
- Negative: `#fca5a5` (red-300)

### Typography

- Brand: "VISCERAL" with 8px letter spacing
- Font: Inter (system font)

## Key Features

### Authentication
- Secure email/password authentication via Supabase
- Protected routes redirect to login
- Persistent sessions

### Real-time Updates
- Live stock price updates using Supabase realtime subscriptions
- Instant portfolio value changes

### Responsive Design
- Mobile-first approach
- Bottom navigation on mobile
- Optimized for all screen sizes (mobile, tablet, desktop)
- Touch-optimized for mobile browsers

### Animations
- Smooth page transitions with Framer Motion
- Interactive button press effects
- Modal animations
- Time range selector animations

## Architecture

### React Native → Next.js Migration

This app is a complete port from React Native to Next.js, with the following conversions:

- **Components**: `View` → `div`, `Text` → `span/p`, `TouchableOpacity` → `button`
- **Navigation**: Expo Router → Next.js App Router
- **Animations**: React Native Reanimated → Framer Motion
- **Storage**: AsyncStorage → localStorage (with SSR checks)
- **Styling**: NativeWind → Tailwind CSS (direct compatibility)

### Key Features from Mobile App

All features from the mobile app have been ported:
- ✅ Complete authentication flow
- ✅ Onboarding experience
- ✅ Portfolio dashboard
- ✅ Markets with real-time updates
- ✅ Stock details with charts
- ✅ Trading functionality (buy/sell)
- ✅ Watchlist management
- ✅ Trade history
- ✅ Trading journal (Almanack)
- ✅ Financial education guide
- 🚧 Social features (coming soon)
- 🚧 Leagues/competitions (coming soon)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, please contact the development team or open an issue in the repository.

## Acknowledgments

- Design inspired by the Visceral React Native mobile app
- Backend API provided by visceral-be.onrender.com
- Built with Next.js, Supabase, and Tailwind CSS
