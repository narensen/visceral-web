/**
 * Notification settings management using localStorage
 */

export interface NotificationSettings {
  priceAlerts: boolean;
  portfolioUpdates: boolean;
  newsAlerts: boolean;
  leagueUpdates: boolean;
}

const SETTINGS_KEY = "visceral_notification_settings";

const DEFAULT_SETTINGS: NotificationSettings = {
  priceAlerts: true,
  portfolioUpdates: true,
  newsAlerts: false,
  leagueUpdates: true,
};

/**
 * Get notification settings from localStorage
 */
export function getNotificationSettings(): NotificationSettings {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }
  
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error("Failed to load notification settings:", error);
  }
  
  return DEFAULT_SETTINGS;
}

/**
 * Save notification settings to localStorage
 */
export function saveNotificationSettings(settings: NotificationSettings): void {
  if (typeof window === "undefined") {
    return;
  }
  
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save notification settings:", error);
  }
}

/**
 * Update a specific notification setting
 */
export function updateNotificationSetting(
  key: keyof NotificationSettings,
  value: boolean
): void {
  const settings = getNotificationSettings();
  settings[key] = value;
  saveNotificationSettings(settings);
}

/**
 * Reset notification settings to defaults
 */
export function resetNotificationSettings(): void {
  if (typeof window === "undefined") {
    return;
  }
  
  try {
    localStorage.removeItem(SETTINGS_KEY);
  } catch (error) {
    console.error("Failed to reset notification settings:", error);
  }
}
