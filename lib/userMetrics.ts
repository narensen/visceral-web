/**
 * User metrics and streak tracking
 */

interface UserStreak {
  currentStreak: number;
  longestStreak: number;
  lastVisit: string;
}

const STORAGE_KEY = "visceral_user_metrics";

/**
 * Get user streak data from localStorage
 */
export function getUserStreak(): UserStreak {
  if (typeof window === "undefined") {
    return { currentStreak: 0, longestStreak: 0, lastVisit: new Date().toISOString() };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load user metrics:", error);
  }
  
  return { currentStreak: 0, longestStreak: 0, lastVisit: new Date().toISOString() };
}

/**
 * Update user streak based on last visit
 */
export function updateUserStreak(): UserStreak {
  const streak = getUserStreak();
  const today = new Date();
  const lastVisit = new Date(streak.lastVisit);
  
  // Calculate days difference
  const diffTime = Math.abs(today.getTime() - lastVisit.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    // Same day, no change
    return streak;
  } else if (diffDays === 1) {
    // Consecutive day, increment streak
    streak.currentStreak += 1;
    streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
  } else {
    // Streak broken, reset
    streak.currentStreak = 1;
  }
  
  streak.lastVisit = today.toISOString();
  
  // Save to localStorage
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(streak));
    } catch (error) {
      console.error("Failed to save user metrics:", error);
    }
  }
  
  return streak;
}

/**
 * Reset user streak
 */
export function resetUserStreak(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to reset user metrics:", error);
    }
  }
}
