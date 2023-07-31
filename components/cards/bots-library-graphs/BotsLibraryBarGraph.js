import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import * as Chartjs from "chart.js";
import { useEffect, useMemo, useState } from "react";

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

const BotsLibraryBarGraph = ({ dataArray, valueType }) => {
  const [width, setWidth] = useState(globalThis?.innerWidth);

  const maxVal = Math.max(...dataArray);
  const adjustedMax = Math.ceil((maxVal + 1) / 500) * 600;
  const stepSize = adjustedMax / 10 < 250 ? 50 : adjustedMax / 5;

  const lastNonZeroIndex = dataArray
    .map((value, index) => (value !== 0 ? index : -1))
    .reduce((maxIndex, curr, index) => (curr > -1 ? index : maxIndex), -1);

  const labelsToShow = months.slice(0, lastNonZeroIndex + 1);

  const data = useMemo(
    () => ({
      labels: labelsToShow,
      datasets: [
        {
          label: `${valueType} of Earnings`,
          data: dataArray,
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
          barThickness: 22,
          borderWidth: 0,
        },
      ],
    }),
    [dataArray]
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
            return value + `${valueType}`;
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

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minWidth: `${Math.max(100, labelsToShow.length * 15)}%`,
        height: width > 1197 ? "343px" : "400px",
        paddingBottom: "1rem",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};
export default BotsLibraryBarGraph;
