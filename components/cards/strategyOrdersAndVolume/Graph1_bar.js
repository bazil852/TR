import React, { useEffect, useState, useRef } from "react";
import * as echarts from "echarts";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

function Graph1_bar({ data }) {
  const chartRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  const updateWidth = () => {
    if (chartRef.current) {
      setContainerWidth(chartRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const maxLength = Math.max(...Object.values(data).map((arr) => arr.length));

  useEffect(() => {
    const colors = ["#5A3FFF", "#268AFF", "#1ED6FF", "#3DFFDC", "#ADE1FF"];
    const seriesData = Object.entries(data).map(([key, value], index) => ({
      name: key,
      type: "bar",
      stack: "total",
      label: { show: false },
      emphasis: { focus: "series" },
      data: value,
      itemStyle: {
        color: colors[index % colors.length],
      },
    }));

    const categories =
      seriesData[0]?.data?.map((_, index) => (index + 1).toString()) || [];

    const barThickness = getBarThickness(maxLength);
    const barGap = 6;
    const barWidth = barThickness;
    const requiredWidth = maxLength * (barWidth + barGap);

    const dynamicWidth =
      containerWidth >= requiredWidth ? containerWidth : requiredWidth;

    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      myChart.resize({ width: dynamicWidth });

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderWidth: 0,
          textStyle: {
            color: "#FFFFFF",
            fontWeight: 500,
            fontSize: 14,
            fontFamily: "Barlow, san-serif",
          },
        },
        // legend: {
        //   bottom: width < 337 ? -7 : 0,
        //   textStyle: {
        //     fontFamily: "Barlow, san-serif",
        //     color: "#8C8C8C",
        //     fontWeight: 500,
        //   },
        // },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
          position: "right",
          axisLabel: {
            color: "#8C8C8C",
            fontFamily: "Barlow, san-serif",
            rotate: 90,
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#8C8C8C",
              width: 0.6,
              opacity: 0.6,
            },
          },
        },
        xAxis: {
          type: "category",
          data: categories,
          axisTick: { show: false },
          axisLabel: {
            color: "#8C8C8C",
            fontFamily: "Barlow, san-serif",
          },
          axisPointer: { type: "none" },
        },
        series: seriesData.map((series) => ({
          ...series,
          barWidth: barWidth,
          barGap: barGap,
        })),
      };

      myChart.setOption(option);
    }
  }, [data, containerWidth]);
  const getBarThickness = (maxLength) => {
    if (maxLength === 1) return 90;
    if (maxLength === 2) return 75;
    if (maxLength === 3) return 65;
    if (maxLength === 4) return 55;
    if (maxLength === 5) return 45;
    if (maxLength >= 6 && maxLength <= 8 && width > 399) return 35;
    if (maxLength >= 6 && maxLength <= 8 && width < 400) return 25;
    if (maxLength >= 9 && maxLength <= 11) return 30;
    if (maxLength === 12) return 25;
    return 17;
  };

  return (
    <Box
      sx={{
        height: 345,
        mt: -5,
        overflowX:
          width < 1000 && width > 483 && maxLength < 22
            ? "hidden"
            : width < 483 && width > 435 && maxLength < 19
            ? "hidden"
            : width < 436 && width > 389 && maxLength < 17
            ? "hidden"
            : width < 390 && maxLength < 9
            ? "hidden"
            : width > 1305 && !isDrawerOpen && maxLength < 32
            ? "hidden"
            : width > 999 && !isDrawerOpen && maxLength < 24
            ? "hidden"
            : width < 1306 && width > 1100 && !isDrawerOpen && maxLength < 27
            ? "hidden"
            : "auto",
        overflowY: "hidden",
        " ::-webkit-scrollbar": {
          height: 3,
        },
        "::-webkit-scrollbar-track": {
          background: "none",
          mx: 2,
        },
        "::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
      }}
    >
      <Box
        ref={chartRef}
        sx={{
          height: 370,
          mb: 1,
        }}
      />
    </Box>
  );
}

export default Graph1_bar;
