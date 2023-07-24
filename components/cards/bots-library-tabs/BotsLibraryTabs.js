import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Bot from "./Bot";

const BotsLibraryTabs = () => {
  const [value, setValue] = useState(0);
  const [searchByBotsName, setSearchByBotsName] = useState("");
  const [pairs, setPairs] = useState("");

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleSearch = (event) => {
    setSearchByBotsName(event.target.value);
  };

  const handlePairs = (event) => {
    setPairs(event.target.value);
  };

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const handleClearFilter = () => {
    console.log("handle clear filter");
  };

  const dataArray = [
    {
      title: "BITCOIN HIGH VOLUME CANDLES 1 HOUR",
      statsBox: [
        { title: "Total Profit", value: 1530 },
        {
          title: "Total Deals",
          value: 32,
        },
        {
          title: "Status",
          value: "ON-OK",
        },
        {
          title: "Side",
          value: "SHORT",
        },
      ],
      strategy: {
        strategyName: "BTC Strategy 1",
        strategyData: [
          {
            name: "Side",
            value: "Short",
          },
          {
            name: "First Order",
            value: 25,
          },
          {
            name: "Extra Order",
            value: 25,
          },
          {
            name: "Max. Cover Orders",
            value: 15,
          },
          {
            name: "Multiplier.",
            value: 1.1,
          },
          {
            name: "Max. Amount Used",
            value: 930,
          },
          {
            name: "Take Profit",
            value: "Signal",
          },
          {
            name: "Stop Loss",
            value: "N/A",
          },
        ],
      },
    },
    {
      title: "BITCOIN HIGH VOLUME CANDLES 1 HOUR",
      statsBox: [
        { title: "Total Profit", value: 1530 },
        {
          title: "Total Deals",
          value: 32,
        },
        {
          title: "Status",
          value: "ON-OK",
        },
        {
          title: "Side",
          value: "SHORT",
        },
      ],
      strategy: {
        strategyName: "BTC Strategy 1",
        strategyData: [
          {
            name: "Side",
            value: "Short",
          },
          {
            name: "First Order",
            value: 25,
          },
          {
            name: "Extra Order",
            value: 25,
          },
          {
            name: "Max. Cover Orders",
            value: 15,
          },
          {
            name: "Multiplier.",
            value: 1.1,
          },
          {
            name: "Max. Amount Used",
            value: 930,
          },
          {
            name: "Take Profit",
            value: "Signal",
          },
          {
            name: "Stop Loss",
            value: "N/A",
          },
        ],
      },
    },
    {
      title: "BITCOIN HIGH VOLUME CANDLES 1 HOUR",
      statsBox: [
        { title: "Total Profit", value: 1530 },
        {
          title: "Total Deals",
          value: 32,
        },
        {
          title: "Status",
          value: "ON-OK",
        },
        {
          title: "Side",
          value: "SHORT",
        },
      ],
      strategy: {
        strategyName: "BTC Strategy 1",
        strategyData: [
          {
            name: "Side",
            value: "Short",
          },
          {
            name: "First Order",
            value: 25,
          },
          {
            name: "Extra Order",
            value: 25,
          },
          {
            name: "Max. Cover Orders",
            value: 15,
          },
          {
            name: "Multiplier.",
            value: 1.1,
          },
          {
            name: "Max. Amount Used",
            value: 930,
          },
          {
            name: "Take Profit",
            value: "Signal",
          },
          {
            name: "Stop Loss",
            value: "N/A",
          },
        ],
      },
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "white",
            },
          }}
        >
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="All"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Enabled"
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Disabled"
            {...a11yProps(2)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Short"
            {...a11yProps(3)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Long"
            {...a11yProps(4)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Binance"
            {...a11yProps(5)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Binance Futures USDT-M"
            {...a11yProps(6)}
          />
        </Tabs>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Button
            sx={{
              background: "linear-gradient(to right,#790D83,#7A5CFF)",
              textTransform: "none",
              border: "none",
              borderRadius: 1,
              my: 1,
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: 15,
                fontFamily: "Barlow, san-serif",
                fontWeight: 500,
              }}
            >
              Stop All Bots
            </Typography>
          </Button>
          <Button
            sx={{
              background: "linear-gradient(to right,#790D83,#7A5CFF)",
              textTransform: "none",
              border: "none",
              borderRadius: 1,
              my: 1,
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: 15,
                fontFamily: "Barlow, san-serif",
                fontWeight: 500,
              }}
            >
              Start All Bots
            </Typography>
          </Button>
        </Box>
      </Box>

      <Grid container my={1} spacing={1}>
        <Grid item xs={12} sm={6} md={5}>
          <InputBase
            placeholder="Search by bot's name"
            sx={{
              height: "38px",
              minWidth: "100%",
              background: "#ffffff1f",
              borderRadius: 1,
              fontFamily: "Barlow, san-serif",
              fontWeight: 400,
              fontSize: 16,
            }}
            value={searchByBotsName}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  style={{
                    color: "white",
                    marginLeft: "5px",
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <InputBase
            placeholder="Pairs"
            sx={{
              minWidth: "100%",
              height: "38px",
              paddingLeft: "10px",
              background: "#ffffff1f",
              borderRadius: 1,
              fontFamily: "Barlow, san-serif",
              fontWeight: 400,
              fontSize: 16,
            }}
            value={pairs}
            onChange={handlePairs}
          />
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <Button
            sx={{
              background: "linear-gradient(to right,#790D83,#7A5CFF)",
              textTransform: "none",
              border: "none",
              borderRadius: 1,
              color: "white",
              fontFamily: "Barlow, san-serif",
              fontWeight: 500,
              width: "100%",
            }}
            onClick={handleClearFilter}
          >
            Clear Filters
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", mt: 3, gap: "0.7rem", flexWrap: "wrap" }}>
        <Button
          sx={{
            height: "40px",
            width: "150px",
            fontSize: 16,
            fontWeight: 500,
            color: "#FFFFFF",
            fontFamily: "Barlow, san-serif",
            textTransform: "none",
            border: "1px solid #634372",
            background:
              "linear-gradient(93.46deg, #350B41 -12.4%, #35256A 105.26%)",
          }}
        >
          New Bot
        </Button>
        <Button
          sx={{
            height: "40px",
            width: "150px",
            fontSize: 16,
            fontWeight: 500,
            color: "#FFFFFF",
            fontFamily: "Barlow, san-serif",
            textTransform: "none",
            border: "1px solid #634372",
            background:
              "linear-gradient(93.46deg, #350B41 -12.4%, #35256A 105.26%)",
          }}
        >
          Delete Bot
        </Button>
      </Box>
      <Grid container spacing={1} mt={3}>
        {dataArray.map((item, index) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
              <Bot dataArray={item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default BotsLibraryTabs;
