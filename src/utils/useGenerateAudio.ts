import { useMutation } from "@tanstack/react-query";
import { generateAudio } from "../api/generateAudio";

export function useGenerateAudio() {
  return useMutation({
    mutationFn: ({ audioData }: { audioData: File }) =>
      generateAudio(audioData),

    onSuccess: data => {
      console.log("Audio generated successfully:", data);
    },
    onError: error => {
      console.error("Error occurred while processing your request.", error);
    },
  });
}
