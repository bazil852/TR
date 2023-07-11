import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Clock, SmokeWave } from "../../../utils/icons";
import Select from "react-select";
import CandleStick from "./CandleStick";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "center",
    color: "#8F9498",
    minHeight: "30px",
    fontSize: "14px",
    boxShadow: " none",
    "&:hover": {
      borderColor: "transparent",
    },
    "&:focus": {
      borderColor: "transparent",
    },
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    display: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "none" : "none",
    color: state.isSelected ? "inherit" : "inherit",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "inherit",
  }),
  menu: (provided) => ({
    ...provided,
    background: "none",
    width: "200px",
  }),
};

const CandleStickGraph = () => {
  const [width, setWidth] = useState(globalThis?.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    { title: "Total Profit", value: 1200, percent: 20 },
    { title: "Total Trades", value: 34 },
    { title: "Win Rate", value: 100 },
    { title: "Buy & Hold", value: 120 },
    { title: "Totaltime", day: 123, hour: 2 },
    { title: "Profit Factor", value: 95 },
  ];

  const options = [
    { value: "option1", label: "21.3" },
    { value: "option2", label: "20.09" },
    { value: "option3", label: "19.1" },
    { value: "option4", label: "18.6" },
    { value: "option5", label: "17.7" },
    { value: "option6", label: "16.3" },
    { value: "option7", label: "15.7" },
    { value: "option8", label: "14.7" },
    { value: "option9", label: "13.4" },
    { value: "option10", label: "12.44" },
    { value: "option11", label: "11.6" },
    { value: "option12", label: "10.7" },
    { value: "option13", label: "9.8" },
    { value: "option14", label: "8.7" },
    { value: "option15", label: "7.5" },
  ];

  return (
    <Box mb={3}>
      <Box sx={{ display: "flex", flexDirection: "column", mt: -2 }}>
        <Typography
          sx={{
            fontSize: "2.2rem",
            fontWeight: 600,
            ml: 1,
            fontFamily: "Barlow, san-serif",
          }}
        >
          Strategy Backtester
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            ml: 1,
            mb: 1,
            fontFamily: "Barlow, san-serif",
            color: "#ACB2B7",
          }}
        >
          Backtest your favorite technical analysis based strategies with our
          backtester
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontWeight: 500,
            fontSize: 17,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            pl: 0.5,
          }}
        >
          <Clock /> Timeframe
        </Typography>
        <Box
          sx={{
            height: 60,
            width: 210,
            borderRadius: 2,
            border: "1px solid #1F1F26",
            background: "#0A0C0C",
          }}
        ></Box>
      </Box>

      <Box mt={3} mb={2} ml={"40%"}>
        <Button
          sx={{
            background: "linear-gradient(to right,#790F87,#794AE3)",
            textTransform: "none",
            border: "none",
            outline: "none",
            color: "white",
            fontFamily: "Barlow, san-serif",
            fontWeight: 300,
            fontSize: 17,
          }}
        >
          Start Backtest
        </Button>
      </Box>

      <Grid container spacing={1} mt={2}>
        {data.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
              <Box
                sx={{
                  background: "#191919",
                  borderTop: "2px solid #2D2D30",
                  borderRadius: 1,
                  height: 100,
                  minWidth: "100%",
                  display: "flex",
                  flexDirection: "column",
                  pl: 2,
                  gap: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontWeight: 500,
                    fontSize: 20,
                  }}
                >
                  {item.title}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontWeight: 500,
                      fontSize: 20,
                    }}
                  >
                    {item.title === "Totaltime" ? (
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          fontWeight: 500,
                          fontSize: 20,
                        }}
                      >
                        {item.day} Days and {item.hour} hours
                      </Typography>
                    ) : (
                      ""
                    )}
                    {item.value}
                    {item.title === "Total Profit"
                      ? "$"
                      : item.title === "Win Rate" ||
                        item.title === "Profit Factor"
                      ? "%"
                      : ""}
                  </Typography>
                  {item.title === "Total Profit" ? (
                    <Typography
                      sx={{
                        fontFamily: "Barlow, san-serif",
                        fontWeight: 500,
                        fontSize: 20,
                        pr: 2,
                      }}
                    >
                      {" "}
                      {item.percent}%
                    </Typography>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Grid container mb={5} mt={10}>
        <Grid item xs={12} overflow={"auto"}>
          <Box
            sx={{ display: "flex", flexDirection: "column", minWidth: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Typography
                  sx={{
                    fontFamily: "Barlow, sna-serif",
                    fontSize: 14,
                  }}
                >
                  AVAX/TetherUS
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, sna-serif",
                    fontSize: 14,
                  }}
                >
                  1h
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, sna-serif",
                    fontSize: 14,
                  }}
                >
                  Binance
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, sna-serif",
                    fontSize: 14,
                  }}
                >
                  Trading
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, sna-serif",
                    fontSize: 14,
                  }}
                >
                  View
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, sna-serif",
                      fontSize: 14,
                    }}
                  >
                    O
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, sna-serif",
                      fontSize: 14,
                      color: "#F87171",
                    }}
                  >
                    20.23
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, sna-serif",
                      fontSize: 14,
                    }}
                  >
                    H
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, sna-serif",
                      fontSize: 14,
                      color: "#F87171",
                    }}
                  >
                    20.24
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, sna-serif",
                      fontSize: 14,
                    }}
                  >
                    L
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, sna-serif",
                      fontSize: 14,
                      color: "#F87171",
                    }}
                  >
                    19.29
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, sna-serif",
                      fontSize: 14,
                    }}
                  >
                    C
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, sna-serif",
                      fontSize: 14,
                      color: "#F87171",
                    }}
                  >
                    20.00 -0.23 (-1.14%)
                  </Typography>
                </Box>
              </Box>
              <Box mr={2}>
                <Select
                  styles={customStyles}
                  options={options}
                  isSearchable={false}
                  placeholder="USDT"
                  menuPosition={"fixed"}
                />
              </Box>
            </Box>
            <Box
              sx={{
                minHeight: 250,
                mt: 5,
                position: "relative",
                mr: width < 600 ? 0 : 10,
                overflowX: "auto",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: 70,
                  display: width < 600 ? "none" : "",
                }}
              >
                <SmokeWave
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    paddingLeft: "20px",
                  }}
                />
              </Box>
              <CandleStick />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandleStickGraph;
