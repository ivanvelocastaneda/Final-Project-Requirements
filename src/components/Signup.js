import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./Signup.css";
const Signup = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const initialcartvalue = 0;
        console.log(user);

        addDoc(collection(db, "users"), {
          username: username,
          email: email,
          phonenumber: phonenumber,
          password: password,
          cart: initialcartvalue,
          address: address,
          uid: user.uid
        })
          .then(() => {
            setSuccessMsg(
              "New user addedd successfully, You will now be automatically redirected to login page. "
            );
            setUserName("");
            setPhoneNumber("");
            setEmail("");
            setPassword("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              navigate("/login");
            }, 4000);
          })
          .catch((error) => {
            setErrorMsg(error.message);
          });
      })
      .catch((error) => {
        if (error.message == "Firebase: Error (auth/invalid-email.") {
          setErrorMsg("Please fill all required fields");
        }
        if (error.message == "Firebase: Error (auth/email-already-in-use).") {
          setErrorMsg("User already exists");
        }
      });
  };
  //};
  return (
    <div>
      <NavBar />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <p>Create an Account</p>

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
          <label>Your Name</label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="First and Last Name"
          />
          <label>Phone Number</label>
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="tel"
            placeholder="Phone Number"
          />
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
          <label>Address</label>
          <textarea
            onChange={(e) => setAddress(e.target.value)}
            type="Enter your Adress"
          ></textarea>
          <button type="submit">Sign up</button>
          <div>
            <span>Already have an Account?</span>
            <Link to="login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
