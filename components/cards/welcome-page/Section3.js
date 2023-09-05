import { Box, Typography } from "@mui/material";
import React from "react";
import Section3_Tablet from "./Section3_Tablet";
import { useInView } from "react-intersection-observer";

const Section3 = () => {
  const [refSection3, inViewSection3] = useInView({
    triggerOnce: true,
    threshold: 1,
  });
  return (
    <Box mb={5}>
      <Typography
        sx={{
          fontFamily: "Barlow, san-serif",
          fontSize: 55,
          fontWeight: 800,
          color: "white",
          display: "inline-block",
          lineHeight: 1.3,
          ml: 4,
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
          Step 2
        </i>
        Backtest and optimize it
      </Typography>
      <div ref={refSection3}>
        {inViewSection3 && (
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
                width: "70%",
                display: "flex",
                position: "relative",
                mt: 5,
              }}
              className="slide-left "
            >
              <Section3_Tablet />
            </Box>
            <Box
              sx={{
                width: "30%",
                display: "flex",
                flexDirection: "column",
                ml: 4,
                gap: 5,
                mt: 10,
              }}
              className="slide-right"
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
                  Backtest
                </i>
                and Optimize
              </Typography>
            </Box>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default Section3;
