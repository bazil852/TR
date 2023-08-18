import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Graph2 from "./Graph2";

const StrategyPLLineGraph = () => {
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  const dataArray = [
    11,
    12,
    101,
    121,
    21,
    31,
    11,
    141,
    161,
    12,
    20,
    10,
    20,
    220,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    0,
    0,
    0,
    0,
    0,
    0,
  ];
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
        height: width < 355 ? 440 : width > 1399 ? 370 : 385,
        minWidth: "100%",
      }}
    >
      <Box px={width < 1042 && width > 999 && isDrawerOpen ? 1 : 2}>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 22,
            fontWeight: 600,
            pt: 2,
            mb: 4,
            // whiteSpace: "nowrap",
          }}
        >
          PROFIT BY TRADE CUMULATIVE $
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // pr: 2,
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
        <Graph2 dataArray={dataArray} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: width > 1399 ? -1.5 : 0.4,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 13,
            fontWeight: 400,
            color: "#8C8C8C",
          }}
        >
          Trades
        </Typography>
      </Box>
    </Box>
  );
};

export default StrategyPLLineGraph;
