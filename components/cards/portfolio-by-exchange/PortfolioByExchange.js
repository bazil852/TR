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
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const [activeButton, setActiveButton] = useState("ALL");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: "Barlow, san-serif",
          fontWeight: 600,
          fontSize: 24,
          py: 2,
        }}
      >
        Portfolio Summary
      </Typography>
      <Card sx={{ background: "#242424", minWidth: "100%", minHeight: 400 }}>
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
              color: "#B3B4B9",
              fontWeight: 500,
              fontSize: 15.1,
              pt: 2,
              pl: 2,
            }}
          >
            Wallet Balance
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: -2.5,
              float: "right",
              mr: width < 600 ? 0 : 14,
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
