import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import GraphSpotfuturePieChart from "./GraphSpotfuturePieChart";
import { useSelector } from "react-redux";
const SpotFuturePieChart = () => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  const data = [
    {
      title: "BINANCE SPOT",
      graphData: [
        { name: "BTC", amount: 16, value: 25678 },
        { name: "ETH", amount: 10, value: 20000 },
        { name: "XRP", amount: 20, value: 17000 },
        { name: "MATIC", amount: 4, value: 7000 },
        { name: "LTC", amount: 20, value: 5000 },
        { name: "ADA", amount: 18, value: 15000 },
        { name: "Doge", amount: 8, value: 20000 },
      ],
    },
    {
      title: "BINANCE FUTURES",
      graphData: [
        { name: "BTC", amount: 19, value: 25678 },
        { name: "ETH", amount: 8, value: 20000 },
        { name: "XRP", amount: 3, value: 17000 },
        { name: "MATIC", amount: 14, value: 7000 },
        { name: "LTC", amount: 20, value: 5000 },
        { name: "ADA", amount: 18, value: 15000 },
        { name: "Doge", amount: 8, value: 20000 },
      ],
    },
    {
      title: "OKX SPOT",
      graphData: [
        { name: "BTC", amount: 6, value: 25678 },
        { name: "ETH", amount: 19, value: 20000 },
        { name: "XRP", amount: 22, value: 17000 },
        { name: "MATIC", amount: 14, value: 7000 },
        { name: "LTC", amount: 21, value: 5000 },
        { name: "ADA", amount: 18, value: 15000 },
        { name: "Doge", amount: 6, value: 20000 },
      ],
    },
    {
      title: "OKX FUTURES",
      graphData: [
        { name: "BTC", amount: 7, value: 2578 },
        { name: "ETH", amount: 6, value: 2000 },
        { name: "XRP", amount: 20, value: 1700 },
        { name: "MATIC", amount: 4, value: 700 },
        { name: "LTC", amount: 20, value: 5000 },
        { name: "ADA", amount: 9, value: 1500 },
        { name: "Doge", amount: 18, value: 2000 },
      ],
    },
  ];

  return (
    <Grid container my={5} spacing={1}>
      {data.map((item, index) => {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={isDrawerOpen ? 6 : 3}
            lg={3}
            key={index}
          >
            <Card sx={{ background: "#383B3B", height: 320, minWidth: "100%" }}>
              <Box pl={2} pt={2}>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontWeight: 500,
                    fontSize: 21,
                  }}
                >
                  {item.title}
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
              </Box>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <GraphSpotfuturePieChart data={item.graphData} />
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SpotFuturePieChart;
