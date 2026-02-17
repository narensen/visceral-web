/**
 * Web Notifications API wrapper
 * Handles browser notification permissions and display
 */

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
}

/**
 * Request notification permission from the user
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    console.warn("Notifications not supported in this browser");
    return false;
  }
  
  if (Notification.permission === "granted") {
    return true;
  }
  
  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  
  return false;
}

/**
 * Check if notifications are supported and permitted
 */
export function canShowNotifications(): boolean {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false;
  }
  return Notification.permission === "granted";
}

/**
 * Show a browser notification
 */
export function showNotification(options: NotificationOptions): void {
  if (!canShowNotifications()) {
    console.warn("Cannot show notification: permission not granted");
    return;
  }
  
  try {
    new Notification(options.title, {
      body: options.body,
      icon: options.icon || "/icon.png",
      tag: options.tag,
    });
  } catch (error) {
    console.error("Failed to show notification:", error);
  }
}

/**
 * Schedule a price alert notification
 */
export function schedulePriceAlert(
  symbol: string,
  targetPrice: number,
  currentPrice: number
): void {
  // In a real app, this would be handled by a service worker
  // For now, just log the alert
  console.log(`Price alert scheduled for ${symbol} at $${targetPrice} (current: $${currentPrice})`);
}
