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

  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const dataWithWorth = data.map((obj) => ({
      ...obj,
      worth: obj.amount * obj.value,
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
              return obj.name;
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

    const chart = new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: topFour.map((obj) => obj.name),
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
  }, []);

  return (
    <div
      style={{
        width:
          width < 961
            ? "300px"
            : width > 1250 && width < 1350
            ? "300px"
            : width > 1350 && width < 1500
            ? "320x"
            : width > 1500
            ? "350px"
            : "280px",
        height: "230px",
        position: "absolute",
        left:
          width < 961
            ? "50px"
            : width > 1250 && width < 1350
            ? "-30px"
            : width > 1350 && width < 1500
            ? "5px"
            : width > 1500
            ? "10px"
            : "-30px",
      }}
    >
      <canvas ref={chartRef} />
    </div>
  );
};

export default GraphOfConsolidatedPOrtfolio;
