import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './HomeHeader.module.css';

export default function Header() {

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  const navigate = useNavigate();

  return (
    <div className={`${styles['home-header']} ${scroll ? styles.scroll: ''} `}>
      <h1>Notes</h1>
      <nav className={styles['nav-links']}>
        <button className={styles['loginbtn']} onClick={() => navigate('/login')}>Log in</button>
      </nav>
    </div>
  )
}
