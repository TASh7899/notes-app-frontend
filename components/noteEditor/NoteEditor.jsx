import { useState, useEffect, useCallback } from 'react';
import styles from './NoteEditor.module.css';
import PopUp from '../popup/PopUp.jsx';
import api from '../../axiosConfig.js';

import SaveIcon from '../../icons/saveIcon.svg?react';
import DeleteIcon from '../../icons/deleteTrashCan.svg?react';
import Read from '../../icons/readIcons.svg?react';

export default function NoteEditor({ selectedNote, setSelected, onChange, onDelete, onSwitchToReload }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showPop, setShowPop] = useState(false);
  const [message, setMessage] = useState('');
  const [date, setDate] = useState(null);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || '');
      setContent(selectedNote.content || '');
      const temp = selectedNote.createdAt.split("T")[0]
      setDate(temp || '');
    } else {
      setTitle('');
      setContent('');
      setDate('');
    }
  }, [selectedNote]);


  const handleSave = useCallback(async () => {
    if (!selectedNote) return;
    try {
      const res = await api.put(`/api/notes/${selectedNote._id}`, {
        title,
        content,
      });
  
      setSelected(prev => ({
        ...prev,
        title: title,
        content: content,
      }));

      setMessage(res.data.message || "note saved successfully");
      setIsError(false);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
      if (onChange) onChange();
      return res;
    } catch (err) {
      setMessage(err?.response?.data?.error || "error saving note");
      setIsError(true);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
    }
  }, [selectedNote, setSelected, title, content, onChange, setShowPop]);

  const handleDelete = async () => {
    if (!selectedNote) return;
    try {
      const res = await api.delete(`/api/notes/${selectedNote._id}`);
      setMessage(res.data.message || "note deleted successfully");
      setIsError(false);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
      if (onChange) onChange();
      if (onDelete) onDelete();
    } catch (err) {
      setMessage(err?.response?.data?.error || "error deleting note");
      setIsError(true)
      setShowPop(true);
      setTimeout(() => showPop(false), 2000);
    }
  }

  useEffect(() => {
    if (!selectedNote) return;

    const interval = setInterval(() => {
      handleSave();
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedNote, handleSave])

  return (
    <>
      {showPop && <PopUp message={message} onClose={() => setShowPop(false)} isError={isError} /> }

        <div className={styles.noteEditor}>

          <div className={styles.noteEditorHeader}>
            <div>
              <p>{selectedNote.title} / {selectedNote.createdAt.split("T")[0]}</p>
            </div>
          <div className={styles.noteEditorBtns}>
            <button onClick={() => handleSave()}><SaveIcon /></button>
            <button onClick={() => handleDelete()}><DeleteIcon /></button>
            <button onClick={async () => {
              const res = await handleSave();
              if (res) {
                await onSwitchToReload();
              }
            }}><Read /></button>
          </div>
          </div>

          <div className={styles.noteEditorMain}>
            <input className={styles.noteEditorInput} value={title} onChange={(e) => setTitle(e.target.value)} />
            <p className={styles.noteEditorDate} >Date: {date} </p>
            <textarea className={styles.noteEditorTextarea} value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
      </div>
    </>
  )
}
