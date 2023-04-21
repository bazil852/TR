import PrivateHeader from "../components/layout/PrivateHeader";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Container, Typography } from "@mui/material";
import TotalProfit from "../components/cards/total-profit/TotalProfit";
import Grid from "@mui/material/Grid";
import ClosedDeals from "../components/cards/closed-deals/ClosedDeals";
import MyBotSummary from "../components/charts/MyBotSummary";
import BotsProgress from "../components/charts/BotsProgress";
import Box from "@mui/material";
import BotsTable from "../components/cards/bots-table/BotsTable";
import CryptoRates from "../components/cards/crypto-rates/CryptoRates";

import {
  YellowHandShake,
  MyBots,
  BotAnalytics,
  GreyCross,
} from "../utils/icons";

const DcaBot = () => {
  const [button, setButton] = useState("bot");

  const handleSelect = (event, selected) => {
    setButton(selected);
  };
  const [isActive, setActive] = React.useState(1);
  const [toggle, setToggle] = React.useState(true);

  const handleClick = (buttonIndex) => {
    setActive(buttonIndex);
  };
  return (
    <>
      {/* <ToggleButtonGroup value={button} onChange={handleSelect} exclusive>
        <Stack></Stack>
        <ToggleButton value="bot">
          My Bots
          <Button size="large" sx variant="contained">
            My Bots
          </Button>
        </ToggleButton>
        <ToggleButton value="deals">
          My Deals
          <Button size="large" sx={{ color: "#CCCCCC", background: "#1F1F1F" }}>
            My Deals
          </Button>
        </ToggleButton>
        <ToggleButton value="analytics">
          Bot Analytics
          <Button size="large" sx={{ color: "#CCCCCC", background: "#1F1F1F" }}>
            Bot Analytics
          </Button>
        </ToggleButton>
      </ToggleButtonGroup> */}
      <div style={{ margin: "40px 0px" }}>
        <CryptoRates />
      </div>

      <Stack spacing={3} direction="row">
        <Button
          size="large"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
            backgroundImage:
              isActive === 1
                ? "linear-gradient(to right, #461558, #46226f)"
                : "none",
            backgroundColor: isActive === 1 ? "transparent" : "#3C1552",
            "&:hover": {
              backgroundImage:
                isActive === 1
                  ? "linear-gradient(to right, #461558, #46226f)"
                  : "none",
              backgroundColor: isActive === 1 ? "transparent" : "#3C1552",
            },
            color: "white",
            textTransform: "none",
          }}
          onClick={() => handleClick(1)}
        >
          <MyBots /> My Bots
        </Button>
        <Button
          size="large"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
            color: "#CCCCCC",
            backgroundImage:
              isActive === 2
                ? "linear-gradient(to right, #461558, #46226f)"
                : "none",
            backgroundColor: isActive === 2 ? "transparent" : "#3C1552",
            "&:hover": {
              backgroundImage:
                isActive === 2
                  ? "linear-gradient(to right, #461558, #46226f)"
                  : "none",
              backgroundColor: isActive === 2 ? "transparent" : "#3C1552",
            },
            textTransform: "none",
          }}
          onClick={() => handleClick(2)}
        >
          <YellowHandShake />
          My Deals
        </Button>
        <Button
          size="large"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
            color: "#CCCCCC",
            backgroundImage:
              isActive === 3
                ? "linear-gradient(to right, #461558, #46226f)"
                : "none",
            backgroundColor: isActive === 3 ? "transparent" : "#3C1552",
            "&:hover": {
              backgroundImage: isActive
                ? "linear-gradient(to right, #461558, #46226f)"
                : "none",
              backgroundColor: isActive === 3 ? "transparent" : "#3C1552",
            },
            textTransform: "none",
          }}
          onClick={() => handleClick(3)}
        >
          <BotAnalytics /> Bot Analytics
        </Button>
      </Stack>
      <Container
        sx={{
          mt: 5,
          display: toggle ? "flex" : "none",
          alignItems: "center",
          background: "linear-gradient(to right, #461558, #46226f)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          height: 35,
          minWidth: "100%",
        }}
      >
        <GreyCross
          style={{
            background: "#4B1F5D",
            marginRight: "40px",
            height: "28px",
            width: "30px",
            paddingTop: "8px",
            paddingLeft: "9px",
            cursor: "pointer",
            marginLeft: "-20px",
          }}
          onClick={() => setToggle(!toggle)}
        />
        <Typography sx={{ ml: -4 }}>Pairs &quot; Black List &quot;</Typography>
      </Container>
      <Grid mt={2} container rowSpacing={2} columnSpacing={2}>
        <Grid xs={8} xl={4} item>
          <TotalProfit />
        </Grid>
        <Grid xs={4} xl={2} item>
          <ClosedDeals />
        </Grid>
        <Grid xs={6} xl={3} item>
          <BotsProgress heading="Most Profitable Bots" />
        </Grid>
        <Grid xs={6} xl={3} item>
          <BotsProgress heading="Most Profitable Bots by Time" />
        </Grid>
      </Grid>
      <Grid mt={2} container rowSpacing={2} columnSpacing={2}>
        <Grid xs={12} xl={6} item>
          <MyBotSummary />
        </Grid>
        <Grid xs={6} xl={3} item>
          <BotsProgress heading="Best Performing Bots This Week" />
        </Grid>
        <Grid xs={6} xl={3} item>
          <BotsProgress heading="Best Performing Bots This Month" />
        </Grid>
      </Grid>
      <BotsTable />
    </>
  );
};

export default function DcaBots() {
  return (
    <>
      <PrivateHeader current="3" Component={DcaBot} title="DCA Bots" />
    </>
  );
}
