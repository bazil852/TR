import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import BotsLibraryProgressGraph from "./BotsLibraryProgressGraph";

const BotsLibraryGraphOne = () => {
  const [activeButton, setActiveButton] = useState("All");
  const [activeTypeButton, setTypectiveButton] = useState("$");
  const [width, setWidth] = useState(globalThis?.innerWidth);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  const handleTypeClick = (button) => {
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
        height: width > 1197 ? 565 : 635,
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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              pt: 2,
            }}
          >
            <Button
              sx={{
                border: "none",
                outline: "none",
                fontSize: 13.1,
                color: "#B3B4B9",
                background: activeButton === "All" ? "#444" : "#2A2C2D",
                borderRadius: 1,
                cursor: "pointer",
                p: 0.2,
                minWidth: 40,
              }}
              onClick={() => handleButtonClick("All")}
            >
              All
            </Button>
            <Button
              sx={{
                border: "none",
                outline: "none",
                fontSize: 13.1,
                color: "#B3B4B9",
                background: activeButton === "1M" ? "#444" : "#2A2C2D",
                borderRadius: 1,
                cursor: "pointer",
                p: 0.2,
                minWidth: 40,
              }}
              onClick={() => handleButtonClick("1M")}
            >
              1M
            </Button>
            <Button
              sx={{
                border: "none",
                outline: "none",
                fontSize: 13.1,
                color: "#B3B4B9",
                background: activeButton === "6M" ? "#444" : "#2A2C2D",
                borderRadius: 1,
                cursor: "pointer",
                p: 0.2,
                minWidth: 40,
              }}
              onClick={() => handleButtonClick("6M")}
            >
              6M
            </Button>
            <Button
              sx={{
                border: "none",
                outline: "none",
                fontSize: 13.1,
                color: "#B3B4B9",
                background: activeButton === "1Y" ? "#444" : "#2A2C2D",
                borderRadius: 1,
                cursor: "pointer",
                p: 0.2,
                minWidth: 40,
              }}
              onClick={() => handleButtonClick("1Y")}
            >
              1Y
            </Button>
          </Box>
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
          px: 3,
          mt: width > 1197 ? 4 : 7,
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
        <BotsLibraryProgressGraph />
      </Box>
    </Box>
  );
};

export default BotsLibraryGraphOne;
