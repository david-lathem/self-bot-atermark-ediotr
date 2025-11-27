import { GoogleGenAI } from "@google/genai";
import { MessageAttachment } from "discord.js-selfbot-v13";
import { textPrompt } from "./constants.js";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export const removeWaterMark = async (image: MessageAttachment) => {
  const res = await fetch(image.url);

  const arrayBuff = await res.arrayBuffer();

  const base64Image = Buffer.from(arrayBuff).toString("base64");

  const prompt = [
    { text: textPrompt },
    {
      inlineData: {
        mimeType: "image/webp",
        data: base64Image,
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: prompt,
  });

  console.log(response);

  if (!response.candidates?.length) return console.log("Candidates null");

  console.log(response.candidates[0].content?.parts);

  for (const part of response.candidates[0].content!.parts!) {
    if (part.inlineData) {
      const imageData = part.inlineData.data!;

      const buffer = Buffer.from(imageData, "base64");

      return buffer;
    }
  }
};
