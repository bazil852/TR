import PrivateHeader from "../components/layout/PrivateHeader";
import React, { useEffect, useState } from "react";
import { Box, Modal, Typography, Backdrop, Fade, Grid } from "@mui/material";
import ReactPlayer from "react-player";
import { Video } from "../utils/icons";
import ExchangeTable from "../components/cards/exchange-table/ExchangeTable";

import { getSession } from "next-auth/react";
import TotalPortfolioAndInvestedDeals from "../components/cards/total-portfolio-invested-deals/TotalPortfolioAndInvestedDeals";

import ActiveTrades from "../components/cards/total-deals-total-invested-deals/ActiveTrades";
import { useSelector } from "react-redux";
import ConsolidatedPortfolio from "../components/cards/consolidated-invested-portfolio/ConsolidatedPortfolio";
import InvestedPortfolio from "../components/cards/consolidated-invested-portfolio/InvestedPortfolio";
import SpotFuturePieChart from "../components/cards/spot-future-pie-chart/SpotFuturePieChart";
import PortfolioByExchange from "../components/cards/portfolio-by-exchange/PortfolioByExchange";
import CloseTrades from "../components/cards/total-deals-total-invested-deals/CloseTrades";
const moment = require("moment");

const DashboardComponent = () => {
  const [open, setOpen] = useState(false);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cryptoSymbols = [
    "BTC",
    "ETH",
    "XRP",
    "BCH",
    "LTC",
    "ADA",
    "DOT",
    "LINK",
    "XLM",
    "DOGE",
    "USDT",
    "BNB",
    "XMR",
    "UNI",
    "EOS",
    "TRX",
    "XTZ",
    "VET",
    "DASH",
    "ZEC",
  ];
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [totalAssets, setTotalAssets] = useState([]);
  const [allExchangesWithAssets, setAllExchangesWithAssets] = useState([]);
  const [exchangeList, setExchangeList] = useState([]);
  const [balanceHistoryList, setBalanceHistoryList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);

  const [assets, setAssets] = useState([]);
  const [allExchangesAssets, setAllExchangesAssets] = useState([]);

  const [totalAggregateValue, setTotalAggregateValue] = useState(0);

  const [
    totalAggregateValue24hChange,
    setTotalAggregateValue24hChange,
  ] = useState(0);
  const [
    totalAggregateValue7DaysChange,
    setTotalAggregateValue7DaysChange,
  ] = useState(0);
  const [
    totalAggregateValue30DaysChange,
    setTotalAggregateValue30DaysChange,
  ] = useState(0);

  useEffect(() => {
    fetchPortfoliosFromUserId();
    fetchBalanceHistoryFromUserId();
    // fetchAssetsFromUserInfo(false);
  }, []);

  const fetchBalanceHistoryFromUserId = async () => {
    const { user } = await getSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}balance-history/user/${user.id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log("idr", data);

    if (response.ok) {
      const currentMonth = moment().format("MM");
      let totalBalance = 0;

      const newExchanges = data.map((item) => {
        let percentageChange;
        console.log("MAP FUNCTION", item);
        // Step 1: Sort the balanceHistory array by date in descending order
        item.balanceHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Step 2: Get the latest balance
        const latestBalance = item.balanceHistory[0].balance;

        // Step 3: Find the latest balance from one month ago
        const oneMonthAgo = new Date(item.balanceHistory[0].date);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        // Filter all the records from the last month
        const lastMonthRecords = item.balanceHistory.filter((record) => {
          const recordDate = new Date(record.date);
          return recordDate <= oneMonthAgo;
        });

        // Sort the records from last month to find the latest
        lastMonthRecords.sort((a, b) => new Date(b.date) - new Date(a.date));

        // If there's no data from one month ago, we can't calculate the percentage change.
        if (lastMonthRecords.length === 0) {
          console.log(
            "No data from one month ago to calculate percentage change."
          );
        } else {
          const lastMonthBalance = lastMonthRecords[0].balance;

          // Step 4: Calculate the percentage change
          percentageChange =
            ((latestBalance - lastMonthBalance) / lastMonthBalance) * 100;

          console.log(
            `The change in balance over the last month is ${percentageChange.toFixed(
              2
            )}%`
          );
        }
        return {
          exchange_type: item.exchange.exchange_type,
          profitOrLoss: percentageChange.toFixed(2),
        };
      });
      console.log("exchange", newExchanges);
      setExchangeList(newExchanges);

      data.forEach((item) => {
        item.balanceHistory.forEach((entity) => {
          const month = moment(entity.date).format("MM");
          if (month === currentMonth) {
            console.log(month, currentMonth);
            totalBalance += entity.balance;
          }
        });
      });

      console.log(totalBalance);

      const balanceArray = [];

      for (let i = 1; i <= 12; i++) {
        if (i === parseInt(currentMonth, 10)) {
          balanceArray.push(totalBalance);
        } else {
          balanceArray.push(0);
        }
      }

      console.log(balanceArray);

      const monthlyBalances = new Array(12).fill(0);

      data.forEach((portfolio) => {
        const latestMonthlyEntries = {};

        portfolio.balanceHistory.forEach((entry) => {
          const date = new Date(entry.date);
          const monthIndex = date.getUTCMonth();

          // Check if there's already an entry for this month
          if (!latestMonthlyEntries[monthIndex]) {
            latestMonthlyEntries[monthIndex] = entry;
          } else {
            const existingDate = new Date(
              latestMonthlyEntries[monthIndex].date
            );

            // Replace if the new entry is more recent
            if (date > existingDate) {
              latestMonthlyEntries[monthIndex] = entry;
            }
          }
        });

        // Add up the latest monthly balances from this portfolio to the overall balances
        for (const [monthIndex, entry] of Object.entries(
          latestMonthlyEntries
        )) {
          monthlyBalances[monthIndex] += entry.balance;
        }
      });

      console.log(monthlyBalances);

      setBalanceHistoryList(monthlyBalances);
    }
  };
  const fetchPortfoliosFromUserId = async () => {
    const { user } = await getSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}portfolios/user/${user.id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log("data of the polar area maybe", data);

    if (response.ok) {
      setAllExchangesWithAssets(data);
      let totalBalance = 0;

      data.forEach((obj) => {
        const { portfolio } = obj;
        console.log(portfolio);
        if (portfolio) {
          totalBalance += portfolio.balance;
        }
      });

      console.log("total PortFolio", totalBalance);
      setTotalPortfolioValue(totalBalance);
      console.log("data", data);
      const newArray = data.map((item) => {
        return [...item.assets];
      });
      console.log("new array", newArray);

      const combinedAssets = {};

      newArray.forEach((array) => {
        array.forEach((obj) => {
          const { coin_name, quantity, usdt_price } = obj;
          console.log("checking object here", obj);
          if (combinedAssets.hasOwnProperty(coin_name)) {
            combinedAssets[coin_name].quantity += parseFloat(quantity);
            combinedAssets[coin_name].usdt_price += parseFloat(usdt_price);
          } else {
            combinedAssets[coin_name] = {
              coin_name,
              quantity: parseFloat(quantity),
              usdt_price: parseFloat(usdt_price),
            };
          }
        });
      });

      console.log("combined assets here!!", combinedAssets);
      const combinedArray = Object.values(combinedAssets);

      console.log(combinedArray);
      setTotalAssets(combinedArray);
      setLoading(false);
    }
  };

  const totalPortfolio = [
    {
      name: "Total Portfolio",
      total: 865200,
      lastWeek: 0,
      lastMonth: 0,
      days: 6,
      graph: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];
  const investedInDeals = [
    {
      name: "Invested in trades",
      total: 0,
      lastWeek: 0,
      lastMonth: 0,
      days: 7,
      graph: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];
  const totalDeals = [
    {
      name: "Active Trades",
      totalTrades: 0,
      buy: "BUY",
      sell: "SELL",
      sellDetail: "1BTC at 29230 USDT for a total of 29230",
      buyDetail: "1BTC at 29230 USDT for a total of 29230 ",
    },
  ];
  const closedTrades = [
    {
      name: "Closed Trades",
      totalTrades: 0,
      lastWeek: 0,
      lastMonth: 0,
    },
  ];
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Box mb={8} mt={"85px"} minHeight={"100%"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: width < 600 && "left",
          minWidth: "100%",
          flexDirection: width < 600 && "column",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontSize: "2.2rem",
              fontWeight: 600,
              ml: 1,
              fontFamily: "Barlow, san-serif",
            }}
          >
            Portfolio Dashboard
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              ml: 1,
              mb: 1,
              fontFamily: "Barlow, san-serif",
              color: "#ACB2B7",
            }}
          >
            Detailed portfolio and trades
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#2A2C2D",
              borderRadius: 2,
              border: "1px solid #393B3C",
              gap: 1,
              width: 155,
              height: 35,
              cursor: "pointer",
              "&:active": {
                backgroundColor: "#434546",
              },
            }}
            onClick={handleOpen}
          >
            <Video />
            <Typography
              sx={{
                color: "white",
                fontFamily: "Barlow, san-serif",
                whiteSpace: "nowrap",
                mt: -0.3,
              }}
            >
              Dashboard Guide
            </Typography>
          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "90vw",
                  margin: "auto",
                }}
              >
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=0fPQ1lNAUbY"
                  playing
                />
              </Box>
            </Fade>
          </Modal>
        </Box>
      </Box>

      <Grid
        container
        spacing={"20px"}
        mt={0}
        alignContent={"stretch"}
        minHeight={115}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={isDrawerOpen && width > 999 ? 6 : 3.5}
          lg={3.5}
        >
          <TotalPortfolioAndInvestedDeals
            data={totalPortfolio}
            totalBalance={totalPortfolioValue}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={isDrawerOpen && width > 999 ? 6 : 3.5}
          lg={3.5}
        >
          <TotalPortfolioAndInvestedDeals
            data={investedInDeals}
            totalBalance={0}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={isDrawerOpen && width > 999 ? 6 : 3}
          lg={3}
        >
          <ActiveTrades data={totalDeals} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={isDrawerOpen && width > 999 ? 6 : 2}
          lg={2}
        >
          <CloseTrades data={closedTrades} />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={"20px"}
        mt={"0px"}
        alignContent={"stretch"}
        minHeight={320}
      >
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ConsolidatedPortfolio totalAssets={totalAssets} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <InvestedPortfolio totalBalance={totalPortfolioValue} />
        </Grid>
      </Grid>

      <div>
        <ExchangeTable
          data={allExchangesWithAssets}
          // assets={assets}
          // handleRefresh={handleRefresh}
          // allExchangesAssets={allExchangesAssets}
          loading={loading}
        />
      </div>
      <PortfolioByExchange
        coins={exchangeList}
        balanceHistory={balanceHistoryList}
      />
      <SpotFuturePieChart data={allExchangesWithAssets} />
    </Box>
  );
};

function dashboard() {
  return (
    <PrivateHeader
      title="Dashboard"
      current="0"
      Component={DashboardComponent}
    />
  );
}

export default dashboard;
