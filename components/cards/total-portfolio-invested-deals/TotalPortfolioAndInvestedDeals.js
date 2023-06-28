import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GraphOfTotalPortfolioAndInvestedDeals from "./GraphOfTotalPortfolioAndInvestedDeals";

const formatValue = (number) => {
  return number >= 10000 ? `${(number / 1000).toFixed(1)}k` : number.toFixed(0);
};

const TotalPortfolioAndInvestedDeals = ({ data }) => {
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Card
      sx={{
        background: "#242424",
        minHeight: 125,
        minWidth: "100%",
        border: "1px solid #3F4341",
        borderRadius: 1,
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
          <Box
            sx={{
              position: "absolute",
              left: 15,
            }}
          >
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
                mt: 1,
              }}
            >
              ${formatValue(item.total)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                flexDirection: "column",
                mt: 1,
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
                    minWidth: 50,
                    height: 20,
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
                    {item.lastWeek < 0 ? "-" : ""}$
                    {formatValue(Math.abs(item.lastWeek))}
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
                  Since last week
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
                    minWidth: 50,
                    height: 20,
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
                    {item.lastMonth < 0 ? "-" : ""}$
                    {formatValue(Math.abs(item.lastMonth))}
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
                  Since last month
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              float: "right",
              width: width < 1024 && width > 959 ? "32%" : "35%",
              pt: 2,
            }}
          >
            <GraphOfTotalPortfolioAndInvestedDeals graph={item.graph} />
          </Box>
        </CardContent>
      ))}
    </Card>
  );
};

export default TotalPortfolioAndInvestedDeals;
