import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: "red",
        },
      },
    ],
  },
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,

  plugins: {
    labels: {
      fontColor: "blue",
      fontSize: 18,
    },
    legend: {
      position: "right",
      display: false,
    },
  },
};

const BotsProgress = ({ heading }) => {
  const widthAbove1600 = useSelector((state) => state.dashboardWidth.value);
  const [data, setData] = useState({
    labels: [
      "BTC Long Bot",
      "ETH Long Bot",
      "Sol Long",
      "Link Long Bot",
      "Matic Long Bot",
    ],
    datasets: [
      {
        label: "First Dataset",
        data: [1, 2, 1, 3, 5, 7, 5, 5],
        backgroundColor: "#FFA412",
        borderColor: "#FFA412",
        barThickness: 10,
        categoryPercentage: 0.8,
        barPercentage: 0.8,
        borderRadius: 5,
      },
    ],
  });
  return (
    <Card
      sx={{
        minWidth: 200,
        minHeight: widthAbove1600<1600 ? 340 : 357,
        maxHeight: widthAbove1600 < 1600 ? "auto" : 357,
        background: "#2D1537",
        borderRadius: "8px",
        pt: 1,
      }}
    >
      <CardContent>
        <Stack alignItems="center" direction="row" spacing={1}>
          <SignalCellularAltIcon />
          <Typography>{heading}</Typography>
        </Stack>
        <Bar options={options} data={data} />
      </CardContent>
    </Card>
  );
};

export default BotsProgress;
