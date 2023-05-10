// This component displays the Navigation bar of the website 
import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./NavBar.css";
import cart from "../components/assets/cart.png";
import profilelogo from "../components/assets/profilelogo.png";
import logo from "../components/assets/logo.png";
import xbox from "../components/assets/xbox.png";
import ps from "../components/assets/ps.png";
import nintendo from "../components/assets/switch.png";
import pc from "../components/assets/pc.png";
import { auth, db } from "../config/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const NavBar = () => {
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

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  const [cartdata, setcartdata] = useState([]);
  if (loggeduser) {
    const getcartdata = async () => {
      const cartArray = [];
      const path = `cart-${loggeduser[0].uid}`;
      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            cartArray.push({ ...doc.data(), id: doc.id });
          });
          setcartdata(cartArray);
        })
        .catch("Error error error");
    };
    getcartdata();
  }
  return (
    <div>
      <div className="navbar">
        <div className="leftContainer">
          <img src={logo} />
        </div>
        <div className="rightContainer">
          {!loggeduser && (
            <nav>
              <Link to="/">
                <button>Home</button>
              </Link>

              <Link to="/signup">
                <button>Sign up</button>
              </Link>

              <Link to="/login">
                <button>Login</button>
              </Link>
              <div className="cart-btn">
                <img src={cart} alt="no img" />
                <span className="cart-icon-css">0</span>
              </div>
              <Link to="/profile">
                <img src={profilelogo} className="profile-icon" />
              </Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </nav>
          )}
          {loggeduser && (
            <nav>
              <Link to="/">
                <button>Home</button>
              </Link>
              <Link to="/sellproduct">
                <button>Sell</button>
              </Link>
              <div className="cart-btn">
                <Link to="/cartdata">
                  <img src={cart} alt="no img" />
                </Link>
                <button className="cart-icon-css">{cartdata.length}</button>
              </div>
              <Link to="/profile">
                <img src={profilelogo} className="profile-icon" />
              </Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </nav>
          )}
        </div>
      </div>
      <div className="product-types">
        <a href="/product-type/xbox">
          <button>
            <img src={xbox} />
          </button>
        </a>
        <a href="/product-type/playstation">
          <button>
            <img src={ps} />
          </button>
        </a>
        <a href="/product-type/switch">
          <button>
            <img src={nintendo} />
          </button>
        </a>
        <a href="/product-type/pc">
          <button>
            <img src={pc} />
          </button>
        </a>
      </div>
    </div>
  );
};

export default NavBar;
