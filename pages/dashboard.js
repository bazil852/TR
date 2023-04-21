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
const DashboardComponent = () => {
  return (
    <Grid container>
      <Grid
        container
        sx={{ display: "flex", alignItems: "center", marginTop: "3rem" }}
      >
        <Grid xs={3} item>
          <Typography
            variant="h6"
            color="#FFFFFF"
            sx={{ ml: 1, fontWeight: 600 }}
          >
            My Portfolio
          </Typography>
        </Grid>
        <Grid xs={9} item>
          <CryptoRates />
        </Grid>
      </Grid>

      <Typography
        sx={{ fontSize: 18, ml: 1, mt: 4, mb: 1, mr: 5, fontWeight: 700 }}
        color="White"
      >
        Aggregate Account Balance
      </Typography>
      <TotalValue />

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
          <ExchangeTable />
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
