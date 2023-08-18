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

function CandlestickChart({ data ,func}) {
  const [hoveredCandleData, setHoveredCandleData] = useState(null);

  const [dropdownValues, setDropdownValues] = useState({
    timeframe: '',
    symbol: '',
    position: '',
  });
  

  const handleChangeTimeframe = (event) => {
    setDropdownValues((prevValues) => ({
      ...prevValues,
      timeframe: event.target.value,
    }));
  };
  const handleChangeSymbol = (event) => {
    setDropdownValues((prevValues) => ({
      ...prevValues,
      symbol: event.target.value,
    }));
  };
  const handleChangePos= (event) => {
    setDropdownValues((prevValues) => ({
      ...prevValues,
      position: event.target.value,
    }));
  };
  
  const chartContainerRef = useRef();
  const [chart, setChart] = useState(null);
  const [candleSeries, setCandleSeries] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [chartData, setChartData] = useState([
    { title: "Total Profit", value: 1200, percent: 20 },
    { title: "Total Trades", value: 34 },
    { title: "Win Rate", value: 100 },
    { title: "Buy & Hold", value: 120 },
    { title: "Totaltime", day: 123, hour: 2 },
    { title: "Profit Factor", value: 95 },
  ]);

  useEffect(() => {
    // Suppose `props.data` is the data that changes
    if (!data) {
      return;
    }
    const buyOrders = data.buy_orders; // adjust this to match your actual data structure

    // Calculate total cost in USDT
    const totalCost = buyOrders.reduce((acc, order) => acc + (order.amount), 0);
    console.log("Total Profit: ",totalCost)
  
    // Assume profit percentage is a property in props.data
    const profitPercentage = data.profit; // adjust this to match your actual data structure
  
    // Calculate total profit
    const totalProfit = totalCost * profitPercentage;
    const firstTimestamp = data?.candles[0][0];
    const lastTimestamp = data?.candles[data?.candles.length - 1][0];

    const totalTime = lastTimestamp - firstTimestamp; // in milliseconds

    const totalDays = Math.floor(totalTime / (24 * 60 * 60 * 1000)); // convert to days
    const totalHours = Math.floor((totalTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)); // convert the remainder to hours
      
    const newChartData = [
      { title: "Total Profit", value: parseFloat(totalProfit.toFixed(0)), percent: parseFloat((data?.profit *100).toFixed(1))  },
      { title: "Total Trades", value: data?.buy_orders.length + data?.sell_orders.length },
      { title: "Win Rate", value: 25 },
      { title: "Buy & Hold", value: data?.buy_orders.length - data?.sell_orders.length },
      { title: "Totaltime", day: totalDays, hour: totalHours },
      { title: "Profit Factor", value: 95 },
    ];
    setChartData(newChartData);
  }, [data]); // Re-run the effect when `props.data` changes

  


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

  useEffect(() => {
    console.log("Trying to Render new chart ")
      const newChart = createChart(chartContainerRef.current, { 
        width: isFullScreen ? window.innerWidth : window.innerWidth -250, 
        height: isFullScreen ? window.innerHeight : 500,
          layout: {
              background: {
                type: 'solid',
                color: 'transparent',
            },
              textColor: 'rgba(255, 255, 255, 0.9)',
          },
          grid: {
              vertLines: {
                  color: 'rgba(197, 203, 206, 0.5)',
              },
              horzLines: {
                  color: 'rgba(197, 203, 206, 0.5)',
              },
          },
          crosshair: {
              mode: CrosshairMode.Normal,
          },
          priceScale: {
              borderColor: 'rgba(197, 203, 206, 0.8)',
          },
          timeScale: {
              borderColor: 'rgba(197, 203, 206, 0.8)',
          },
      });
      const newCandleSeries = newChart.addCandlestickSeries();
      setChart(newChart);
      setCandleSeries(newCandleSeries);
      setChart(newChart);
    setCandleSeries(newCandleSeries);
    newChart.subscribeCrosshairMove(function(param) {
      if (param.point === undefined) {
        setHoveredCandleData(null);
        return;
      }
      if (param && param.seriesPrices) {
      const price = param.seriesPrices.get(newCandleSeries);
      if (price !== undefined) {
        setHoveredCandleData({
          open: price.open.toFixed(2),
          high: price.high.toFixed(2),
          low: price.low.toFixed(2),
          close: price.close.toFixed(2),
          volume: price.volume.toFixed(2),
        });
      }
    }
    });
    
      return () => {
        // When 'isFullScreen' changes, this cleanup function will run
        // We check if we are exiting fullscreen mode, and if so, resize the chart
        if (!isFullScreen && chart) {
          chart.resize(window.innerWidth-250, 500);
        }
      };

      
  },[isFullScreen]);

  useEffect(() => {
      console.log("Candles",data.candles)
      if (chart && candleSeries) {
          const candleData = formatCandles(data?.candles);
          const buyOrders = formatOrders(
            data?.buy_orders,
            '#00E396',
            'arrowDown',
            'Buy'
          );
          const sellOrders = formatOrders(
            data?.sell_orders,
            '#FF0000',
            'arrowUp',
            'Sell'
          );


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

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontWeight: 500,
            fontSize: 17,
            // display: "flex",
            alignItems: "center",
            gap: 0.5,
            pl: 0.5,
          }}
        >
          Timeframe
        </Typography>
        <FormControl >
        <InputLabel id="demo-simple-select-label">Timeframe</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dropdownValues.timeframe}
          label="Age"
          onChange={handleChangeTimeframe}
          sx={{
            width:'35%',
            marginBottom:'3px'
          }}
        >
          <MenuItem value={'3m'}>3m</MenuItem>
          <MenuItem value={'5m'}>5m</MenuItem>
          <MenuItem value={'1h'}>1h</MenuItem>
          <MenuItem value={'3h'}>3h</MenuItem>
          <MenuItem value={'5h'}>5h</MenuItem>
          <MenuItem value={'12h'}>12h</MenuItem>
          <MenuItem value={'1d'}>1d</MenuItem>
        </Select>
      </FormControl>

      <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontWeight: 500,
            fontSize: 17,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            pl: 0.5,
          }}
        >
          Symbol
        </Typography>
        <FormControl >
        <InputLabel id="demo-simple-select-label">Symbol</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dropdownValues.symbol}
          label="Age"
          onChange={handleChangeSymbol}
          sx={{
            width:'35%',
            marginBottom:'3px'
          }}
        >
          <MenuItem value={'BTC/USDT'}>BTC/USDT</MenuItem>
          <MenuItem value={'ETH/USDT'}>ETH/USDT</MenuItem>
          <MenuItem value={'LTC/USDT'}>LTC/USDT</MenuItem>
          <MenuItem value={'XRP/USDT'}>XRP/USDT</MenuItem>
          <MenuItem value={'DOGE/USDT'}>DOGE/USDT</MenuItem>

        </Select>
      </FormControl>

      <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontWeight: 500,
            fontSize: 17,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            pl: 0.5,
          }}
        >
          Position 
        </Typography>
        <FormControl >
        <InputLabel id="demo-simple-select-label">Position</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dropdownValues.position}
          label="Age"
          onChange={handleChangePos}
          sx={{
            width:'35%',
            marginBottom:'3px'
          }}
        >
          <MenuItem value={'long'}>Long</MenuItem>
          <MenuItem value={'short'}>Short</MenuItem>

        </Select>
      </FormControl>
          
      </Box>
      <Box mt={3} mb={2} ml={"40%"}>
        <Button
          sx={{
            background: "linear-gradient(to right,#790F87,#794AE3)",
            textTransform: "none",
            border: "none",
            outline: "none",
            color: "white",
            fontFamily: "Barlow, san-serif",
            fontWeight: 300,
            fontSize: 17,
          }}
          onClick={() => func(dropdownValues)}
        >
          Start Backtest
        </Button>
      </Box>
      <Grid container spacing={1} mt={2}>
        {chartData.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
              <Box
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
