import React, { useEffect, useState } from "react";
// import SelectInput from "../../widgets/SelectInput";
// import Plus from "../../../assets/icons/Vector.png";
import { alpha, styled } from "@mui/material/styles";
import { InputBase, InputAdornment, Tabs, Tab } from "@mui/material";
import { Plus } from "../../../utils/icons";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import GeneralSettings from "../../../components/cards/general-settings/GeneralSettings";
import { getSession } from "next-auth/react";
import Chart from "../../deal-page/Chart";
import CandleStickGraph from "../../../components/cards/candleStick-strategy/CandleStickGraph";
// import CandlestickChart from "../../deal-page/Chart";
// import Indicators from "../indicators/Indicators";
import { Note } from "@mui/icons-material";
import Image from "next/image";
import { idex } from "ccxt";

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

const orderTypeOptions = ["Market", "Limit"];

const avgPriceCondition = ["Above", "Below"];
const stopLoss = ["Fixed", "At candle body w % up or down", "Trailing SL"];
const takeProfit = [
  "Fixed",
  "At candle body",
  "At candle wick w % up or down",
  "Trailing TP",
];

const StrategyTabs = () => {
  const [count, setCount] = useState(1);
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

  const handleCount = () => {
    setCount(count + 1);
    console.log(count);
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

  const [AllStrategyData, setAllStartegyData] = useState([]);

  const [maPercentage, setMaPercentage] = useState("");
  const [dynamicPercentage, setDynamicPercentage] = useState("");
  const [error, setError] = useState(false);

  const [showTPPercentageTab, setShowTPPercentageTab] = useState(false);
  const [showSLPercentageTab, setShowSLPercentageTab] = useState(false);

  const [strategyName, setStrategyName] = useState([""]);
  const [strategyFolder, setStrategyFolder] = useState([""]);
  const [strategyDescription, setStrategyDescription] = useState([""]);
  const [BotLink, setBotLink] = useState([""]);
  const [Notes, setNotes] = useState([""]);
  const [botName, setBotName] = useState([""]);
  const [exchange, setExchange] = useState([""]);
  const [botType, setBotType] = useState([""]);
  const [strategyType, setStrategyType] = useState("");
  const [strategyPair, setStrategyPair] = useState("");
  const [chartData, setChartData] = useState({});
  const [orderType, setOrderType] = useState([""]);
  const [baseOrderSize, setBaseOrderSize] = useState("");
  const [safetyOrderMul, setSafetyOrderMul] = useState("");
  const [safetyOrder, setSafetyOrder] = useState("");
  const [maxOrder, setMaxOrder] = useState("");
  const [maxOrderPercent, setMaxOrderPercent] = useState("");
  const [maxVol, setMaxVol] = useState("");
  const [maxVolPercent, setMaxVolPercent] = useState("");

  const [indicatorArray, setIndicatorArray] = useState([]);

  const [takeProfitValue, setTakeProfitValue] = useState("");
  const [takeProfitPercent, setTakeProfitPercent] = useState("");

  const [stopLossValue, setStopLossValue] = useState("");
  const [stopLossPercent, setStopLossPercent] = useState("");

  const [buyOnCondition, setBuyOnCondition] = useState("");
  const [buyOnConditionX, setBuyOnConditionX] = useState("");
  const [avgPrice, setAvgPrice] = useState("");
  const [avgPricePercent, setAvgPricePercent] = useState("");
  const [ignoreCondition, setIgnoreCondition] = useState("");
  const [ignoreConditionX, setIgnoreConditionX] = useState("");

  const [exchangeOptions, setExchangeOptions] = useState([]);
  const [value, setvalue] = useState(["general"]);
  const [firstOrderSize, setFirstOrderSize] = useState([""]);
  const [extraOrderSize, setExtraOrderSize] = useState([""]);
  const [Pairs, setPairs] = useState([""]);

  const [DCAType, setDCAType] = useState([""]);
  const [volumeMultiplier, setVolumeMultiplier] = useState([""]);
  const [maxExtraOrders, setMaxExtraOrders] = useState([""]);
  const [minDistBetweenOrders, setMinDistBetweenOrders] = useState([""]);
  const [startExtraOrder, setStratExtraOrder] = useState([""]);
  const [stopMultiplier, setStopMultiplier] = useState([""]);

  const [takeProfit, setTakeProfit] = useState([""]);
  const [minTakeProfit, setMinTakeProfit] = useState([]);

  const [stopLoss, setStopLoss] = useState([""]);

  useEffect(()=>{
    fetchStrategiesByUserId();
  },[])
  
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
    console.log(newData);
  }

  const handleAdd = () => {
    // const temp1 = [...firstOrderSize, ""];
    // setFirstOrderSize(temp1);
    const temp = [...value, "general"];
    setvalue(temp);
    console.log(firstOrderSize);
  };

  const handleChangeMaPercentage = (event) => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setAvgPricePercent(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleChangeTakeProfitPercent = (event) => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setTakeProfitPercent(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleChangeStopLossPercent = (event) => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setStopLossPercent(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleChangeXcondition = () => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setBuyOnConditionX(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
    console.log("happy");
  };
  const handleChangeFirstXcondition = () => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setIgnoreConditionX(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
    console.log("happy");
  };

  const handleOnChange = async (event) => {
    if (
      event.target.value === "Fixed" ||
      event.target.value === "At candle wick w % up or down"
    ) {
      setShowTPPercentageTab(true);
    } else {
      setShowTPPercentageTab(false);
      setTakeProfitPercent("");
    }
    setTakeProfitValue(event.target.value);
  };

  const handleStopLossOnChange = async (event) => {
    if (event.target.value === "Fixed") {
      setShowSLPercentageTab(true);
    } else {
      setShowSLPercentageTab(false);
      setStopLossPercent("");
    }
    setStopLossValue(event.target.value);
  };

  const handleMaxVolume = () => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setMaxVolPercent(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
    console.log("handleMaxVolume");
  };
  const handleMaxOrder = () => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setMaxOrderPercent(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
    console.log("handleMaxOrder");
  };

  const [width, setWidth] = useState(globalThis?.innerWidth);
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
    const temp = [...AllStrategyData];
    value.map((item, index) => {
      temp[index] = {
        generalSettings: {
          strategyName: strategyName[index],
          strategyFolder: strategyFolder[index],
          botLink: BotLink[index],
          strategyDescription: strategyDescription[index],
          notes: Notes[index],
        },
        orders: {
          firstOrderSize: firstOrderSize[index],
          extraOrderSize: extraOrderSize[index],
          orderType: orderType[index],
          pairs: Pairs[index],
        },
        dca: {
          dcaType: DCAType[index],
          volumeMultiplier: volumeMultiplier[index],
          maxExtraOrders: maxExtraOrders[index],
          minDistBetweenOrders: minDistBetweenOrders[index],
          startExtraOrder: startExtraOrder[index],
          stopMultiplier: stopMultiplier[index],
        },
        takeProfit: {
          takeProfit: takeProfit[index],
          minTakeProfit: minTakeProfit[index],
        },
        stopLoss: {
          stopLoss: stopLoss[index],
        },
        user,
      };
    });
    setAllStartegyData([...temp]);
    console.log("all the data", AllStrategyData);
    const response = await fetch(
      `/api/strategy/create-strategy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...temp]),
      }
    );
    if(response.ok){
      alert("Strategy Saved")
    }else{
      alert("Strategy Not Saved")
    }
  };

  const handleRemove = (i) => {
    var temp = [];
    temp = value.filter((item, index) => index !== i);
    setvalue(temp);
    temp = strategyName.filter((item, index) => index !== i);
    setStrategyName(temp);
    temp = strategyFolder.filter((item, index) => index !== i);
    setStrategyFolder(temp);
    temp = BotLink.filter((item, index) => index !== i);
    setBotLink(temp);
    temp = strategyDescription.filter((item, index) => index !== i);
    setStrategyDescription(temp);
    temp = Notes.filter((item, index) => index !== i);
    setNotes(temp);
    temp = firstOrderSize.filter((item, index) => index !== i);
    setFirstOrderSize(temp);
    temp = extraOrderSize.filter((item, index) => index !== i);
    setBaseOrderSize(temp);
    temp = orderType.filter((item, index) => index !== i);
    setOrderType(temp);
    temp = Pairs.filter((item, index) => index !== i);
    setPairs(temp);
    temp = DCAType.filter((item, index) => index !== i);
    setDCAType(temp);
    temp = volumeMultiplier.filter((item, index) => index !== i);
    setVolumeMultiplier(temp);
    temp = maxExtraOrders.filter((item, index) => index !== i);
    setMaxOrder(temp);
    temp = minDistBetweenOrders.filter((item, index) => index !== i);
    setMinDistBetweenOrders(temp);
    temp = extraOrderSize.filter((item, index) => index !== i);
    setExtraOrderSize(temp);
    temp = stopMultiplier.filter((item, index) => index !== i);
    setStopMultiplier(temp);
    temp = takeProfit.filter((item, index) => index !== i);
    setTakeProfit(temp);
    temp = minTakeProfit.filter((item, index) => index !== i);
    setMinTakeProfit(temp);
    temp = stopLoss.filter((item, index) => index !== i);
    setStopLoss(temp);
    temp = AllStrategyData.filter((item, index) => index !== i);
    setAllStartegyData(temp);
  };
  return (
    <>
      <Box
        sx={{
          background: "#131313",
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
                strategyName={strategyName}
                setStrategyName={setStrategyName}
                strategyFolder={strategyFolder}
                setStrategyFolder={setStrategyFolder}
                BotLink={BotLink}
                setBotLink={setBotLink}
                strategyDescription={strategyDescription}
                setStrategyDescription={setStrategyDescription}
                Notes={Notes}
                setNotes={setNotes}
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
                          value={firstOrderSize[index]}
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
                            const temp = [...firstOrderSize];
                            temp[index] = event.target.value;
                            setFirstOrderSize(temp);
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
                          value={extraOrderSize[index]}
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
                            const temp = [...extraOrderSize];
                            temp[index] = event.target.value;
                            setExtraOrderSize(temp);
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
                          value={orderType[index]}
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
                            const temp = [...orderType];
                            temp[index] = event.target.value;
                            setOrderType(temp);
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
                          value={Pairs[index]}
                          sx={{
                            fontFamily: "Barlow, san-serif",
                            width: width < 600 ? "100%" : "10rem",
                          }}
                          onChange={async (event) => {
                            const temp = [...Pairs];
                            temp[index] = event.target.value;
                            setPairs(temp);
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
                        value={DCAType[index]}
                        onChange={async (event) => {
                          const temp = [...DCAType];
                          temp[index] = event.target.value;
                          setDCAType(temp);
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
                        value={volumeMultiplier[index]}
                        onChange={async (event) => {
                          const temp = [...volumeMultiplier];
                          temp[index] = event.target.value;
                          setVolumeMultiplier(temp);
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
                        value={maxExtraOrders[index]}
                        onChange={async (event) => {
                          const temp = [...maxExtraOrders];
                          temp[index] = event.target.value;
                          setMaxExtraOrders(temp);
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
                        value={minDistBetweenOrders[index]}
                        onChange={async (event) => {
                          const temp = [...minDistBetweenOrders];
                          temp[index] = event.target.value;
                          setMinDistBetweenOrders(temp);
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
                        value={startExtraOrder[index]}
                        onChange={async (event) => {
                          const temp = [...startExtraOrder];
                          temp[index] = event.target.value;
                          setStratExtraOrder(temp);
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
                        value={stopMultiplier[index]}
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
                          const temp = [...stopMultiplier];
                          temp[index] = event.target.value;
                          setStopMultiplier(temp);
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
                        value={takeProfit[index]}
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
                          const temp = [...takeProfit];
                          temp[index] = event.target.value;
                          setTakeProfit(temp);
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
                        value={minTakeProfit[index]}
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
                          const temp = [...minTakeProfit];
                          temp[index] = event.target.value;
                          setMinTakeProfit(temp);
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
                        value={stopLoss[index]}
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
                          const temp = [...stopLoss];
                          temp[index] = event.target.value;
                          setStopLoss(temp);
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
