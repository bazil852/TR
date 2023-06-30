import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

const GraphOfConsolidatedPOrtfolio = ({ data }) => {
  const [width, setWidth] = useState(globalThis?.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  console.log(data);

  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // const removeUsdt = data.filter((item) => item.asset !== "USDT");

    const dataWithWorth = data.map((obj) => ({
      ...obj,
      worth: obj.usdt_price,
    }));

    const sortedData = dataWithWorth.sort((a, b) => b.worth - a.worth);

    const topFour = sortedData.slice(0, 4);
    const remainingData = sortedData.slice(4);

    const remainingWorth = remainingData.reduce(
      (sum, obj) => sum + obj.worth,
      0
    );

    const polarAreaData = [
      ...topFour.map((obj) => obj.worth),
      remainingWorth || 0,
    ];

    const colors = [
      "rgba(54, 240, 151, 1)",
      "rgba(61, 255, 220, 1)",
      "rgba(30, 214, 255, 1)",
      "rgba(38, 138, 255, 1)",
      "rgba(88, 62, 247, 1)",
    ];

    const options = {
      aspectRatio: 1.3,
      scales: {
        r: {
          display: false,
        },
      },
      plugins: {
        datalabels: {
          color: "#A8A8A8",
          align: "end",
          offset: 50,
          font: {
            size: 12,
            family: "'Barlow', sans-serif",
          },
          formatter: (value, ctx) => {
            const obj = topFour[ctx.dataIndex];
            if (ctx.dataIndex === 4) {
              return "Others";
            } else if (obj) {
              return obj.asset;
            }
            return "";
          },
        },
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
      },
    };
    console.log(
      "top",
      topFour,
      topFour.map((obj) => obj?.asset),
      polarAreaData
    );

    const chart = new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: topFour.map((obj) => obj?.asset),
        datasets: [
          {
            data: polarAreaData,
            backgroundColor: colors,
            borderWidth: 0,
            hoverBackgroundColor: colors,
          },
        ],
      },
      options: options,
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div
      style={{
        minWidth: "280px",
        marginLeft:
          width < 1100 && width > 960
            ? "-40px"
            : width > 1200 && width < 1300
            ? "-20px"
            : width < 600 && width > 500
            ? "-10px"
            : width < 500
            ? "-30px"
            : "0px",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas ref={chartRef} />
    </div>
  );
};

export default GraphOfConsolidatedPOrtfolio;
