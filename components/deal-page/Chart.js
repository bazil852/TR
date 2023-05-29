import React, { useEffect, useState, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { Box } from '@mui/material';


function CandlestickChart({ data }) {
  const chartContainerRef = useRef();
  const [chart, setChart] = useState(null);
  const [candleSeries, setCandleSeries] = useState(null);
  

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
      const newChart = createChart(chartContainerRef.current, { 
          width: 700, 
          height: 500,
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
  }, []);

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

  return (
      <Box >
          <div ref={chartContainerRef} style={{ backgroundColor: 'transparent' }}/>
      </Box>
  );
}

export default CandlestickChart;


