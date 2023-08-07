import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import BotsLibraryProgressGraph from "./BotsLibraryProgressGraph";
import { useSelector } from "react-redux";

const BotsLibraryGraphOne = () => {
  const [activeTypeButton, setTypectiveButton] = useState("$");
  const [valueType, setValueType] = useState("$");
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  const progressData = [
    { title: "Bitcoin Bot 1 hour", value: 2435 },
    // { title: "ATOM Bot", value: 1325 },
    // { title: "TRON Bot", value: 735 },
    // { title: "Solana Bot", value: 580 },
    // { title: "AVAX Bot", value: 428 },
    // { title: "Stellar Bot", value: 208 },
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
        height:
          width > 1130 && width < 1201 && !isDrawerOpen
            ? 523
            : width < 900
            ? "100%"
            : width < 1131 && width > 1099 && !isDrawerOpen
            ? 585
            : width < 1100 && width > 1040 && !isDrawerOpen
            ? 589
            : width < 1041 && width > 1036 && !isDrawerOpen
            ? 580
            : width < 1037 && width > 899 && !isDrawerOpen
            ? 465
            : width > 1200 && width < 1221 && !isDrawerOpen
            ? 475
            : width > 1220 && !isDrawerOpen
            ? 427
            : width < 1037 && width > 999 && isDrawerOpen
            ? 500
            : width > 1036 && width < 1390 && isDrawerOpen
            ? 435
            : width > 1389 && isDrawerOpen && width < 1450
            ? 475
            : width > 1449 && width < 1480 && isDrawerOpen
            ? 520
            : width > 1479 && width < 1538 && isDrawerOpen
            ? 460
            : width > 1537 && isDrawerOpen
            ? 427
            : width < 1000 && width > 899 && isDrawerOpen
            ? 465
            : 600,
        minWidth: "100%",
      }}
    >
      <Box>
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
      </Box>
      <Box
        sx={{
          px: width > 1449 ? 0 : 1,
          pl: width > 1449 ? 1 : width > 1000 ? 2 : width < 500 ? 1 : 0,
          mx: width > 1449 ? 0 : 1,
          mt:
            width < 900
              ? 1
              : width > 1220 && width < 1296
              ? 2
              : width > 1295
              ? 5
              : 5,
          display: "grid",
          placeItems: "center",
          overflowX: width > 1449 ? "hidden" : "auto",
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
        <BotsLibraryProgressGraph
          progressData={progressData}
          valueType={valueType}
        />
      </Box>
    </Box>
  );
};

export default BotsLibraryGraphOne;
