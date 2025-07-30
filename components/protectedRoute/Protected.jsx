import { Navigate, Outlet } from 'react-router-dom';
import api from '../../axiosConfig.js';
import { useState, useEffect } from 'react';

import PopUp from '../popup/PopUp.jsx';

export default function Protected() {
  const [isAuth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/user/check-session')
      .then(res => {
        if (res.data.loggedIn === true) {
          setAuth(true);
          setLoading(false);
        }
      })
      .catch(() => {
        setAuth(false);
        setLoading(false);
      })
  }, []);

  if (loading) return <p>Loading...</p>;
  if (isAuth === false) return <Navigate to="/login" state={{fromProtected: true, message: "Unauthorized" }} replace/>;

  return (
    <>
      <Outlet />
    </>
  )

}
