import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CommunityStrategies = (props) => {
  const [Active, setActive] = useState("all");
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
      By: "Bazil",
      Winrate: "95%",
      Pnl: "143%",
      TotalTrades: "54",
      "Win/Losses": "50W/4L",
    },
    {
      Title: "BTC TD indicator on 1 hour",
      By: "Rui",
      Winrate: "100%",
      Pnl: "34%",
      TotalTrades: "23",
      "Win/Losses": "23W/0L",
    },
    {
      Title: "BTC RSI",
      By: "Ali",
      Winrate: "93%",
      Pnl: "37%",
      TotalTrades: "72",
      "Win/Losses": "70W/2L",
    },
    {
      Title: "BTC Jump daily",
      By: "Abdul",
      Winrate: "100%",
      Pnl: "23%",
      TotalTrades: "7",
      "Win/Losses": "7W/0L",
    },
  ];
  return (
    <Box sx={{ mt: 8, mb: 10 }}>
      <Typography
        sx={{
          fontFamily: "Barlow, san-serif",
          fontSize: "24px",
          fontWeight: 600,
          pl: 1,
        }}
      >
        Community Strategies
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: "0.5rem", mt: 2, flexWrap: "wrap" }}>
          <Button
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: "20px",
              fontWeight: 300,
              background:
                Active === "all"
                  ? "linear-gradient(93.46deg, #790D83 -12.4%, #7A5CFF 105.26%)"
                  : "#262626",
              borderRadius: 1.5,
              color: "#FFFFFF",
              textTransform: "none",
              height: 35,
            }}
            onClick={() => setActive("all")}
          >
            All
          </Button>
          {/* <Button
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: "20px",
              fontWeight: 300,
              background:
                Active === "linked"
                  ? "linear-gradient(93.46deg, #790D83 -12.4%, #7A5CFF 105.26%)"
                  : "#262626",
              borderRadius: 1.5,
              color: "#FFFFFF",
              textTransform: "none",
              height: 35,
            }}
            onClick={() => setActive("linked")}
          >
            Linked
          </Button> */}
          <Button
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: "20px",
              fontWeight: 300,
              background:
                Active === "long"
                  ? "linear-gradient(93.46deg, #790D83 -12.4%, #7A5CFF 105.26%)"
                  : "#262626",
              borderRadius: 1.5,
              color: "#FFFFFF",
              textTransform: "none",
              height: 35,
            }}
            onClick={() => setActive("long")}
          >
            Long
          </Button>
          <Button
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: "20px",
              fontWeight: 300,
              background:
                Active === "Short"
                  ? "linear-gradient(93.46deg, #790D83 -12.4%, #7A5CFF 105.26%)"
                  : "#262626",
              borderRadius: 1.5,
              color: "#FFFFFF",
              textTransform: "none",
              height: 35,
            }}
            onClick={() => setActive("Short")}
          >
            Short
          </Button>
          {/* <Button
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: "20px",
              fontWeight: 300,
              background:
                Active === ">3months"
                  ? "linear-gradient(93.46deg, #790D83 -12.4%, #7A5CFF 105.26%)"
                  : "#262626",
              borderRadius: 1.5,
              color: "#FFFFFF",
              textTransform: "none",
              height: 35,
            }}
            onClick={() => setActive(">3months")}
          >
            &#62; 3months
          </Button>
          <Button
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: "20px",
              fontWeight: 300,
              background:
                Active === "binance"
                  ? "linear-gradient(93.46deg, #790D83 -12.4%, #7A5CFF 105.26%)"
                  : "#262626",
              borderRadius: 1.5,
              color: "#FFFFFF",
              textTransform: "none",
              height: 35,
            }}
            onClick={() => setActive("binance")}
          >
            Binance
          </Button>
          <Button
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: "20px",
              fontWeight: 300,
              background:
                Active === "binanceFutures"
                  ? "linear-gradient(93.46deg, #790D83 -12.4%, #7A5CFF 105.26%)"
                  : "#262626",
              borderRadius: 1.5,
              color: "#FFFFFF",
              textTransform: "none",
              height: 35,
            }}
            onClick={() => setActive("binanceFutures")}
          >
            Binance Futures USDT-M
          </Button> */}
        </Box>
        <Box mt={width < 600 ? 5 : 2}>
          <Button
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: "20px",
              fontWeight: 300,
              background:
                "linear-gradient(93.46deg, #790D83 -12.4%, #7A5CFF 105.26%)",
              borderRadius: 1,
              color: "#FFFFFF",
              textTransform: "none",
              height: 35,
            }}
          >
            Clear all filters
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              height: 35,
              mt: 2,
              borderRadius: 2,
            }}
          >
            <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                fontSize: "14px",
                color: "#B3B3B3",
                fontWeight: 400,
                fontFamily: "Barlow, san-serif",
              }}
              placeholder="Search by pair"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              height: 35,
              mt: width < 600 ? 0 : 2,
              borderRadius: 2,
            }}
          >
            <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                fontSize: "14px",
                color: "#B3B3B3",
                fontWeight: 400,
                fontFamily: "Barlow, san-serif",
              }}
              placeholder="Search by pair"
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={1} mt={1}>
        {props.data.map((item, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={isDrawerOpen ? 6 : 4}
            lg={4}
            xl={3}
          >
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
                  flexDirection: "column",
                  alignItems: "center",
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
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "#ACB2B7",
                  }}
                >
                  By {item.user.firstName}
                </Typography>
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
                      fontSize: "16px",
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

export default CommunityStrategies;
