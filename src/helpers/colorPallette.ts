export const parseColorData = (rawData: string | null): string[] => {
  if (!rawData) return [];

  try {
    return JSON.parse(rawData);
  } catch (e) {
    try {
      const arrayMatch = rawData.match(/\[(.*)\]/);
      if (arrayMatch && arrayMatch[1]) {
        const colorStrings = arrayMatch[1]
          .split(",")
          .map(s => s.trim().replace(/^["']|["']$/g, ""));
        return colorStrings.filter(s => s.startsWith("#") && s.length >= 4);
      }
    } catch (error) {
      console.error("Failed to parse color data:", error);
    }
    return [];
  }
};
