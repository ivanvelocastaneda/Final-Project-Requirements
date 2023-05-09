import React, { useState, useEffect } from "react";
import "./Productcontainer.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  getDoc,
  doc
} from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";

const Productcontainer = (product) => {
  let p = product.product;
  let overalltax = 10 / 100;

  let dollar = parseInt(p.price);
  let discountAmount = dollar * overalltax;
  const saleprice = dollar - discountAmount;
  const { successMsg, setSuccessMsg } = useState("");
  const { errorMsg, setErrorMsg } = useState("");

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
  function GetCurrentProduct() {
    const loggeduser = GetCurrentUser();
    const { type, id } = useParams();
    const { product, setProduct } = useState("");
    //const productCollectionRef = collection(db, `products-${type.toUpperCase()}`))
    useEffect(() => {
      const getProduct = async () => {
        const docRef = doc(db, `products-${type.toUpperCase()}`, id);
        const docSnap = await getDoc(docRef);
        setProduct(docSnap.data());
      };
      getProduct();
    }, []);

    return product;
  }
  GetCurrentProduct();

  const addtocart = () => {
    if (loggeduser) {
      addDoc(collection(db, `cart-${loggeduser[0].uid}`), {
        product,
        quantity: 1
      })
        .then(() => {
          setSuccessMsg("Product added to cart");
        })
        .catch((error) => {
          setErrorMsg(error.message);
        });
    } else {
      setErrorMsg("You need to login first.");
    }
  };

  return (
    <div className="product-container">
      <img src={p.productImage} />
      <div className="product-details">
        <a href={`/product/${p.producttype}/${p.id}`}>
          <button className="producttitle">{p.producttitle}</button>
        </a>
        <div className="price-container">
          <p className="dollar">
            USD:<p className="rate">${dollar}</p>
          </p>
          <p className="saleprice">
            Discount Price: <p className="rate">${saleprice}</p>
          </p>
          <p className="yousave">
            {" "}
            <p className="rate">You Save: ${discountAmount}</p>
          </p>
        </div>
        <div className="buy-cart">
          <button className="btn">Buy Now</button>
          <button className="btn" onClick={addtocart}>
            Add to Cart
          </button>
          <a href={`/product/${p.producttype}/${p.id}`}>
            <button className="showmore-btn">Show More &gt;</button>
          </a>
        </div>
      </div>
      {successMsg && (
        <>
          {""}
          <div className="success-msg">{successMsg}</div>
        </>
      )}
      {errorMsg && (
        <>
          <div className="error-msg">{errorMsg}</div>
        </>
      )}
    </div>
  );
};

export default Productcontainer;