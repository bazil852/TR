import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";

const CryptocurrencyData = () => {
  const firstRow = [
    { name: "BTC", abrevation: "Bitcoin", points: "-1.8%" },
    { name: "ETH", abrevation: "ethereum", points: "-5.4%" },
    { name: "BNB", abrevation: "BNB", points: "-2.5%" },
    { name: "XRP", abrevation: "XRP", points: "-1.9%" },
  ];
  const secondRow = [
    { name: "ADA", abrevation: "Cardano", points: "-3.6%" },
    { name: "SOL", abrevation: "Solana", points: "-4.4%" },
    { name: "DOGE", abrevation: "Dogecoin", points: "-3.4%" },
    { name: "DOT", abrevation: "Polkadot", points: "-7.6%" },
    { name: "HEX", abrevation: "HEX", points: "-7.4%" },
  ];
  const thirdRowfirstHalf = [
    { name: "UNI", abrevation: "Uniswap", points: "-3.3%" },
    { name: "stETH", abrevation: "Kido Staked ETH", points: "-5.5%" },
  ];
  const thirdRowsecondHalf = [
    { name: "FTT", abrevation: "FTX Tiken", points: "-3.9%" },
    { name: "CRO", abrevation: "Cronos", points: "-5.5%" },
  ];
  const fourthRow = [
    { name: "LINK", abrevation: "Chainlink", points: "-6.9%" },
    { name: "NEAR", abrevation: "NEAR Protocol", points: "-2.0%" },
  ];

  return (
    <Container
      sx={{
        display: "flex",
        gap: 0.7,
        background: "rgba(41, 8, 77, 0.42)",
        minHeight: 800,
        width: "41vw",
        borderRadius: 2,
        mt: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          mt: 3,
          ml: -1.5,
        }}
      >
        {firstRow.map((coinData, index) => {
          return (
            <Box
              key={index}
              sx={{
                // height: 130,
                minHeight: "10.52778vw",
                // width: 110,
                minWidth: "10.13889vw",
                background: "#830D0D",
                pt: "2vw",
                pl: "2vw",
              }}
            >
              <Typography>{coinData.name}</Typography>
              <Typography sx={{ fontSize: "13px" }}>
                {coinData.abrevation}
              </Typography>
              <Typography sx={{ fontSize: "13px" }}>
                {coinData.points}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          mt: 3,
        }}
      >
        {secondRow.map((coinData, index) => {
          return (
            <Box
              key={index}
              sx={{
                // height: 95,
                minHeight: "8vw",
                // width: 115,
                minWidth: "10.48611vw",
                background: index === 1 ? "#009B10" : "#830D0D",
                opacity: index === 1 ? 0.9 : 1,
                pt: "1vw",
                pl: "0.8vw",
              }}
            >
              <Typography>{coinData.name}</Typography>
              <Typography sx={{ fontSize: "13px" }}>
                {coinData.abrevation}
              </Typography>
              <Typography sx={{ fontSize: "13px" }}>
                {coinData.points}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 3,
          }}
        >
          {thirdRowfirstHalf.map((coinData, index) => {
            return (
              <Box
                key={index}
                sx={{
                  // height: 150,
                  minHeight: "12.21667vw",
                  // width: 90,
                  minWidth: "8.2vw",
                  background: "#830D0D",
                  pt: "1vw",
                  pl: "0.9vw",
                }}
              >
                <Typography>{coinData.name}</Typography>
                <Typography sx={{ fontSize: "11.5px" }}>
                  {coinData.abrevation}
                </Typography>
                <Typography sx={{ fontSize: "13px" }}>
                  {coinData.points}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 1,
          }}
        >
          {thirdRowsecondHalf.map((coinData, index) => {
            return (
              <Box
                key={index}
                sx={{
                  // height: 150,
                  minHeight: "12.21667vw",
                  // width: 90,
                  minWidth: "8.2vw",
                  background: "#830D0D",
                  pt: "1vw",
                  pl: "0.9vw",
                  background: index === 1 ? "#009B10" : "#830D0D",
                  opacity: index === 1 ? 0.9 : 1,
                }}
              >
                <Typography>{coinData.name}</Typography>
                <Typography sx={{ fontSize: "13px" }}>
                  {coinData.abrevation}
                </Typography>
                <Typography sx={{ fontSize: "13px" }}>
                  {coinData.points}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 1,
            pb: 2,
          }}
        >
          {fourthRow.map((coinData, index) => {
            return (
              <Box
                key={index}
                sx={{
                  // height: 110,
                  minHeight: "9.13889vw",
                  // width: 188,
                  minWidth: "16.55556vw",
                  background: "#830D0D",
                  pt: "1.7vw",
                  pl: "2vw",
                }}
              >
                <Typography>{coinData.name}</Typography>
                <Typography sx={{ fontSize: "13px" }}>
                  {coinData.abrevation}
                </Typography>
                <Typography sx={{ fontSize: "13px" }}>
                  {coinData.points}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default CryptocurrencyData;
