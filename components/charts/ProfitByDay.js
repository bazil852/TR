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
import { CardContent } from "@mui/material";
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
        backgroundColor: "#795BFF",
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
  return (
    <Card
      sx={{
        background: "#191919",
        minHeight: "400px",
        border: "1px solid #666666",
        minWidth: "400px",
      }}
    >
      <CardContent sx={{ padding: "0px" }}>
        <Typography sx={{ fontSize: 18, p: "20px" }} color="White">
          Profit By Day
        </Typography>
        <hr sx={{ border: "1px solid #7A8580" }} />
        <div style={{ padding: "20px" }}>
          <Bar data={data} />
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfitByDay;
