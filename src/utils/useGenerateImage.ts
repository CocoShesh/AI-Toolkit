import { useMutation } from "@tanstack/react-query";
import { generateImage } from "../api/generateImage";

export function useGenerateImage() {
  return useMutation({
    mutationFn: ({ userMessage }: { userMessage: string }) =>
      generateImage(userMessage),

    onSuccess: data => {
      console.log("Image generated successfully:", data);
    },
    onError: error => {
      console.error("Error occurred while processing your request.", error);
    },
  });
}
