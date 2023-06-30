import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import GraphSpotfuturePieChart from "./GraphSpotfuturePieChart";
import { useSelector } from "react-redux";
const SpotFuturePieChart = ({ data }) => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  // const data = [
  //   {
  //     exchange: {
  //       id: 23,
  //       exchange_name: "Binance",
  //       exchange_type: "Binance Futures Testnet",
  //       api_key:
  //         "99768ccdd173118886404b103dbd24875ead769d651c3d0c1143c031e0fd9e2a",
  //       secret_key:
  //         "f332768806f2aed54f85ec6b055516e8bf23f31cfef5ec874a3af7ee07daf4da",
  //       user_id: 12,
  //     },
  //     assets: [
  //       { asset: "BTC", availableBalance: 16, usdt_price: 25678 },
  //       { asset: "ETH", availableBalance: 10, usdt_price: 20000 },
  //       { asset: "XRP", availableBalance: 20, usdt_price: 17000 },
  //       { asset: "MATIC", availableBalance: 4, usdt_price: 7000 },
  //       { asset: "LTC", availableBalance: 20, usdt_price: 5000 },
  //       { asset: "ADA", availableBalance: 18, usdt_price: 15000 },
  //       { asset: "Doge", availableBalance: 8, usdt_price: 20000 },
  //     ],
  //   },
  // ];

  return (
    <Grid container my={5} spacing={1}>
      {data?.map((item, index) => {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={isDrawerOpen ? 6 : 3}
            lg={3}
            key={index}
          >
            <Card sx={{ background: "#242424", height: 320, minWidth: "100%" }}>
              <Box pl={2} pt={2}>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontWeight: 600,
                    fontSize: 21,
                  }}
                >
                  {item.exchange.exchange_type}
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
              </Box>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <GraphSpotfuturePieChart data={item.assets} />
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SpotFuturePieChart;
