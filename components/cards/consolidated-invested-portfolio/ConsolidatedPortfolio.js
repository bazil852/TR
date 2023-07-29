import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import GraphOfConsolidatedPOrtfolio from "./GraphOfConsolidatedPOrtfolio";
import { useSelector } from "react-redux";

const ConsolidatedPortfolio = ({ totalAssets }) => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [width, setWidth] = useState(globalThis?.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  const topThree = totalAssets
    .sort((a, b) => b.usdt_price - a.usdt_price)
    .slice(0, 3);
  console.log(totalAssets, topThree);

  const numberFormatter = (num) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + "B";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + "M";
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + "K";
    } else {
      return num.toFixed(2);
    }
  };

  const decimalFormatter = (num) => {
    if (num % 1 !== 0) {
      return num.toFixed(2);
    } else {
      return num.toFixed(0);
    }
  };

  return (
    <Card
      sx={{
        background: "#242424",
        minHeight: "100%",
        minWidth: "100%",
      }}
    >
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
        {totalAssets.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 200,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontFamily: "Barlow, san-serif",
                color: "#ACB2B7",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              No Wallet Connected
            </Typography>
          </Box>
        ) : (
          <Grid container alignItems={"center"}>
            <Grid
              item
              xs={12}
              sm={7}
              md={isDrawerOpen && width > 999 ? 12 : 7}
              lg={6}
            >
              <GraphOfConsolidatedPOrtfolio data={totalAssets} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              md={isDrawerOpen && width > 999 ? 12 : 5}
              lg={6}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    isDrawerOpen && width > 1000 && width < 1200
                      ? "center"
                      : "",
                  flexDirection:
                    width < 961
                      ? "row"
                      : isDrawerOpen && width > 999 && width < 1200
                      ? "row"
                      : "column",
                  flexWrap:
                    width < 961
                      ? "wrap"
                      : isDrawerOpen && width > 999 && width < 1200
                      ? "wrap"
                      : "nowrap",
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
                        fontSize: 14,
                        fontFamily: "Barlow, san-serif",
                        color: "#ACB2B7",
                        pl: 1,
                      }}
                    >
                      {coin.coin_name}
                    </Typography>
                    <Box
                      sx={{
                        display: width < 961 && width > 900 ? "" : "flex",
                        alignItems: "center",
                        pl: width < 961 && width > 900 ? 1 : "",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontFamily: "Barlow, san-serif",
                          fontWeight: 600,
                          color: "#B3B4B9",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {decimalFormatter(coin.quantity)} {coin.coin_name} =
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontFamily: "Barlow, san-serif",
                          color: "#ACB2B7",
                        }}
                      >
                        ${numberFormatter(coin.usdt_price)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default ConsolidatedPortfolio;
