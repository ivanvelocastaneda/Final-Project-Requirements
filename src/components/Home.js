import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Products from "./Products";
import Ads from "./Ads";
import { auth, db } from "../config/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProductSlider from "./Products/ProductSlider";
import "./Home.css";

const Home = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const usersCollectionRef = collection(db, "users");
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
  //if (loggeduser) {
  //console.log(loggeduser[0].email);
  //}
  return (
    <div>
      <NavBar />
      <Ads />
      <div className="slider-head">
        <p>All Available Games Now</p>
      </div>
      <ProductSlider type={"Xbox"} />
      <ProductSlider type={"Playstation"} />
      <ProductSlider type={"Nintendo Switch"} />
      <ProductSlider type={"PC Games"} />
    </div>
  );
};

export default Home;
