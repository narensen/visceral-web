# Visceral Web - Trading Platform

A modern, responsive web application for paper trading stocks and cryptocurrencies. Built with Next.js 14+ and designed to match the Visceral mobile app experience.

## Features

- 🔐 **Authentication** - Secure login/signup with Supabase
- 📊 **Real-time Market Data** - Live price updates using Supabase realtime
- 💼 **Portfolio Management** - Track your paper trading portfolio
- 🔍 **Stock Search** - Find and analyze stocks across US, Indian, and crypto markets
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile browsers
- 🌙 **Dark Theme** - Sleek dark UI matching the mobile app
- 🏆 **Leagues** - Compete with friends (coming soon)

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase (@supabase/ssr)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner

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
├── app/                    # Next.js app directory
│   ├── dashboard/         # Protected dashboard pages
│   │   ├── page.tsx      # Home/portfolio page
│   │   ├── markets/      # Markets listing
│   │   ├── stock/        # Stock details
│   │   ├── leagues/      # Leagues (coming soon)
│   │   └── settings/     # User settings
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── onboarding/       # Onboarding flow
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── BottomNav.tsx    # Bottom navigation
│   ├── StockRow.tsx     # Stock list item
│   ├── MarketTabs.tsx   # Market tabs
│   ├── HoldingCard.tsx  # Portfolio holding card
│   └── Modal.tsx        # Modal dialog
├── hooks/               # Custom React hooks
│   └── useAuth.ts       # Authentication hook
├── lib/                 # Utilities and services
│   ├── supabase.ts     # Supabase client
│   ├── api.ts          # API functions
│   ├── formatPrice.ts  # Price formatting
│   └── utils.ts        # General utilities
├── types/              # TypeScript types
│   └── stock.ts        # Stock-related types
└── public/            # Static assets
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
- Optimized for all screen sizes

### Animations
- Smooth page transitions with Framer Motion
- Interactive button press effects
- Modal animations

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
