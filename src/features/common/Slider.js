import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { selectAllProducts } from "../product/productSlice";
import { useSelector } from "react-redux";

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const products = useSelector(selectAllProducts);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliders.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? sliders.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    // Fetch slider data when the component mounts
    fetchSliderData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds (adjust as needed)

    return () => clearInterval(intervalId);
  }, [currentImageIndex, sliders]);

  const fetchSliderData = async () => {
    try {
      const response = await fetch("http://localhost:8080/slider");
      const data = await response.json();
      setSliders(data);
      console.log("Slider data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching slider data:", error);
    }
  };

  const startInterval = () => {
    const newIntervalId = setInterval(() => {
      nextSlide();
    }, 3000);
    setIntervalId(newIntervalId);
  };

  return (
    <div className="slider-container">
      {products.length > 0 &&
        products.map((slider, index) => (
          <Link to={`/product-detail/${slider.id}`} key={slider.id}>
            <img
              key={index}
              className={`slider-wrap slider-image cursor-pointer ${
                index === currentImageIndex ? "visible_item" : "hidden_item"
              }`}
              src={slider.thumbnail}
              alt={slider.title}
            />
          </Link>
        ))}

      <button onClick={prevSlide}>Previous</button>
      <button onClick={nextSlide}>Next</button>
    </div>
  );
};

export default Slider;
