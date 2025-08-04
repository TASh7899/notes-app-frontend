import EditorHeader from "../components/Header/EditorHeader.jsx";
import NoteEditor from "../components/noteEditor/NoteEditor.jsx";
import FileBar from "../components/fileBar/FileBar.jsx";
import ReadNote from "../components/readNote/readNote.jsx";

import styles from '../styles/EditorPage.module.css';
import { useState } from "react";

import { useUser } from "../context/UseUserContext.js";

export default function EditorPage() {
  const [selected, setSelected] = useState(null);
  const [reload, setReload] = useState(false);
  const [readMode, setReadMode] = useState(false);

  const { username } = useUser();

  return (
    <>
    <EditorHeader username={username} />
      <div className={styles.EditorPage} >
        <FileBar onSelectedNote={setSelected} reload={reload} setReload={setReload}/>

        {selected ? (
          readMode ? (
            <ReadNote title={selected.title} content={selected.content} date={selected.createdAt.split("T")[0]} onBack={() => setReadMode((false))} />
          ) : (
            <NoteEditor selectedNote={selected} setSelected={setSelected} onChange={() => setReload(prev => !prev)} onDelete={() => setSelected(null)} onSwitchToReload={() => setReadMode(true)} />
          )
          ) : (
            <div style={{padding: "2rem", flex: 1}}>
              no note selected
            </div>
          )
        }

      </div>
    </>
  )
}
