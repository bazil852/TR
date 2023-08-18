import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import StrategyPLBarGraph from "./StrategyPLBarGraph";
import StrategyPLLineGraph from "./StrategyPLLineGraph";

const StrategyPLandStats = () => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [width, setWidth] = useState(globalThis?.innerWidth);

  const statsData = [
    { name: "Total Profit", amount: 0, percentage: 0 },
    { name: "Total Trades", amount: 0, percentage: 0 },
    { name: "Avg. Trade Profit", amount: 0, percentage: 0 },
    { name: "Avg. Trade Time", time: 0 },
    { name: "Biggest Profit", time: 0 },
    { name: "Biggest Loss", time: 0 },
  ];

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontSize: "2.2rem",
            fontWeight: 600,
            ml: 1,
            fontFamily: "Barlow, san-serif",
          }}
        >
          Strategy P&L Statistics
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            ml: 1,
            mb: 1,
            fontFamily: "Barlow, san-serif",
            color: "#ACB2B7",
          }}
        >
          Total and average profits, average trade time, biggest winner and
          loser
        </Typography>
      </Box>
      <Grid container spacing={"20px"} mt={0}>
        {statsData.map((item, index) => {
          return (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={isDrawerOpen && width > 999 ? 4 : 3}
              lg={
                width < 1500 && width > 1299 && isDrawerOpen
                  ? 3
                  : width < 1300
                  ? 3
                  : 2
              }
              xl={2}
            >
              <Box
                sx={{
                  background: "#262626",
                  border: "1.2px solid #3F4341",
                  borderRadius: "4.8px",
                  minWidth: "100%",
                  height: 98,
                  px: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 22,
                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 16,
                    fontWeight: 400,
                    pt: typeof item.time !== "undefined" ? 1 : "",
                    color:
                      typeof item.amount !== "undefined"
                        ? item.amount > 0
                          ? "#21CC6D"
                          : "#E24628"
                        : "#21CC6D",
                  }}
                >
                  {typeof item.amount !== "undefined"
                    ? `${item.amount}$`
                    : `${item.time} Days`}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 16,
                    fontWeight: 400,
                    color: item.percentage > 0 ? "#21CC6D" : "#E24628",
                  }}
                >
                  {typeof item.percentage !== "undefined"
                    ? `${item.percentage}%`
                    : ""}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Grid container spacing={"20px"} mt={"0px"}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <StrategyPLBarGraph />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <StrategyPLLineGraph />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StrategyPLandStats;
