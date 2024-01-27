import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

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
     
    } catch (error) {
     
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
      {sliders.length > 0 &&
        sliders.map((slider, index) => (
          <Link to={`/slider-detail/${slider.id}`} key={slider.id}>
            <img
              key={index}
              className={`slider-wrap slider-image cursor-pointer ${
                index === currentImageIndex ? "visible_item" : "hidden_item"
              }`}
              src={slider.imageUrl}
              alt="slider"
            />
          </Link>

          // <Link to={`/product-detail/${product.id}`} key={product.id}>
          //     <img
          //       src={product.thumbnail}
          //       alt={product.title}
          //       className="h-80 w-72 object-cover border border-1"
          //     />
          //   </Link>
        ))}

      <button onClick={prevSlide}>Previous</button>
      <button onClick={nextSlide}>Next</button>
    </div>
  );
};

export default Slider;
