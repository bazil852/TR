import { Bar } from "react-chartjs-2";
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

const BarGraph = ({ balanceHistory }) => {
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

  const countNonZeroElements = (array) => {
    return array.filter((value) => value !== 0).length;
  };

  const nonZeroCount = countNonZeroElements(balanceHistory);

  let barThickness;
  if (nonZeroCount === 1) {
    barThickness = 95;
  } else if (nonZeroCount === 2) {
    barThickness = 95;
  } else if (nonZeroCount === 3) {
    barThickness = 80;
  } else if (nonZeroCount === 4) {
    barThickness = 70;
  } else if (nonZeroCount === 5) {
    barThickness = 60;
  } else if (nonZeroCount === 6) {
    barThickness = 50;
  } else if (nonZeroCount === 9) {
    barThickness = 40;
  } else if (nonZeroCount === 10) {
    barThickness = 35;
  } else if (nonZeroCount === 11) {
    barThickness = 35;
  } else if (nonZeroCount === 12) {
    barThickness = 30;
  } else {
    barThickness = 40;
  }

  const data = useMemo(
    () => ({
      labels: labelsToShow,
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
          barThickness: barThickness,
          borderWidth: 0,
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
