"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, GraduationCap, Users } from "lucide-react";
import { toast } from "sonner";

const intents = [
  {
    id: "invest",
    title: "Long-term Investment",
    description: "Build wealth over time with steady growth",
    icon: TrendingUp,
  },
  {
    id: "trade",
    title: "Active Trading",
    description: "Buy and sell regularly for short-term profits",
    icon: DollarSign,
  },
  {
    id: "learn",
    title: "Learn & Practice",
    description: "Understand markets without risking real money",
    icon: GraduationCap,
  },
  {
    id: "compete",
    title: "Compete with Friends",
    description: "Join leagues and challenge other traders",
    icon: Users,
  },
];

export default function IntentPage() {
  const router = useRouter();
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedIntent) {
      toast.error("Please select an intent");
      return;
    }

    setLoading(true);
    // Here you would save the intent to the database
    setTimeout(() => {
      router.push("/onboarding/experience");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-[8px] mb-2">VISCERAL</h1>
          <p className="text-neutral-400 text-lg">What brings you here?</p>
        </div>

        <div className="space-y-4 mb-8">
          {intents.map((intent) => {
            const Icon = intent.icon;
            const isSelected = selectedIntent === intent.id;
            
            return (
              <motion.button
                key={intent.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedIntent(intent.id)}
                className={`w-full bg-neutral-950/65 border rounded-2xl p-6 text-left transition-all ${
                  isSelected
                    ? "border-white"
                    : "border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      isSelected ? "bg-white" : "bg-neutral-900"
                    }`}
                  >
                    <Icon
                      size={24}
                      className={isSelected ? "text-black" : "text-neutral-400"}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {intent.title}
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      {intent.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          disabled={!selectedIntent || loading}
          className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Continue"}
        </motion.button>
      </motion.div>
    </div>
  );
}
