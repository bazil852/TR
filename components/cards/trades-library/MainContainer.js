import { Grid, Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import MeterChart from "./MeterChart";
import ProgressMeter from "./ProgressMeter";
import { BtcIcon, EditIcon } from "../../../utils/icons";

import RefreshIcon from "@mui/icons-material/Refresh";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  const Data = [
    {
      Title: "Bitcoin High volume candles 1 hour",
      Currency1: "BTC",
      Currency2: "USDT",
      ID: "1234567",
      Time: "23h:23m",
      TotalOrders: 4,
      Orders: 1,
      TotalValue: 1000,
      Value: 250,
      Percentage: 18,
      Dollars: 235,
    },
    {
      Title: "Bitcoin High volume candles 1 hour",
      Currency1: "BTC",
      Currency2: "USDT",
      ID: "1234567",
      Time: "23h:23m",
      TotalOrders: 10,
      Orders: 3,
      TotalValue: 1000,
      Value: 300,
      Percentage: 18,
      Dollars: 235,
    },
    {
      Title: "Bitcoin High volume candles 1 hour",
      Currency1: "BTC",
      Currency2: "USDT",
      ID: "1234567",
      Time: "23h:23m",
      TotalOrders: 10,
      Orders: 3,
      TotalValue: 1000,
      Value: 300,
      Percentage: 18,
      Dollars: 235,
    },
  ];
  return (
    <Grid container sx={{ mt: 0, minWidth: "100%" }} spacing={1}>
      {Data.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
          <Box
            sx={{
              background: "#131313",
              borderRadius: 2,
              p: 2,
              minWidth: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 16,
                  textTransform: "capitalize",
                }}
              >
                {item.Title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.5,
                  pr: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      color: "white",
                      fontWeight: 500,
                      fontSize: 12,
                      textTransform: "capitalize",
                      pr: 0.2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <BtcIcon /> {item.Currency1} /
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      color: "white",
                      fontWeight: 400,
                      fontSize: 12,
                      textTransform: "capitalize",
                    }}
                  >
                    {item.Currency2}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: 11,
                      color: "#FFFFFF",
                      fontWeight: 300,
                    }}
                  >
                    ID : {item.ID}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: 11,
                      color: "#FFFFFF",
                      fontWeight: 300,
                    }}
                  >
                    {item.Time}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems:
                  width < 430
                    ? "center"
                    : width < 880 && width > 600
                    ? "center"
                    : "",
                flexDirection:
                  width < 430
                    ? "column"
                    : width < 880 && width > 600
                    ? "column"
                    : "",
                mt: 1,
              }}
            >
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  ml:
                    width < 430
                      ? ""
                      : width > 999 && width < 1051 && isDrawerOpen
                      ? 0
                      : width < 880 && width > 600
                      ? 0
                      : width < 600 && width > 500
                      ? 10
                      : width > 1080 && width < 1200 && !isDrawerOpen
                      ? 10
                      : 5,
                }}
              >
                <MeterChart
                  Percentage={item.Percentage}
                  Dollars={item.Dollars}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection:
                    width < 430
                      ? ""
                      : width < 880 && width > 600
                      ? ""
                      : "column",
                  alignItems: "center",
                  gap: 2,
                  mt: 1,
                  ml:
                    width < 430 ? "" : width < 880 && width > 600 ? "" : "auto",
                  pl: width < 430 ? 2 : width < 880 && width > 600 ? 2 : "",
                }}
              >
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                  }}
                >
                  <ProgressMeter
                    TotalValue={item.TotalOrders}
                    Value={item.Orders}
                    Type={"Orders"}
                  />
                </Box>
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                  }}
                >
                  <ProgressMeter
                    TotalValue={item.TotalValue}
                    Value={item.Value}
                    Type={"Value"}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                mt: 2,
                flexDirection:
                  width < 475
                    ? "column"
                    : width > 599 && width < 755
                    ? "column"
                    : "",
                gap: width < 475 ? 1 : width > 599 && width < 755 ? 1 : 0,
              }}
            >
              <Button
                sx={{
                  textTransform: "none",
                  background: "linear-gradient(#1B1B1B, #191717)",
                  outline: "none",
                  fontFamily: "Barlow, san-serif",
                  color: "#FFFFFF",
                  fontSize: 14,
                  border: "1.5px solid #343131",
                  height: 30,
                  minWidth:
                    width < 475 ? 200 : width > 599 && width < 755 ? 200 : 75,
                  borderBottomLeftRadius:
                    width < 475 ? 0 : width > 599 && width < 755 ? 0 : 8,
                  borderTopLeftRadius:
                    width < 475 ? 0 : width > 599 && width < 755 ? 0 : 8,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <RefreshIcon sx={{ fontSize: 18, mr: 0.5 }} />
                Cancel Deal
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  background: "linear-gradient(#1B1B1B, #191717)",
                  outline: "none",
                  fontFamily: "Barlow, san-serif",
                  color: "#FFFFFF",
                  fontSize: 14,
                  border: "1.5px solid #343131",
                  height: 30,
                  minWidth:
                    width < 475 ? 200 : width > 599 && width < 755 ? 200 : 75,
                  borderRadius: 0,
                }}
              >
                <RefreshIcon sx={{ fontSize: 18, mr: 0.5 }} /> Refresh
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  background: "linear-gradient(#1B1B1B, #191717)",
                  outline: "none",
                  fontFamily: "Barlow, san-serif",
                  color: "#FFFFFF",
                  fontSize: 14,
                  border: "1.5px solid #343131",
                  height: 30,
                  minWidth:
                    width < 475 ? 200 : width > 599 && width < 755 ? 200 : 75,
                  borderRadius: 0,
                }}
              >
                <Box sx={{ pr: 0.5, pt: 1 }}>
                  <EditIcon />
                </Box>
                Edit
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  background: "linear-gradient(#1B1B1B, #191717)",
                  outline: "none",
                  fontFamily: "Barlow, san-serif",
                  color: "#FFFFFF",
                  fontSize: 14,
                  border: "1.5px solid #343131",
                  height: 30,
                  minWidth:
                    width < 475 ? 200 : width > 599 && width < 755 ? 200 : 75,
                  borderBottomLeftRadius: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius:
                    width < 475 ? 0 : width > 599 && width < 755 ? 0 : 8,
                  borderBottomRightRadius:
                    width < 475 ? 0 : width > 599 && width < 755 ? 0 : 8,
                }}
              >
                <RefreshIcon sx={{ fontSize: 18, mr: 0.5 }} />
                Close at Market
              </Button>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default MainContainer;
