import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Line } from "react-chartjs-2";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { InputLabel } from "@mui/material";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

const options = {
  responsive: true,
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
        },
      },
    ],
  },
};

const MyBotSummary = () => {
  const [data, setData] = useState({
    labels: ["22 June", "24 June", "26 June", "28 June", "30 June"],
    datasets: [
      {
        label: "First Dataset",
        data: [25, 50, 50, 25, 50, 75, 100, 100, 125, 25, 50],
        backgroundColor: "#262238",
        borderColor: "#795BFF",
        tension: 0.4,
        fill: true,
        // pointStyle: "rect",
        // pointBorderColor: "blue",
        // pointBackgroundColor: "#fff",
        showLine: true,
      },
    ],
  });
  const [duration, setDuration] = useState("day");
  const handleChange = (event) => {
    setDuration(event.target.value);
  };
  return (
    <Card
      sx={{
        minWidth: 600,
        background: "#191919",
        border: "1px solid #666666",
        minHeight: 450,
      }}
    >
      <CardContent>
        <Stack spacing={1} direction="row">
          <Button size="large" sx variant="contained">
            Summary Profit
          </Button>

          <Select
            inputProps={{ "aria-label": "Without label" }}
            displayEmpty
            value={duration}
            onChange={handleChange}
          >
            <MenuItem value="day">Profit By Day</MenuItem>
            <MenuItem value="week">Profit By Week</MenuItem>
            <MenuItem value="month">Profit By Month</MenuItem>
          </Select>
          <Button size="large" sx={{ color: "#CCCCCC", background: "#1F1F1F" }}>
            Profit By Pair
          </Button>
          <Button size="large" sx={{ color: "#CCCCCC", background: "#1F1F1F" }}>
            Profit By Bot
          </Button>
        </Stack>
        <div style={{ padding: "20px" }}>
          <Line options={options} data={data}>
            Hello
          </Line>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyBotSummary;
