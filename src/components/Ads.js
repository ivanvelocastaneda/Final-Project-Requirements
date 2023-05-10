// This component allows the user to insert an Advertisement and display it in the home page
import React from "react";
import Carousel from "react-bootstrap/Carousel";
// npm install bootstrap
// npm install react-router bootstrap
import "bootstrap/dist/css/bootstrap.css";
import slide1 from "./assets/adsimages/xboxAd.jpg";
import slide2 from "./assets/adsimages/psAd.jpg";
import slide3 from "./assets/adsimages/nintendoAd.jpg";
import slide4 from "./assets/adsimages/callisto.jpeg";
import slide5 from "./assets/adsimages/dbz.jpeg";
import slide6 from "./assets/adsimages/fifa.jpeg";
import slide7 from "./assets/adsimages/ghost.jpeg";
import slide8 from "./assets/adsimages/gta.jpeg";
import slide9 from "./assets/adsimages/red.jpeg";
import slide10 from "./assets/adsimages/spider.jpeg";
import slide11 from "./assets/adsimages/retroAd.jpg";
const Ads = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={slide1} alt="First slide" />
          <Carousel.Caption>
            <h3>Buy Gears of War Now!</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide2} alt="Second slide" />

          <Carousel.Caption>
            <h3>Buy the Last of Us Now!</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide3} alt="Third slide" />

          <Carousel.Caption>
            <h3>Buy Mario Strikers Now!</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide4} alt="Fourth slide" />
          <Carousel.Caption>
            <h3>Buy Callisto Protocol Now!</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide5} alt="Fifth slide" />
          <Carousel.Caption>
            <h3>Buy Kakarot Now!</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide6} alt="Sixth slide" />
          <Carousel.Caption>
            <h3>Buy FIFA 23 Now!</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide7} alt="Seventh slide" />
          <Carousel.Caption>
            <h3>Buy Ghost of Tsushima Now!</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide8} alt="Eight slide" />
          <Carousel.Caption>
            <h3>Buy GTA V Now!</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide9} alt="Ninth slide" />
          <Carousel.Caption>
            <h3>Buy Read Dead Redemption 2 Now!</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide10} alt="Tenth slide" />
          <Carousel.Caption>
            <h3>Buy Spider-Man Now!</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide11} alt="Eleventh slide" />
          <Carousel.Caption>
            <h3>Retro Games Coming Soon....</h3>
            <p>Don't miss out!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Ads;
