import EditorHeader from "../components/Header/EditorHeader.jsx";
import NoteEditor from "../components/noteEditor/NoteEditor.jsx";
import FileBar from "../components/fileBar/FileBar.jsx";

import styles from '../styles/EditorPage.module.css';

export default function EditorPage() {
  return (
    <>
    <EditorHeader />
      <div className={styles.EditorPage}>
        <FileBar/>
        <NoteEditor />
      </div>
    </>
  )
}
