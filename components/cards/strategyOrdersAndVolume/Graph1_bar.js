import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";

function Graph1_bar({ data }) {
  const chartRef = useRef(null);

  const colors = ["#5A3FFF", "#268AFF", "#1ED6FF", "#3DFFDC", "#ADE1FF"];

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const seriesData = Object.entries(data).map(([key, value], index) => {
        return {
          name: key,
          type: "bar",
          stack: "total",
          label: { show: false },
          emphasis: { focus: "series" },
          data: value,
          itemStyle: {
            color: colors[index % colors.length],
          },
        };
      });

      const maxLength = Math.max(
        ...Object.values(data).map((arr) => arr.length)
      );

      let barThickness;
      if (maxLength === 1) {
        barThickness = 100;
      } else if (maxLength === 2) {
        barThickness = 90;
      } else if (maxLength === 3) {
        barThickness = 85;
      } else if (maxLength === 4) {
        barThickness = 80;
      } else if (maxLength === 5) {
        barThickness = 70;
      } else if (maxLength === 6) {
        barThickness = 60;
      } else if (maxLength === 9) {
        barThickness = 40;
      } else if (maxLength === 10) {
        barThickness = 30;
      } else if (maxLength === 11) {
        barThickness = 25;
      } else if (maxLength === 12) {
        barThickness = 20;
      } else if (maxLength > 12) {
        barThickness = 20;
      } else {
        barThickness = 50;
      }
      const categories =
        seriesData[0]?.data?.map((value, index) => (index + 1).toString()) ||
        [];

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
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
          axisPointer: {
            type: "none",
          },
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
      ref={chartRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "370px",
      }}
    />
  );
}

export default Graph1_bar;
