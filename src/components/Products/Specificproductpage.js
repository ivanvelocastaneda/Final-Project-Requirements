// This component is not implemented completely and does not function propertly
// It is displayed when the user would've clicked on the show more option in the product container component, it would've
// redirected the user to a different page and would've displayed more information about a certain game 
// In addition to displaying the game's image and price, it would've also displayed a description of the game and allow the user to add
// am item to the cart
// It would've also displayed a cash on delivery option, a 1 year warranty, a 10 day replacement
// It would've displayed similar items as well 
import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
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
import "./Specificproductpage.css";
import ProductSlider from "./ProductSlider";
import cash from "../../components/assets/cash.jpeg";
import warranty from "../../components/assets/warranty.jpeg";
import replacement from "../../components/assets/replacement.jpeg";

const Specificproductpage = () => {
  const { type, id } = useParams();
  const { product, setProduct } = useState("");
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

  // let overalltax = 10 / 100;

  // let dollar = parseInt(p.price);
  // let discountAmount = dollar * overalltax;
  // const saleprice = dollar - discountAmount;

  return (
    <div>
      <NavBar />
      {product ? (
        <div className="myprod-container">
          <div className="prod-img-cont">
            <img src={product.productImage} />
          </div>
          <div className="prod-data">
            <p className="prod-head">{product.producttitle}</p>
            <p className="prod-description">{product.description}</p>

            <div className="specific-price-container">
              {/* <p className="dollar">
                USD: <p className="rate"> ${dollar}</p>
              </p> */}
              {/* <p className="saleprice">
                Discounted Price: <p className="rate"> ${saleprice}</p>
              </p>
              <p className="yousave">
                You Save: <p className="rate"> ${dollar - saleprice}</p>
              </p> */}
            </div>

            <p className="prod-details-head">Details</p>
            <p className="prod-description">{product.description}</p>
          </div>

          <div className="row-cont">
            <div className="warranty-replacement">
              <div className="cod">
                <div className="img-circle">
                  <div className="img-circle">
                    <img src={cash} />
                  </div>
                  <p>Cash on Delivery</p>
                </div>
              </div>

              <div className="warranty">
                <div className="img-circle">
                  <img src={warranty} />
                </div>
                {/* <p>{product.warranty} year warranty</p> */}
                <p> 1 Year Warranty</p>
              </div>

              <div className="replacement">
                <div className="img-circle">
                  <img src={replacement} />
                </div>
                {/* <p>{product.warranty} year warranty</p> */}
                <p> 10 Days Replacement</p>
              </div>
            </div>
            <div className="buy-cart">
              <button className="btn">Buy Now</button>
              <button className="btn" onClick={addtocart}>
                Add to Cart
              </button>
            </div>
          </div>
          {successMsg && (
            <>
              {" "}
              <div className="success-msg">{successMsg}</div>
            </>
          )}
          {errorMsg && (
            <>
              <div className="error-msg">{errorMsg}</div>
            </>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <p className="prod-details-head2">Similar Items</p>
      <ProductSlider type={type}></ProductSlider>
    </div>
  );
};

export default Specificproductpage;
