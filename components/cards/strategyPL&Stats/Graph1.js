import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import * as Chartjs from "chart.js";
import { useMemo, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

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
const Graph1 = ({ dataArray, valueType }) => {
  const useStyles = makeStyles({
    scrollContainer: {
      position: "relative",
      width: "100%",
      paddingBottom: "1rem",
      paddingTop: "1rem",
      paddingRight: "1rem",
      overflowX: "auto",
      "&::-webkit-scrollbar": {
        height: "3px",
      },
      "&::-webkit-scrollbar-track": {
        background: "none",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "4px",
      },
    },
  });

  const nonZeroData = dataArray.filter((value) => value !== 0);
  const labelsToShow = months.filter((_, index) => dataArray[index] !== 0);
  const maxVal = Math.max(...nonZeroData);
  const adjustedMax = Math.ceil((maxVal + 1) / 500) * 600;
  const stepSize = adjustedMax / 10 < 250 ? 50 : adjustedMax / 5;

  const [width, setWidth] = useState(globalThis?.innerWidth);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  let barThickness;
  if (nonZeroData.length === 1) {
    barThickness = 90;
  } else if (nonZeroData.length === 2) {
    barThickness = 75;
  } else if (nonZeroData.length === 3) {
    barThickness = 65;
  } else if (nonZeroData.length === 4) {
    barThickness = 55;
  } else if (nonZeroData.length === 5) {
    barThickness = 45;
  } else if (nonZeroData.length === 6) {
    barThickness = 35;
  } else if (nonZeroData.length === 9) {
    barThickness = 30;
  } else if (nonZeroData.length === 10) {
    barThickness = 30;
  } else if (nonZeroData.length === 11) {
    barThickness = 30;
  } else if (nonZeroData.length === 12) {
    barThickness = 30;
  } else if (nonZeroData.length >= 13 && nonZeroData.length <= 17) {
    barThickness = 30;
  } else {
    barThickness =
      width < 1400 && width > 999
        ? 23.2
        : width > 1399 && !isDrawerOpen
        ? 25
        : width > 1399 && isDrawerOpen
        ? 22
        : 25;
  }

  const data = useMemo(
    () => ({
      labels: labelsToShow,
      datasets: [
        {
          label: `${valueType} of Earnings`,
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
          borderWidth: 5,
          borderColor: "transparent",
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
            return value + valueType;
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
  const spacingBetweenBars = nonZeroData.length > 20 ? 0 : 10;
  const totalChartWidth =
    nonZeroData.length * (barThickness + spacingBetweenBars);
  const classes = useStyles();
  return (
    <Box
      className={classes.scrollContainer}
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "0.5rem",
        marginBottom: width > 900 ? "0.2rem" : "0rem",
        paddingTop: "1rem",
        marginLeft: "1rem",
        marginRight:
          width < 1400 && width > 899 && nonZeroData.length > 18
            ? "1rem"
            : width < 600
            ? "1rem"
            : width > 1399
            ? "0.1rem"
            : "0rem",
        overflowX: "auto",
        "::-webkit-scrollbar": {
          height: "3px",
        },
        "::-webkit-scrollbar-track": {
          background: "none",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
      }}
    >
      <div
        style={{
          width:
            nonZeroData.length > 18 && width < 1400 && width > 899
              ? totalChartWidth
              : width < 900 && width > 599
              ? "100%"
              : width < 600
              ? totalChartWidth
              : width > 1399
              ? "100%"
              : "97%",
          height: "250px",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </Box>
  );
};

export default Graph1;
