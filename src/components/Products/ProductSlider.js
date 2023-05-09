import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Sliderproductcard from "./Sliderproductcard";
import { collection, query, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

const ProductSlider = (props) => {
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

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  return (
    <div>
      <Carousel responsive={responsive}>
        {products.map((product) => (
          <Sliderproductcard key={product.id} product={product} />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductSlider;
