import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tablet1 from "./tablet1Image.png";
import Image from "next/image";

const images = [tablet1, tablet1];

const Section2_Tablet = () => {
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
      <div className="tablet">
        <Slider {...settings}>
          {images.map((imageUrl, index) => (
            <Box
              key={index}
              sx={{
                height: "70vh",
                borderRadius: 1,
                background: "black",
                width: "63vw !important",
              }}
            >
              <Image
                src={imageUrl}
                alt={`Laptop Frame ${index + 1}`}
                className="tabletImage"
              />
            </Box>
          ))}
        </Slider>
      </div>
    </Box>
  );
};

export default Section2_Tablet;
