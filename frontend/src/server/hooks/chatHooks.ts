import { useQuery, useMutation } from "@tanstack/react-query";
import { postPrompt } from "../api/chatApi";

export const usePostPrompt = () => {
  return useMutation<string, Error, string>({ mutationFn: postPrompt });
};
