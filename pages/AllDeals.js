import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Stats, Profit, Deals, Balance } from "../utils/icons";
import Filter from "../components/deal-page/Filter";
import OverallStats from "../components/deal-page/OverallStats";
import Balances from "../components/deal-page/Balances";
import DealsProfit from "../components/deal-page/DealsProfit";
import PrivateHeader from "../components/layout/PrivateHeader";
import DealTable from "../components/deal-page/DealTable";
import { getSession } from "next-auth/react";

const AllDeals = () => {
  const [strategyData, setStrategyData] = useState([]);

  const [assetsData, setAssetsData] = useState([]);

  const [cardData, setCardData] = useState([]);

  const [todaysProfitData, setTodaysProfitData] = useState([]);

  const [totalProfitData, setTotalProfitData] = useState([]);

  const [activeDeals, setActiveDeals] = useState([]);

  useEffect(() => {
    fetchStrategyAndOrder();
  }, []);

  const fetchStrategyAndOrder = async () => {
    const { user } = await getSession();
    const strategyResponse = await fetch(
      `/api/strategy/get-strategy-and-order?id=${user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const strategyData = await strategyResponse.json();
    console.log(strategyData.body);

    setStrategyData(
      strategyData.body?.filter((item) => item.strategy?.state === "on")
    );

    let activeDeals = 0;

    strategyData.body.forEach((item) => {
      if (item.strategy.state === "on") {
        activeDeals += 1;
      }
    });
    setActiveDeals(activeDeals);

    let noOfOrders = 0;

    const allOrders = strategyData.body.map((item) => {
      if (item.length > 0) {
        noOfOrders += item.length;
      }
      return { ...item?.order };
    });
    // console.log(allOrders, noOfOrders);

    const nestedObjectCount = strategyData.body.reduce((count, obj) => {
      const objKeys = Object.keys(obj);
      return count + Math.max(objKeys.length - 1, 0);
    }, 0);

    console.log("Number of Nested Objects:", nestedObjectCount);

    const totalProfitSum = allOrders.reduce((sum, obj) => {
      const totalProfitValues = Object.values(obj);
      const totalProfits = totalProfitValues.map(
        (item) => item.totalProfit || 0
      );
      return sum + totalProfits.reduce((acc, val) => acc + val, 0);
    }, 0);

    // const averageTotalProfit = totalProfitSum / nestedArray.length;
    setTotalProfitData(totalProfitSum);

    console.log("Total Profit Sum:", totalProfitSum);
    // console.log("Average Total Profit:", averageTotalProfit);

    const walletResponse = await fetch(
      `/api/wallet/get-latest-wallet?id=${user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const walletData = await walletResponse.json();

    setAssetsData(walletData?.body?.assets);
    const totalUsdtBal = walletData?.body?.assets?.reduce(
      (sum, item) => sum + item.usdtBal,
      0
    );

    const cardData = [
      {
        image: Stats,
        title: "Overall Stats",
        // text: "Dictumst nulla",
        amount: totalProfitSum ? `$${totalProfitSum.toFixed(2)}` : "$0",
      },
      {
        image: Profit,
        title: "Average Profit",
        // text: "Vestibulum, curabitur",
        amount: totalProfitSum
          ? `$${(totalProfitSum / nestedObjectCount).toFixed(2)}`
          : "$0",
      },
      {
        image: Deals,
        title: "Completed Deals Profit",
        // text: " Arcu ut",
        amount: "$0",
      },
      {
        image: Balance,
        title: "Balances",
        // text: " Pretium non",
        amount: totalUsdtBal ? `$${totalUsdtBal.toFixed(2)}` : "$0",
      },
    ];
    setCardData(cardData);
  };

  return (
    <Grid container sx={{ mt: 3, mb: 4 }}>
      <Grid container rowSpacing={1} columnSpacing={2} sx={{ mb: 4 }}>
        {cardData.map((item, index) => {
          return (
            <Grid xs={2} sm={2} md={4} lg={3} item key={index}>
              <Box
                sx={{
                  display: "flex",
                  p: 2,
                  pl: 4,
                  justifyContent: "flex-start",
                  height: "150px",
                  alignItems: "center",
                  borderRadius: "5px",
                  // background:
                  //   "linear-gradient( #3E124B, rgba(41, 8, 77, 0.5) )",
                  background: "#790d832d",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#621B7B",
                    backgroundBlendMode: "overlay",
                    p: 1,
                    mr: 1,
                  }}
                >
                  <item.image />
                </Box>
                <Box sx={{ p: 1, width: "fit-content" }}>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "16px",
                      color: "white",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "white",
                    }}
                  >
                    {item.text}
                  </Typography>
                  <Typography
                    sx={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "17px",
                      color: "#795BFF",
                    }}
                  >
                    {item.amount}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ p: 0, m: 0, minWidth: "100%" }}>
        <Filter />
      </Box>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        rowSpacing={1}
        columnSpacing={1}
      >
        <Grid item md={6} sm={10} xs={10} lg={4}>
          <OverallStats
            totalProfit={totalProfitData}
            activeDeals={activeDeals}
          />
        </Grid>
        <Grid item md={6} sm={10} xs={10} lg={4}>
          <DealsProfit />
        </Grid>
        <Grid item md={6} sm={10} xs={10} lg={4}>
          <Balances assets={assetsData} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <DealTable strategy={strategyData} />
        </Grid>
      </Grid>
    </Grid>
  );
};
function allDeals() {
  return <PrivateHeader title="All Deals" current="5" Component={AllDeals} />;
}
export default allDeals;
