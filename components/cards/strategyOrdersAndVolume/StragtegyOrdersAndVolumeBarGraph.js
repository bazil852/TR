import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Graph1_bar from "./Graph1_bar";

const StragtegyOrdersAndVolumeBarGraph = () => {
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  const dummyData = {
    "Base Order": [
      50,
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

      162,
      80,
      20,
      30,
      10,
      35,
    ],
    "Extra Order 1": [30, 192, 88, 98, 54, 56, 78],
    "Extra Order 2": [70, 232, 72, 90, 60, 70, 35],
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
        height: 400,
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "auto",
          mt: -5,
          " ::-webkit-scrollbar": {
            height: 3,
          },
          "::-webkit-scrollbar-track": {
            background: "none",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
        }}
      >
        <Graph1_bar data={dummyData} />
      </Box>
    </Box>
  );
};

export default StragtegyOrdersAndVolumeBarGraph;
