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
  const [assets, setAssets] = useState([]);

  const [totalAggregateValue, setTotalAggregateValue] = useState(0);

  useEffect(() => {
    fetchAssetsFromUserInfo(false);
  }, []);

  const fetchAssetsFromUserInfo = async (save) => {
    const { user } = await getSession();
    const response = await fetch(`/api/user/get-user-info?id=${user.id}`, {
      method: "GET",
    });
    const data = await response.json();

    // const responseRate = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbols}&vs_currencies=usd`);

    if (data.body.exchanges[0]) {
      const { USDMClient } = require("binance");
      const baseUrl = "https://testnet.binancefuture.com";
      const client = new USDMClient({
        api_key: data.body.exchanges[0].apiKey,
        api_secret: data.body.exchanges[0].apiSecret,
        baseUrl,
      });

      let filteredAssets;

      await client
        .getBalance()
        .then(async (result) => {
          console.log("getBalance result: ", result);
          filteredAssets = result.filter(
            (item) => parseFloat(item.balance) !== 0
          );
          setAssets(filteredAssets);
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
          } else {
            // Get the USDT exchange rate for the asset
            const symbol = `${asset.asset}/USDT`;
            const ticker = await binance.fetchTicker(symbol);
            const usdtPrice = ticker.last;
            // Multiply the balance by the USDT exchange rate to get the balance in USDT
            const usdtBalance = parseFloat(asset.balance) * usdtPrice;
            console.log(usdtBalance);
            totalValue += usdtBalance;
          }
        }
        setTotalAggregateValue(totalValue);

        if (save) {
          let reqBody = {
            exchangeId: data.body.exchanges[0]._id,
            userId: user.id,
            assets: filteredAssets,
          };
          console.log(reqBody);
          const response = await fetch("/api/wallet/create-wallet", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      }
    }
  };

  const handleRefresh = () => {
    fetchAssetsFromUserInfo(true);
  };

  return (
    <Grid container>
      <Grid
        container
        sx={{ display: "flex", alignItems: "center", marginTop: "3rem" }}
      >
        <Grid xs={2} item>
          <Typography
            variant="h6"
            color="#FFFFFF"
            sx={{ ml: 1, fontWeight: 600 }}
          >
            My Portfolio
          </Typography>
        </Grid>
        <Grid xs={10} item>
          <CryptoRates />
        </Grid>
      </Grid>

      <Typography
        sx={{ fontSize: 18, ml: 1, mt: 4, mb: 1, mr: 5, fontWeight: 700 }}
        color="White"
      >
        Aggregate Account Balance
      </Typography>
      <TotalValue totalValue={totalAggregateValue} />

      <AggregateAccountBalance />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <ExchangeTable assets={assets} handleRefresh={handleRefresh} />
        </div>

        {/* <div style={{ width: "50%", marginLeft: "5%" }}>
          <TileChart />
        </div> */}
      </div>
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
