import styles from './EditorHeader.module.css';

export default function EditorHeader({ username }) {
  return (
    <>
      <div className={styles.editordiv}> 
        <h1 className={styles.editorlogo}>Notes</h1>
        <button className={styles.accountbtn}>{username || "null"}</button>
      </div>
    </>
  );
}
