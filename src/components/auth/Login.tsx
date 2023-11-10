import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Planner from "../planner/subcomponents/Planner";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { auth, setAuth } = useContext(AuthContext);
  console.log("Login.tsx setAuth: ", setAuth);
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleSignupClick = () => {
    document.location.href = "/signup";
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    const username = inputs.username;
    const password = inputs.password;

    try {
      const resp = await axios.post(
        "http://localhost:8080/auth",
        JSON.stringify({ username, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = resp?.data?.accessToken;
      const id = resp?.data?.id;

      console.log("LOGIN BEFORE CALL::::::", auth);
      setAuth({ username, accessToken, id });
      console.log("Login successful, setting auth:", {
        username,
        accessToken,
        id,
      });

      // *** TEMPORARY AUTH DEBUGGING TECH DEBT ***
      // document.cookie = `username=${username}`;
      // document.cookie = `password=${password}`;

      //setup react router to landing
      console.log(resp.headers);
      console.log("Server response in Login.tsx:", resp.data);

      document.location.href = "/planner";
      setAuth({ username, accessToken, id });

      // Navigate to the planner page without a full reload
      navigate("/planner");
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  return (
    <div>
      <h2>Login Below</h2>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="label-text text-primary">Username: </span>
            </label>
          </div>

          <div>
            <input
              required
              type="text"
              name="username"
              value={inputs.username || ""}
              placeholder="Enter username here"
              className="input bg-secondary input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-primary">Password: </span>
            </label>
          </div>

          <div>
            <input
              required
              type="password"
              name="password"
              value={inputs.password || ""}
              placeholder="Enter password here"
              className="input bg-secondary input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <span className="label-text text-primary">Need and account? </span>
            <span
              style={{ borderRadius: "15%", padding: 2, cursor: "pointer" }}
              className="label-text text-accent bg-neutral"
              onClick={handleSignupClick}>
              Sign Up
            </span>
          </div>

          <div style={{ marginTop: 40 }}>
            <span className="label-text text-primary">
              Or sign in with Google
            </span>
          </div>

          <div style={{ marginTop: 40, marginBottom: 40 }}>
            <input
              type="submit"
              className="btn bg-neutral"
              value="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
