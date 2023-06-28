import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import GraphOfConsolidatedPOrtfolio from "./GraphOfConsolidatedPOrtfolio";

const ConsolidatedPortfolio = () => {
  const [width, setWidth] = useState(globalThis?.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  const data = [
    { name: "BTC", abbreviation: "Bitcoin", amount: 16, value: 25678 },
    { name: "ETH", abbreviation: "Ethereum", amount: 10, value: 20000 },
    { name: "XRP", abbreviation: "Litecoin", amount: 20, value: 17000 },
    { name: "MATIC", abbreviation: "MATIC", amount: 4, value: 7000 },
    { name: "LTC", abbreviation: "LiteCoin", amount: 20, value: 5000 },
    { name: "ADA", abbreviation: "ADA", amount: 18, value: 15000 },
    { name: "Doge", abbreviation: "DogeCoin", amount: 8, value: 20000 },
  ];

  data.forEach((coin) => (coin.worth = coin.amount * coin.value));

  const topThree = data.sort((a, b) => b.worth - a.worth).slice(0, 3);

  const numberFormatter = (num) => {
    if (num >= 1000) {
      if (num % 1000 === 0) {
        return num / 1000 + "k";
      } else {
        return (num / 1000).toFixed(1) + "k";
      }
    } else {
      return num;
    }
  };

  const decimalFormatter = (num) => {
    if (num % 1 !== 0) {
      return num.toFixed(3);
    } else {
      return num;
    }
  };

  return (
    <Card sx={{ background: "#242424", minHeight: 320, minWidth: "100%" }}>
      <CardContent sx={{ position: "relative" }}>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          CONSOLIDATED PORTFOLIO
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontFamily: "Barlow, san-serif",
            color: "#ACB2B7",
          }}
        >
          Portfolio distribution
        </Typography>

        <Grid container alignItems={"center"}>
          <Grid item xs={12} sm={7} md={7} lg={6}>
            <GraphOfConsolidatedPOrtfolio data={data} />
          </Grid>
          <Grid item xs={12} sm={5} md={5} lg={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: width < 961 ? "row" : "column",
                flexWrap: width < 961 ? "wrap" : "nowrap",
                float: width < 961 ? "left" : "right",
                gap: 1.5,
                mt: width < 961 ? 2 : "",
                px: width > 1200 ? 5 : "",
              }}
            >
              {topThree.map((coin) => (
                <Box>
                  <Typography
                    sx={{
                      fontSize:
                        width < 1050 && width > 960
                          ? 14
                          : width < 961
                          ? 16
                          : 14,
                      fontFamily: "Barlow, san-serif",
                      color: "#ACB2B7",
                      pl: 1,
                    }}
                  >
                    {coin.abbreviation}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize:
                          width < 1050 && width > 960
                            ? 14
                            : width < 961
                            ? 16
                            : 14,
                        fontFamily: "Barlow, san-serif",
                        fontWeight: 600,
                        color: "#B3B4B9",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {decimalFormatter(coin.amount)} {coin.name} =
                    </Typography>
                    <Typography
                      sx={{
                        fontSize:
                          width < 1050 && width > 960
                            ? 14
                            : width < 961
                            ? 16
                            : 14,
                        fontFamily: "Barlow, san-serif",
                        color: "#ACB2B7",
                      }}
                    >
                      ${numberFormatter(coin.worth)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConsolidatedPortfolio;
