import { useContext } from "react";
import { PromptContext } from './promptContextStore.js';

export function usePrompt() {
  return useContext(PromptContext);
}
