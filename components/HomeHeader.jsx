import { Link, useNavigate } from "react-router-dom";
import './HomeHeader.css'
import { useEffect, useState } from "react";

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
    <div className={`home-header ${scroll ? 'scroll' : ''}`}>
      <h1>Notes</h1>
      <nav className="nav-links">
        <button className="loginbtn" onClick={() => navigate('/login')}>Log in</button>
      </nav>
    </div>
  )
}
