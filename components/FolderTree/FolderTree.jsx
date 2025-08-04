import styles from './FolderTree.module.css';
import { useState } from 'react';

import AddFolder from '../../icons/addFolder.svg?react';
import AddNote from '../../icons/addNote.svg?react';
import RenameNote from '../../icons/renameNote.svg?react';
import MoveNote from '../../icons/moveNote.svg?react';
import TrashCan from '../../icons/deleteTrashCan.svg?react';
import MoveFolder from '../../icons/moveFolder.svg?react';
import RenameFolder from '../../icons/renameFolder.svg?react'

export default function FolderTree({ folder, level=0, onAction, path = [], onSelectedNote }) {
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = [...path, folder.name];

  return (
    <div className={styles.folderTree} style={{marginLeft: `${level}px`}}>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.folderHeader}>
        <span >
          {isOpen ? '-' : '>'} {folder.name}
        </span>

        <div className={styles.folderTreeFolderBtns}>
        <button onClick={() => onAction('rename', null, currentPath)} className={styles.folderTreeButton} ><RenameNote width={15} height={15} className={styles.folderTreeIcons} /></button>
        <button onClick={() => onAction('delete', null, currentPath)} className={styles.folderTreeButton} ><TrashCan width={15} height={15} className={styles.folderTreeIcons}/></button>
        <button onClick={() => onAction('move', null, currentPath)} className={styles.folderTreeButton}><MoveFolder width={15} height={15} className={styles.folderTreeIcons}/></button>
        <button onClick={() => onAction('add-folder', null, currentPath)} className={styles.folderTreeButton}><AddFolder width={15} height={15} className={styles.folderTreeIcons}/></button>
        <button onClick={() => onAction('add-note', null, currentPath)} className={styles.folderTreeButton}><AddNote width={15} height={15} className={styles.folderTreeIcons}/></button>
        </div>

      </div>

      {isOpen && (
        <div className={styles.folderChildren}>
        {folder.notes?.map((note) => (
          <div key={note._id} className={styles.folderTreeNote} onClick={() => onSelectedNote(note)} >
            <div>
              {note.title}
            </div>

            <div className={styles.folderTreeNoteBtns}>
            <button onClick={() => onAction('rename-note', note, currentPath)} className={styles.folderTreeButton} ><RenameNote width={15} height={15} className={styles.folderTreeIcons} /></button>
            <button onClick={() => onAction('move-note', note, currentPath)} className={styles.folderTreeButton}><MoveNote width={15} height={15} className={styles.folderTreeIcons} /></button>
            <button onClick={() => onAction('delete-note', note, currentPath)}className={styles.folderTreeButton} ><TrashCan width={15} height={15} className={styles.folderTreeIcons} /></button>
            </div>

          </div>
        ))}

        {folder.folders?.map((subfolder) => (
          <FolderTree key={subfolder._id} folder={subfolder} path={currentPath} level={level + 1} onAction={onAction} onSelectedNote={onSelectedNote} />
        ))}
        </div>
      )}
    </div>
  )
}
