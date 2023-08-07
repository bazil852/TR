import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import BotsLibraryBarGraph from "./BotsLibraryBarGraph";
import { useSelector } from "react-redux";

const BotsLibraryGraphTwo = () => {
  const [activeButton, setActiveButton] = useState("Months");
  const [activeTypeButton, setTypectiveButton] = useState("$");
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const [valueType, setValueType] = useState("$");
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

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
          px: width > 1449 ? 1 : 3,
          mt: width < 900 ? 2 : width > 1220 ? 0 : 3,
          mx: 1,
          overflowX: "auto",
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
        <BotsLibraryBarGraph dataArray={dataArray} valueType={valueType} />
      </Box>
    </Box>
  );
};

export default BotsLibraryGraphTwo;
