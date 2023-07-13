import React, { useEffect, useState } from "react";
import { Plus } from "../../../utils/icons";
import { alpha, styled } from "@mui/material/styles";
import {
  InputBase,
  Tabs,
  Button,
  Box,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import GeneralSettings from "../../../components/cards/general-settings/GeneralSettings";
import { getSession } from "next-auth/react";
import CandleStickGraph from "../../../components/cards/candleStick-strategy/CandleStickGraph";

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    height: 15,
    backgroundColor: "#2A2A2A",
    borderRadius: "6px",
    fontSize: 15,
    fontWeight: 400,
    padding: "8px 5px",
    color: "#FFFFFF",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StrategyTabs = () => {
  const [botName, setBotName] = useState("");
  const [exchange, setExchange] = useState("");
  const [botType, setBotType] = useState("");
  const [strategyType, setStrategyType] = useState("");
  const [strategyPair, setStrategyPair] = useState("");

  const setBotSetting = async (values) => {
    let reqBody = {
      ...values,
      botName,
      exchange,
      botType,
      strategyType,
      strategyPair,
    };
    console.log("req", reqBody);

    const response = await fetch("/api/user/create-strategy", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newData = await response.json();
    console.log(newData);
  };

  return (
    <Box
      sx={{
        mt: 5,
      }}
      component="main"
    >
      <StrategyTabsComponent setBotSettings={setBotSetting} />
    </Box>
  );
};

export default StrategyTabs;

const StrategyTabsComponent = (props) => {
  const [value, setvalue] = useState(["general"]);
  const [Pairs, setPairs] = useState([""]);
  const [width, setWidth] = useState(globalThis?.innerWidth);

  const [GeneralSettingsData, setGeneralSettingsData] = useState([
    {
      "Strategy Name": "",
      "Strategy Folder": "",
      "Strategy Description": "",
      BotLink: "",
      Notes: "",
    },
  ]);
  const [OrdersData, setOrdersData] = useState([
    {
      "First Order Size": "",
      "Extra Order Size": "",
      "Order Type": "",
      Pairs: "",
    },
  ]);
  const [DCAData, setDCAData] = useState([
    {
      "DCA Type": "",
      "Volume Multiplier": "",
      "Max Extra Orders": "",
      "Min Dist Between Orders": "",
      "Start Extra Order": "",
      "Step Multiplier": "",
    },
  ]);
  const [TakeProfitData, setTakeProfitData] = useState([
    {
      "Take Profit": "",
      "Min Take Profit": "",
    },
  ]);
  const [StopLossData, setStopLossData] = useState([
    {
      "Stop Loss": "",
    },
  ]);
  const [AllStrategyData, setAllStartegyData] = useState([
    {
      "General Settings Data": {},
      "Orders Data": {},
      "DCA Data": {},
      "Take Profit Data": {},
      "Stop Loss Data": {},
    },
  ]);
  useEffect(() => {
    fetchStrategiesByUserId();
  }, []);
  useEffect(() => console.log("Updated State:", AllStrategyData), [
    AllStrategyData,
  ]);
  const fetchStrategiesByUserId = async () => {
    let session = await getSession();
    const response = await fetch(
      `/api/strategy/get-strategy?id=${session?.user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newData = await response.json();
    console.log("response data", newData);
  };

  const handleAdd = () => {
    const temp = [...value, "general"];
    setvalue(temp);
    setGeneralSettingsData([
      ...GeneralSettingsData,
      {
        "Strategy Name": "",
        "Strategy Folder": "",
        "Strategy Description": "",
        BotLink: "",
        Notes: "",
      },
    ]);
    setOrdersData([
      ...OrdersData,
      {
        "First Order Size": "",
        "Extra Order Size": "",
        "Order Type": "",
        Pairs: "",
      },
    ]);
    setDCAData([
      ...DCAData,
      {
        "DCA Type": "",
        "Volume Multiplier": "",
        "Max Extra Orders": "",
        "Min Dist Between Orders": "",
        "Start Extra Order": "",
        "Step Multiplier": "",
      },
    ]);
    setTakeProfitData([
      ...TakeProfitData,
      { "Take Profit": "", "Min Take Profit": "" },
    ]);
    setStopLossData([...StopLossData, { "Stop Loss": "" }]);
    setAllStartegyData([
      ...AllStrategyData,
      {
        "General Settings Data": {},
        "Orders Data": {},
        "DCA Data": {},
        "Take Profit Data": {},
        "Stop Loss Data": {},
      },
    ]);
  };

  const handleTabClick = (tab, i) => {
    const newArray = [...value];
    newArray[i] = tab;
    setvalue(newArray);
  };

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  const arrowButtonStyle = {
    fontSize: "2em",
  };

  const handleSave = async () => {
    const { user } = await getSession();
    const temp = AllStrategyData.map((item, index) => {
      return {
        ...item,
        "General Settings Data": GeneralSettingsData[index],
        "DCA Data": DCAData[index],
        "Orders Data": OrdersData[index],
        "Stop Loss Data": StopLossData[index],
        "Take Profit Data": TakeProfitData[index],
        user,
      };
    });
    setAllStartegyData([...temp]);
    const response = await fetch(`/api/strategy/create-strategy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...temp]),
    });
    if (response.ok) {
      alert("Strategy Saved");
    } else {
      alert("Strategy Not Saved");
    }
  };

  const handleRemove = (i) => {
    var temp = [];
    temp = value.filter((item, index) => index !== i);
    setvalue(temp);
    temp = GeneralSettingsData.filter((item, index) => index !== i);
    setGeneralSettingsData(temp);
    temp = OrdersData.filter((item, index) => index !== i);
    setOrdersData(temp);
    temp = DCAData.filter((item, index) => index !== i);
    setDCAData(temp);
    temp = TakeProfitData.filter((item, index) => index !== i);
    setTakeProfitData(temp);
    temp = StopLossData.filter((item, index) => index !== i);
    setStopLossData(temp);
    temp = AllStrategyData.filter((item, index) => index !== i);
    setAllStartegyData(temp);
  };
  return (
    <>
      <Box
        sx={{
          background: "#191919",
          px: 3,
          pt: 1,
          borderRadius: "5px",
          marginBottom: 5,
          pb: 2,
        }}
      >
        {value.map((item, index) => (
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: width < 601 ? "column" : "row",
                gap: width < 601 ? 1 : 0,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "40px",
                  fontFamily: "Barlow, san-serif",
                  color: "#363636",
                  whiteSpace: "nowrap",
                }}
              >
                Cycle {index + 1}
              </Typography>

              <Tabs
                value={0}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .MuiSvgIcon-root": arrowButtonStyle,
                  width: "80%",
                  pt: 1,
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    width: "200px",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      fontFamily: "Barlow, san-serif",
                      fontWeight: 300,
                      fontSize: width < 601 ? 15 : 20,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      borderRadius: 2,
                      height: width < 601 ? 30 : 38,
                      pt: 0.35,
                      px: 2.5,
                      background:
                        item === "general"
                          ? "linear-gradient(to right,#790F87,#794AE3)"
                          : "#363636",
                    }}
                    onClick={() => handleTabClick("general", index)}
                  >
                    General
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      fontFamily: "Barlow, san-serif",
                      fontWeight: 300,
                      fontSize: width < 601 ? 15 : 20,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      borderRadius: 2,
                      height: width < 601 ? 30 : 38,
                      pt: 0.35,
                      px: 2.5,
                      background:
                        item === "orders"
                          ? "linear-gradient(to right,#790F87,#794AE3)"
                          : "#363636",
                    }}
                    onClick={() => handleTabClick("orders", index)}
                  >
                    Orders/ Pairs
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      fontFamily: "Barlow, san-serif",
                      fontWeight: 300,
                      fontSize: width < 601 ? 15 : 20,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      borderRadius: 2,
                      height: width < 601 ? 30 : 38,
                      pt: 0.35,
                      px: 2.5,
                      background:
                        item === "parameters"
                          ? "linear-gradient(to right,#790F87,#794AE3)"
                          : "#363636",
                    }}
                    onClick={() => handleTabClick("parameters", index)}
                  >
                    Parameters
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      fontFamily: "Barlow, san-serif",
                      fontWeight: 300,
                      fontSize: width < 601 ? 15 : 20,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      borderRadius: 2,
                      height: width < 601 ? 30 : 38,
                      pt: 0.35,
                      px: 2.5,
                      background:
                        item === "dca"
                          ? "linear-gradient(to right,#790F87,#794AE3)"
                          : "#363636",
                    }}
                    onClick={() => handleTabClick("dca", index)}
                  >
                    DCA
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      fontFamily: "Barlow, san-serif",
                      fontWeight: 300,
                      fontSize: width < 601 ? 15 : 20,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      borderRadius: 2,
                      height: width < 601 ? 30 : 38,
                      pt: 0.35,
                      px: 2.5,
                      background:
                        item === "take profit"
                          ? "linear-gradient(to right,#790F87,#794AE3)"
                          : "#363636",
                    }}
                    onClick={() => handleTabClick("take profit", index)}
                  >
                    Take Profit
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      fontFamily: "Barlow, san-serif",
                      fontWeight: 300,
                      fontSize: width < 601 ? 15 : 20,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      borderRadius: 2,
                      height: width < 601 ? 30 : 38,
                      pt: 0.35,
                      px: 2.5,
                      background:
                        item === "stop loss"
                          ? "linear-gradient(to right,#790F87,#794AE3)"
                          : "#363636",
                    }}
                    onClick={() => handleTabClick("stop loss", index)}
                  >
                    Stop Loss
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      fontFamily: "Barlow, san-serif",
                      fontWeight: 300,
                      fontSize: width < 601 ? 15 : 20,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      borderRadius: 2,
                      height: width < 601 ? 30 : 38,
                      pt: 0.35,
                      px: 2.5,
                      background:
                        item === "advanced"
                          ? "linear-gradient(to right,#790F87,#794AE3)"
                          : "#363636",
                    }}
                    onClick={() => handleTabClick("advanced", index)}
                  >
                    Advanced Settings
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      fontFamily: "Barlow, san-serif",
                      fontWeight: 300,
                      fontSize: width < 601 ? 15 : 20,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      borderRadius: 2,
                      height: width < 601 ? 30 : 38,
                      pt: 0.35,
                      px: 2.5,
                      background:
                        item === "stop  resume"
                          ? "linear-gradient(to right,#790F87,#794AE3)"
                          : "#363636",
                    }}
                    onClick={() => handleTabClick("stop resume", index)}
                  >
                    Stop / Resume
                  </Typography>
                </Box>
              </Tabs>
              {index + 1 === value.length ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    cursor: "pointer",
                    mb: width < 601 ? 2 : 0,
                  }}
                  onClick={() => handleAdd()}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Barlow, san-serif",
                        color: "#CCCCCC",
                        fontSize: 14,
                        fontWeight: 100,
                      }}
                    >
                      Add
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Barlow, san-serif",
                        color: "#CCCCCC",
                        fontSize: 14,
                        fontWeight: 100,
                        mt: -1,
                      }}
                    >
                      cycle
                    </Typography>
                  </Box>
                  <Box mt={1}>
                    <Plus
                      style={{
                        borderRadius: "3px",
                        background: "linear-gradient(to right,#790F87,#794AE3)",
                        height: "18px",
                        width: "18px",
                        paddingLeft: "3px",
                        paddingTop: "2px",
                      }}
                    />
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    mb: width < 601 ? 2 : 0,
                    borderRadius: "3px",
                    background: "linear-gradient(to right,#790F87,#794AE3)",
                    height: "18px",
                    width: "18px",
                    marginLeft: "auto",
                  }}
                  onClick={() => handleRemove(index)}
                >
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: 35,
                      mt: -0.5,
                    }}
                  >
                    -
                  </Typography>
                </Box>
              )}
            </Box>
            <Divider
              sx={{
                background: "linear-gradient(to right,#790F87,#794AE3)",
                height: "2px",
              }}
            />
            {item === "general" && (
              <GeneralSettings
                index={index}
                GeneralSettingsData={GeneralSettingsData}
                setGeneralSettingsData={setGeneralSettingsData}
              />
            )}
            {item === "orders" && (
              <>
                <Box
                  sx={{
                    mt: 3,
                    borderRadius: "5px",
                    px:
                      width > 1200 && width < 1300
                        ? 5
                        : width > 1300 && width < 1400
                        ? 10
                        : width > 1400
                        ? 15
                        : "",
                  }}
                >
                  <Grid container spacing={width < 600 ? 0 : 1}>
                    <Grid
                      item
                      xs={
                        width < 600
                          ? 0
                          : width < 769 && width > 600
                          ? 3
                          : width < 900 && width > 769
                          ? 2.5
                          : width > 1100 && width < 1400
                          ? 2
                          : width > 1400
                          ? 1
                          : 2.5
                      }
                    ></Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 1,
                          mb: width < 900 ? 1 : 1.5,
                          gap:
                            width < 900 && width > 769
                              ? 3
                              : width < 769
                              ? 0
                              : 5,
                          flexWrap: width < 900 ? "wrap" : "nowrap",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: 16,
                            fontFamily: "Barlow, san-serif",
                            color: "#CCCCCC",
                            whiteSpace: "nowrap",
                            mr: width < 769 ? 5 : "",
                          }}
                        >
                          First order size
                        </Typography>
                        <ValidationTextField
                          type="number"
                          margin="normal"
                          required
                          id="firstorderSize"
                          name="firstOrderSize"
                          placeholder="100"
                          value={OrdersData[index]["First Order Size"]}
                          sx={{
                            width:
                              width < 769 && width > 600
                                ? "7rem"
                                : width < 600
                                ? "100%"
                                : "5rem",
                            fontFamily: "Barlow, san-serif",
                          }}
                          onChange={async (event) => {
                            const temp = [...OrdersData];
                            temp[index]["First Order Size"] =
                              event.target.value;
                            setOrdersData(temp);
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 1,
                          mb: width < 900 ? 1 : 1.5,
                          gap:
                            width < 900 && width > 769
                              ? 2.5
                              : width < 769
                              ? 0
                              : 4.5,
                          flexWrap: width < 900 ? "wrap" : "nowrap",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: 16,
                            fontFamily: "Barlow, san-serif",
                            color: "#CCCCCC",
                            whiteSpace: "nowrap",
                            mr: width < 769 ? 5 : "",
                          }}
                        >
                          Extra order size
                        </Typography>
                        <ValidationTextField
                          type="number"
                          margin="normal"
                          required
                          placeholder="150"
                          id="extraordersize"
                          name="extraOrderSize"
                          value={OrdersData[index]["Extra Order Size"]}
                          sx={{
                            width:
                              width < 769 && width > 600
                                ? "7rem"
                                : width < 600
                                ? "100%"
                                : "5rem",
                            fontFamily: "Barlow, san-serif",
                          }}
                          onChange={async (event) => {
                            const temp = [...OrdersData];
                            temp[index]["Extra Order Size"] =
                              event.target.value;
                            setOrdersData(temp);
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 1,
                          mb:
                            width < 900 && width > 600
                              ? 1
                              : width < 600
                              ? 0
                              : 1.5,
                          gap:
                            width < 900 && width > 769
                              ? 7
                              : width < 769
                              ? 0
                              : 9.2,
                          flexWrap: width < 900 ? "wrap" : "nowrap",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: 16,
                            fontFamily: "Barlow, san-serif",
                            color: "#CCCCCC",
                            whiteSpace: "nowrap",
                            mr: width < 769 ? 8 : "",
                          }}
                        >
                          Order type
                        </Typography>
                        <ValidationTextField
                          margin="normal"
                          id="ordertype"
                          name="orderType"
                          placeholder="Market"
                          value={OrdersData[index]["Order Type"]}
                          sx={{
                            width:
                              width < 769 && width > 600
                                ? "7rem"
                                : width < 600
                                ? "100%"
                                : "5rem",
                            fontFamily: "Barlow, san-serif",
                          }}
                          onChange={async (event) => {
                            const temp = [...OrdersData];
                            temp[index]["Order Type"] = event.target.value;
                            setOrdersData(temp);
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={5} md={4} lg={4}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 1,
                          mb: width < 900 ? 1 : 1.5,
                          gap:
                            width < 900 && width > 769
                              ? 3
                              : width < 769
                              ? 0
                              : 4,
                          flexWrap: width < 900 ? "wrap" : "nowrap",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: 16,
                            fontFamily: "Barlow, san-serif",
                            color: "#CCCCCC",
                            whiteSpace: "nowrap",
                            mr: width < 769 ? 15 : "",
                          }}
                        >
                          Pairs
                        </Typography>
                        <ValidationTextField
                          margin="normal"
                          id="pairs"
                          name="pairs"
                          placeholder="BTC/USDT"
                          value={OrdersData[index].Pairs}
                          sx={{
                            fontFamily: "Barlow, san-serif",
                            width: width < 600 ? "100%" : "10rem",
                          }}
                          onChange={async (event) => {
                            const temp = [...OrdersData];
                            temp[index].Pairs = event.target.value;
                            setOrdersData(temp);
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
            {item === "parameters" && (
              <Box
                sx={{
                  mt: 5,
                  pb: 4,
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          gap: width < 900 ? 0 : 2,
                          flexWrap: width < 900 ? "wrap" : "nowrap",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: 16,
                            fontFamily: "Barlow, san-serif",
                            color: "#CCCCCC",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Parameters 1
                        </Typography>
                        <ValidationTextField
                          margin="normal"
                          id="parameters1"
                          name="parameters1"
                          placeholder="Bullish Green Vector (Vol.>200%)"
                          value={Pairs}
                          onChange={async (event) => {
                            setPairs(event.target.value);
                          }}
                          sx={{
                            fontFamily: "Barlow, san-serif",
                            width: "100%",
                          }}
                        />
                      </Box>
                      <ValidationTextField
                        sx={{
                          width: "7rem",
                          fontFamily: "Barlow, san-serif",
                          ml:
                            width < 900 && width > 600
                              ? "35vw"
                              : width < 600 && width > 500
                              ? "33vw"
                              : width < 500
                              ? "28vw"
                              : 13.5,
                        }}
                        margin="normal"
                        id="parameters1"
                        name="parameters1"
                        placeholder="Greater Than"
                        value={Pairs}
                        onChange={async (event) => {
                          setPairs(event.target.value);
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: width < 900 ? 0 : 2,
                          gap: width < 900 ? 0 : 2,
                          flexWrap: width < 900 ? "wrap" : "nowrap",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: 16,
                            fontFamily: "Barlow, san-serif",
                            color: "#CCCCCC",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Parameters 2
                        </Typography>
                        <ValidationTextField
                          margin="normal"
                          id="parameters2"
                          name="parameters2"
                          placeholder="Exponential Moving Average 50"
                          value={Pairs}
                          onChange={async (event) => {
                            setPairs(event.target.value);
                          }}
                          sx={{
                            fontFamily: "Barlow, san-serif",
                            width: "100%",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontFamily: "Barlow, san-serif",
                              fontWeight: 100,
                              color: "#CCCCCC",
                            }}
                          >
                            Add Parameters
                          </Typography>
                        </Box>
                        <Box onClick={() => handleAdd()}>
                          <Plus
                            style={{
                              borderRadius: "3px",
                              background:
                                "linear-gradient(to right,#790F87,#794AE3)",
                              height: "15px",
                              width: "15px",
                              paddingLeft: "1.5px",
                              paddingTop: "1px",
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={1.2} lg={1.2}>
                    <Box
                      sx={{
                        background: "linear-gradient(to right,#790F87,#794AE3)",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 125,
                        width: width < 601 ? 66 : 66,
                        ml: width < 900 ? "45%" : "",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          fontSize: 20,
                        }}
                      >
                        AND
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          gap: width < 900 ? 0 : 2,
                          flexWrap: width < 900 ? "wrap" : "nowrap",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: 16,
                            fontFamily: "Barlow, san-serif",
                            color: "#CCCCCC",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Parameters 3
                        </Typography>
                        <ValidationTextField
                          margin="normal"
                          id="parameters3"
                          name="parameters3"
                          placeholder="Bullish Green Vector (Vol.>200%)"
                          value={Pairs}
                          onChange={async (event) => {
                            setPairs(event.target.value);
                          }}
                          sx={{
                            fontFamily: "Barlow, san-serif",
                            width: "100%",
                          }}
                        />
                      </Box>
                      <ValidationTextField
                        sx={{
                          width: "7rem",
                          fontFamily: "Barlow, san-serif",
                          ml:
                            width < 900 && width > 600
                              ? "35vw"
                              : width < 600 && width > 500
                              ? "33vw"
                              : width < 500
                              ? "28vw"
                              : 13.5,
                        }}
                        margin="normal"
                        id="parameters2"
                        name="parameters2"
                        placeholder="Greater Than"
                        value={Pairs}
                        onChange={async (event) => {
                          setPairs(event.target.value);
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: width < 900 ? 0 : 2,
                          gap: width < 900 ? 0 : 2,
                          flexWrap: width < 900 ? "wrap" : "nowrap",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: 16,
                            fontFamily: "Barlow, san-serif",
                            color: "#CCCCCC",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Parameters 4
                        </Typography>
                        <ValidationTextField
                          margin="normal"
                          id="parameters4"
                          name="parameters4"
                          placeholder="Exponential Moving Average 50"
                          value={Pairs}
                          onChange={async (event) => {
                            setPairs(event.target.value);
                          }}
                          sx={{
                            fontFamily: "Barlow, san-serif",
                            width: "100%",
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontFamily: "Barlow, san-serif",
                              fontWeight: 100,
                              color: "#CCCCCC",
                            }}
                          >
                            Add Parameters
                          </Typography>
                        </Box>
                        <Box onClick={() => handleAdd()}>
                          <Plus
                            style={{
                              borderRadius: "3px",
                              background:
                                "linear-gradient(to right,#790F87,#794AE3)",
                              height: "15px",
                              width: "15px",
                              paddingLeft: "1.5px",
                              paddingTop: "1px",
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={1.2} lg={1.2}>
                    <Box
                      sx={{
                        background: "linear-gradient(to right,#790F87,#794AE3)",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 125,
                        width: width < 601 ? 66 : 66,
                        ml: width < 900 ? "45%" : "",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Barlow, san-serif",
                          fontSize: 20,
                        }}
                      >
                        AND
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          gap: width < 900 ? 0 : 2,
                          flexWrap: width < 900 ? "wrap" : "nowrap",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: 16,
                            fontFamily: "Barlow, san-serif",
                            color: "#CCCCCC",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Parameters 5
                        </Typography>
                        <ValidationTextField
                          margin="normal"
                          id="parameters5"
                          name="parameters5"
                          placeholder="Bullish Green Vector (Vol.>200%)"
                          value={Pairs}
                          onChange={async (event) => {
                            setPairs(event.target.value);
                          }}
                          sx={{
                            fontFamily: "Barlow, san-serif",
                            width: "100%",
                          }}
                        />
                      </Box>
                      <ValidationTextField
                        sx={{
                          width: "7rem",
                          fontFamily: "Barlow, san-serif",
                          ml:
                            width < 900 && width > 600
                              ? "35vw"
                              : width < 600 && width > 500
                              ? "33vw"
                              : width < 500
                              ? "28vw"
                              : 13.5,
                        }}
                        margin="normal"
                        id="parameters1"
                        name="parameters1"
                        placeholder="Greater Than"
                        value={Pairs}
                        onChange={async (event) => {
                          setPairs(event.target.value);
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: width < 900 ? 0 : 2,
                          gap: width < 900 ? 0 : 2,
                          flexWrap: width < 900 ? "wrap" : "nowrap",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: 16,
                            fontFamily: "Barlow, san-serif",
                            color: "#CCCCCC",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Parameters 6
                        </Typography>
                        <ValidationTextField
                          margin="normal"
                          id="parameters6"
                          name="parameters6"
                          placeholder="Exponential Moving Average 50"
                          value={Pairs}
                          onChange={async (event) => {
                            setPairs(event.target.value);
                          }}
                          sx={{
                            fontFamily: "Barlow, san-serif",
                            width: "100%",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontFamily: "Barlow, san-serif",
                              fontWeight: 100,
                              color: "#CCCCCC",
                            }}
                          >
                            Add Parameters
                          </Typography>
                        </Box>
                        <Box onClick={() => handleAdd()}>
                          <Plus
                            style={{
                              borderRadius: "3px",
                              background:
                                "linear-gradient(to right,#790F87,#794AE3)",
                              height: "15px",
                              width: "15px",
                              paddingLeft: "1.5px",
                              paddingTop: "1px",
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
            {item === "dca" && (
              <Box
                sx={{
                  mt: 3,
                  borderRadius: "5px",
                  px:
                    width > 1200 && width < 1300
                      ? 5
                      : width > 1300 && width < 1400
                      ? 10
                      : width > 1400
                      ? 15
                      : "",
                }}
              >
                <Grid container spacing={width < 600 ? 0 : 1}>
                  <Grid
                    item
                    xs={
                      width < 600
                        ? 0
                        : width < 769 && width > 600
                        ? 3
                        : width < 900 && width > 769
                        ? 2.5
                        : width > 1100 && width < 1400
                        ? 2
                        : width > 1400
                        ? 1
                        : 2.5
                    }
                  ></Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        mb: width < 900 ? 1 : 1.5,
                        gap: width < 900 ? 0 : 11,
                        flexWrap: width < 900 ? "wrap" : "nowrap",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 16,
                          fontFamily: "Barlow, san-serif",
                          color: "#CCCCCC",
                          whiteSpace: "nowrap",
                          mr: width < 900 ? 15 : "",
                        }}
                      >
                        DCA Type
                      </Typography>
                      <ValidationTextField
                        margin="normal"
                        id="dcatype"
                        name="dcaType"
                        placeholder="Signal"
                        sx={{
                          width:
                            width < 900 && width > 600
                              ? "7rem"
                              : width < 600
                              ? "100%"
                              : "5rem",
                          fontFamily: "Barlow, san-serif",
                        }}
                        value={DCAData[index]["DCA Type"]}
                        onChange={async (event) => {
                          const temp = [...DCAData];
                          temp[index]["DCA Type"] = event.target.value;
                          setDCAData(temp);
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        mb: width < 900 ? 1 : 1.5,
                        gap: width < 900 ? 0 : 4,
                        flexWrap: width < 900 ? "wrap" : "nowrap",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 16,
                          fontFamily: "Barlow, san-serif",
                          color: "#CCCCCC",
                          whiteSpace: "nowrap",
                          mr: width < 900 ? 15 : "",
                        }}
                      >
                        Volume multiplier
                      </Typography>
                      <ValidationTextField
                        margin="normal"
                        id="volmult"
                        placeholder="1.05"
                        sx={{
                          width:
                            width < 900 && width > 600
                              ? "7rem"
                              : width < 600
                              ? "100%"
                              : "5rem",
                          fontFamily: "Barlow, san-serif",
                        }}
                        name="volMultiplier"
                        value={DCAData[index]["Volume Multiplier"]}
                        onChange={async (event) => {
                          const temp = [...DCAData];
                          temp[index]["Volume Multiplier"] = event.target.value;
                          setDCAData(temp);
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        mb:
                          width < 900 && width > 600
                            ? 1
                            : width < 600
                            ? 0
                            : 1.5,
                        gap: width < 900 ? 0 : 5,
                        flexWrap: width < 900 ? "wrap" : "nowrap",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 16,
                          fontFamily: "Barlow, san-serif",
                          color: "#CCCCCC",
                          whiteSpace: "nowrap",
                          mr: width < 900 ? 15 : "",
                        }}
                      >
                        Max extra orders
                      </Typography>
                      <ValidationTextField
                        margin="normal"
                        id="maxextraorders"
                        name="maxExtraOrders"
                        placeholder="10"
                        sx={{
                          width:
                            width < 900 && width > 600
                              ? "7rem"
                              : width < 600
                              ? "100%"
                              : "5rem",
                          fontFamily: "Barlow, san-serif",
                        }}
                        value={DCAData[index]["Max Extra Orders"]}
                        onChange={async (event) => {
                          const temp = [...DCAData];
                          temp[index]["Max Extra Orders"] = event.target.value;
                          setDCAData(temp);
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={5} md={5} lg={5}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        mb: width < 900 ? 1 : 1.5,
                        gap: width < 900 ? 0 : 4,
                        flexWrap: width < 900 ? "wrap" : "nowrap",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 16,
                          fontFamily: "Barlow, san-serif",
                          color: "#CCCCCC",
                          whiteSpace: "nowrap",
                          mr: width < 900 ? 15 : "",
                        }}
                      >
                        Min. dist. between orders
                      </Typography>
                      <ValidationTextField
                        margin="normal"
                        id="mindist"
                        name="mintDist"
                        placeholder="1.5%"
                        sx={{
                          width:
                            width < 900 && width > 600
                              ? "7rem"
                              : width < 600
                              ? "100%"
                              : "5rem",
                          fontFamily: "Barlow, san-serif",
                        }}
                        value={DCAData[index]["Min Dist Between Orders"]}
                        onChange={async (event) => {
                          const temp = [...DCAData];
                          temp[index]["Min Dist Between Orders"] =
                            event.target.value;
                          setDCAData(temp);
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        mb: width < 900 ? 1 : 1.5,
                        gap: width < 900 ? 0 : 4.85,
                        flexWrap: width < 900 ? "wrap" : "nowrap",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 16,
                          fontFamily: "Barlow, san-serif",
                          color: "#CCCCCC",
                          whiteSpace: "nowrap",
                          mr: width < 900 ? 15 : "",
                        }}
                      >
                        Drop to start extra order
                      </Typography>
                      <ValidationTextField
                        margin="normal"
                        id="extraorder"
                        name="extraOrder"
                        placeholder="1.05%"
                        sx={{
                          width:
                            width < 900 && width > 600
                              ? "7rem"
                              : width < 600
                              ? "100%"
                              : "5rem",
                          fontFamily: "Barlow, san-serif",
                        }}
                        value={DCAData[index]["Start Extra Order"]}
                        onChange={async (event) => {
                          const temp = [...DCAData];
                          temp[index]["Start Extra Order"] = event.target.value;
                          setDCAData(temp);
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        mb: width < 900 ? 1 : 1.5,
                        gap: width < 900 ? 0 : 13.1,
                        flexWrap: width < 900 ? "wrap" : "nowrap",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 16,
                          fontFamily: "Barlow, san-serif",
                          color: "#CCCCCC",
                          whiteSpace: "nowrap",
                          mr: width < 900 ? 15 : "",
                        }}
                      >
                        Step multiplier
                      </Typography>
                      <ValidationTextField
                        margin="normal"
                        id="stepmultiplier"
                        name="stepMultiplier"
                        placeholder="1.05"
                        sx={{
                          width:
                            width < 900 && width > 600
                              ? "7rem"
                              : width < 600
                              ? "100%"
                              : "5rem",
                          fontFamily: "Barlow, san-serif",
                        }}
                        value={DCAData[index]["Step Multiplier"]}
                        onChange={async (event) => {
                          const temp = [...DCAData];
                          temp[index]["Step Multiplier"] = event.target.value;
                          setDCAData(temp);
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
            {item === "take profit" && (
              <Box
                sx={{
                  mt: 3,
                  borderRadius: "5px",
                  px:
                    width > 1200 && width < 1300
                      ? 5
                      : width > 1300 && width < 1400
                      ? 10
                      : width > 1400
                      ? 15
                      : "",
                }}
              >
                <Grid container spacing={width < 600 ? 0 : 1}>
                  <Grid
                    item
                    xs={
                      width < 600
                        ? 0
                        : width < 769 && width > 600
                        ? 3
                        : width < 900 && width > 769
                        ? 2.5
                        : width > 1100 && width < 1400
                        ? 2
                        : width > 1400
                        ? 1
                        : 2.5
                    }
                  ></Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        mb: width < 900 ? 1 : 1.5,
                        gap: width < 900 ? 0 : 11,
                        flexWrap: width < 900 ? "wrap" : "nowrap",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 16,
                          fontFamily: "Barlow, san-serif",
                          color: "#CCCCCC",
                          whiteSpace: "nowrap",
                          mr: width < 900 ? 15 : "",
                        }}
                      >
                        Take profit
                      </Typography>
                      <ValidationTextField
                        margin="normal"
                        id="takeprofit"
                        name="takeProfit"
                        placeholder="Signal"
                        value={TakeProfitData[index]["Take Profit"]}
                        sx={{
                          width:
                            width < 900 && width > 600
                              ? "7rem"
                              : width < 600
                              ? "100%"
                              : "5rem",
                          fontFamily: "Barlow, san-serif",
                        }}
                        onChange={async (event) => {
                          const temp = [...TakeProfitData];
                          temp[index]["Take Profit"] = event.target.value;
                          setTakeProfitData(temp);
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        mb: width < 900 ? 1 : 1.5,
                        gap: width < 900 ? 0 : 7,
                        flexWrap: width < 900 ? "wrap" : "nowrap",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 16,
                          fontFamily: "Barlow, san-serif",
                          color: "#CCCCCC",
                          whiteSpace: "nowrap",
                          mr: width < 900 ? 15 : "",
                        }}
                      >
                        Min. Take Profit
                      </Typography>
                      <ValidationTextField
                        margin="normal"
                        id="mintakeprofit"
                        name="minTakeProfit"
                        placeholder="1.5%"
                        value={TakeProfitData[index]["Min Take Profit"]}
                        sx={{
                          width:
                            width < 900 && width > 600
                              ? "7rem"
                              : width < 600
                              ? "100%"
                              : "5rem",
                          fontFamily: "Barlow, san-serif",
                        }}
                        onChange={async (event) => {
                          const temp = [...TakeProfitData];
                          temp[index]["Min Take Profit"] = event.target.value;
                          setTakeProfitData(temp);
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
            {item === "stop loss" && (
              <Box
                sx={{
                  mt: 3,
                  borderRadius: "5px",
                  px:
                    width > 1200 && width < 1300
                      ? 5
                      : width > 1300 && width < 1400
                      ? 10
                      : width > 1400
                      ? 15
                      : "",
                }}
              >
                <Grid container spacing={width < 600 ? 0 : 1}>
                  <Grid
                    item
                    xs={
                      width < 600
                        ? 0
                        : width < 769 && width > 600
                        ? 3
                        : width < 900 && width > 769
                        ? 2.5
                        : width > 1100 && width < 1400
                        ? 2
                        : width > 1400
                        ? 1
                        : 2.5
                    }
                  ></Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        mb: width < 900 ? 1 : 1.5,
                        gap: width < 900 ? 0 : 5,
                        flexWrap: width < 900 ? "wrap" : "nowrap",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 16,
                          fontFamily: "Barlow, san-serif",
                          color: "#CCCCCC",
                          whiteSpace: "nowrap",
                          mr: width < 900 ? 15 : "",
                        }}
                      >
                        Stop Loss
                      </Typography>
                      <ValidationTextField
                        margin="normal"
                        id="stoploss"
                        name="stopLoss"
                        placeholder="1.5%"
                        value={StopLossData[index]["Stop Loss"]}
                        sx={{
                          width:
                            width < 900 && width > 600
                              ? "7rem"
                              : width < 600
                              ? "100%"
                              : "5rem",
                          fontFamily: "Barlow, san-serif",
                        }}
                        onChange={async (event) => {
                          const temp = [...StopLossData];
                          temp[index]["Stop Loss"] = event.target.value;
                          setStopLossData(temp);
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
            {index + 1 === value.length && (
              <Box sx={{ display: "flex" }}>
                <Button
                  sx={{
                    background: "linear-gradient(to right,#790F87,#794AE3)",
                    cursor: "pointer",
                    border: "none",
                    px: 1,
                    marginLeft: "auto",
                  }}
                  onClick={() => handleSave()}
                >
                  <Typography
                    color={"white"}
                    fontSize={14}
                    fontFamily={"Barlow, san-serif"}
                    fontWeight={500}
                  >
                    Save Strategy
                  </Typography>
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      <CandleStickGraph />
    </>
  );
};
