import styles from './EditorHeader.module.css';
import UserBlock from '../userBlock/userBlock.jsx';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditorHeader( {username} ) {
  const [showBlock, setShowBlock] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowBlock(false);
      }
    }

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
  return (
    <>
      
      <div className={styles.editordiv} ref={dropdownRef}>
        <h1 className={styles.editorlogo}>Notes</h1>
        <div className={styles.editorHeaderBtnDiv}>
      <button className={styles.editorHeaderBtns} onClick={() => navigate('/editor')}>Editor</button>
        <button className={styles.editorHeaderBtns} onClick={() => navigate('/index')}>Index</button>
        <button className={styles.accountbtn} onClick={() => setShowBlock(!showBlock)}> {username || "null"} </button>
        </div>
      {showBlock && <UserBlock />}
      </div>
    </>
  );
}
