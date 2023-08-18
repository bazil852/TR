import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";

function Graph1_bar({ data }) {
  const chartRef = useRef(null);

  const colors = ["#5A3FFF", "#268AFF", "#1ED6FF", "#3DFFDC", "#ADE1FF"];

  const seriesData = Object.entries(data).map(([key, value], index) => ({
    maintainAspectRatio: false,
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

  const maxLength = Math.max(...Object.values(data).map((arr) => arr.length));

  let barThickness;
  if (maxLength === 1) {
    barThickness = 90;
  } else if (maxLength === 2) {
    barThickness = 75;
  } else if (maxLength === 3) {
    barThickness = 65;
  } else if (maxLength === 4) {
    barThickness = 55;
  } else if (maxLength === 5) {
    barThickness = 45;
  } else if (maxLength === 6) {
    barThickness = 35;
  } else if (maxLength === 7) {
    barThickness = 35;
  } else if (maxLength === 9) {
    barThickness = 30;
  } else if (maxLength === 10) {
    barThickness = 30;
  } else if (maxLength === 11) {
    barThickness = 30;
  } else if (maxLength === 12) {
    barThickness = 25;
  } else if (maxLength >= 13 && maxLength <= 17) {
    barThickness = 20;
  } else {
    barThickness = 20;
  }
  console.log(barThickness);
  const categories =
    seriesData[0]?.data?.map((_, index) => (index + 1).toString()) || [];
  const widthPerBar = barThickness;
  const gap = maxLength > 20 ? 10 : 0;
  const containerWidth = `${maxLength * (widthPerBar + gap)}px`;

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

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
        legend: {
          bottom: 0,
          textStyle: {
            fontFamily: "Barlow, san-serif",
            color: "#8C8C8C",
            fontWeight: 500,
          },
        },
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
          barWidth: barThickness,
        })),
      };

      myChart.setOption(option);
    }
  }, [data]);

  return (
    <div
      style={{
        width: "100%",
        height: "380px",
        overflowX: "auto",
        " ::-webkit-scrollbar": {
          height: 3,
        },
        "::-webkit-scrollbar-track": {
          background: "none",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
      }}
    >
      <div
        ref={chartRef}
        style={{
          width: maxLength > 17 ? containerWidth : "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

export default Graph1_bar;
