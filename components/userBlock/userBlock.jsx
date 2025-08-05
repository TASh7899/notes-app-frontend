import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './userBlock.module.css';
import PopUp from '../popup/PopUp.jsx';
import api from '../../axiosConfig.js';

export default function UserBlock( ) {

  const [showPop, setShowPop] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get('/api/user/logout');
      console.log('logged out');
      navigate('/');
    } catch (err) {
      setMessage(err?.response?.data?.error);
      setIsError(true);
      setShowPop(true);
      setTimeout(() => {
        setShowPop((false))
      }, 2000);
    }
  }



  return ( 
  <>
    {showPop && <PopUp message={message} isError={isError} onClose={() => setShowPop(false)} />}

  <div className={styles.userBlock}>
    <button className={styles.userBlockLogoutBtn} onClick={() => handleLogout()} >logout</button>
  </div>

  </>
  )
}

