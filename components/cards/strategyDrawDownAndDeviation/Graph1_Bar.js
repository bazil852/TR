import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";

function Graph1_Bar({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const drawdownData = data.find((item) => item.drawdown)?.drawdown || [];
      const deviationData =
        data.find((item) => item.deviation)?.deviation || [];

      const xAxisData = Array.from(
        { length: drawdownData.length || deviationData.length },
        (_, i) => i + 1
      );

      const option = {
        tooltip: {
          trigger: "axis",
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
          data: ["Drawdown", "Deviation"],
          bottom: 0,
          textStyle: {
            fontFamily: "Barlow, san-serif",
            color: "#8C8C8C",
            fontWeight: 500,
          },
        },
        toolbox: {
          show: false,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: xAxisData,
            axisTick: { show: false },
            axisLabel: {
              color: "#8C8C8C",
              fontFamily: "Barlow, san-serif",
            },
            axisPointer: {
              type: "none",
            },
          },
        ],
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
        series: [
          {
            name: "Drawdown",
            type: "bar",
            data: drawdownData,
            itemStyle: {
              color: "#36F097",
            },
          },
          {
            name: "Deviation",
            type: "bar",
            data: deviationData,
            itemStyle: {
              color: "#268AFF",
            },
          },
        ],
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
    ></div>
  );
}

export default Graph1_Bar;
