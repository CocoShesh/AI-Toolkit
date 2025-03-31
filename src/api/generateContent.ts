import axios from "axios";

const key = import.meta.env.VITE_APP_API_KEY;

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
    finishReason: string;
  }>;
}

export const generateContent = async (userMessage: string) => {
  try {
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: userMessage,
            },
          ],
        },
      ],
    };
    const response = await axios.post<GeminiResponse>(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return (
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I couldn't generate a response."
    );
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "An error occurred while processing your request.";
  }
};
