import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import section3Image from "./section3Image.png";
import Image from "next/image";

const images = [section3Image, section3Image];

const Section3_Tablet = () => {
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
    <Box sx={{ width: "100%", overflow: "hidden", ml: "auto" }}>
      <div className="tablet2">
        <Slider {...settings}>
          {images.map((imageUrl, index) => (
            <Box
              key={index}
              sx={{
                height: "81vh",
                borderRadius: 1,
                background: "black",
                width: "63vw !important",
              }}
            >
              <Image
                src={imageUrl}
                alt={`Laptop Frame ${index + 1}`}
                className="tablet2Image"
              />
            </Box>
          ))}
        </Slider>
      </div>
    </Box>
  );
};

export default Section3_Tablet;
