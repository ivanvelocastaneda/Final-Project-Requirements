// This component deals with the product cards in the home page
// Just like the product container component, it displays a picture of the product and price, and allows you to add an item to the cart
import React, { useState, useEffect } from "react";
import "./Sliderproductcard.css";
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

const Sliderproductcard = (product) => {
  let p = product.product;

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

  let overalltax = 10 / 100;

  let dollar = parseInt(p.price);
  let discountAmount = dollar * overalltax;
  const saleprice = dollar - discountAmount;

  return (
    <div class="mini-product-container">
      <div className="mini-img-container">
        <img src={p.productImage} />
      </div>
      <div className="mini-product-details">
        <p className="mini-producttitle">{p.producttitle}</p>
        <div className="mini-price-container">
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
      </div>

      <div className="buy-cart">
        <button className="btn">Buy Now</button>
        <button className="btn" onClick={addtocart}>
          Add to Cart
        </button>
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

export default Sliderproductcard;
