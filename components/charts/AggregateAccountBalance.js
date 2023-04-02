import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Doughnut } from "react-chartjs-2";
import Stack from "@mui/material/Stack";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  Title,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);
const doughnutData = {
  labels: false,
  datasets: [
    {
      data: [200, 200, 100],
      backgroundColor: ["#795BFF", "#FFA412", "#666666"],
      hoverBackgroundColor: ["#795BFF", "#FFA412", "#666666"],
      borderWidth: 0,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
          color: "red",
          lineWidth: 1,
        },
        ticks: {
          fontColor: "white",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
          color: "red",
          lineWidth: 1,
        },
        ticks: {
          fontColor: "white",
          display: false,

          beginAtZero: true,
        },
      },
    ],
  },
};

function AggregateAccountBalance() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        fill: true,
        backgroundColor: "rgba(121, 91, 255, 0.2)",
        borderColor: "rgba(121, 91, 255, 1)",
        pointRadius: 0,
        data: [65, 59, 80, 81, 83, 67, 40],
      },
      {
        label: "Dataset 2",
        fill: true,
        backgroundColor: "rgba(255, 164, 18, 0.1)",
        borderColor: "rgba(255, 164, 18, 1)",
        pointRadius: 0,
        data: [28, 48, 40, 38, 50, 47, 70],
      },
    ],
  };

  return (
    <Card
      sx={{
        background: "#191919",
        minHeight: "400px",
        border: "1px solid #666666",
        minWidth: "400px",
        marginBottom: "40px",
      }}
    >
      <CardContent sx={{ padding: "0px" }}>
        <Typography
          sx={{ fontSize: 18, p: "20px", fontWeight: 700 }}
          color="White"
        >
          Aggregate Account Balance
        </Typography>
        <hr sx={{ border: "1px solid #7A8580" }} />
        <Stack ml={4} alignItems="center" mt={2} direction="row">
          <div style={{ height: 160, width: 160 }}>
            <Doughnut data={doughnutData} />
          </div>

          <Typography
            sx={{
              fontSize: 24,
              transform: "rotate(-90deg)",
            }}
            color="White"
          >
            USD
          </Typography>
          <div style={{ width: "100%", height: "300px" }}>
            <Line data={data} options={options} />
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default AggregateAccountBalance;
