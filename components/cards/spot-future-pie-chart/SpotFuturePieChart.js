import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import GraphSpotfuturePieChart from "./GraphSpotfuturePieChart";
import { useSelector } from "react-redux";
import { Binance } from "../../../utils/icons";
const SpotFuturePieChart = ({ data }) => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  return (
    <Grid container spacing={"20px"} mt={"0px"}>
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
            <Card
              sx={{
                height: 320,
                minWidth: "100%",
                background: "#262626",
                border: "1.2px solid #3F4341",
                borderRadius: "4.8px",
              }}
            >
              <Box pl={2} pt={2} height={100}>
                <Box
                  sx={{
                    display: "flex",
                    gap: item.exchange.exchange_type.startsWith("Binance")
                      ? 1
                      : 0,
                  }}
                >
                  <Box sx={{ pt: 0.5 }}>
                    {item.exchange.exchange_type.startsWith("Binance") && (
                      <Binance />
                    )}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontWeight: 600,
                      fontSize: 21,
                    }}
                  >
                    {item.exchange.exchange_type}
                  </Typography>
                </Box>
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
