import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";

function Graph2_pie({ dataArray }) {
  const chartRef = useRef(null);

  const colors = ["#3DFFDC", "#1ED6FF", "#5A3FFF", "#ADE1FF", "#268AFF"];

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
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
          itemGap: 8,
          bottom: 0,
          textStyle: {
            fontFamily: "Barlow, san-serif",
            color: "#8C8C8C",
            fontWeight: 500,
          },
          itemStyle: {
            borderColor: "transparent",
          },
        },
        color: colors,
        series: [
          {
            type: "pie",
            radius: "50%",
            data: dataArray,
            itemStyle: {
              borderColor: "black",
              borderWidth: 1.5,
            },
            labelLine: {
              show: true,
              lineStyle: {
                color: "#8C8C8C",
              },
            },
            label: {
              show: false,
              formatter: "{b}: {c} ({d}%)",
              fontFamily: "Barlow, san-serif",
              color: "#8C8C8C",
              fontWeight: 500,
            },
            emphasis: {
              label: {
                show: true,
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              labelLine: {
                show: true,
                lineStyle: {
                  color: "#8C8C8C",
                },
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    }
  }, [dataArray]);

  return (
    <div
      ref={chartRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "400px",
      }}
    ></div>
  );
}

export default Graph2_pie;
