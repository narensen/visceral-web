/**
 * Hook to check if user needs to complete onboarding
 * Redirects new users to onboarding flow
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ONBOARDING_COMPLETE_KEY = "visceral_onboarding_complete";
const ONBOARDING_INTENT_KEY = "visceral_onboarding_intent";
const ONBOARDING_EXPERIENCE_KEY = "visceral_onboarding_experience";

export function useNewRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const onboardingComplete = localStorage.getItem(ONBOARDING_COMPLETE_KEY);
    
    if (!onboardingComplete) {
      // User hasn't completed onboarding, redirect to intro
      router.replace("/onboarding/intro");
    }
  }, [router]);
}

export function markOnboardingComplete() {
  if (typeof window === "undefined") return;
  localStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");
}

export function setOnboardingIntent(intent: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ONBOARDING_INTENT_KEY, intent);
}

export function setOnboardingExperience(experience: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ONBOARDING_EXPERIENCE_KEY, experience);
}

export function getOnboardingData() {
  if (typeof window === "undefined") return null;
  
  return {
    intent: localStorage.getItem(ONBOARDING_INTENT_KEY),
    experience: localStorage.getItem(ONBOARDING_EXPERIENCE_KEY),
    complete: localStorage.getItem(ONBOARDING_COMPLETE_KEY) === "true",
  };
}

export function resetOnboarding() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ONBOARDING_COMPLETE_KEY);
  localStorage.removeItem(ONBOARDING_INTENT_KEY);
  localStorage.removeItem(ONBOARDING_EXPERIENCE_KEY);
}
