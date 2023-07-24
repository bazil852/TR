import PrivateHeader from "../components/layout/PrivateHeader";
import React, { useEffect, useState } from "react";
import AggregateAccountBalance from "../components/charts/AggregateAccountBalance";
import {
  Box,
  Modal,
  Typography,
  Backdrop,
  Fade,
  Grid,
  Button,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import ReactPlayer from "react-player";
import { Video } from "../utils/icons";
import ExchangeTable from "../components/cards/exchange-table/ExchangeTable";

import { getSession } from "next-auth/react";
import TotalPortfolioAndInvestedDeals from "../components/cards/total-portfolio-invested-deals/TotalPortfolioAndInvestedDeals";

import TotalAndInvestedDeals from "../components/cards/total-deals-total-invested-deals/TotalAndInvestedDeals";
import { useSelector } from "react-redux";
import ConsolidatedPortfolio from "../components/cards/consolidated-invested-portfolio/ConsolidatedPortfolio";
import InvestedPortfolio from "../components/cards/consolidated-invested-portfolio/InvestedPortfolio";
import SpotFuturePieChart from "../components/cards/spot-future-pie-chart/SpotFuturePieChart";
import PortfolioByExchange from "../components/cards/portfolio-by-exchange/PortfolioByExchange";
const moment = require("moment");

const ccxt = require("ccxt");

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

  //New useStates
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [totalAssets, setTotalAssets] = useState([]);
  const [allExchangesWithAssets, setAllExchangesWithAssets] = useState([]);
  const [exchangeList, setExchangeList] = useState([]);
  const [balanceHistoryList, setBalanceHistoryList] = useState([]);

  //Old ones
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
    console.log(data);

    if (response.ok) {
      const currentMonth = moment().format("MM");
      let totalBalance = 0;

      data.forEach((item) => {
        const month = moment(item.balanceHistory.date).format("MM");
        if (month === currentMonth) {
          totalBalance += item.balanceHistory.balance;
        }
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
      setBalanceHistoryList(balanceArray);
    }
  };

  const handleAssetsRefresh = async () => {
    setRefreshLoading(true);
    const { user } = await getSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}portfolios/refresh/user/${user.id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);

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
      const newExchanges = data.map((item) => {
        return { exchange_type: item.exchange.exchange_type, profitOrLoss: 0 };
      });
      console.log("exchange", newExchanges);
      setExchangeList(newExchanges);
      console.log("data", data);
      const newArray = data.map((item) => {
        return [...item.assets];
      });
      console.log(newArray);

      // Combine the assets
      const combinedAssets = {};

      newArray.forEach((array) => {
        array.forEach((obj) => {
          const { asset, availableBalance, usdt_price } = obj;
          if (combinedAssets.hasOwnProperty(asset)) {
            combinedAssets[asset].availableBalance += parseFloat(
              availableBalance
            );
            combinedAssets[asset].usdt_price += parseFloat(usdt_price);
          } else {
            combinedAssets[asset] = {
              asset,
              availableBalance: parseFloat(availableBalance),
              usdt_price: parseFloat(usdt_price),
            };
          }
        });
      });

      // Convert the combined assets object to an array
      const combinedArray = Object.values(combinedAssets);

      console.log(combinedArray);
      setTotalAssets(combinedArray);
      setRefreshLoading(false);
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
    console.log(data);

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
      const newExchanges = data.map((item) => {
        return { exchange_type: item.exchange.exchange_type, profitOrLoss: 0 };
      });
      console.log("exchange", newExchanges);
      setExchangeList(newExchanges);
      console.log("data", data);
      const newArray = data.map((item) => {
        return [...item.assets];
      });
      console.log(newArray);

      // Combine the assets
      const combinedAssets = {};

      newArray.forEach((array) => {
        array.forEach((obj) => {
          const { asset, availableBalance, usdt_price } = obj;
          if (combinedAssets.hasOwnProperty(asset)) {
            combinedAssets[asset].availableBalance += parseFloat(
              availableBalance
            );
            combinedAssets[asset].usdt_price += parseFloat(usdt_price);
          } else {
            combinedAssets[asset] = {
              asset,
              availableBalance: parseFloat(availableBalance),
              usdt_price: parseFloat(usdt_price),
            };
          }
        });
      });

      // Convert the combined assets object to an array
      const combinedArray = Object.values(combinedAssets);

      console.log(combinedArray);
      setTotalAssets(combinedArray);
      setLoading(false);
    }
  };

  const fetchAssetsFromUserInfo = async (save) => {
    const { user } = await getSession();
    const response = await fetch(`/api/user/get-user-info?id=${user.id}`, {
      method: "GET",
    });
    const data = await response.json();

    let exchangesAssets = await Promise.all(
      data.body.exchanges.map((item) => handleExchangesAssets(item))
    );
    setAllExchangesAssets(exchangesAssets);

    console.log(exchangesAssets);

    if (data.body.exchanges[0]) {
      const { USDMClient } = require("binance");
      const baseUrl = "https://testnet.binancefuture.com";
      const client = new USDMClient({
        api_key: data.body.exchanges[0].apiKey,
        api_secret: data.body.exchanges[0].apiSecret,
        baseUrl,
        recvWindow: 10000,
      });

      let filteredAssets;

      await client
        .getBalance()
        .then(async (result) => {
          filteredAssets = result.filter(
            (item) => parseFloat(item.balance) !== 0
          );
        })
        .catch((err) => {
          console.error("getBalance error: ", err);
        });

      if (filteredAssets?.length > 0) {
        const binance = new ccxt.binance();
        let totalValue = 0;
        for (const asset of filteredAssets) {
          if (asset.asset === "USDT") {
            totalValue += parseFloat(asset.balance);

            asset["usdtBal"] = asset.balance;
          } else {
            const symbol = `${asset.asset}/USDT`;
            const ticker = await binance.fetchTicker(symbol);
            const usdtPrice = ticker.last;
            const usdtBalance = parseFloat(asset.balance) * usdtPrice;
            totalValue += usdtBalance;
            asset["usdtBal"] = usdtBalance;
          }
        }

        if (save) {
          let reqBody = {
            exchangeId: data.body.exchanges[0]._id,
            userId: user.id,
            assets: filteredAssets,
          };
          const response = await fetch("/api/wallet/create-wallet", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
        const walletYesterdayData = await fetch(
          `/api/wallet/get-yesterday-wallet?id=${user.id}`,
          {
            method: "GET",
          }
        );
        const walletData = await walletYesterdayData.json();

        if (walletData.body) {
          let prevTotalValue = 0;
          for (const asset of walletData?.body?.assets) {
            if (asset.asset === "USDT") {
              prevTotalValue += parseFloat(asset.balance);
            } else {
              const symbol = `${asset.asset}/USDT`;
              const ticker = await binance.fetchTicker(symbol);
              const usdtPrice = ticker.last;
              const usdtBalance = parseFloat(asset.balance) * usdtPrice;
              prevTotalValue += usdtBalance;
            }
          }
          let last24hChange =
            ((totalValue - prevTotalValue) / prevTotalValue) * 100;

          setTotalAggregateValue24hChange(last24hChange.toFixed(4));
        } else {
          setTotalAggregateValue24hChange("NA");
        }

        const walletSevenDaysData = await fetch(
          `/api/wallet/get-seven-days-wallet?id=${user.id}`,
          {
            method: "GET",
          }
        );
        const walletSevenDays = await walletSevenDaysData.json();

        if (walletSevenDays.body) {
          let prev7DaysTotalValue = 0;
          for (const asset of walletData?.body?.assets) {
            if (asset.asset === "USDT") {
              prev7DaysTotalValue += parseFloat(asset.balance);
            } else {
              const symbol = `${asset.asset}/USDT`;
              const ticker = await binance.fetchTicker(symbol);
              const usdtPrice = ticker.last;
              const usdtBalance = parseFloat(asset.balance) * usdtPrice;
              prev7DaysTotalValue += usdtBalance;
            }
          }
          let last7DaysChange =
            ((totalValue - prev7DaysTotalValue) / prev7DaysTotalValue) * 100;

          setTotalAggregateValue7DaysChange(last7DaysChange.toFixed(4));
        } else {
          setTotalAggregateValue7DaysChange("NA");
        }

        const walletThirtyDaysData = await fetch(
          `/api/wallet/get-one-month-wallet?id=${user.id}`,
          {
            method: "GET",
          }
        );
        const walletThirtyDays = await walletThirtyDaysData.json();

        // if (walletThirtyDays.body) {
        //   let prev30DaysTotalValue = 0;
        //   for (const asset of walletData?.body?.assets) {
        //     if (asset.asset === "USDT") {
        //       prev30DaysTotalValue += parseFloat(asset.balance);
        //     } else {
        //       const symbol = `${asset.asset}/USDT`;
        //       const ticker = await binance.fetchTicker(symbol);
        //       const usdtPrice = ticker.last;
        //       const usdtBalance = parseFloat(asset.balance) * usdtPrice;
        //       prev30DaysTotalValue += usdtBalance;
        //     }
        //   }
        //   let last30DaysChange =
        //     ((totalValue - prev30DaysTotalValue) / prev30DaysTotalValue) * 100;

        //   setTotalAggregateValue30DaysChange(last30DaysChange.toFixed(4));
        // } else {
        //   setTotalAggregateValue30DaysChange("NA");
        // }

        filteredAssets.forEach((latestObj) => {
          const previousObj = walletData?.body?.assets.find(
            (previousObj) => previousObj.asset === latestObj.asset
          );
          if (previousObj) {
            const change =
              ((parseFloat(latestObj.balance) -
                parseFloat(previousObj.balance)) /
                parseFloat(previousObj.balance)) *
              100;
            latestObj.change = change.toFixed(4);
          } else {
            latestObj.change = "0";
          }
        });
        setAssets(filteredAssets);
      }
    }
    setLoading(false);
  };

  const handleExchangesAssets = async (exchange) => {
    const { user } = await getSession();
    console.log(exchange);
    let client;
    if (exchange?.exchangeName === "Binance Futures Testnet") {
      console.log("testnet");
      const { USDMClient } = require("binance");
      const baseUrl = "https://testnet.binancefuture.com";
      client = new USDMClient({
        api_key: exchange?.apiKey,
        api_secret: exchange?.apiSecret,
        baseUrl,
        recvWindow: 10000,
      });
    }
    if (exchange?.exchangeName === "Binance Futures") {
      console.log("future");
      const { USDMClient } = require("binance");
      client = new USDMClient({
        api_key: exchange?.apiKey,
        api_secret: exchange?.apiSecret,
        recvWindow: 10000,
      });
    }
    if (exchange?.exchangeName === "Binance Spot") {
      console.log("spot");
      const { MainClient } = require("binance");
      client = new MainClient({
        api_key: exchange?.apiKey,
        api_secret: exchange?.apiSecret,
      });
    }

    let filteredAssets;

    if (exchange?.exchangeName === "Binance Spot") {
      console.log("get spot");
      let result;
      console.log("Testing new server.");
      await fetch("https://binance1.herokuapp.com/api/binance/balances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exchange),
      })
        .then((response) => response.json())
        .then((data) => {
          result = data.filter((item) => cryptoSymbols.includes(item.coin));
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      console.log("getBalance result: ", result);
      filteredAssets = result.map((item) => {
        return {
          accountAlias: "FzmYfWFzSgSgsR",
          asset: item.coin,
          balance: item.free,
          crossWalletBalance: item.free,
          crossUnPnl: "0.00000000",
          availableBalance: item.free,
          maxWithdrawAmount: item.free,
        };
      });
      console.log(filteredAssets);
    } else {
      console.log("get other");
      await client
        .getBalance()
        .then(async (result) => {
          console.log(result);
          filteredAssets = result.filter(
            (item) => parseFloat(item.balance) !== 0
          );
        })
        .catch((err) => {
          console.error("getBalance error: ", err);
        });
    }

    if (filteredAssets?.length > 0) {
      const binance = new ccxt.binance();
      let totalValue = 0;
      for (const asset of filteredAssets) {
        if (asset.asset === "USDT") {
          totalValue += parseFloat(asset.balance);

          asset["usdtBal"] = asset.balance;
        } else {
          const symbol = `${asset.asset}/USDT`;
          const ticker = await binance.fetchTicker(symbol);
          const usdtPrice = ticker.last;
          const usdtBalance = parseFloat(asset.balance) * usdtPrice;
          totalValue += usdtBalance;
          asset["usdtBal"] = usdtBalance;
        }
      }
      if (exchange?.exchangeName !== "Binance Futures Testnet") {
        setTotalAggregateValue((prevTotal) => prevTotal + totalValue);
      }
    }
    const walletYesterdayData = await fetch(
      `/api/wallet/get-yesterday-wallet?id=${user.id}`,
      {
        method: "GET",
      }
    );
    const walletData = await walletYesterdayData.json();
    if (walletData.body) {
      filteredAssets.forEach((latestObj) => {
        const previousObj = walletData?.body?.assets.find(
          (previousObj) => previousObj.asset === latestObj.asset
        );
        if (previousObj) {
          const change =
            ((parseFloat(latestObj.balance) - parseFloat(previousObj.balance)) /
              parseFloat(previousObj.balance)) *
            100;
          latestObj.change = change.toFixed(4);
        } else {
          latestObj.change = "0";
        }
      });
    }

    console.log(filteredAssets);
    return {
      exchangeName: `${exchange.name} - ${exchange.exchangeName}`,
      exchangeAssets: filteredAssets,
    };
  };

  const handleRefresh = () => {
    fetchAssetsFromUserInfo(true);
  };

  const totalPortfolio = [
    {
      name: "Total Portfolio",
      total: 865200,
      lastWeek: 0,
      lastMonth: 0,
      graph: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];
  const investedInDeals = [
    {
      name: "Invested in Deals",
      total: 0,
      lastWeek: 0,
      lastMonth: 0,
      graph: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];
  const totalDeals = [
    {
      name: "Total Deals",
      total: 0,
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
    <Box mt={8} minHeight={"100%"}>
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
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              sx={{
                fontSize: "2.2rem",
                fontWeight: 600,
                ml: 1,
                fontFamily: "Barlow, san-serif",
              }}
            >
              Dashboard
            </Typography>

            <Button onClick={handleAssetsRefresh}>Refresh</Button>
            {refreshLoading && <CircularProgress />}
          </Box>
          <Typography
            sx={{
              fontSize: "0.9rem",
              ml: 1,
              mb: 1,
              fontFamily: "Barlow, san-serif",
              color: "#ACB2B7",
            }}
          >
            All your accounts in the same place
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

      <Grid container spacing={1} mt={3}>
        <Grid item xs={12} sm={6} md={isDrawerOpen ? 6 : 3.5} lg={3.5}>
          <TotalPortfolioAndInvestedDeals
            data={totalPortfolio}
            totalBalance={totalPortfolioValue}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={isDrawerOpen ? 6 : 3.5} lg={3.5}>
          <TotalPortfolioAndInvestedDeals
            data={investedInDeals}
            totalBalance={0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={isDrawerOpen ? 6 : 2.5} lg={2.5}>
          <TotalAndInvestedDeals data={totalDeals} />
        </Grid>
        <Grid item xs={12} sm={6} md={isDrawerOpen ? 6 : 2.5} lg={2.5}>
          <TotalAndInvestedDeals data={investedInDeals} />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        mt={1}
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
