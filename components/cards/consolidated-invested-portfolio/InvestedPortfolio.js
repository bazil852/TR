import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import GuageMeter from "./MeterGuage";
import { useSelector } from "react-redux";

const formatNumber = (num) => {
  if (Math.abs(num) >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.0+$/, "") + "M";
  } else if (Math.abs(num) >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.0+$/, "") + "K";
  } else {
    return num.toString();
  }
};

const InvestedPortfolio = ({ totalBalance }) => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    {
      investedAmount: 0,
      pointValue: +0,
      percentageValue: 0,
      total: totalBalance ? totalBalance : 0,
      inDeal: 0,
      inOrder: 0,
      guageValue: 0,
    },
  ];

  return (
    <Card
      sx={{
        background: "#262626",
        minHeight: "100%",
        minWidth: "100%",
        border: "1.2px solid #3F4341",
        borderRadius: "4.8px",
      }}
    >
      <CardContent
        sx={{
          px: width < 960 ? 5 : width > 1200 ? 5 : "",
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
            fontFamily: "Barlow, san-serif",
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
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          PORTFOLIO INVESTED
        </Typography>
        <Box>
          {data.map((item, index) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: width > 1330 ? 6 : width < 961 && width > 899 ? 4 : "",
                  flexDirection:
                    width < 600
                      ? "column"
                      : isDrawerOpen && width > 999 && width < 1200
                      ? "column"
                      : "row",
                }}
                key={index}
              >
                <Box
                  sx={{
                    ml:
                      width < 900 && width > 839
                        ? "15%"
                        : width < 840 && width > 799
                        ? "13%"
                        : width < 800 && width > 749
                        ? "12%"
                        : width < 750 && width > 699
                        ? "10%"
                        : width < 700 && width > 649
                        ? "9%"
                        : width < 650 && width > 599
                        ? "7.5%"
                        : "10%",
                  }}
                >
                  <GuageMeter value={item.guageValue} />
                </Box>
                <Box
                  sx={{
                    pr:
                      width > 1250 ? 10 : width < 961 && width > 605 ? 10 : "",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      color: "#ACB2B7",
                      fontSize: 16,
                      fontWeight: 400,
                    }}
                  >
                    Max. Investment Amount
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontWeight: 500,
                      fontSize: 22,
                      mb: 1.5,
                    }}
                  >
                    ${formatNumber(item.investedAmount)}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          color: "#ACB2B7",
                          fontSize: 14,
                          fontWeight: 400,
                        }}
                      >
                        In Trades
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          fontWeight: 500,
                          fontSize: 18,
                        }}
                      >
                        ${formatNumber(item.total)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          color: "#ACB2B7",
                          fontSize: 14,
                          fontWeight: 400,
                        }}
                      >
                        In Orders
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          fontWeight: 500,
                          fontSize: 18,
                        }}
                      >
                        ${formatNumber(item.inOrder)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};
export default InvestedPortfolio;
