import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Planner from "../planner/subcomponents/Planner";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const [inputs, setInputs] = useState({});

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
      setAuth({ username, accessToken, id });
      //setup react router to landing
      console.log(resp.headers);
      console.log(resp.data);
      setAuth({ username, password, accessToken, id });
      document.location.href = "/planner";
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
