import { Box, Typography } from "@mui/material";
import React from "react";
import Section4_Tablet from "./Section4_Tablet";
import { useInView } from "react-intersection-observer";

const Section4 = () => {
  const [refSection4, inViewSection4] = useInView({
    triggerOnce: true,
    threshold: 1,
  });

  return (
    <Box mb={3}>
      <Typography
        sx={{
          fontFamily: "Barlow, san-serif",
          fontSize: 55,
          fontWeight: 800,
          color: "white",
          display: "inline-block",
          lineHeight: 1.3,
          mr: 4,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <i
          style={{
            fontFamily: "Barlow, san-serif",
            fontSize: 55,
            fontWeight: 800,
            backgroundImage: "linear-gradient(to right,#790F87,#794AE3)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            paddingRight: "18px",
          }}
        >
          Step 3
        </i>
        Deploy Bot and let it trade for you
      </Typography>
      <div ref={refSection4}>
        {inViewSection4 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: "100vh",
            }}
            className="sliding-boxes"
          >
            <Box
              sx={{
                width: "30%",
                display: "flex",
                flexDirection: "column",
                ml: 4,
                gap: 5,
                mt: 10,
              }}
              className="slide-left"
            >
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 65,
                  fontWeight: 800,
                  color: "white",
                  display: "inline-block",
                  lineHeight: 1.3,
                }}
              >
                <i
                  style={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 65,
                    fontWeight: 800,
                    backgroundImage:
                      "linear-gradient(to right,#790F87,#794AE3)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    paddingRight: "18px",
                  }}
                >
                  Monitor
                </i>
                your trades
              </Typography>
            </Box>
            <Box
              sx={{
                width: "70%",
                display: "flex",
                position: "relative",
                mt: 5,
              }}
              className="slide-right "
            >
              <Section4_Tablet />
            </Box>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default Section4;
