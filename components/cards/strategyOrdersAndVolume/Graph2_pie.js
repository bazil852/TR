import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const Graph2_pie = ({ data }) => {
  const chartRef = useRef(null);
  const colors = ["#3DFFDC", "#1ED6FF", "#5A3FFF", "#ADE1FF", "#268AFF"];
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const dom = chartRef.current;
    const myChart = echarts.init(dom);

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
              ? "60%"
              : isDrawerOpen && width > 1299
              ? "70%"
              : width < 1000 && width > 899
              ? "70%"
              : "80%",
          center: ["50%", "50%"],
          data: data.map((item, idx) => ({
            value: item.value,
            name: item.name,
            itemStyle: {
              color: colors[idx % colors.length],
              borderColor: "black",
              borderWidth: 2,
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

    myChart.setOption(option);
    window.addEventListener("resize", myChart.resize);
    return () => window.removeEventListener("resize", myChart.resize);
  }, [data, width, isDrawerOpen]);

  return (
    <Box
      id="chart-container"
      sx={{
        height: 300,
        width: width < 900 ? "100%" : 450,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={chartRef}
    />
  );
};

export default Graph2_pie;
