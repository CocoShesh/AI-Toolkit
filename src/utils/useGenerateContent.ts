import { useMutation } from "@tanstack/react-query";
import { generateContent } from "../api/generateContent";

export function useGenerateContent() {
  return useMutation({
    mutationFn: ({ userMessage }: { userMessage: string }) =>
      generateContent(userMessage),

    onSuccess: data => {
      console.log("Content generated successfully:", data);
    },
    onError: error => {
      console.error("Error occurred while processing your request.", error);
    },
  });
}
