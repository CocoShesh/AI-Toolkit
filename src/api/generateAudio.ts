import axios from "axios";

const key = import.meta.env.VITE_APP_API_KEY;

export const generateAudio = async (
  audioFile: File
): Promise<string | null> => {
  try {
    const arrayBuffer = await audioFile.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    let binary = "";
    bytes.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    const base64Data = btoa(binary);

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: "Describe this audio clip",
            },
            {
              inline_data: {
                mime_type: audioFile.type || "audio/mpeg",
                data: base64Data,
              },
            },
          ],
        },
      ],
    };

    const response = await axios.post<any>(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    if (error.response?.data?.error?.message) {
      throw new Error(`API Error: ${error.response.data.error.message}`);
    }
    throw new Error("Failed to generate audio description");
  }
};
