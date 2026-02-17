"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Users, Award } from "lucide-react";
import Link from "next/link";

export default function OnboardingIntroPage() {
  const router = useRouter();

  const features = [
    {
      icon: TrendingUp,
      title: "Paper Trading",
      description: "Practice trading with virtual money in real market conditions",
    },
    {
      icon: BookOpen,
      title: "Learn & Grow",
      description: "Access educational content and trading guides",
    },
    {
      icon: Users,
      title: "Join Leagues",
      description: "Compete with friends and climb the leaderboards",
    },
    {
      icon: Award,
      title: "Track Performance",
      description: "Monitor your portfolio and analyze your trading decisions",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-brand mb-4">
            VISCERAL
          </h1>
          <p className="text-neutral-400 text-lg">
            Your Journey to Smarter Trading Starts Here
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-950/65 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-colors"
            >
              <feature.icon className="text-white mb-4" size={32} />
              <h3 className="text-white font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-white text-black py-4 px-6 rounded-xl font-semibold hover:bg-neutral-200 transition-colors"
          >
            Get Started
          </button>
          <Link
            href="/login"
            className="block text-center text-neutral-400 hover:text-white transition-colors"
          >
            Already have an account? Log in
          </Link>
        </motion.div>

        {/* Fine Print */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-neutral-600 text-xs text-center mt-8"
        >
          This is a paper trading platform. No real money is involved.
          <br />
          Perfect your strategy risk-free before trading with real capital.
        </motion.p>
      </motion.div>
    </div>
  );
}
