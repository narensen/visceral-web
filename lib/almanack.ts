/**
 * Almanack (journal) API functions
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000";

export interface AlmanackEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  symbol?: string;
  market?: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
}

export interface CreateAlmanackEntryRequest {
  user_id: string;
  title: string;
  content: string;
  symbol?: string;
  market?: string;
  tags?: string[];
}

/**
 * Get all almanack entries for a user
 */
export async function getAlmanackEntries(userId: string): Promise<AlmanackEntry[]> {
  const res = await fetch(`${BASE_URL}/almanack?user_id=${userId}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch almanack entries");
  }

  return res.json();
}

/**
 * Get a specific almanack entry
 */
export async function getAlmanackEntry(entryId: string): Promise<AlmanackEntry> {
  const res = await fetch(`${BASE_URL}/almanack/${entryId}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch almanack entry");
  }

  return res.json();
}

/**
 * Create a new almanack entry
 */
export async function createAlmanackEntry(
  data: CreateAlmanackEntryRequest
): Promise<AlmanackEntry> {
  const res = await fetch(`${BASE_URL}/almanack`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create almanack entry");
  }

  return res.json();
}

/**
 * Update an almanack entry
 */
export async function updateAlmanackEntry(
  entryId: string,
  data: Partial<CreateAlmanackEntryRequest>
): Promise<AlmanackEntry> {
  const res = await fetch(`${BASE_URL}/almanack/${entryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update almanack entry");
  }

  return res.json();
}

/**
 * Delete an almanack entry
 */
export async function deleteAlmanackEntry(
  entryId: string
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${BASE_URL}/almanack/${entryId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to delete almanack entry");
  }

  return res.json();
}

/**
 * Search almanack entries
 */
export async function searchAlmanackEntries(
  userId: string,
  query: string
): Promise<AlmanackEntry[]> {
  const res = await fetch(
    `${BASE_URL}/almanack/search?user_id=${userId}&q=${encodeURIComponent(query)}`
  );
  
  if (!res.ok) {
    throw new Error("Failed to search almanack entries");
  }

  return res.json();
}
