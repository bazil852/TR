import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import * as Chartjs from "chart.js";
import { useMemo, useState, useEffect } from "react";

const controllers = Object.values(Chartjs).filter(
  (chart) => chart.id !== undefined
);

Chart.register(...controllers);

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

const BotsLibraryLineGraph = ({ balanceHistory }) => {
  const maxVal = Math.max(...balanceHistory);
  const adjustedMax = Math.ceil((maxVal + 1) / 500) * 600;
  const stepSize = adjustedMax / 10 < 250 ? 50 : adjustedMax / 5;

  const [width, setWidth] = useState(globalThis?.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  const lastNonZeroIndex = balanceHistory
    .map((value, index) => (value !== 0 ? index : -1))
    .reduce((maxIndex, curr, index) => (curr > -1 ? index : maxIndex), -1);

  const labelsToShow = months.slice(0, lastNonZeroIndex + 1);

  const data = useMemo(
    () => ({
      labels: labelsToShow,
      datasets: [
        {
          label: "$ of Earnings",
          data: balanceHistory,
          fill: false,
          borderColor: "#1ED6FF",
          pointBackgroundColor: "#1ED6FF",
          pointBorderColor: "#ffffff47",
          pointHoverBackgroundColor: "#196ED1",
          pointHoverBorderColor: "#196ED1",
          pointBorderWidth: 6,
          tension: 0.3,
          borderWidth: 2,
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
          stepSize: stepSize,
          max: adjustedMax,
          min: 0,
          callback: function(value) {
            return value + "$";
          },
          color: "#8C8C8C",
          font: {
            family: "Barlow, san-serif",
          },
        },
        grid: {
          display: false,
        },
        border: { display: false },
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
          z: 1000,
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
      <Line data={data} options={options} />
    </div>
  );
};

export default BotsLibraryLineGraph;
