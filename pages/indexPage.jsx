import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from '../components/popup/PopUp.jsx';
import api from '../axiosConfig.js';
import styles from '../styles/IndexPage.module.css';
import { useUser } from "../context/UseUserContext";
import EditorHeader from "../components/Header/EditorHeader.jsx";

export default function IndexPage() {
  const [folders, setFolders] = useState([]);
  const [rootNotes, setRootNotes] = useState([]);

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(null);
  const [showPop, setShowPop] = useState(false);
  const navigate = useNavigate();

  const { username } = useUser();

  useEffect(() => {
    api.get('/api/folders')
    .then(res => {
      setFolders(res.data.folders);
      setRootNotes(res.data.notes);
    })
    .catch(err => {
      setIsError(true);
      setMessage(err?.response?.data?.error || "error occured" );
      setShowPop(true);
      setTimeout(() => {
        setShowPop(false);
      }, 2000);

    });
  }, []);

  const renderNotes = (notes) => (
    <ul styles={{paddingLeft: "1rem"}}>
      {notes.map(note => (
        <div className={styles.indexPageNote} onClick={() => navigate(`/read/${note._id}`)}>
          <li className={styles.indexPageNoteLi}>
            <span >{note.title}</span>
            <button className={styles.indexPageEditButton} onClick={(e) =>{
              e.stopPropagation();
             navigate(`/editor/${note._id}`)}
            } >edit</button>
          </li>
        </div>
      ))}
    </ul>
  )

  const renderFolder = (folder, depth = 0) => {
    return (
      <div key={folder._id} style={{marginLeft: depth * 20}} className={styles.indexPageFolderDiv}>
        <h2 className={styles.indexPageFolderHeading} style={{marginTop: "1rem"}} >{folder.name}</h2>
        
      {folder.notes.length > 0 ? renderNotes(folder.notes || []) : "no notes"  }

        {(folder.folders || []).map(folder => renderFolder(folder, depth+1))}
      </div>
    )
  }


  return (
    <>
      {showPop && <PopUp isError={isError} message={message} onClose={() => setShowPop(false)} />}

    <EditorHeader username={username} />

      <div className={styles.indexPage}>
        <h1 className={styles.indexPageHeading}>{username}'s notes</h1>


        <div className={styles.indexPageData}>
        {rootNotes.length > 0 && (
          <div className={styles.indexPageRootNoteDiv}>
            <h2 className={styles.indexPageRootNoteHeading}>Root Notes</h2>
            {renderNotes(rootNotes)}
          </div>
        )}

          {folders.map(folder => renderFolder(folder))}
        </div>
      </div>
    </>
  )
}
