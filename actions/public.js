"use server"
import { unstable_cache } from "next/cache";

export async function getPixabyImage(query) {
  try {
    const res = await fetch(
      `https://pixabay.com/api/?key=${process.env.PIXABY_API_KEY}&q=${encodeURIComponent(query)}&min_width=1280&min_height=720&image_type=illustration&category=feelings`
    );
    const data = await res.json();
    
    if (!data.hits || data.hits.length === 0) {
      console.warn("No image found for query:", query);
      return null;
    }

    return data.hits[0]?.largeImageURL || null; // Correct key is `largeImageURL`
  } catch (error) {
    console.error("Pixabay API Error:", error.message); // Fixed error logging
    return null;
  }
}

export const getDailyPrompt = unstable_cache(
  async () => {
    try {
      const res = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" });
      const data = await res.json();
      return data.slip.advice;
    } catch (error) {
      console.error("Advice API Error:", error.message); // Fixed error logging

      return {
        success: false,
        data: "What's on your mind",
      };
    }
  },
  ["daily-prompts"],
  {
    revalidate: 86400,
    tags: ["daily-prompts"],
  }
);
