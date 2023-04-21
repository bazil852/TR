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
    x: {
      gridLines: {
        drawOnChartArea: false,
        color: "red",
        lineWidth: 1,
      },
      ticks: {
        fontColor: "white",
      },
    },

    y: {
      gridLines: {
        drawOnChartArea: false,
        color: "red",
        lineWidth: 1,
      },
      ticks: {
        display: false,
        fontColor: "white",
        beginAtZero: true,
      },
    },
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
    <Grid container>
      <Grid xs={12} item>
        <Card
          sx={{
            background: "#19191985",
            minHeight: "200px",
            // border: "1px solid #666666",
            minWidth: "400px",
            // marginBottom: "40px",
            marginTop: "1.5rem",
          }}
        >
          <CardContent sx={{ padding: "0px" }}>
            {/* <hr sx={{ border: "1px solid #7A8580" }} /> */}
            <Stack
              ml={2}
              pl={2}
              mr={2}
              mt={2}
              alignItems="center"
              direction="row"
            >
              <Grid container>
                <Grid
                  xs={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ height: 130, width: 130 }}>
                    <Doughnut data={doughnutData} />
                  </div>
                  <div>
                    <Typography
                      sx={{
                        fontSize: 22,
                        transform: "rotate(-90deg)",
                      }}
                      color="White"
                    >
                      USD
                    </Typography>
                  </div>
                </Grid>

                <Grid xs={10}>
                  <div style={{ width: "100%", height: "230px" }}>
                    <Line data={data} options={options} />
                  </div>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AggregateAccountBalance;
