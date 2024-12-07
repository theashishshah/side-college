//TODO: cross check and re-write

import { google } from "@ai-sdk/google";
import { GoogleAICacheManager } from "@google/generative-ai/server";
import { generateText } from "ai";

const cacheManager = new GoogleAICacheManager(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY
);

// As of August 23rd, 2024, these are the only models that support caching
type GoogleModelCacheableId =
  | "models/gemini-1.5-flash-001"
  | "models/gemini-1.5-pro-001";

const model: GoogleModelCacheableId = "models/gemini-1.5-pro-001";

const { name: cachedContent } = await cacheManager.create({
  model,
  contents: [
    {
      role: "user",
      parts: [{ text: "1000 Lasanga Recipes..." }],
    },
  ],
  ttlSeconds: 60 * 5,
});

const { text: veggieLasangaRecipe } = await generateText({
  model: google(model, { cachedContent }),
  prompt: "Write a vegetarian lasagna recipe for 4 people.",
});

const { text: meatLasangaRecipe } = await generateText({
  model: google(model, { cachedContent }),
  prompt: "Write a meat lasagna recipe for 12 people.",
});
