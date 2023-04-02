import WalletConnect from "../components/cards/wallet-connect/WalletConnect";
import PrivateHeader from "../components/layout/PrivateHeader";
import React, { useEffect, useState } from "react";
import AggregateAccountBalance from "../components/charts/AggregateAccountBalance";
// import TileChart from "../components/charts/TileChart";
import { Grid, Typography } from "@mui/material";
import MyExchange from "../components/cards/my-exchanges/MyExchange";
import ExchangeTable from "../components/cards/exchange-table/ExchangeTable";

import { signIn, getSession, useSession } from "next-auth/react";

const DashboardComponent = () => {
  return (
    <>
      <Typography
        variant="h6"
        color="#FFFFFF"
        sx={{ ml: 1, mb: 3, fontWeight: 600 }}
      >
        My Portfolio
      </Typography>
      <AggregateAccountBalance />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ width: "50%" }}>
          <ExchangeTable />
        </div>

        {/* <div style={{ width: "50%", marginLeft: "5%" }}>
          <TileChart />
        </div> */}
      </div>
      <Grid rowSpacing={2} columnSpacing={2} container>
        <Grid xs={12} lg={6} xl={4} item>
          <MyExchange />
        </Grid>
        <Grid xs={12} lg={6} xl={4} item>
          <MyExchange />
        </Grid>
      </Grid>
    </>
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
