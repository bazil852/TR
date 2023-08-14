import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import * as Chartjs from "chart.js";
import { useMemo, useState, useEffect } from "react";

const controllers = Object.values(Chartjs).filter(
  (chart) => chart.id !== undefined
);

Chart.register(...controllers);

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

const Graph2 = ({ dataArray }) => {
  const maxVal = Math.max(...dataArray);
  const adjustedMax = Math.ceil((maxVal + 1) / 500) * 600;
  const stepSize = adjustedMax / 10 < 250 ? 50 : adjustedMax / 5;

  const [width, setWidth] = useState(globalThis?.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  const lastNonZeroIndex = dataArray
    .map((value, index) => (value !== 0 ? index : -1))
    .reduce((maxIndex, curr, index) => (curr > -1 ? index : maxIndex), -1);

  const labelsToShow = months.slice(0, lastNonZeroIndex + 1);

  const data = useMemo(
    () => ({
      labels: labelsToShow,
      datasets: [
        {
          label: "$ of Earnings",
          data: dataArray,
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
        width: `95%`,
        height: "300px",
        paddingBottom: "1rem",
        paddingTop: "1rem",
        paddingRight: "1rem",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default Graph2;
