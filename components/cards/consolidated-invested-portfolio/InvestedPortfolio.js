import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import GuageMeter from "./MeterGuage";

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
        background: "#242424",
        minHeight: "100%",
        minWidth: "100%",
      }}
    >
      <CardContent sx={{ px: width < 960 ? 5 : width > 1200 ? 5 : "" }}>
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
                  flexDirection: width < 600 && "column",
                }}
                key={index}
              >
                <Box>
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
                      fontSize: 13,
                    }}
                  >
                    Invested Amount
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
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      color: "#ACB2B7",
                      fontSize: 13,
                      mb: 1.5,
                    }}
                  >
                    {item.pointValue > 0 ? "+" : "-"} {item.pointValue} (
                    {item.percentageValue}%)
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      flexGrow: 1,
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          color: "#ACB2B7",
                          fontSize: 13,
                        }}
                      >
                        Total Account
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          fontWeight: 500,
                          fontSize: 17,
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
                          fontSize: 13,
                        }}
                      >
                        In Deals
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          fontWeight: 500,
                          fontSize: 17,
                        }}
                      >
                        ${formatNumber(item.inDeal)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          color: "#ACB2B7",
                          fontSize: 13,
                        }}
                      >
                        In Orders
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          fontWeight: 500,
                          fontSize: 17,
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
