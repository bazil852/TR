import { useState } from "react";
import { Bar } from "react-chartjs-2";
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
import Card from "@mui/material/Card";
import { Box, CardContent } from "@mui/material";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ProfitByDay() {
  const [data, setData] = useState({
    labels: ["22 June", "24 June", "26 June", "28 June", "30 June"],
    datasets: [
      {
        label: "First Dataset",
        data: [25, 50, 50, 25, 50, 75, 100, 100, 125, 25, 50],
        backgroundColor: "#44816E",
        borderColor: "#44816E",
        tension: 0.4,
        fill: true,
        borderWidth: 1,
        barThickness: 15,
        borderRadius: 50,
        // pointStyle: "rect",
        // pointBorderColor: "blue",
        // pointBackgroundColor: "#fff",
        showLine: true,
      },
    ],
  });
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawTicks: false,
        },
      },
    },
  };
  return (
    <Card
      sx={{
        background: "linear-gradient(#300348,#3C1249)",
        minHeight: "400px",
        minWidth: "300px",
        borderRadius:"8px"
      }}
    >
      <CardContent sx={{ padding: "0px" }}>
        <Typography sx={{ fontSize: 18, p: "20px" }} color="White">
          Profit By Day
        </Typography>
        <Box sx={{ visibility: "hidden" }}>
          <hr />
        </Box>
        <div style={{ padding: "20px", minHeight: "400px" }}>
          <Bar style={{ minHeight: "300px" }} data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfitByDay;
