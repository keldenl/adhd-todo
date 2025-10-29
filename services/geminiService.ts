
import { GoogleGenAI, Modality } from "@google/genai";
import type { Task, Artifact } from '../types';
import { ELEMENTS } from '../constants';

export async function generateArtifactImage(
  task: Task,
  artisticNudge: { mood: string; color: string; },
  context: { location?: { lat: number; lon: number }; timestamp: string; }
): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const elementInfo = ELEMENTS[task.elementType];
  const { dayOfWeek, timeOfDay } = parseTimestamp(context.timestamp);

  const prompt = `
Generate a mesmerizing, abstract, generative art piece representing a completed task.
The style is "Focus Seal": Ethereal, minimalist, with soft glass materials, tangible motion, and glowing crystallized energy. It should feel like a beautiful trophy of focus.

**Core Subject & Style:**
- Task Title: "${task.title}"
- Element Type: ${elementInfo.name} (${elementInfo.emoji})
- Effort Level: ${task.effort}/5 (This is crucial: visual complexity, luminosity, and layer density MUST scale with this value. A 5/5 effort task should be a luminous, layered, intricate masterpiece. A 1/5 task should be elegant but minimal.)

**Artistic Direction:**
- Dominant Mood/Word: "${artisticNudge.mood}"
- Primary Color Influence: A touch of "${artisticNudge.color}" should be subtly woven into the palette.

**Contextual Modifiers:**
- Time of Day: ${timeOfDay}
- Day of Week: ${dayOfWeek}
- Location: The art should be subtly influenced by a location near latitude ${context.location?.lat ?? 'N/A'} and longitude ${context.location?.lon ?? 'N/A'}. Imagine the ambient light and natural colors of such a place.

**Elemental Visual Directives for "${elementInfo.name}":**
- Core Palette: Use a sophisticated palette based on ${elementInfo.colors}.
- Motion & Feel: The energy should be visualized with dynamics of: ${elementInfo.motion}.
- Signature Effect: Embody this core concept: ${elementInfo.effect}.

Produce a high-resolution, visually stunning image. The final piece must be abstract and beautiful, a true artifact of focus. Do not include any text or borders in the image.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
    throw new Error("No image data found in Gemini response.");

  } catch (error) {
    console.error("Error generating artifact image:", error);
    throw new Error("Failed to generate artifact. Please try again.");
  }
}

function parseTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const hour = date.getHours();
  let timeOfDay = 'Night';
  if (hour >= 5 && hour < 12) timeOfDay = 'Morning';
  else if (hour >= 12 && hour < 17) timeOfDay = 'Afternoon';
  else if (hour >= 17 && hour < 21) timeOfDay = 'Evening';
  return { dayOfWeek, timeOfDay };
}
