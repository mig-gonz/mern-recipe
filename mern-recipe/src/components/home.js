import "../assets/Home.css";
import Carousel from "react-bootstrap/Carousel";
import cookies from "../assets/food-photographer-jennifer-pallian-OfdDiqx8Cz8-unsplash.jpg";
import pizza from "../assets/pizza.jpeg";
import cake from "../assets/cake.jpeg";
export default function Home() {
  return (
    <div className="wrap">
      <Carousel style={{ width: "700px", margin: "auto" }}>
        <Carousel.Item>
          <img
            className="d-block w-100 homeImages"
            src={cookies}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="font-light" style={{ color: "#FFFFFF" }}>
              CookieCraze
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 homeImages"
            src={pizza}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3 className="font-light" style={{ color: "#FFFFFF" }}>
              PizzaPerfection
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 homeImages"
            src={cake}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3 className="font-light">BakeMeHappy</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
