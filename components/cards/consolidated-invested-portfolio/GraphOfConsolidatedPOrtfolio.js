import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const GraphOfConsolidatedPortfolio = ({ data }) => {
  const chartRef = useRef(null);
  const [dataWithWorth, setDataWithWorth] = useState([0]);
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const colors = ["#3DFFDC", "#1ED6FF", "#5A3FFF", "#ADE1FF", "#268AFF"];

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const hasAllElementsZeroOrUndefined = data?.every(
      (obj) => obj.usdt_price === 0 || obj.usdt_price === undefined
    );

    if (hasAllElementsZeroOrUndefined) {
      setDataWithWorth([]);
    } else {
      const computedData = data?.map((obj) => ({
        ...obj,
        worth: Math.max(Number(obj.usdt_price)),
      }));

      const sortedData = computedData.sort((a, b) => b.worth - a.worth);

      const topFour = sortedData.slice(0, 4);
      const remainingData = sortedData.slice(4);

      const remainingWorth = remainingData.reduce(
        (sum, obj) => sum + obj.worth,
        0
      );

      if (remainingData.length > 0) {
        setDataWithWorth([
          ...topFour,
          { coin_name: "Others", worth: remainingWorth },
        ]);
      } else {
        setDataWithWorth([...topFour]);
      }
    }
  }, [data]);

  useEffect(() => {
    let totalWorth = dataWithWorth.reduce(
      (total, item) => total + item.worth,
      0
    );
    const minPercentage = 6;
    const minValue = (minPercentage / 100) * totalWorth;

    const adjustedDataWithWorth = dataWithWorth.map((item) => {
      if (item.worth < minValue) {
        return { ...item, worth: minValue };
      }
      return item;
    });

    const dom = chartRef.current;
    const myChart = echarts.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });

    const option = {
      tooltip: {
        show: true,
        trigger: "item",
        position: "top",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderWidth: 0,
        textStyle: {
          color: "#FFFFFF",
          fontWeight: 500,
          fontSize: 14,
          fontFamily: "Barlow, san-serif",
        },
        formatter: "{b}: {c}",
      },
      series: [
        {
          type: "pie",
          radius:
            width < 1100 && width > 999 && !isDrawerOpen
              ? "70%"
              : width < 480 && width > 399 && !isDrawerOpen
              ? "70%"
              : width < 400 && !isDrawerOpen
              ? "70%"
              : isDrawerOpen && width > 999 && width < 1300
              ? "70%"
              : isDrawerOpen && width > 1299
              ? "70%"
              : width < 1000 && width > 899
              ? "70%"
              : "80%",
          center: ["50%", "50%"],
          data: adjustedDataWithWorth.map((item, idx) => ({
            value: item.worth,
            name: item.coin_name,
            itemStyle: {
              color: colors[idx % colors.length],
              borderColor: "black",
              borderWidth: 1.5,
            },
          })),
          label: { show: width < 600 ? false : false },
          labelLine: { show: false },
          emphasis: {
            label: {
              show: width < 600 ? false : true,
              color: "#9A9A9A",
              fontFamily: "Barlow, sans-serif",
            },

            labelLine: {
              show: width < 600 ? false : true,
              lineStyle: {
                color: "#9A9A9A",
              },
              smooth: 0.1,
              length: width < 600 ? 4 : 8,
              length2: width < 600 ? 2 : 6,
            },
          },
        },
      ],
    };

    if (option && typeof option === "object") {
      myChart.setOption(option);
    }

    window.addEventListener("resize", myChart.resize);

    return () => window.removeEventListener("resize", myChart.resize);
  }, [dataWithWorth, width, isDrawerOpen]);

  return (
    <Box
      id="chart-container"
      sx={{
        height: 250,
        width: width < 900 ? "100%" : 450,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={chartRef}
    />
  );
};

export default GraphOfConsolidatedPortfolio;
