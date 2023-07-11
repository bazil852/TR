import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import * as Chartjs from "chart.js";

const controllers = Object.values(Chartjs).filter(
  (chart) => chart.id !== undefined
);

Chart.register(...controllers);
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const BarGraph = ({ balanceHistory }) => {
  console.log(balanceHistory);
  const maxVal = Math.max(...balanceHistory) + 2500;
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  const data = useMemo(
    () => ({
      labels: months,
      datasets: [
        {
          label: "$ of Earnings",
          data: balanceHistory,
          backgroundColor: (context) => {
            const gradient = context.chart.ctx.createLinearGradient(
              0,
              0,
              0,
              context.chart.height
            );
            gradient.addColorStop(0, "#31C1A7");
            gradient.addColorStop(0.25, "#31C1A7");
            gradient.addColorStop(0.5, "#2597BC");
            gradient.addColorStop(0.75, "#196ED1");
            gradient.addColorStop(1, "#196ED1");
            return gradient;
          },
          categoryPercentage: 0.9,
          barPercentage: 0.45,
          borderWidth: 0,
        },
        {
          label: "Transparent Bars",
          data: balanceHistory.map((val) => maxVal - val),
          backgroundColor: "rgba(255,255,255,0.1)",
          categoryPercentage: 0.9,
          barPercentage: 0.45,
        },
      ],
    }),
    [balanceHistory]
  );

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
        ticks: {
          stepSize: 2500,
          max: maxVal,
          min: 0,
          callback: function(value) {
            if (value === maxVal) return value + "$";
            return value + "$";
          },
          color: "#8C8C8C",
          font: {
            family: "Barlow, san-serif",
          },
        },
        grid: {
          drawBorder: false,
          color: "#464646",
        },
        border: { display: false, dash: [2, 2] },
      },
      x: {
        stacked: true,
        ticks: {
          maxRotation: 0,
          autoSkip: false,
          color: "#8C8C8C",
          font: {
            family: "Barlow, san-serif",
          },
        },
        grid: {
          display: false,
        },
        border: {
          color: "#6A6A6A",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div
      style={{
        position: "relative",
        width: width < 580 ? "500px" : "100%",
        height: "22rem",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
