import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const MyStrategies = (props) => {
  const router = useRouter();
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  const Strategies = [
    {
      Title: "BTC High Volume on 5 Min",
      Winrate: "95%",
      Pnl: "143%",
      TotalTrades: "54",
      "Win/Losses": "50W/4L",
    },
    {
      Title: "BTC TD indicator on 1 hour",
      Winrate: "100%",
      Pnl: "34%",
      TotalTrades: "23",
      "Win/Losses": "23W/0L",
    },
    {
      Title: "BTC RSI",
      Winrate: "93%",
      Pnl: "37%",
      TotalTrades: "72",
      "Win/Losses": "70W/2L",
    },
    {
      Title: "BTC Jump daily",
      Winrate: "100%",
      Pnl: "23%",
      TotalTrades: "7",
      "Win/Losses": "7W/0L",
    },
  ];
  return (
    <Box sx={{ mt: 8 }}>
      <Typography
        sx={{
          fontFamily: "Barlow, san-serif",
          fontSize: "24px",
          fontWeight: 600,
          pl: 1,
          mb: 1,
        }}
      >
        My Strategies
      </Typography>
      <Grid container spacing={1}>
        {props.data.map((item, index) => (
          <Grid item xs={12} sm={6} md={isDrawerOpen ? 6 : 4} lg={4} xl={3}>
            <Paper
              sx={{
                background: "#262626",
                padding: "1rem 0.5rem 1rem 0.5rem",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center", // if you want to align items vertically as well
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#ACB2B7",
                  }}
                >
                  {item.generalSettings.strategyName}
                </Typography>
                <Button
                  sx={{ marginLeft: 20 }}
                  onClick={() => {
                    router.push({
                      pathname: "/Startegy",
                      query: { id: item._id },
                    });
                  }}
                >
                  Edit
                </Button>
              </Box>
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap:
                    width < 600 && width > 400
                      ? "1rem"
                      : width < 400
                      ? "0.2rem"
                      : width < 941 && width > 899
                      ? "0.2rem"
                      : "0.5rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: width < 670 && width > 599 ? 14 : 16,
                      fontWeight: 300,
                      color: "#ACB2B7",
                    }}
                  >
                    Winrate
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: width < 670 && width > 599 ? 14 : 16,
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {item.winRate ? item.winRate : "NA"} %
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: width < 670 && width > 599 ? 14 : 16,
                      fontWeight: 300,
                      color: "#ACB2B7",
                    }}
                  >
                    Pnl
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: width < 670 && width > 599 ? 14 : 16,
                      fontWeight: 600,
                      color: "#22A25B",
                    }}
                  >
                    {item.profitAndLoss ? item.profitAndLoss : "NA"} %
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: width < 670 && width > 599 ? 14 : 16,
                      fontWeight: 300,
                      color: "#ACB2B7",
                      minWidth: "fit-content",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Total Trades
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: width < 670 && width > 599 ? 14 : 16,
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {item.totalTrade ? item.totalTrade : 0}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: width < 670 && width > 599 ? 14 : 16,
                      fontWeight: 300,
                      color: "#ACB2B7",
                    }}
                  >
                    Wins/Losses
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: width < 670 && width > 599 ? 14 : 16,
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {item.wins ? item.wins : 0}W /{" "}
                    {item.losses ? item.losses : 0}L
                  </Typography>
                </Box>
              </Box>
              <Button
                sx={{
                  background:
                    "linear-gradient(93.46deg, #790D83 -12.4%, #7A5CFF 105.26%)",
                  fontSize: "20px",
                  fontWeight: 300,
                  color: "#FFFFFF",
                  fontFamily: "Barlow, san-serif",
                  textTransform: "none",
                  height: 35,
                }}
              >
                Backtester
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyStrategies;
