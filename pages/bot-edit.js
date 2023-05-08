import PrivateHeader from "../components/layout/PrivateHeader";
import React from "react";
import { useRef } from "react";
import Grid from "@mui/material/Grid";
import DescriptionCard from "../components/cards/bot-config-cards/DescriptionCard";
import {
  AverageTimeSignalIcon,
  DealsCompletedIcon,
  MaxDealIcon,
  MaxDropIcon,
  TotalProfitBarIcon,
  TradingBotsIcon,
} from "../utils/icons";
import SummaryProfit from "../components/charts/SummaryProfit";
import ProfitByDay from "../components/charts/ProfitByDay";
import ProfitCalendar from "../components/calendar/ProfitCalendar";
import EditBlock from "../components/cards/edit-block/EditBlock";
import GeneralSettings from "../components/cards/general-settings/GeneralSettings";
import Strategy from "../components/cards/strategy/Strategy";
import CryptoRates from "../components/cards/crypto-rates/CryptoRates";

const BotConfigEdit = () => {
  return (
    <>
      <div style={{ margin: "40px 0px" }}>
        <CryptoRates />
      </div>
      <Grid container>
        <Grid item xs={12}>
          <EditBlock />
        </Grid>
      </Grid>
    </>
  );
};

export default function BotConfigEditPage() {
  return (
    <>
      <PrivateHeader
        current="4"
        Component={BotConfigEdit}
        title="Update Bot Detail"
      />
    </>
  );
}
