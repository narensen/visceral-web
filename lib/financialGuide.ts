/**
 * Financial guide display logic
 */

import { FINANCIAL_GUIDE_CONTENT, GuidePage } from "./financialGuideContent";

const GUIDE_SEEN_KEY = "visceral_guide_seen";
const GUIDE_PROGRESS_KEY = "visceral_guide_progress";

/**
 * Check if user has seen the financial guide
 */
export function hasSeenGuide(): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    return localStorage.getItem(GUIDE_SEEN_KEY) === "true";
  } catch (error) {
    console.error("Failed to check guide status:", error);
    return false;
  }
}

/**
 * Mark the guide as seen
 */
export function markGuideAsSeen(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(GUIDE_SEEN_KEY, "true");
  } catch (error) {
    console.error("Failed to mark guide as seen:", error);
  }
}

/**
 * Get user's guide progress (which pages they've completed)
 */
export function getGuideProgress(): string[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(GUIDE_PROGRESS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load guide progress:", error);
    return [];
  }
}

/**
 * Mark a guide page as completed
 */
export function markPageCompleted(pageId: string): void {
  if (typeof window === "undefined") return;
  
  try {
    const progress = getGuideProgress();
    if (!progress.includes(pageId)) {
      progress.push(pageId);
      localStorage.setItem(GUIDE_PROGRESS_KEY, JSON.stringify(progress));
    }
  } catch (error) {
    console.error("Failed to save guide progress:", error);
  }
}

/**
 * Check if a specific page is completed
 */
export function isPageCompleted(pageId: string): boolean {
  const progress = getGuideProgress();
  return progress.includes(pageId);
}

/**
 * Get all guide pages
 */
export function getAllGuidePages(): GuidePage[] {
  return FINANCIAL_GUIDE_CONTENT;
}

/**
 * Get a specific guide page by ID
 */
export function getGuidePage(pageId: string): GuidePage | undefined {
  return FINANCIAL_GUIDE_CONTENT.find((page) => page.id === pageId);
}

/**
 * Calculate completion percentage
 */
export function getCompletionPercentage(): number {
  const total = FINANCIAL_GUIDE_CONTENT.length;
  const completed = getGuideProgress().length;
  return Math.round((completed / total) * 100);
}

/**
 * Reset guide progress
 */
export function resetGuideProgress(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(GUIDE_SEEN_KEY);
    localStorage.removeItem(GUIDE_PROGRESS_KEY);
  } catch (error) {
    console.error("Failed to reset guide progress:", error);
  }
}
