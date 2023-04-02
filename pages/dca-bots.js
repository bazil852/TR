import PrivateHeader from "../components/layout/PrivateHeader";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Typography } from "@mui/material";
import TotalProfit from "../components/cards/total-profit/TotalProfit";
import Grid from "@mui/material/Grid";
import ClosedDeals from "../components/cards/closed-deals/ClosedDeals";
import MyBotSummary from "../components/charts/MyBotSummary";
import BotsProgress from "../components/charts/BotsProgress";
import Box from "@mui/material";
import BotsTable from "../components/cards/bots-table/BotsTable";
const DcaBot = () => {
  const [button, setButton] = useState("bot");

  const handleSelect = (event, selected) => {
    setButton(selected);
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
      <Stack spacing={3} direction="row">
        <Button size="large" sx variant="contained">
          My Bots
        </Button>
        <Button size="large" sx={{ color: "#CCCCCC", background: "#1F1F1F" }}>
          My Deals
        </Button>
        <Button size="large" sx={{ color: "#CCCCCC", background: "#1F1F1F" }}>
          Bot Analytics
        </Button>
      </Stack>
      <Typography mt={3} variant="h6">
        My Bots
      </Typography>
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
      <BotsTable/>
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
