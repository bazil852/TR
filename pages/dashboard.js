import WalletConnect from "../components/cards/wallet-connect/WalletConnect";
import PrivateHeader from "../components/layout/PrivateHeader";
import React, { useEffect, useState } from "react";
import AggregateAccountBalance from "../components/charts/AggregateAccountBalance";
// import TileChart from "../components/charts/TileChart";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import MyExchange from "../components/cards/my-exchanges/MyExchange";
import ExchangeTable from "../components/cards/exchange-table/ExchangeTable";

import { signIn, getSession, useSession } from "next-auth/react";
import CryptoRates from "../components/cards/crypto-rates/CryptoRates";
import TotalValue from "../components/cards/total-value/TotalValue";
import CryptocurrencyData from "../components/cards/crypto-currencies-data/CryptocurrencyData";

const ccxt = require("ccxt");

const DashboardComponent = () => {
  const cryptoSymbols = [
    "BTC", // Bitcoin
    "ETH", // Ethereum
    "XRP", // Ripple
    "BCH", // Bitcoin Cash
    "LTC", // Litecoin
    "ADA", // Cardano
    "DOT", // Polkadot
    "LINK", // Chainlink
    "XLM", // Stellar
    "DOGE", // Dogecoin
    "USDT", // Tether
    "BNB", // Binance Coin
    "XMR", // Monero
    "UNI", // Uniswap
    "EOS", // EOS
    "TRX", // TRON
    "XTZ", // Tezos
    "VET", // VeChain
    "DASH", // Dash
    "ZEC", // Zcash
  ];

  const [loading, setLoading] = useState(true);

  const [assets, setAssets] = useState([]);
  const [allExchangesAssets, setAllExchangesAssets] = useState([]);

  const [totalAggregateValue, setTotalAggregateValue] = useState(0);

  const [totalAggregateValue24hChange, setTotalAggregateValue24hChange] =
    useState(0);
  const [totalAggregateValue7DaysChange, setTotalAggregateValue7DaysChange] =
    useState(0);
  const [totalAggregateValue30DaysChange, setTotalAggregateValue30DaysChange] =
    useState(0);

  useEffect(() => {
    fetchAssetsFromUserInfo(false);
  }, []);

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

    // const responseRate = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbols}&vs_currencies=usd`);

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
          // setAssets(filteredAssets);
        })
        .catch((err) => {
          console.error("getBalance error: ", err);
        });

      if (filteredAssets?.length > 0) {
        const binance = new ccxt.binance();
        // Calculate the total value in USDT
        let totalValue = 0;
        for (const asset of filteredAssets) {
          if (asset.asset === "USDT") {
            // If the asset is already in USDT, use its balance directly
            totalValue += parseFloat(asset.balance);

            asset["usdtBal"] = asset.balance;
          } else {
            // Get the USDT exchange rate for the asset
            const symbol = `${asset.asset}/USDT`;
            const ticker = await binance.fetchTicker(symbol);
            const usdtPrice = ticker.last;
            // Multiply the balance by the USDT exchange rate to get the balance in USDT
            const usdtBalance = parseFloat(asset.balance) * usdtPrice;
            totalValue += usdtBalance;
            asset["usdtBal"] = usdtBalance;
          }
        }
        // setTotalAggregateValue(totalValue);

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
              // If the asset is already in USDT, use its balance directly
              prevTotalValue += parseFloat(asset.balance);
            } else {
              // Get the USDT exchange rate for the asset
              const symbol = `${asset.asset}/USDT`;
              const ticker = await binance.fetchTicker(symbol);
              const usdtPrice = ticker.last;
              // Multiply the balance by the USDT exchange rate to get the balance in USDT
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
              // If the asset is already in USDT, use its balance directly
              prev7DaysTotalValue += parseFloat(asset.balance);
            } else {
              // Get the USDT exchange rate for the asset
              const symbol = `${asset.asset}/USDT`;
              const ticker = await binance.fetchTicker(symbol);
              const usdtPrice = ticker.last;
              // Multiply the balance by the USDT exchange rate to get the balance in USDT
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

        if (walletThirtyDays.body) {
          let prev30DaysTotalValue = 0;
          for (const asset of walletData?.body?.assets) {
            if (asset.asset === "USDT") {
              // If the asset is already in USDT, use its balance directly
              prev30DaysTotalValue += parseFloat(asset.balance);
            } else {
              // Get the USDT exchange rate for the asset
              const symbol = `${asset.asset}/USDT`;
              const ticker = await binance.fetchTicker(symbol);
              const usdtPrice = ticker.last;
              // Multiply the balance by the USDT exchange rate to get the balance in USDT
              const usdtBalance = parseFloat(asset.balance) * usdtPrice;
              prev30DaysTotalValue += usdtBalance;
            }
          }
          let last30DaysChange =
            ((totalValue - prev30DaysTotalValue) / prev30DaysTotalValue) * 100;

          setTotalAggregateValue30DaysChange(last30DaysChange.toFixed(4));
        } else {
          setTotalAggregateValue30DaysChange("NA");
        }

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
          // result = data;
          // console.log("Result from server: ", data);
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
          // setAssets(filteredAssets);
        })
        .catch((err) => {
          console.error("getBalance error: ", err);
        });
    }

    if (filteredAssets?.length > 0) {
      const binance = new ccxt.binance();
      // Calculate the total value in USDT
      let totalValue = 0;
      for (const asset of filteredAssets) {
        if (asset.asset === "USDT") {
          // If the asset is already in USDT, use its balance directly
          totalValue += parseFloat(asset.balance);

          asset["usdtBal"] = asset.balance;
        } else {
          // Get the USDT exchange rate for the asset
          const symbol = `${asset.asset}/USDT`;
          const ticker = await binance.fetchTicker(symbol);
          const usdtPrice = ticker.last;
          // Multiply the balance by the USDT exchange rate to get the balance in USDT
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

  return (
    <Grid container>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "3rem",
          marginLeft: "0.8rem",
        }}
      >
        {/* <Grid xs={2} item>
          <Typography
            variant="h6"
            color="#FFFFFF"
            sx={{ ml: 1, fontWeight: 600 }}
          >
            My Portfolio
          </Typography>
        </Grid> */}
        <Grid xs={10} item>
          <CryptoRates />
        </Grid>
      </Grid>

      <Typography
        sx={{ fontSize: 18, ml: 1, mt: 4, mb: 1, mr: 5, fontWeight: 600 }}
        color="White"
      >
        Aggregate Account Balance
      </Typography>
      <TotalValue
        totalValue={totalAggregateValue}
        last24hChange={totalAggregateValue24hChange}
        last7DaysChange={totalAggregateValue7DaysChange}
        last30DaysChange={totalAggregateValue30DaysChange}
      />

      <AggregateAccountBalance />
      <div>
        <ExchangeTable
          assets={assets}
          handleRefresh={handleRefresh}
          allExchangesAssets={allExchangesAssets}
          loading={loading}
        />
      </div>

      {/* <div style={{ width: "50%", marginLeft: "5%" }}>
          <TileChart />
        </div> */}
      {/* <Grid rowSpacing={2} columnSpacing={2} container>
        <Grid xs={12} lg={6} xl={4} item>
          <MyExchange />
        </Grid>
        <Grid xs={12} lg={6} xl={4} item>
          <MyExchange />
        </Grid>
      </Grid> */}
    </Grid>
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
