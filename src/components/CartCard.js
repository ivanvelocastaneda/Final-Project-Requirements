// This component is not implemented completely and there might be some issues with it
// It would've displayed the user's cart information and allowed them to add or delete quantities of the games they added to the cart
import React, { useState, useEffect } from "react";
import "./CartCard.css";
import { doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
const CartCard = (props) => {
  let p = props.itemdata.product.price;
  let overalltax = 10 / 100;
  const [prodquantity, setProdQuantity] = useState(props.itemdata.quantity);

  let dollar = parseInt(p);
  let discountAmount = dollar * overalltax;
  const saleprice = (dollar - discountAmount) * prodquantity;

  const increasequantity = async () => {
    setProdQuantity(prodquantity + 1);

    const itemref = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`);
    await updateDoc(itemref, {
      quantity: prodquantity + 1
    }).then(() => {
      console.log("changed quantity");
    });
  };
  const decreasequantity = async () => {
    if (prodquantity >= 1) {
      setProdQuantity(prodquantity - 1);

      const itemref = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`);
      await updateDoc(itemref, {
        quantity: prodquantity - 1
      }).then(() => {
        console.log("changed quantity");
      });
    }
  };

  const deletecartitem = async () => {
    await deleteDoc(
      doc(db, `cart${props.userid}`, `${props.itemdata.id}`)
    ).then(() => {
      console.log("doc deleted");
    });
  };

  return (
    <div className="cart-prod-container">
      {" "}
      <div className="cart-prod-imgtitle">
        <div className="prod-image">
          <img src={props.itemdata.product.productImage} />
        </div>
        <div className="prod-title">{props.itemdata.product.producttitle}</div>
      </div>
      <div className="prodquantity-div">
        <button onClick={increasequantity}>+</button>
        <p>{prodquantity}</p>
        <button onClick={decreasequantity}>-</button>
      </div>
      <div className="prodprice">${saleprice}</div>
      <button className="deletebtn" onClick={deletecartitem}>
        Delete
      </button>
    </div>
  );
};
export default CartCard;
