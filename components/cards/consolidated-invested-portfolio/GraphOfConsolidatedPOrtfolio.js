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
        trigger: "item",
        position: "top",
        fontFamily: "Barlow, sans-serif",
        textStyle: {
          fontFamily: "Barlow, sans-serif",
        },
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius:
            width > 1250 && !isDrawerOpen
              ? "80%"
              : width > 1250 && width < 1360 && isDrawerOpen
              ? "70%"
              : width < 1100 && width > 999
              ? "75%"
              : width < 1000 && width > 899
              ? "60%"
              : width < 1250 && width > 1199 && isDrawerOpen
              ? "65%"
              : "70%",
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
          label: {
            color: "#9A9A9A",
            fontFamily: "Barlow, sans-serif",
            overflow: "visible",
          },
          labelLine: {
            lineStyle: {
              color: "#9A9A9A",
            },
            smooth: 0.1,
            length: 10,
            length2: 8,
          },
          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: (idx) => Math.random() * 200,
        },
      ],
    };

    if (option && typeof option === "object") {
      myChart.setOption(option);
    }

    window.addEventListener("resize", myChart.resize);

    return () => window.removeEventListener("resize", myChart.resize);
  }, [dataWithWorth]);

  return (
    <Box
      id="chart-container"
      sx={{
        position: "relative",
        height: "230px",
        width: "290px",
        margin: 0,
        padding: 0,
        pt: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={chartRef}
    />
  );
};

export default GraphOfConsolidatedPortfolio;
