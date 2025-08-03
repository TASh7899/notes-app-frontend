import React, { useState } from "react";
import Prompt from '../components/prompt/Prompt.jsx';
import { PromptContext } from './promptContextStore.js';


export function PromptProvider({ children }) {
  const [promptState, setPromptState] = useState(null);

  const openPrompt = (message, defaultValue = '', showInput = true) => {
    return new Promise((resolve) => {
      setPromptState({
        message,
        defaultValue,
        showInput,
        resolve,
      });
    });
  };

  const handleSubmit = (value) => {
    promptState?.resolve(value);
    setPromptState(null);
  }

  const handleClose = () => {
    promptState?.resolve(null);
    setPromptState(null);
  }

  return (
    <PromptContext.Provider value={openPrompt}>
      {children}
      {promptState && (
        <Prompt 
          message={promptState.message}
          defaultValue={promptState.defaultValue}
          onSubmit={handleSubmit}
          onClose={handleClose}
          showInput={promptState.showInput}
      />)}
    </PromptContext.Provider>
  );
}



