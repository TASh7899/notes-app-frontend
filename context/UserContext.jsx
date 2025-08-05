import {  useState, useEffect } from "react";
import { UserContext } from './UserContextStore.js'
import api from '../axiosConfig.js';

export function UserProvider({ children }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchuser() {
    try {
      const res = await api.get('/api/user/check-session');
      if (res.data.loggedIn && res.data.username) {
        setUsername(res.data.username);
      }
    } catch (err) {
      console.log(err?.response?.data?.error);
    }
  }
    fetchuser();

  }, [ ]);


  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}

