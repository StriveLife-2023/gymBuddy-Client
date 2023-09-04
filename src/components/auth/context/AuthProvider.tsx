import { createContext, useEffect, useState } from "react";
import Cookie from "../Cookie";
import axios from "axios";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const u = Cookie.getCookie('username');
    const p = Cookie.getCookie('password');
    if (u && p) {
      axios.post('http://localhost:8080/auth',
        JSON.stringify({ username: u, password: p }),
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      ).then((resp) => {

        const username = u;
        const accessToken = resp?.data?.accessToken;
        const id = resp?.data?.id;
        setAuth({ username, accessToken, id })
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;