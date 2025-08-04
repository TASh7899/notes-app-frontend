import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './readNote.module.css';

import Back from '../../icons/backIcon.svg?react';

export default function ReadNote({ title, content, date, onBack }) {
  return (
    <div className={styles.readNote}>
    <div>
    <div className={styles.readNoteHeading}>
      <div className={styles.readNoteTitleAndData}>
      <h1>{title}</h1>
      <p>Date: {date}</p>
      </div>

      <button onClick={() => onBack()} className={styles.readNoteBackBtn}><Back width={40} height={40} /></button>
    </div>
      <div className={styles.readNoteMarkdownBody}>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
      />
      </div>
    </div>
    </div>
  )
}
