import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '../styles/FullNotePage.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../axiosConfig.js';
import EditorHeader from '../components/Header/EditorHeader.jsx';
import PopUp from '../components/popup/PopUp';
import { useUser } from '../context/UseUserContext';
import { useNavigate } from 'react-router-dom';


export default function FullNotePage() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState('');

  const [showPop, setShowPop] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(null);

  const {id} = useParams();
  const {username} = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await api.get(`/api/notes/${id}`)
        setTitle(res.data.title);
        setContent(res.data.content);
        setDate(res.data.createdAt.split('T')[0]);
      } catch (err) {
        setIsError(true);
        setMessage(err?.response?.data?.error)
        setShowPop(true);
        setTimeout(() => setShowPop(false), 2000);
      }
    }

    fetchNote();
  }, [id])

  return (
    <>
    <EditorHeader username={username} />

    {showPop && <PopUp message={message} isError={isError} onClose={() => setShowPop(false)} />}

    <div className={styles.fullNotePage}>
    <div>
    <div className={styles.fullNotePageHeading}>
      <div className={styles.fullNotePageTitleDateEdit}>
      <h1>{title}</h1>

      <div className={styles.fullNotePageDateAndEditDiv}>
        <p>Date: {date}</p>
        <button className={styles.fullNotePageEditBtn} onClick={() => navigate(`/editor/${id}`)} >Edit</button>
      </div>

      </div>

    </div>
      <div className={styles.fullNotePageMarkdownBody}>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
      />
      </div>
    </div>
    </div>
  </>
  )
}

