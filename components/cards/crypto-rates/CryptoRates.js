import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
const ccxt = require("ccxt");

const binance = new ccxt.binance();
const CryptoRates = () => {
  const symbolBTC = "BTC/USDT";
  const symbolETH = "ETH/USDT";
  const [btcTickerValue, setBtcTickerValue] = React.useState({});
  const [ethTickerValue, setEthTickerValue] = React.useState({});

  React.useEffect(() => {
    const interval = setInterval(() => {
      binance
        .fetchTicker(symbolBTC)
        .then((ticker) => {
          setBtcTickerValue(ticker);
        })
        .catch((error) => {
          console.error(`Error fetching ticker for ${symbolBTC}: ${error}`);
        });

      binance
        .fetchTicker(symbolETH)
        .then((ticker) => {
          setEthTickerValue(ticker);
        })
        .catch((error) => {
          console.error(`Error fetching ticker for ${symbolETH}: ${error}`);
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1.5rem",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", gap: "0.8rem" }}>
        <span style={{ color: "#999999", fontSize: "14px" }}>{symbolBTC}</span>
        <span style={{ fontWeight: "600", fontSize: "14px" }}>
          ${btcTickerValue?.last}{" "}
        </span>
        <span
          style={{
            color: `${btcTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
            fontSize: "14px",
          }}
        >
          {btcTickerValue?.percentage > 0 ? "+" : ""}{" "}
          {btcTickerValue?.percentage}
        </span>
      </Box>
      <Box sx={{ display: "flex", gap: "0.8rem" }}>
        <span style={{ color: "#999999", fontSize: "14px" }}>{symbolETH}</span>
        <span style={{ fontWeight: "600", fontSize: "14px" }}>
          ${ethTickerValue?.last}{" "}
        </span>
        <span
          style={{
            color: `${ethTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
            fontSize: "14px",
          }}
        >
          {ethTickerValue?.percentage > 0 ? "+" : ""}
          {ethTickerValue?.percentage}
        </span>
      </Box>
      <Box sx={{ display: "flex", gap: "0.8rem" }}>
        <span style={{ color: "#999999", fontSize: "14px" }}>{symbolBTC}</span>
        <span style={{ fontWeight: "600", fontSize: "14px" }}>
          ${btcTickerValue?.last}{" "}
        </span>
        <span
          style={{
            color: `${btcTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
            fontSize: "14px",
          }}
        >
          {btcTickerValue?.percentage > 0 ? "+" : ""}{" "}
          {btcTickerValue?.percentage}
        </span>
      </Box>
      <Box sx={{ display: "flex", gap: "0.8rem" }}>
        <span style={{ color: "#999999", fontSize: "14px" }}>{symbolETH}</span>
        <span style={{ fontWeight: "600", fontSize: "14px" }}>
          ${ethTickerValue?.last}{" "}
        </span>
        <span
          style={{
            color: `${ethTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
            fontSize: "14px",
          }}
        >
          {ethTickerValue?.percentage > 0 ? "+" : ""}
          {ethTickerValue?.percentage}
        </span>
      </Box>
      <Box sx={{ display: "flex", gap: "0.8rem" }}>
        <span style={{ color: "#999999", fontSize: "14px" }}>{symbolBTC}</span>
        <span style={{ fontWeight: "600", fontSize: "14px" }}>
          ${btcTickerValue?.last}{" "}
        </span>
        <span
          style={{
            color: `${btcTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
            fontSize: "14px",
          }}
        >
          {btcTickerValue?.percentage > 0 ? "+" : ""}
          {btcTickerValue?.percentage}
        </span>
      </Box>
    </Box>
  );
};

export default CryptoRates;
