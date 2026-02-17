"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Target, Zap } from "lucide-react";
import { toast } from "sonner";

const experiences = [
  {
    id: "beginner",
    title: "Just Starting Out",
    description: "New to trading and investing",
    icon: Sparkles,
  },
  {
    id: "intermediate",
    title: "Some Experience",
    description: "Familiar with basic concepts and strategies",
    icon: Target,
  },
  {
    id: "advanced",
    title: "Experienced Trader",
    description: "Active trader with proven strategies",
    icon: Zap,
  },
];

export default function ExperiencePage() {
  const router = useRouter();
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedExperience) {
      toast.error("Please select your experience level");
      return;
    }

    setLoading(true);
    // Here you would save the experience to the database
    setTimeout(() => {
      toast.success("Welcome to Visceral!");
      router.push("/dashboard");
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
          <p className="text-neutral-400 text-lg">What's your experience level?</p>
        </div>

        <div className="space-y-4 mb-8">
          {experiences.map((experience) => {
            const Icon = experience.icon;
            const isSelected = selectedExperience === experience.id;
            
            return (
              <motion.button
                key={experience.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedExperience(experience.id)}
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
                      {experience.title}
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      {experience.description}
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
          disabled={!selectedExperience || loading}
          className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Get Started"}
        </motion.button>

        <button
          onClick={() => router.back()}
          className="w-full mt-4 py-3 text-neutral-400 hover:text-white transition-colors"
        >
          Back
        </button>
      </motion.div>
    </div>
  );
}
