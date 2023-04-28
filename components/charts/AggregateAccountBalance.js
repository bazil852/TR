import { useState, useEffect } from "react";
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

const ccxt = require("ccxt");
import { signIn, getSession, useSession } from "next-auth/react";

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
// const doughnutData = {
//   labels: false,
//   datasets: [
//     {
//       data: [200, 1000, 100],
//       backgroundColor: ["#795BFF", "#FFA412", "#666666"],
//       hoverBackgroundColor: ["#795BFF", "#FFA412", "#666666"],
//       borderWidth: 0,
//     },
//   ],
// };

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

const dates = [];

for (let i = 0; i <= 30; i++) {
  const date = new Date();
  date.setDate(date.getDate() - i);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const dateString = `${month} ${day}`;
  dates.push(dateString);
}

console.log(dates);

console.log("Dates", dates);

function AggregateAccountBalance(props) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [doughnutData, setDoughnutData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchAllWallet();
  }, []);

  const fetchAllWallet = async () => {
    const { user } = await getSession();
    const getWalletData = await fetch(
      `/api/wallet/get-all-wallet?id=${user.id}`,
      {
        method: "GET",
      }
    );
    const walletData = await getWalletData.json();
    console.log(walletData.body);

    let chartData = {
      labels: [],
      datasets: [],
    };

    let assetData = {};

    if (walletData.body.length > 0) {
      const data = {
        labels: getAssetLabels(
          walletData.body[walletData.body.length - 1].assets
        ),
        datasets: [
          {
            data: getAssetBalances(
              walletData.body[walletData.body.length - 1].assets
            ),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          },
        ],
      };
      console.log(data);
      setDoughnutData(data);

      // Extract data from the array of objects and create an object with assets as keys
      await walletData?.body?.forEach((doc) => {
        const date = doc.created.substring(5, 10);
        chartData.labels.push(date);
        doc.assets.forEach((asset) => {
          if (!assetData[asset.asset]) {
            assetData[asset.asset] = {
              label: asset.asset,
              data: [],
              backgroundColor: "transparent",
              borderColor: getRandomColor(),
              borderWidth: 2,
            };
          }
          assetData[asset.asset].data.push(asset.usdtBal);
        });
      });

      // Add datasets to the chart data
      await Object.keys(assetData).forEach((key) => {
        chartData.datasets.push(assetData[key]);
      });

      setChartData(chartData);
    }
  };

  console.log(doughnutData);

  function getAssetLabels(assets) {
    return assets.map((asset) => asset.asset);
  }

  function getAssetBalances(assets) {
    return assets.map((asset) => asset.usdtBal);
  }
  // Generate a random color
  function getRandomColor() {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 1)`;
  }

  const data = {
    labels: dates,
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
  const doughnutOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
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
                    <Doughnut data={doughnutData} options={doughnutOptions} />
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
                    <Line data={chartData} options={options} />
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
