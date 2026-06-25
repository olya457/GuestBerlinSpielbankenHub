const memoryStore: Record<string, string> = {};

export const storage = {
  async getJSON<T>(key: string, fallback: T): Promise<T> {
    const raw = memoryStore[key];
    if (!raw) {
      return fallback;
    }
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  async setJSON<T>(key: string, value: T): Promise<void> {
    memoryStore[key] = JSON.stringify(value);
  },
  async remove(key: string): Promise<void> {
    delete memoryStore[key];
  },
};
