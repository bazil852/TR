import React, { useEffect, useState, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { Box, Button, Grid, Typography } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem'


function CandlestickChart({ data ,func}) {
  const [timeframeVal, setTimeFrame] = React.useState('');

  const handleChange = (event) => {
    setTimeFrame(event.target.value );
  };
  const chartContainerRef = useRef();
  const [chart, setChart] = useState(null);
  const [candleSeries, setCandleSeries] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const chartData = [
    { title: "Total Profit", value: 1200, percent: 20 },
    { title: "Total Trades", value: 34 },
    { title: "Win Rate", value: 100 },
    { title: "Buy & Hold", value: 120 },
    { title: "Totaltime", day: 123, hour: 2 },
    { title: "Profit Factor", value: 95 },
  ];
  

  const formatCandles = (candles) => {
      if (!candles) {
          return [];
      }
      return candles?.map((item) => ({
          time: item[0] / 1000,
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4]
      }));
  }

  const formatOrders = (orders, color, shape, text) => {
    return orders?.map((order) => ({
      time: order.timestamp / 1000,
      position: 'aboveBar',
      color,
      shape,
      text,
    }));
  };

  useEffect(() => {
    console.log("Trying to Render new chart ")
      const newChart = createChart(chartContainerRef.current, { 
        width: isFullScreen ? window.innerWidth : 700, 
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
      return () => {
        // When 'isFullScreen' changes, this cleanup function will run
        // We check if we are exiting fullscreen mode, and if so, resize the chart
        if (!isFullScreen && chart) {
          chart.resize(700, 500);
        }
      };
  },[isFullScreen]);

  useEffect(() => {
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

          if (candleData && candleData.length > 0) {
              candleSeries.setData(candleData);
              candleSeries.setMarkers([...buyOrders, ...sellOrders].sort((a, b) => a.time - b.time));
          }
      }
  }, [data, chart, candleSeries]);

  useEffect(() => {
    const handleResize = () => {
      if (isFullScreen && chart) {
        chart.resize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFullScreen, chart]);

  return (
      <Box mb={3}>
        <Box sx={{ display: "flex", flexDirection: "column", mt: -2 }}>
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
          value={timeframeVal}
          label="Age"
          onChange={handleChange}
          sx={{
            width:'35%',
            marginBottom:'3px'
          }}
        >
          <MenuItem value={10}>1m</MenuItem>
          <MenuItem value={20}>5m</MenuItem>
          <MenuItem value={30}>1h</MenuItem>
          <MenuItem value={30}>3h</MenuItem>
          <MenuItem value={30}>5h</MenuItem>
          <MenuItem value={30}>12h</MenuItem>
          <MenuItem value={30}>1d</MenuItem>
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
          value={timeframeVal}
          label="Age"
          onChange={handleChange}
          sx={{
            width:'35%',
            marginBottom:'3px'
          }}
        >
          <MenuItem value={10}>BTC/USDT</MenuItem>
          <MenuItem value={20}>ETH/USDT</MenuItem>
          <MenuItem value={30}>LTC/USDT</MenuItem>
          <MenuItem value={30}>XRP/USDT</MenuItem>
          <MenuItem value={30}>DOGE/USDT</MenuItem>

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
          value={timeframeVal}
          label="Age"
          onChange={handleChange}
          sx={{
            width:'35%',
            marginBottom:'3px'
          }}
        >
          <MenuItem value={10}>Long</MenuItem>
          <MenuItem value={20}>Short</MenuItem>

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
          onClick={() => func()}
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
                  background: "#191919",
                  borderTop: "2px solid #2D2D30",
                  borderRadius: 1.5,
                  height: 100,
                  minWidth: "100%",
                  display: "flex",
                  flexDirection: "column",
                  pl: 1,
                  gap: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontWeight: 500,
                    fontSize: 20,
                  }}
                >
                  {item.title}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontWeight: 500,
                      fontSize: 20,
                    }}
                  >
                    {item.title === "Totaltime" ? (
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          fontWeight: 500,
                          fontSize: 20,
                        }}
                      >
                        {item.day} Days and {item.hour} hours
                      </Typography>
                    ) : (
                      ""
                    )}
                    {item.value}
                    {item.title === "Total Profit"
                      ? "$"
                      : item.title === "Win Rate" ||
                        item.title === "Profit Factor"
                      ? "%"
                      : ""}
                  </Typography>
                  {item.title === "Total Profit" ? (
                    <Typography
                      sx={{
                        fontFamily: "Barlow, san-serif",
                        fontWeight: 500,
                        fontSize: 20,
                        pr: 2,
                      }}
                    >
                      {" "}
                      {item.percent}%
                    </Typography>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
        <button onClick={() => setIsFullScreen(!isFullScreen)}>{isFullScreen ? "Exit Fullscreen" : "Go Fullscreen"}</button>
          <div ref={chartContainerRef} style={{ backgroundColor: 'transparent' }}/>
      </Box>
  );
}


export default CandlestickChart;


