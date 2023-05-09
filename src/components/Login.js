import React, { useState } from "react";
import NavBar from "./NavBar";
import "./Login.css";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccessMsg(
          "Logged in successfully, you will now be automatically redirected to the home page. "
        );
        setEmail("");
        setPassword("");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/home");
        }, 4000);
      })
      .catch((error) => {
        if (error.message == "Firebase: Error (auth/invalid-email.") {
          setErrorMsg("Please fill all required fields");
        }
        if (error.message == "Firebase: Error (auth/user-not-found).") {
          setErrorMsg("Email not found");
        }
        if (error.message == "Firebase: Error (auth/wrong-password).") {
          setErrorMsg("Wrong Password");
        }
      });
  };
  return (
    <div>
      <NavBar />
      <div className="login-container">
        <form className="login-form">
          <p>Login</p>

          {successMsg && (
            <>
              <div classname="success-msg"> {successMsg}</div>
            </>
          )}
          {errorMsg && (
            <>
              <div classname="error-msg"> {errorMsg}</div>
            </>
          )}
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your Email"
          />
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your Password"
          />
          <button onClick={handleLogin}>Login</button>
          <div>
            <span>Don't have an Account?</span>
            <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
