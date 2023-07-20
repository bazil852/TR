import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import BotsLibraryLineGraph from "./BotsLibraryLineGraph";
import { useEffect } from "react";
import { useState } from "react";

const BotsLibraryGraphThree = () => {
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const [activeButton, setActiveButton] = useState("ALL");

  const balanceHistory = [
    10,
    40,
    80,
    120,
    150,
    190,
    200,
    230,
    250,
    290,
    300,
    320,
  ];

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Card
      sx={{
        background: "#131313",
        minWidth: "100%",
        minHeight: 400,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: width < 600 && "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 20,
            fontWeight: 600,
            pt: 2,
            pl: 3,
          }}
        >
          BOTS PERFORMANCE ACCUMULATED
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: -2.5,
            float: "right",
            pr: width < 600 ? 0 : 3,
          }}
        >
          <Button
            sx={{
              border: "none",
              outline: "none",
              fontSize: 13.1,
              color: "#B3B4B9",
              background: activeButton === "ALL" ? "#444" : "#2A2A2C",
              borderRadius: 1,
              cursor: "pointer",
              p: 0.2,
              minWidth: 40,
            }}
            onClick={() => handleButtonClick("ALL")}
          >
            ALL
          </Button>
          <Button
            sx={{
              border: "none",
              outline: "none",
              fontSize: 13.1,
              color: "#B3B4B9",
              background: activeButton === "1Y" ? "#444" : "#2A2A2C",
              borderRadius: 1,
              cursor: "pointer",
              p: 0.2,
              minWidth: 40,
            }}
            onClick={() => handleButtonClick("1Y")}
          >
            1Y
          </Button>
          <Button
            sx={{
              border: "none",
              outline: "none",
              fontSize: 13.1,
              color: "#B3B4B9",
              background: activeButton === "2Y" ? "#444" : "#2A2A2C",
              borderRadius: 1,
              cursor: "pointer",
              p: 0.2,
              minWidth: 40,
            }}
            onClick={() => handleButtonClick("2Y")}
          >
            2Y
          </Button>
          <Button
            sx={{
              border: "none",
              outline: "none",
              fontSize: 13.1,
              color: "#B3B4B9",
              background: activeButton === "3Y" ? "#444" : "#2A2A2C",
              borderRadius: 1,
              cursor: "pointer",
              p: 0.2,
              minWidth: 40,
            }}
            onClick={() => handleButtonClick("3Y")}
          >
            3Y
          </Button>
        </Box>
      </Box>
      <CardContent>
        <Grid container alignItems={"center"} spacing={2}>
          <Grid
            item
            sx={{
              ml: 2,
              width: width < 960 ? "100%" : "95%",
              display: width < 960 ? "block" : "flex",
              overflowX: "auto",
            }}
          >
            <BotsLibraryLineGraph balanceHistory={balanceHistory} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BotsLibraryGraphThree;
