// This component allows the user to add a product to the website 
import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./AddProduct.css";
import { storage, auth, db } from "../config/firebaseConfig";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [producttitle, setProductTitle] = useState("");
  const [producttype, setProductType] = useState("");
  //const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

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
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImg = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setProductImage(selectedFile);
        setImageError("");
      } else {
        setProductImage(null);
        setImageError("Please select a valid image file type(png or job)");
      }
    } else {
      setImageError("please select your file");
    }
  };
  const loggeduser = GetCurrentUser();
  //   if (loggeduser) {
  //     console.log(loggeduser[0].password);
  //   }
  const handleAddProduct = (e) => {
    e.preventDefault();
    const storageRef = ref(
      storage,
      `product-images${producttype.toUpperCase()}/${Date.now()}`
    );
    //console.log(storageRef._location.path);
    uploadBytes(storageRef, productImage).then(() => {
      getDownloadURL(storageRef).then((url) => {
        addDoc(collection(db, `products-${producttype.toUpperCase()}`), {
          producttitle,
          producttype,
          description,
          price,
          productImage: url
        });
      });
    });
  };
  return (
    <div>
      <NavBar />
      // This would have to be changed to the user's email in order add items to the website
      // Otherwise, they cannot interact with this feature
      {loggeduser && loggeduser[0].email == "alinvelo@gmail.com" ? (
        <div className="addprod-container">
          <form className="addprod-form" onSubmit={handleAddProduct}>
            <p>Add Game</p>
            {successMsg && <div className="success-msg">{successMsg}</div>}
            {uploadError && <div className="error-msg">{uploadError}</div>}
            <label>Game Title</label>
            <input
              onChange={(e) => setProductTitle(e.target.value)}
              type="text"
              placeholder="Game Title"
            />
            <label>Game Type</label>
            <input
              onChange={(e) => setProductType(e.target.value)}
              type="text"
              placeholder="Game Type"
            />
            {/* <label>Platform</label>
            <input
              onChange={(e) => setBrand(e.target.value)}
              type="text"
              placeholder="Game Platform"
            /> */}
            <label>Image</label>
            <input onChange={handleProductImg} type="file" />
            {imageError && (
              <>
                {" "}
                <div className="error-msg">{imageError}</div>
              </>
            )}
            <label>Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your Game"
            ></textarea>
            <label>Price Without Tax</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              placeholder="Enter price without tax"
            />
            <button type="submit">Add</button>
          </form>
        </div>
      ) : (
        <div>You do not have access to add products</div>
      )}
    </div>
  );
};

export default AddProduct;
