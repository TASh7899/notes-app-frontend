import { useState, useEffect } from 'react';
import styles from './FileBar.module.css';
import api from '../../axiosConfig.js';
import PopUp from '../popup/PopUp';
import FolderTree from '../FolderTree/FolderTree';
import {usePrompt} from '../../context/usePromptContext.js';

import AddFolder from '../../icons/addFolder.svg?react';
import AddNote from '../../icons/addNote.svg?react';
import RenameNote from '../../icons/renameNote.svg?react';
import MoveNote from '../../icons/moveNote.svg?react';
import TrashCan from '../../icons/deleteTrashCan.svg?react';

export default function FileBar() {
  
  const [folder, setFolder] = useState([]);
  const [note, setNote] = useState([]);
  const [showPop, setShowPop] = useState(false);
  const [isError, setIsError] = useState(null);
  const [message, setMessage] = useState('');
  const [reload, setReload] = useState(null);

  const prompt = usePrompt();

  useEffect(() => {
    api.get('/api/folders')
    .then(res => {
      setFolder(res.data.folders);
      setNote(res.data.notes);
    })
    .catch((err) => {
      setIsError(true);
      console.log(err);
      setMessage(err?.response?.data?.error || "error occured" );
    })
  }, [reload]);

  const onAction = (type, note, target) => {
    switch (type) {
      case 'rename':
        renameFolder(target);
      break;

      case 'delete':
        deleteFolder(target);
      break;

      case 'move':
        moveFolder(target);

      break;

      case 'add-folder':
        addFolder(target);
      break;

      case 'add-note':
        addNoteToFolder(target);
      break;

      case 'rename-note':
        renameNote(note)
      break;

      case 'move-note':
        moveNote(note);
      break;

      case 'delete-note':
        deleteNote(note);
      break;

    }
  }

  const renameFolder = async (folderPath) => {
    const newName = await prompt("Enter new Folder Name:", folderPath.at(-1) || "", true );
    if (newName === null || newName.trim() === "") return;
    try {
      const data = {newName, folderPath};
      const res = await api.put('/api/folders', data);
      setMessage(res.data.message || "renaming successfull");
      setIsError(false);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
      setReload(!reload);
    } catch (err) {
      setMessage( err?.response?.data?.error || "error occured" );
      setIsError(true);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
    }
  }

  const addFolder = async (folderPath) => {
    const name = await prompt("Enter new Folder Name:", "", true );
    if (name === null || name.trim() === "") return;
    try {
      const data = {name, folderPath};
      const res = await api.post('/api/folders', data);
      setMessage(res.data.message || "folder created");
      setIsError(false);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
      setReload(!reload);
    } catch (err) {
      setMessage( err?.response?.data?.error || "error creating folder" );
      setIsError(true);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
    }
  }

  const deleteFolder = async (folderPath) => {
    try {
      const data = {folderPath};
      console.log(data);
      const res = await api.delete('/api/folders', {
        data: { folderPath }
      });
      setMessage(res.data.message || "folder deleted");
      setIsError(false);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
      setReload(!reload);
    } catch (err) {
      setMessage( err?.response?.data?.error || "error deleting folder" );
      setIsError(true);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
    }
  }

  const moveFolder = async (folderPath) => {
    const path = await prompt("Enter new Path for folder : / for root", "", true );
    if ( path === null || path.trim() === "") return;

    const arrayPath = path.trim().split('/').filter(Boolean);

    try {
      const data = {folderPath: folderPath, newParentPath: arrayPath};
      const res = await api.put('/api/folders/move', data);
      setMessage(res.data.message || "folder moved successfully");
      setIsError(false);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
      setReload(!reload);
    } catch (err) {
      setMessage( err?.response?.data?.error || "error occured" );
      setIsError(true);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
    }
  }

  const addNoteToFolder = async (folderPath) => {
    const name = await prompt("Enter new note name", "", true );
    if (name === null || name.trim() === "") return;
    try {
      const data = {title: name, folderPath};
      const res = await api.post('/api/notes', data);
      setMessage(res.data.message || "note created successfully");
      setIsError(false);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
      setReload(!reload);
    } catch (err) {
      setMessage( err?.response?.data?.error || "error creating note" );
      setIsError(true);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
    }
  }

 const renameNote = async (note) => {
    const id = note._id;
    const newName = await prompt("Enter new name for note", note.title || "", true);
    const data = { title: newName };
    try {
      const res = await api.put(`/api/notes/${id}`, data);
      setMessage(res.data.message || "note renamed successfully");
      setIsError(false);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
      setReload(!reload);
    } catch (err) {
      setMessage( err?.response?.data?.error || "error renaming note" );
      setIsError(true);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
    }
  }


  const moveNote = async (note) => {
    const id = note._id;
    const newPath = await prompt("Enter new Path : / for root", "", true);

    if (!id || !newPath) return;

    const newFolderPath = newPath === "/" ? [] : newPath.split("/").filter(Boolean);

    const data = { newFolderPath: newFolderPath };
    try {
      const res = await api.put(`/api/notes/move/${id}`, data);
      setMessage(res.data.message || "note moved successfully");
      setIsError(false);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
      setReload(!reload);
    } catch (err) {
      setMessage( err?.response?.data?.error || "error moving note" );
      setIsError(true);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
    }
  }

  const deleteNote = async (note) =>  {
    const id = note._id;
    try {
      const res = await api.delete(`/api/notes/${id}`);
      setMessage(res.data.message || "note deleted successfully");
      setIsError(false);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
      setReload(!reload);
    } catch (err) {
      setMessage( err?.response?.data?.error || "error deleting note" );
      setIsError(true);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
    }
  }


  return(
    <>
      {showPop && <PopUp message={message} isError={isError} onClose={() => setShowPop(false)}  />}

      <div className={styles.fileBar}>
        <div className={styles.fileBarHeader}>
          <h2 className={styles.fileBarHeaderHeading} >Files</h2>
          <div className={styles.fileBarHeaderBtns}>
          <button onClick={() => onAction('add-folder', null, [])} className={styles.fileBarIconButton}><AddFolder width={22} height={22} className={styles.fileBarIcons} /></button>
          <button onClick={() => onAction('add-note', null, [])} className={styles.fileBarIconButton} ><AddNote width={22} height={22} className={styles.fileBarIcons} /></button>
          </div>
        </div>

        <div className={styles.fileBarContent}>
          {folder && folder.map((f) => <FolderTree key={f._id} folder={f} onAction={onAction} />) }
          {note && note.map(n => (
            <div key={n._id} className={styles.fileBarRootNotes}>
            <div>
            {n.title}
            </div>

            <div className={styles.fileBarNoteBtns}>
            <button onClick={() => onAction('rename-note', n, [])} className={styles.fileBarIconButton} ><RenameNote width={15} height={15} className={styles.fileBarIcons} /></button>
            <button onClick={() => onAction('move-note', n, [])} className={styles.fileBarIconButton} ><MoveNote width={15} height={15} className={styles.fileBarIcons} /></button>
            <button onClick={() => onAction('delete-note', n, [])} className={styles.fileBarIconButton} > <TrashCan width={15} height={15} className={styles.fileBarIcons} /> </button>
            </div>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}
