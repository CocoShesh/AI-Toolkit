import axios from "axios";

const key = import.meta.env.VITE_APP_API_KEY;

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: {
        inlineData?: {
          mimeType?: string;
          data?: string;
        };
      }[];
    };
  }[];
}

export const generateImage = async (
  userMessage: string
): Promise<string[] | null> => {
  try {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: userMessage,
            },
          ],
        },
      ],
      generationConfig: { responseModalities: ["Text", "Image"] },
    };

    const response = await axios.post<GeminiResponse>(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${key}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const parts = response.data.candidates?.[0]?.content?.parts || [];

    const allInlineData = parts
      .map(part => part.inlineData?.data)
      .filter((data): data is string => !!data);

    console.table("allInlineData", allInlineData);
    return allInlineData.length > 0 ? allInlineData : null;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
};
