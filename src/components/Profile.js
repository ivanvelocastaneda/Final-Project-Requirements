import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { auth, db } from "../config/firebaseConfig";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc
} from "firebase/firestore";
import "./Profile.css";

const Profile = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const userCollectionRef = collection(db, "users");
    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            //console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const loggeduser = GetCurrentUser();
  if (loggeduser) {
    console.log(loggeduser[0].email);
  }
  return (
    <div>
      <NavBar />
      <div className="user-profile-outercontainer">
        {loggeduser ? (
          <div className="user-profile">
            <p>Account Details</p>

            <div className="data-row">
              <span>Name</span>
              <span>{loggeduser[0].username}</span>
            </div>
            <div className="data-row">
              <span>Email</span>
              <span>{loggeduser[0].email}</span>
            </div>
            <div className="data-row">
              <span>Phone Number</span>
              <span>{loggeduser[0].phonenumber}</span>
            </div>
            <div className="data-row">
              <span>Address</span>
              <span>{loggeduser[0].address}</span>
            </div>
          </div>
        ) : (
          <div>You are Not Logged In</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
