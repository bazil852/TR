import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import * as Chartjs from "chart.js";
import { useMemo, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
  const maxVal = Math.max(...dataArray);
  const adjustedMax = Math.ceil((maxVal + 1) / 500) * 600;
  const stepSize = adjustedMax / 10 < 250 ? 50 : adjustedMax / 5;

  const [width, setWidth] = useState(globalThis?.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  const data = useMemo(
    () => ({
      labels: labelsToShow,
      datasets: [
        {
          label: "$ of Earnings",
          data: nonZeroData,
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

  let multiplier;
  if (nonZeroData.length === 1) {
    multiplier = 90;
  } else if (nonZeroData.length === 2) {
    multiplier = 75;
  } else if (nonZeroData.length === 3) {
    multiplier = 65;
  } else if (nonZeroData.length === 4) {
    multiplier = 55;
  } else if (nonZeroData.length === 5) {
    multiplier = 45;
  } else if (nonZeroData.length === 6) {
    multiplier = 35;
  } else if (nonZeroData.length === 9) {
    multiplier = 30;
  } else if (nonZeroData.length === 10) {
    multiplier = 30;
  } else if (nonZeroData.length === 11) {
    multiplier = 30;
  } else if (nonZeroData.length === 12) {
    multiplier = 30;
  } else if (nonZeroData.length >= 13 && nonZeroData.length <= 24) {
    multiplier = 30;
  } else if (nonZeroData.length > 24) {
    multiplier = 20;
  } else {
    multiplier = 30;
  }

  const graphWidth = labelsToShow.length * multiplier;
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
              ? graphWidth
              : width < 900 && width > 599
              ? "100%"
              : width < 600 && width > 420 && nonZeroData.length < 21
              ? "100%"
              : width < 600 && width > 420 && nonZeroData.length > 20
              ? graphWidth
              : width < 421 && nonZeroData.length < 13
              ? "100%"
              : width < 421 && nonZeroData.length > 12
              ? graphWidth
              : width > 1399
              ? "100%"
              : "100%",
          height: "250px",
          marginTop: "-0.15rem",
        }}
      >
        <Line data={data} options={options} />
      </div>
    </Box>
  );
};

export default Graph2;
