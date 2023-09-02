import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Graph1_bar from "./Graph1_bar";

const StragtegyOrdersAndVolumeBarGraph = () => {
  const [width, setWidth] = useState(globalThis?.innerWidth);

  const dummyData = {
    "Base Order": [
      50,
      80,
      20,
      30,
      10,
      35,
      162,
      80,
      20,
      30,
      10,
      35,
      162,
      80,
      20,
      30,
      10,
      35,

      162,
      80,
      20,
      30,
      10,
      35,

      162,
      80,
      20,
      30,
      10,
      35,
      35,
    ],
    "Extra Order 1": [
      30,
      80,
      20,
      30,
      10,
      35,
      162,
      80,
      20,
      30,
      10,
      35,
      162,
      80,
      20,
      30,
      10,
      35,

      162,
      80,
      20,
      30,
      10,
      35,

      162,
      80,
      20,
      30,
      10,
      35,
      35,
    ],
    "Extra Order 2": [
      70,
      80,
      20,
      30,
      10,
      35,
      162,
      80,
      20,
      30,
      10,
      35,
      162,
      80,
      20,
      30,
      10,
      35,

      162,
      80,
      20,
      30,
      10,
      35,

      162,
      80,
      20,
      30,
      10,
      35,
      35,
    ],
  };

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        background: "#262626",
        border: "1.2px solid #3F4341",
        borderRadius: "4.8px",
        height: width < 388 ? 390 : 360,
        minWidth: "100%",
      }}
    >
      <Box
        sx={{
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 22,
            fontWeight: 600,
            pt: 2,
          }}
        >
          VOLUME AND ORDERS BY TRADE
        </Typography>
      </Box>
      <Box>
        <Graph1_bar data={dummyData} />
      </Box>
    </Box>
  );
};

export default StragtegyOrdersAndVolumeBarGraph;
