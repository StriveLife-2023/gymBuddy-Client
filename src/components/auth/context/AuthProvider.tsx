import { createContext, useEffect, useState } from "react";
import Cookie from "../Cookie";
import axios from "axios";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Initialize state from localStorage if available
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : {};
  });

  useEffect(() => {
    // Persist auth state to localStorage on change
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  console.log("auth::::::", auth);

  useEffect(() => {
    // Read the new cookies
    const accessToken = Cookie.getCookie("accessToken");
    const refreshToken = Cookie.getCookie("refreshToken");

    if (accessToken && refreshToken) {
      axios
        .post(
          "http://localhost:8080/auth/verify", // This endpoint should verify the tokens
          JSON.stringify({ accessToken, refreshToken }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((resp) => {
          const { username, accessToken: newAccessToken, id } = resp?.data;
          // debug username on toolbar
          console.log("Setting auth state:", {
            username,
            accessToken: newAccessToken,
            id,
          });

          console.log("Before setting auth:", auth);
          setAuth({ username, accessToken: newAccessToken, id });
          console.log("After setting auth:", {
            username,
            accessToken: newAccessToken,
            id,
          });
        })
        .catch((err) => {
          console.log("Error during authentication:", err);
        });
    }
  }, []);

  // debug
  useEffect(() => {
    console.log("Auth state changed:", auth);
  }, [auth]);

  console.log("AuthProvider setAuth: ", setAuth);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
