import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import laptop1 from "./laptop1.png";
import Image from "next/image";

const images = [laptop1, laptop1];

const Section1_Laptop = () => {
  const settings = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <Box sx={{ width: "80%", overflow: "hidden", ml: "auto" }}>
      <div className="laptop">
        <Slider {...settings}>
          {images.map((imageUrl, index) => (
            <Box
              key={index}
              sx={{ background: "#131313", height: "54.2vh", borderRadius: 1 }}
            >
              <Image
                src={imageUrl}
                alt={`Laptop Frame ${index + 1}`}
                className="laptopImage"
              />
            </Box>
          ))}
        </Slider>
      </div>
    </Box>
  );
};

export default Section1_Laptop;
