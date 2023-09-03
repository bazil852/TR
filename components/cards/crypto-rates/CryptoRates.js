// import React from "react";
// import { Box } from "@mui/material";
// import styles from "./CryptoRates.module.css";
// const ccxt = require("ccxt");

// const binance = new ccxt.binance();
// const CryptoRates = () => {
//   const symbolBTC = "BTC/USDT";
//   const symbolETH = "ETH/USDT";
//   const symbolBNB = "BNB/USDT";
//   const symbolXRP = "XRP/USDT";
//   const symbolLTC = "LTC/USDT";
//   const [btcTickerValue, setBtcTickerValue] = React.useState({});
//   const [ethTickerValue, setEthTickerValue] = React.useState({});
//   const [bnbTickerValue, setBnbTickerValue] = React.useState({});
//   const [xrpTickerValue, setXrpTickerValue] = React.useState({});
//   const [ltcTickerValue, setLtcTickerValue] = React.useState({});

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       binance
//         .fetchTicker(symbolBTC)
//         .then((ticker) => {
//           setBtcTickerValue(ticker);
//         })
//         .catch((error) => {
//           console.error(`Error fetching ticker for ${symbolBTC}: ${error}`);
//         });

//       binance
//         .fetchTicker(symbolETH)
//         .then((ticker) => {
//           setEthTickerValue(ticker);
//         })
//         .catch((error) => {
//           console.error(`Error fetching ticker for ${symbolETH}: ${error}`);
//         });

//       binance
//         .fetchTicker(symbolBNB)
//         .then((ticker) => {
//           setBnbTickerValue(ticker);
//         })
//         .catch((error) => {
//           console.error(`Error fetching ticker for ${symbolBNB}: ${error}`);
//         });

//       binance
//         .fetchTicker(symbolXRP)
//         .then((ticker) => {
//           setXrpTickerValue(ticker);
//         })
//         .catch((error) => {
//           console.error(`Error fetching ticker for ${symbolXRP}: ${error}`);
//         });

//       binance
//         .fetchTicker(symbolLTC)
//         .then((ticker) => {
//           setLtcTickerValue(ticker);
//         })
//         .catch((error) => {
//           console.error(`Error fetching ticker for ${symbolLTC}: ${error}`);
//         });
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <div className={styles.scrollContainer}>
//       <Box
//         sx={{
//           display: "flex",
//           gap: "1rem",
//           alignItems: "center",
//         }}
//       >
//         <Box sx={{ display: "flex", gap: "0.4rem", width: 200 }}>
//           <span style={{ color: "#999999", fontSize: "13px" }}>
//             {symbolBTC}
//           </span>
//           <span
//             style={{
//               fontSize: "13px",
//               color: `${btcTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
//             }}
//           >
//             ${btcTickerValue?.last}{" "}
//           </span>
//           <span
//             style={{
//               color: `${btcTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
//               fontSize: "13px",
//             }}
//           >
//             {btcTickerValue?.percentage > 0 ? "+" : ""}{" "}
//             {btcTickerValue?.percentage}%
//           </span>
//         </Box>
//         <Box sx={{ display: "flex", gap: "0.4rem", width: 200 }}>
//           <span style={{ color: "#999999", fontSize: "13px" }}>
//             {symbolETH}
//           </span>
//           <span
//             style={{
//               fontSize: "13px",
//               color: `${ethTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
//             }}
//           >
//             ${ethTickerValue?.last}{" "}
//           </span>
//           <span
//             style={{
//               color: `${ethTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
//               fontSize: "13px",
//             }}
//           >
//             {ethTickerValue?.percentage > 0 ? "+" : ""}
//             {ethTickerValue?.percentage}%
//           </span>
//         </Box>
//         <Box sx={{ display: "flex", gap: "0.4rem", width: 200 }}>
//           <span style={{ color: "#999999", fontSize: "13px" }}>
//             {symbolBNB}
//           </span>
//           <span
//             style={{
//               fontSize: "13px",
//               color: `${bnbTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
//             }}
//           >
//             ${bnbTickerValue?.last}{" "}
//           </span>
//           <span
//             style={{
//               color: `${bnbTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
//               fontSize: "13px",
//             }}
//           >
//             {bnbTickerValue?.percentage > 0 ? "+" : ""}{" "}
//             {bnbTickerValue?.percentage}%
//           </span>
//         </Box>
//         <Box sx={{ display: "flex", gap: "0.4rem", width: 200 }}>
//           <span style={{ color: "#999999", fontSize: "13px" }}>
//             {symbolXRP}
//           </span>
//           <span
//             style={{
//               fontSize: "13px",
//               color: `${xrpTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
//             }}
//           >
//             ${xrpTickerValue?.last}{" "}
//           </span>
//           <span
//             style={{
//               color: `${xrpTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
//               fontSize: "13px",
//             }}
//           >
//             {xrpTickerValue?.percentage > 0 ? "+" : ""}
//             {xrpTickerValue?.percentage}%
//           </span>
//         </Box>
//         <Box sx={{ display: "flex", gap: "0.4rem", width: 200 }}>
//           <span style={{ color: "#999999", fontSize: "13px" }}>
//             {symbolLTC}
//           </span>
//           <span
//             style={{
//               fontSize: "13px",
//               color: `${ltcTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
//             }}
//           >
//             ${ltcTickerValue?.last}{" "}
//           </span>
//           <span
//             style={{
//               color: `${ltcTickerValue?.percentage > 0 ? "#4BD469" : "red"}`,
//               fontSize: "13px",
//             }}
//           >
//             {ltcTickerValue?.percentage > 0 ? "+" : ""}
//             {ltcTickerValue?.percentage}%
//           </span>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default CryptoRates;
import React from 'react'

const CryptoRates = () => {
  return (
    <div>CryptoRates</div>
  )
}

export default CryptoRates