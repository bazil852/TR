import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import BarGraph from "./BarGraph";
import { useEffect } from "react";
import { useState } from "react";

const PortfolioByExchange = ({ coins, balanceHistory }) => {
  console.log("PORTFOLIO HISTORY", coins, balanceHistory);
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const [activeButton, setActiveButton] = useState("Year");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Box mt={"20px"}>
      <Card
        sx={{
          background: "#262626",
          minWidth: "100%",
          minHeight: 400,
          border: "1.2px solid #3F4341",
          borderRadius: "4.8px",
          position: "relative",
        }}
      >
        <Button
          sx={{
            position: "absolute",
            right: 10,
            top: 8,
            borderRadius: "50%",
            background: "#3B3B3B",
            border: "1px solid #5C5A66",
            height: 17,
            minWidth: 9,
            fontWeight: 600,
            color: "#AFAFAF",
            fontSize: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "none",
          }}
        >
          i
        </Button>
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
              fontWeight: 600,
              fontSize: 22,
              pt: 3,
              pl: 2,
            }}
          >
            PORTFOLIO HISTORY
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: -3,
              float: "right",
              mr: width < 600 ? -2 : 4,
            }}
          >
            <Button
              sx={{
                border: "none",
                outline: "none",
                fontSize: 13.1,
                color: "#B3B4B9",
                background: activeButton === "Day" ? "#444" : "#2A2A2C",
                borderRadius: 1,
                cursor: "pointer",
                p: 0.2,
                minWidth: 40,
                textTransform: "none",
              }}
              onClick={() => handleButtonClick("Day")}
            >
              Day
            </Button>
            <Button
              sx={{
                border: "none",
                outline: "none",
                fontSize: 13.1,
                color: "#B3B4B9",
                background: activeButton === "Year" ? "#444" : "#2A2A2C",
                borderRadius: 1,
                cursor: "pointer",
                p: 0.2,
                minWidth: 40,
                textTransform: "none",
              }}
              onClick={() => handleButtonClick("Year")}
            >
              Year
            </Button>
          </Box>
        </Box>
        <CardContent>
          <Grid container alignItems={"center"} spacing={2}>
            <Grid
              item
              sx={{
                width: width < 960 ? "100%" : "65%",
                display: width < 960 ? "block" : "flex",
                overflowX: "auto",
                pr: 1,
              }}
            >
              <BarGraph balanceHistory={balanceHistory} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {coins.length === 0 ? (
                  <Box sx={{ my: "auto" }}>
                    <Typography
                      sx={{
                        fontFamily: "Barlow, san-serif",
                        color: "#B3B4B9",
                        fontSize: 16,
                      }}
                    >
                      Wallet Balance is Empty!
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      {coins.map((coin, index) => {
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                borderRadius: "50%",
                                background: "#313432",
                                px: 1,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: "Barlow, san-serif",
                                  color: "#B3B4B9",
                                  fontSize: 16,
                                  textAlign: "center",
                                }}
                              >
                                {index + 1}
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                fontFamily: "Barlow, san-serif",
                                color: "#B3B4B9",
                                fontSize: 16,
                              }}
                            >
                              {coin.exchange_type}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                      }}
                    >
                      {coins.map((coin, index) => {
                        return (
                          <Box
                            key={index}
                            sx={{
                              px: 1,
                              borderRadius: 9,
                              background:
                                coin.profitOrLoss < 0 ? "#462E2D" : "#243A32",
                            }}
                          >
                            <Typography
                              sx={{
                                color:
                                  coin.profitOrLoss < 0 ? "#D05451" : "#27966A",
                                textAlign: "center",
                                fontSize: 12,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {coin.profitOrLoss < 0 ? "" : "+"}{" "}
                              {coin.profitOrLoss}%
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PortfolioByExchange;
