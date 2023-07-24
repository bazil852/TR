import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import BotsLibraryProgressGraph from "./BotsLibraryProgressGraph";

const BotsLibraryGraphOne = () => {
  const [activeTypeButton, setTypectiveButton] = useState("$");
  const [valueType, setValueType] = useState("$");
  const [width, setWidth] = useState(globalThis?.innerWidth);

  const progressData = [
    { title: "Bitcoin Bot 1 hour", value: 2435 },
    { title: "ATOM Bot", value: 1325 },
    { title: "TRON Bot", value: 735 },
    { title: "Solana Bot", value: 580 },
    { title: "AVAX Bot", value: 428 },
    { title: "Stellar Bot", value: 208 },
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
            pr: 1,
          }}
        >
          BOTS PERFORMANCE
        </Typography>

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
      <Box
        sx={{
          px: 3,
          mt: width > 1197 ? 4 : width < 900 ? 1 : 5,
          mx: 1,
          display: "grid",
          placeItems: "center",
          minHeight: 300,
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
        <BotsLibraryProgressGraph
          progressData={progressData}
          valueType={valueType}
        />
      </Box>
    </Box>
  );
};

export default BotsLibraryGraphOne;
