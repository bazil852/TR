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
  const nonZeroData = balanceHistory.filter((value) => value !== 0);
  const labelsToShow = months.filter((_, index) => balanceHistory[index] !== 0);

  const maxVal = Math.max(...nonZeroData);
  const adjustedMax = Math.ceil((maxVal + 1) / 500) * 600;
  const stepSize = adjustedMax / 10 < 250 ? 50 : adjustedMax / 5;

  const [width, setWidth] = useState(globalThis?.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  let barThickness;
  if (nonZeroData.length === 1) {
    barThickness = 95;
  } else if (nonZeroData.length === 2) {
    barThickness = 95;
  } else if (nonZeroData.length === 3) {
    barThickness = 80;
  } else if (nonZeroData.length === 4) {
    barThickness = 70;
  } else if (nonZeroData.length === 5) {
    barThickness = 60;
  } else if (nonZeroData.length === 6) {
    barThickness = 50;
  } else if (nonZeroData.length === 9) {
    barThickness = 40;
  } else if (nonZeroData.length === 10) {
    barThickness = 35;
  } else if (nonZeroData.length === 11) {
    barThickness = 35;
  } else if (nonZeroData.length === 12) {
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
          data: nonZeroData,
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
    [nonZeroData]
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
