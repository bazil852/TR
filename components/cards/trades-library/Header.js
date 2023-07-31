import { Grid, Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import MeterChart from "./MeterChart";
import BarGraph from "./BarGraph";
import { useSelector } from "react-redux";

const Header = () => {
  const [totalProfit, setTotalProfit] = useState(1530);
  const [todayProfit, setTodayProfit] = useState(35);
  const [totalTrades, setTotalTrades] = useState(350);
  const [activeTrades, setActiveTrades] = useState(5);
  const [meterValue, setMeterValue] = useState(0);
  const [meterAmount, setMeterAmount] = useState(235);
  const [width, setWidth] = useState(globalThis?.innerWidth);

  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  const chartData = {
    series: [
      {
        name: "Used",
        data: [44, 55],
      },
      {
        name: "Available",
        data: [56, 2],
      },
    ],
    categories: ["USDT", "BUSD"],
  };

  const dataArray = [
    { coin: "USDT", reserved: 15000, available: 8000 },
    { coin: "BUSD", reserved: 8000, available: 300 },
  ];

  return (
    <Grid container sx={{ mt: 1 }} spacing={1}>
      <Grid item xs={12} sm={6} md={isDrawerOpen ? 5 : 2} lg={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            minWidth: "100%",
          }}
        >
          <Box
            sx={{
              background: "#131313",
              borderRadius: 2,
              p: 1,
              minWidth: "100%",
              minHeight: 132,
            }}
          >
            <Typography
              sx={{
                fontSize: 19,
                fontWeight: 600,
                fontFamily: "Barlow, san-serif",
                color: "white",
              }}
            >
              Total Profit
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 400,
                fontFamily: "Barlow, san-serif",
                color: totalProfit > 0 ? "#4BD469" : "#FF6060",
              }}
            >
              {totalProfit}$
            </Typography>
            <Typography
              sx={{
                fontSize: 19,
                fontWeight: 600,
                fontFamily: "Barlow, san-serif",
                color: "white",
              }}
            >
              Today's Profit
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 400,
                fontFamily: "Barlow, san-serif",
                color: todayProfit > 0 ? "#4BD469" : "#FF6060",
              }}
            >
              {todayProfit}$
            </Typography>
          </Box>
          <Box
            sx={{
              background: "#131313",
              borderRadius: 2,
              p: 1,
              minWidth: "100%",
              minHeight: 132,
            }}
          >
            <Typography
              sx={{
                fontSize: 19,
                fontWeight: 600,
                fontFamily: "Barlow, san-serif",
                color: "white",
              }}
            >
              Total Trades
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 400,
                fontFamily: "Barlow, san-serif",
                color: "#ACB2B7",
              }}
            >
              {totalTrades}
            </Typography>
            <Typography
              sx={{
                fontSize: 19,
                fontWeight: 600,
                fontFamily: "Barlow, san-serif",
                color: "white",
              }}
            >
              Active Trades
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 400,
                fontFamily: "Barlow, san-serif",
                color: "#ACB2B7",
              }}
            >
              {activeTrades}
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={isDrawerOpen ? 7 : 3} lg={3}>
        <Box
          sx={{
            background: "#131313",
            borderRadius: 2,
            p: 1,
            display: "flex",
            flexDirection: "column",
            height: 273,
            minWidth: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 1,
              position: "absolute",
              left: 6,
              top: 8,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontSize: 15,
                fontWeight: 600,
                pl: 1,
              }}
            >
              ALL DEALS UPNL AND %
            </Typography>
            <Button
              sx={{
                borderRadius: "50%",
                background: "#292929",
                minWidth: 20,
                height: 20,
                p: 0,
                color: "#FFFFFF",
                fontFamily: "Barlow, san-serif",
                textAlign: "center",
              }}
            >
              ?
            </Button>
          </Box>
          <Box
            sx={{
              width: 200,
              height: 250,
              mt: 7,
            }}
          >
            <MeterChart Percentage={meterValue} Dollars={meterAmount} />
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={12} md={isDrawerOpen ? 12 : 7} lg={7}>
        <Box
          sx={{
            background: "#131313",
            borderRadius: 2,
            display: "flex",
            height: width < 900 ? 415 : 273,
            minWidth: "100%",
            pb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: "100%",
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1,
                mt: 1,
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  pl: 2,
                }}
              >
                RESERVED VS AVAILABLE
              </Typography>
              <Button
                sx={{
                  borderRadius: "50%",
                  background: "#292929",
                  minWidth: 20,
                  height: 20,
                  p: 0,
                  color: "#FFFFFF",
                  fontFamily: "Barlow, san-serif",
                  textAlign: "center",
                }}
              >
                ?
              </Button>
            </Box>

            <Grid container>
              <Grid item xs={12} sm={12} md={8}>
                <BarGraph chartData={chartData} />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: width < 900 ? "center" : "",
                    alignItems: width < 900 ? "center" : "",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ width: width < 400 ? 30 : 50 }}></Box>
                    <Box sx={{ width: width < 400 ? 90 : 120 }}>
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          fontSize: 16,
                          color: "#ACB2B7",
                          fontWeight: 500,
                          textAlign: "center",
                        }}
                      >
                        Reserved
                      </Typography>
                    </Box>
                    <Box sx={{ width: width < 400 ? 90 : 120 }}>
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          fontSize: 16,
                          color: "#ACB2B7",
                          fontWeight: 500,
                          textAlign: "center",
                        }}
                      >
                        Available
                      </Typography>
                    </Box>
                  </Box>
                  {dataArray.map((item, index) => {
                    return (
                      <Box sx={{ display: "flex", mt: 3 }} key={index}>
                        <Box sx={{ width: width < 400 ? 30 : 50 }}>
                          <Typography
                            sx={{
                              fontFamily: "Barlow, san-serif",
                              fontSize: 13,
                              color: "#ACB2B7",
                              fontWeight: 300,
                              textAlign: "left",
                            }}
                          >
                            {item.coin}
                          </Typography>
                        </Box>
                        <Box sx={{ width: width < 400 ? 90 : 120 }}>
                          <Typography
                            sx={{
                              fontFamily: "Barlow, san-serif",
                              fontSize: 13,
                              color: "#ACB2B7",
                              fontWeight: 300,
                              textAlign: "center",
                            }}
                          >
                            {item.reserved}
                          </Typography>
                        </Box>
                        <Box sx={{ width: width < 400 ? 90 : 120 }}>
                          <Typography
                            sx={{
                              fontFamily: "Barlow, san-serif",
                              fontSize: 13,
                              color: "#ACB2B7",
                              fontWeight: 300,
                              textAlign: "center",
                            }}
                          >
                            {item.available}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Header;
