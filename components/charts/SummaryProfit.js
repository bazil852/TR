import { useState } from "react";
import { Line } from "react-chartjs-2";
import Typography from "@mui/material/Typography";
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
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
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

function SummaryProfit() {
  const [data, setData] = useState({
    labels: ["22 June", "24 June", "26 June", "28 June", "30 June"],
    datasets: [
      {
        label: "First Dataset",
        data: [25, 50, 50, 25, 50, 75, 100, 100, 125, 25, 50],
        backgroundColor: "#3E3655",
        borderColor: "#406A64",

        tension: 0.4,
        fill: true,
        // pointStyle: "rect",
        // pointBorderColor: "blue",
        // pointBackgroundColor: "#fff",
        showLine: true,
      },
    ],
  });
  const options = {
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "white",
          drawTicks: false,
          lineWidth: 0.4,
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
        borderRadius: "8px",
      }}
    >
      <CardContent sx={{ padding: "0px" }}>
        <Typography sx={{ fontSize: 18, p: "20px" }} color="White">
          Summary Profit
        </Typography>
        <hr sx={{ border: "1x solid #7A8580" }} />
        <div style={{ minHeight: "400px", padding: "20px" }}>
          <Line style={{ minHeight: "300px" }} data={data} options={options}>
            Hello
          </Line>
        </div>
      </CardContent>
    </Card>
  );
}

export default SummaryProfit;
