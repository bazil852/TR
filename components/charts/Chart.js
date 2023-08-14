import React, { useEffect, useState, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { Box, Button, Grid, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "react-select";
import StrategyCalender from "../cards/strategy-calender/StrategyCalender";

function CandlestickChart({ data, func }) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "2px solid #9D9D9D",
      backgroundColor: "#191919",
      width: "100%",
      minHeight: "35px",
      borderRadius: "8px",
    }),
    container: (provided) => ({
      ...provided,
      border: "none",
      width: "100%",
      minHeight: "20px",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#FFFFFF",
      fontSize: "15px",
      fontFamily: "Barlow, san-serif",
      backgroundColor: state.isSelected ? "#000000" : "#2B2B2B",
      ":hover": { background: "#131313", color: "#FFFFFF" },
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      width: state.isFocused ? "20px" : "20px",
      justifyContent: state.isFocused ? "flex-end" : "flex-end",
      padding: "0",
    }),
    menu: (provided) => ({
      ...provided,
      background: "#2B2B2B",
      color: "#FFFFFF",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      minHeight: "30px",
      padding: "2px 4px",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "15px",
      fontFamily: "Barlow, san-serif",
      fontWeight: 500,
      color: "#FFFFFF",
      whiteSpace: "normal",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "15px",
      fontFamily: "Barlow, san-serif",
      color: "#ACB2B7",
      overflow: "hidden",
      textWrap: "nowrap",
      textOverflow: "ellipsis",
      opacity: 0.8,
    }),
    menuList: (provided) => ({
      ...provided,
      "&::-webkit-scrollbar": {
        width: "3px",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),
  };

  const options = [
    { value: 10, label: "1 Minute Timeframe" },
    { value: 20, label: "5 Minute Timeframe" },
    { value: 30, label: "1 Hour Timeframe" },
    { value: 30, label: "3 Hour Timeframe" },
    { value: 30, label: "5 Hour Timeframe" },
    { value: 30, label: "12 Hour Timeframe" },
    { value: 30, label: "1 Day Timeframe" },
  ];
  const symbolOptions = [
    { value: 10, label: "BTC/USDT" },
    { value: 20, label: "ETH/USDT" },
    { value: 30, label: "LTC/USDT" },
    { value: 30, label: "XRP/USDT" },
    { value: 30, label: "DOGE/USDT" },
  ];

  const sideOption = [
    { value: 10, label: "Long" },
    { value: 20, label: "Short" },
  ];

  const [timeframeVal, setTimeFrame] = React.useState("");

  function handleChange(selectedOption) {
    setTimeFrame(selectedOption.value);
  }

  // const chartContainerRef = useRef();
  // const [chart, setChart] = useState(null);
  // const [candleSeries, setCandleSeries] = useState(null);
  // const [isFullScreen, setIsFullScreen] = useState(false);

  // const formatCandles = (candles) => {
  //   if (!candles) {
  //     return [];
  //   }
  //   return candles?.map((item) => ({
  //     time: item[0] / 1000,
  //     open: item[1],
  //     high: item[2],
  //     low: item[3],
  //     close: item[4],
  //   }));
  // };

  // const formatOrders = (orders, color, shape, text) => {
  //   return orders?.map((order) => ({
  //     time: order.timestamp / 1000,
  //     position: "aboveBar",
  //     color,
  //     shape,
  //     text,
  //   }));
  // };

  // useEffect(() => {
  //   console.log("Trying to Render new chart ");
  //   const newChart = createChart(chartContainerRef.current, {
  //     width: isFullScreen ? window.innerWidth : 700,
  //     height: isFullScreen ? window.innerHeight : 500,
  //     layout: {
  //       background: {
  //         type: "solid",
  //         color: "transparent",
  //       },
  //       textColor: "rgba(255, 255, 255, 0.9)",
  //     },
  //     grid: {
  //       vertLines: {
  //         color: "rgba(197, 203, 206, 0.5)",
  //       },
  //       horzLines: {
  //         color: "rgba(197, 203, 206, 0.5)",
  //       },
  //     },
  //     crosshair: {
  //       mode: CrosshairMode.Normal,
  //     },
  //     priceScale: {
  //       borderColor: "rgba(197, 203, 206, 0.8)",
  //     },
  //     timeScale: {
  //       borderColor: "rgba(197, 203, 206, 0.8)",
  //     },
  //   });
  //   const newCandleSeries = newChart.addCandlestickSeries();
  //   setChart(newChart);
  //   setCandleSeries(newCandleSeries);
  //   return () => {
  //     if (!isFullScreen && chart) {
  //       chart.resize(700, 500);
  //     }
  //   };
  // }, [isFullScreen]);

  // useEffect(() => {
  //   if (chart && candleSeries) {
  //     const candleData = formatCandles(data?.candles);
  //     const buyOrders = formatOrders(
  //       data?.buy_orders,
  //       "#00E396",
  //       "arrowDown",
  //       "Buy"
  //     );
  //     const sellOrders = formatOrders(
  //       data?.sell_orders,
  //       "#FF0000",
  //       "arrowUp",
  //       "Sell"
  //     );

  //     if (candleData && candleData.length > 0) {
  //       candleSeries.setData(candleData);
  //       candleSeries.setMarkers(
  //         [...buyOrders, ...sellOrders].sort((a, b) => a.time - b.time)
  //       );
  //     }
  //   }
  // }, [data, chart, candleSeries]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (isFullScreen && chart) {
  //       chart.resize(window.innerWidth, window.innerHeight);
  //     }
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [isFullScreen, chart]);

  return (
    <Box mt={"20px"}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontSize: "2.2rem",
            fontWeight: 600,
            ml: 1,
            fontFamily: "Barlow, san-serif",
          }}
        >
          Strategy Backtester
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
          Backtest your favorite technical analysis based strategies with our
          backtester
        </Typography>
      </Box>

      <Grid container spacing={"20px"} mt={1}>
        <Grid item xs={12} sm={6} md={3.5} lg={3.5}>
          <Box>
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontWeight: 500,
                fontSize: 17,
                pl: 0.5,
                position: "relative",
              }}
            >
              Timeframe
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontWeight: 400,
                  fontSize: 20,
                  color: "#FF5656",
                  position: "absolute",
                  left: 90,
                  top: 0,
                }}
              >
                *
              </Typography>
            </Typography>

            <FormControl sx={{ minWidth: "100%" }}>
              <Select
                value={options.find((option) => option.value === timeframeVal)}
                onChange={handleChange}
                styles={customStyles}
                options={options}
                isSearchable={false}
                placeholder={"Select Timeframe"}
              />
            </FormControl>
          </Box>
          <Box mt={"12px"}>
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontWeight: 500,
                fontSize: 17,
                pl: 0.5,
                position: "relative",
              }}
            >
              Symbol
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontWeight: 400,
                  fontSize: 20,
                  color: "#FF5656",
                  position: "absolute",
                  left: 63,
                  top: 0,
                }}
              >
                *
              </Typography>
            </Typography>
            <FormControl sx={{ minWidth: "100%" }}>
              <Select
                value={symbolOptions.find(
                  (option) => option.value === timeframeVal
                )}
                onChange={handleChange}
                styles={customStyles}
                options={symbolOptions}
                isSearchable={false}
                placeholder={"Select Symbol"}
              />
            </FormControl>
          </Box>
          <Box mt={"12px"}>
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontWeight: 500,
                fontSize: 17,
                pl: 0.5,
                position: "relative",
              }}
            >
              Side
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontWeight: 400,
                  fontSize: 20,
                  color: "#FF5656",
                  position: "absolute",
                  left: 40,
                  top: 0,
                }}
              >
                *
              </Typography>
            </Typography>
            <FormControl sx={{ minWidth: "100%" }}>
              <Select
                value={sideOption.find(
                  (option) => option.value === timeframeVal
                )}
                onChange={handleChange}
                styles={customStyles}
                options={sideOption}
                isSearchable={false}
                placeholder={"Select Side"}
              ></Select>
            </FormControl>
          </Box>
          <Button
            sx={{
              background: "linear-gradient(to right,#790F87,#794AE3)",
              textTransform: "none",
              border: "none",
              outline: "none",
              color: "white",
              fontFamily: "Barlow, san-serif",
              fontWeight: 400,
              fontSize: 16,
              height: 35,
              mt: 5,
            }}
            onClick={() => func()}
          >
            Start Backtest
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4.5} lg={4.5}>
          <StrategyCalender />
        </Grid>
        <Grid item xs={12} sm={6} md={4.5} lg={4.5}></Grid>
      </Grid>

      {/* <button onClick={() => setIsFullScreen(!isFullScreen)}>
        {isFullScreen ? "Exit Fullscreen" : "Go Fullscreen"}
      </button>
      <div ref={chartContainerRef} style={{ backgroundColor: "transparent" }} /> */}
    </Box>
  );
}

export default CandlestickChart;
