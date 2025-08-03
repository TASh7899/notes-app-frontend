import { useEffect, useState } from 'react';
import styles from './Prompt.module.css';

export default function Prompt({ message, onSubmit, defaultValue='', onClose, showInput = false}) {
  const [input, setInput] = useState(defaultValue);

  useEffect(() => {
    if (showInput) {
      setInput(defaultValue);
    }
  }, [defaultValue, showInput]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' ) onSubmit(showInput ? input : true);
    if (e.key === 'Escape') onClose();

  }

  return (
  <div
    className={styles.promptOverlay}
    onKeyDown={handleKeyDown}
    tabIndex={1}
  >
    <div className={styles.promptBox}>
      <p className={styles.promptMessage}>{message}</p>

      {showInput && (
        <input
          type="text"
          className={styles.promptInput}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus // Automatically focus input on open
        />
      )}

      <div className={styles.promptButtonDiv}>
        <button onClick={() => onSubmit(showInput ? input : true)}>OK</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  </div>
  )
}
