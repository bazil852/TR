import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GraphOfTotalPortfolioAndInvestedDeals from "./GraphOfTotalPortfolioAndInvestedDeals";

const formatValue = (number) => {
  return number >= 10000
    ? `${(number / 1000)?.toFixed(2)}k`
    : number?.toFixed(0);
};

const TotalPortfolioAndInvestedDeals = ({ data, totalBalance }) => {
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Card
      sx={{
        background: "#262626",
        minHeight: "100%",
        minWidth: "100%",
        border: "1.2px solid #3F4341",
        borderRadius: "4.8px",
        py: 0.5,
      }}
    >
      {data.map((item) => (
        <CardContent
          key={item.name}
          sx={{
            px: 1,
            py: 0,
            position: "relative",
          }}
        >
          <Button
            sx={{
              position: "absolute",
              right: 5,
              top: 3,
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography
                sx={{
                  color: "#90969D",
                  fontSize: 14,
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 300,
                }}
              >
                {item.name}
              </Typography>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: 20,
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 500,
                }}
              >
                ${formatValue(totalBalance)}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  flexDirection: "column",
                  mt: 3,
                  mb: -2,
                }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Box
                    sx={{
                      background: item.lastWeek < 0 ? "#661A1A" : "#264639",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 1,
                      minWidth: 35,
                      height: 18,
                    }}
                  >
                    <Typography
                      sx={{
                        color: item.lastWeek < 0 ? "#B84040" : "#27966A",
                        fontSize: 12,
                        fontFamily: "Barlow, sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {item.lastWeek < 0
                        ? "-"
                        : item.name === "Total Portfolio"
                        ? "+"
                        : ""}
                      ${formatValue(Math.abs(item.lastWeek))}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#90969D",
                      fontSize: 13.1,
                      fontFamily: "Barlow, sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {item.name === "Invested in trades"
                      ? "Last week"
                      : "Since last week"}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Box
                    sx={{
                      background: item.lastMonth < 0 ? "#661A1A" : "#264639",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 1,
                      minWidth: 35,
                      height: 18,
                    }}
                  >
                    <Typography
                      sx={{
                        color: item.lastMonth < 0 ? "#B84040" : "#27966A",
                        fontSize: 12,
                        fontFamily: "Barlow, sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {item.lastMonth < 0
                        ? "-"
                        : item.name === "Total Portfolio"
                        ? "+"
                        : ""}
                      ${formatValue(Math.abs(item.lastMonth))}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#90969D",
                      fontSize: 13.1,
                      fontFamily: "Barlow, sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {item.name === "Invested in trades"
                      ? "Last month"
                      : "Since last month"}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                float: "right",
                width: width < 1024 && width > 959 ? "32%" : "35%",
                pt: 5,
              }}
            >
              <GraphOfTotalPortfolioAndInvestedDeals graph={item.graph} />
            </Box>
            <Box sx={{ position: "absolute", right: "10%", bottom: 15 }}>
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 11,
                  color: "#ADB5BD",
                  fontWeight: 400,
                }}
              >
                Last {item.days} days
              </Typography>
            </Box>
          </Box>
        </CardContent>
      ))}
    </Card>
  );
};

export default TotalPortfolioAndInvestedDeals;
