import React, { useState, useEffect } from "react";
import Productcontainer from "./Productcontainer";
import "./Allproductpage.css";
import NavBar from "../NavBar";

import { collection, query, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
const Allproductpage = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = () => {
      const productArray = [];
      const path = `products-${props.type.toUpperCase()}`;
      console.log(props);
      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            productArray.push({ ...doc.data(), id: doc.id });
          });
          setProducts(productArray);
        })
        .catch("Error error error");
    };
    getProducts();
  }, []);
  return (
    <div className="allproductpage">
      <NavBar />
      <div className="heading">
        <p> Top Results for {props.type}</p>
      </div>
      <div className="allproductcontainer">
        {products.map((product) => (
          <Productcontainer key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Allproductpage;
