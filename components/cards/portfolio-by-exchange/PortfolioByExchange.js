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
  // const coins = [
  //   { exchange_type: "Binance Spot", profitOrLoss: 0 },
  //   { exchange_type: "Binance Futures", profitOrLoss: 0 },
  //   { exchange_type: "OKX Spot", profitOrLoss: 0 },
  //   { exchange_type: "OKX Futures", profitOrLoss: 0 },
  //   { exchange_type: "Bitfinix", profitOrLoss: 0 },
  // ];
  const [width, setWidth] = useState(globalThis?.innerWidth);

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
              float: "right",
              pr: width > 600 && 15,
              mt: -2.5,
            }}
          >
            <Box
              sx={{
                border: "none",
                outline: "none",
                textTransform: "uppercase",
                fontSize: 13.1,
                color: "#B3B4B9",
                background: "#2A2A2C",
                borderRadius: 1,
                cursor: "pointer",
                px: 1,
                py: 0.3,
              }}
            >
              All
            </Box>
            <Box
              sx={{
                border: "none",
                outline: "none",
                textTransform: "uppercase",
                fontSize: 13.1,
                color: "#B3B4B9",
                background: "#2A2A2C",
                borderRadius: 1,
                cursor: "pointer",
                px: 1,
                py: 0.3,
              }}
            >
              1y
            </Box>
            <Box
              sx={{
                border: "none",
                outline: "none",
                textTransform: "uppercase",
                fontSize: 13.1,
                color: "#B3B4B9",
                background: "#2A2A2C",
                borderRadius: 1,
                cursor: "pointer",
                px: 1,
                py: 0.3,
              }}
            >
              2y
            </Box>
            <Box
              sx={{
                border: "none",
                outline: "none",
                textTransform: "uppercase",
                fontSize: 13,
                color: "#B3B4B9",
                background: "#2A2A2C",
                borderRadius: 1,
                cursor: "pointer",
                px: 1,
                py: 0.3,
              }}
            >
              3y
            </Box>
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
              }}
            >
              <BarGraph balanceHistory={balanceHistory}/>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
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
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
                          }}
                        >
                          {coin.profitOrLoss < 0 ? "" : "+"} {coin.profitOrLoss}
                          %
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PortfolioByExchange;
