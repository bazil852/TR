import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import BotsLibraryBarGraph from "./BotsLibraryBarGraph";

const BotsLibraryGraphTwo = () => {
  const [activeButton, setActiveButton] = useState("Months");
  const [activeTypeButton, setTypectiveButton] = useState("$");
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const [valueType, setValueType] = useState("$");

  const dataArray = [12331, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
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
        background: "#131313",
        height: width > 1197 ? 565 : width < 900 ? "100%" : 635,
        minWidth: "100%",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 20,
            fontWeight: 600,
            pt: 2,
          }}
        >
          BOTS PERFORMANCE
        </Typography>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              pt: 1,
            }}
          >
            <Button
              sx={{
                border: "none",
                outline: "none",
                fontSize: 13.1,
                color: "#B3B4B9",
                background: activeButton === "Months" ? "#444" : "#2A2C2D",
                borderRadius: 1,
                cursor: "pointer",
                textTransform: "none",
                p: 0.2,
                minWidth: 65,
              }}
              onClick={() => handleButtonClick("Months")}
            >
              Months
            </Button>
            <Button
              sx={{
                border: "none",
                outline: "none",
                fontSize: 13.1,
                color: "#B3B4B9",
                background: activeButton === "Days" ? "#444" : "#2A2C2D",
                borderRadius: 1,
                cursor: "pointer",
                textTransform: "none",
                p: 0.2,
                minWidth: 55,
              }}
              onClick={() => handleButtonClick("Days")}
            >
              Days
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          px: 3,
          mt: width > 1197 ? 5 : width < 900 ? 2 : 5,
          mx: 1,
          overflowX: "auto",
          " ::-webkit-scrollbar": {
            height: 5,
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
        <BotsLibraryBarGraph dataArray={dataArray} valueType={valueType} />
      </Box>
    </Box>
  );
};

export default BotsLibraryGraphTwo;
