import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Graph1 from "./Graph1";

const StrategyPLBarGraph = () => {
  const [activeTypeButton, setTypectiveButton] = useState("$");
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const [valueType, setValueType] = useState("$");
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
    40,
    60,
    78,
    90,
    80,
    70,
    20,
    50,
    40,
    40,
    60,
    70,
    50,
    0,
    0,
    0,
    0,
    0,
  ];

  const handleTypeClick = (button) => {
    setValueType(button);
    setTypectiveButton(button);
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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: 22,
              fontWeight: 600,
              pt: 2,
            }}
          >
            PROFIT BY TRADE $
          </Typography>
          <Typography
            sx={{
              fontSize: "0.9rem",
              mb: 1,
              fontFamily: "Barlow, san-serif",
              color: "#ACB2B7",
            }}
          >
            Portfolio distribution
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", ml: "auto" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              pt: 2,
              ml: "auto",
            }}
          >
            <Button
              sx={{
                border: "none",
                outline: "none",
                fontSize: 15,
                color: "#B3B4B9",
                background: activeTypeButton === "$" ? "#444" : "#2A2C2D",
                borderRadius: 1,
                cursor: "pointer",
                p: 0,
                minWidth: 40,
              }}
              onClick={() => handleTypeClick("$")}
            >
              $
            </Button>
            <Button
              sx={{
                border: "none",
                outline: "none",
                fontSize: 15,
                color: "#B3B4B9",
                background: activeTypeButton === "%" ? "#444" : "#2A2C2D",
                borderRadius: 1,
                cursor: "pointer",
                p: 0,
                minWidth: 40,
              }}
              onClick={() => handleTypeClick("%")}
            >
              %
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "auto",
          width: "100%",
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
        <Graph1 dataArray={dataArray} valueType={valueType} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: -1.5,
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

export default StrategyPLBarGraph;