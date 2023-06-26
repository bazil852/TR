import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
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
    <Card sx={{ background: "#383B3B", height: 320, minWidth: "100%" }}>
      <CardContent sx={{ position: "relative" }}>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontWeight: 500,
            fontSize: 20,
          }}
        >
          CONSOLIDATED PORTFOLIO
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontFamily: "Inter, san-serif",
            color: "#ACB2B7",
          }}
        >
          Portfolio distribution
        </Typography>

        <Box pt={3}>
          <GraphOfConsolidatedPOrtfolio data={data} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            float: "right",
            gap: 1.5,
            pr: width < 961 ? 10 : 0,
          }}
        >
          {topThree.map((coin) => (
            <Box>
              <Typography
                sx={{
                  fontSize:
                    width < 1050 && width > 960 ? 14 : width < 961 ? 16 : 14,
                  fontFamily: "Inter, san-serif",
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
                  flexDirection: width > 960 && width < 1050 ? "column" : "row",
                }}
              >
                <Typography
                  sx={{
                    fontSize:
                      width < 1050 && width > 960 ? 14 : width < 961 ? 16 : 14,
                    fontFamily: "Inter, san-serif",
                    fontWeight: 600,
                    color: "#B3B4B9",
                  }}
                >
                  {decimalFormatter(coin.amount)} {coin.name} =
                </Typography>
                <Typography
                  sx={{
                    fontSize:
                      width < 1050 && width > 960 ? 14 : width < 961 ? 16 : 14,
                    fontFamily: "Inter, san-serif",
                    color: "#ACB2B7",
                  }}
                >
                  ${numberFormatter(coin.worth)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConsolidatedPortfolio;
