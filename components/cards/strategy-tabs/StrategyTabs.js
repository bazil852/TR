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
import SelectInputParameters from "../../widgets/SelectInputParameters";

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
    "::placeholder": {
      zIndex: "10px",
      color: "#FFFFFF !important",
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
  const [ANDToggle, setANDToggle] = useState([[true]]);
  const [GeneralSettingsData, setGeneralSettingsData] = useState([
    {
      strategyName: "",
      strategyFolder: "",
      strategyDescription: "",
      botLink: "",
      notes: "",
    },
  ]);
  const [OrdersData, setOrdersData] = useState([
    {
      firstOrderSize: "",
      extraOrderSize: "",
      orderType: "",
      pairs: "",
    },
  ]);
  const [DCAData, setDCAData] = useState([
    {
      dcaType: "",
      volumeMultiplier: "",
      maxExtraOrders: "",
      minDistBetweenOrders: "",
      startExtraOrder: "",
      stepMultiplier: "",
    },
  ]);
  const [TakeProfitData, setTakeProfitData] = useState([
    {
      takeProfit: "",
      minTakeProfit: "",
    },
  ]);
  const [StopLossData, setStopLossData] = useState([
    {
      stopLoss: "",
    },
  ]);
  const [AllStrategyData, setAllStartegyData] = useState([
    {
      generalSettings: {},
      orders: {},
      dca: {},
      takeProfit: {},
      stopLoss: {},
      parameters: [],
    },
  ]);

  const [ParametersData, setParametersData] = useState([
    [{ 1: "", operation: "", 2: "", relation: "" }],
  ]);
  useEffect(() => {
    // fetchStrategiesByUserId();
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
    console.log(newData);
  };

  const handleAdd = () => {
    const temp = [...value, "orders"];
    setvalue(temp);
    setGeneralSettingsData([
      ...GeneralSettingsData,
      {
        strategyName: "",
        strategyFolder: "",
        strategyDescription: "",
        botLink: "",
        notes: "",
      },
    ]);
    setOrdersData([
      ...OrdersData,
      {
        firstOrderSize: "",
        extraOrderSize: "",
        orderType: "",
        pairs: "",
      },
    ]);
    setDCAData([
      ...DCAData,
      {
        dcaType: "",
        volumeMultiplier: "",
        maxExtraOrders: "",
        minDistBetweenOrders: "",
        startExtraOrder: "",
        stepMultiplier: "",
      },
    ]);
    setTakeProfitData([
      ...TakeProfitData,
      { takeProfit: "", minTakeProfit: "" },
    ]);
    setStopLossData([...StopLossData, { stopLoss: "" }]);
    setAllStartegyData([
      ...AllStrategyData,
      {
        generalSettings: {},
        orders: {},
        dca: {},
        takeProfit: {},
        stopLoss: {},
      },
    ]);
    setParametersData([
      ...ParametersData,
      [{ 1: "", operation: "", 2: "", relation: "" }],
    ]);
    setANDToggle([...ANDToggle, [true]]);
  };

  const ParametersOptions = [
    { value: "Dummy1", label: "Dummy1" },
    { value: "Dummy2", label: "Dummy2" },
    { value: "Dummy3", label: "Dummy3" },
  ];
  const parametersOneOptions = [
    {
      value: "BullishGreenVol200Open",
      label: "Bullish Green (Vol > 200%) Open",
    },
    { value: "BullishBlueVol150Open", label: "Bullish Blue (Vol > 150%) Open" },
    { value: "BearishRedVol200Open", label: "Bearish Red (Vol > 200%) Open" },
    {
      value: "BearishPurpleVol150Open",
      label: "Bearish Purple (Vol > 150%) Open",
    },
    {
      value: "BullishGreenVol200Close",
      label: "Bullish Green (Vol > 200%) Close",
    },
    {
      value: "BullishBlueVol150Close",
      label: "Bullish Blue (Vol > 150%) Close",
    },
    { value: "BearishRedVol200Close", label: "Bearish Red (Vol > 200%) Close" },
    {
      value: "BearishPurpleVol150Close",
      label: "Bearish Purple (Vol > 150%) Close",
    },
    {
      value: "BullishGreenVol200High",
      label: "Bullish Green (Vol > 200%) High",
    },
    { value: "BullishBlueVol150High", label: "Bullish Blue (Vol > 150%) High" },
    { value: "BearishRedVol200High", label: "Bearish Red (Vol > 200%) High" },
    {
      value: "BearishPurpleVol150High",
      label: "Bearish Purple (Vol > 150%) High",
    },
    { value: "BullishGreenVol200Low", label: "Bullish Green (Vol > 200%) Low" },
    { value: "BullishBlueVol150Low", label: "Bullish Blue (Vol > 150%) Low" },
    { value: "BearishRedVol200Low", label: "Bearish Red (Vol > 200%) Low" },
    {
      value: "BearishPurpleVol150Low",
      label: "Bearish Purple (Vol > 150%) Low",
    },
  ];
  const parametersOperationsOptions = [
    { value: "Ignore", label: "Ignore" },
    { value: "GreaterThan", label: "Greater than" },
    { value: "GreaterOrEqual", label: "Greater or equal" },
    { value: "LessThan", label: "Less than" },
    { value: "LessOrEqual", label: "Less or equal" },
    { value: "CrossesUp", label: "Crosses up" },
    { value: "CrossesDown", label: "Crosses down" },
  ];

  const parametersTwoOptions = [
    { value: "Simple Moving Average 20", label: "Simple Moving Average 20" },
    { value: "Simple Moving Average 50", label: "Simple Moving Average 50" },
    {
      value: "Exponential Moving Average 20",
      label: "Exponential Moving Average 20",
    },
    {
      value: "Exponential Moving Average 50",
      label: "Exponential Moving Average 50",
    },
    {
      value: "Keltner Channel Upper Band 50",
      label: "Keltner Channel Upper Band 50",
    },
    {
      value: "Keltner Channel Middle Band 50",
      label: "Keltner Channel Middle Band 50",
    },
    {
      value: "Keltner Channel Lower Band 50",
      label: "Keltner Channel Lower Band 50",
    },
    { value: "Tom Demark Buy 9", label: "Tom Demark Buy 9" },
    { value: "Tom Demark Sell 9", label: "Tom Demark Sell 9" },
    { value: "Tom Demark Buy 13", label: "Tom Demark Buy 13" },
    { value: "Tom Demark Sell 13", label: "Tom Demark Sell 13" },
    { value: "Bollinger Band Lower", label: "Bollinger Band Lower" },
    { value: "Bollinger Band Higher", label: "Bollinger Band Higher" },
  ];
  const OrderTypeOptions = [
    { value: "Market", label: "Market" },
    { value: "Limit", label: "Limit" },
  ];
  const handleAddParameter = (index) => {
    var len = 0;
    const temp2 = [...ParametersData];
    temp2[index].map((item) => {
      len = Object.keys(item)[1];
    });
    temp2[index] = [
      ...temp2[index],
      {
        [parseInt(len) + 1]: "",
        operation: "",
        [parseInt(len) + 2]: "",
        relation: "AND",
      },
    ];

    setParametersData(temp2);
    const temp3 = [...ANDToggle];
    temp3[index] = [...temp3[index], true];
    setANDToggle(temp3);
  };

  const handleANDToggle = (index, ParametersIndex) => {
    console.log(index, ParametersIndex);
    let temp2 = [...ParametersData];
    temp2[0][ParametersIndex].relation = ANDToggle[index][ParametersIndex]
      ? "AND"
      : "OR";

    setParametersData(temp2);
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
    const temp = AllStrategyData.map((item, index) => {
      return {
        ...item,
        generalSettings: GeneralSettingsData[index],
        dca: DCAData[index],
        orders: OrdersData[index],
        stopLoss: StopLossData[index],
        takeProfit: TakeProfitData[index],
        parameters: ParametersData[index],
        user,
      };
    });
    console.log(temp);
    setAllStartegyData([...temp]);
    console.log("all the data", AllStrategyData);
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
    temp = ParametersData.filter((item, index) => index !== i);
    setParametersData(temp);
    temp = AllStrategyData.filter((item, index) => index !== i);
    setAllStartegyData(temp);
    temp = ANDToggle.filter((item, index) => index !== i);
    setANDToggle(temp);
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
                      pointerEvents: index !== 0 ? "none" : "all",
                      background:
                        item === "general"
                          ? "linear-gradient(to right,#790F87,#794AE3)"
                          : "#363636",
                      opacity: index !== 0 ? 0.4 : 1,
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
              <Box sx={{ minHeight: 200 }}>
                <GeneralSettings
                  index={index}
                  GeneralSettingsData={GeneralSettingsData}
                  setGeneralSettingsData={setGeneralSettingsData}
                />
              </Box>
            )}
            {item === "orders" && (
              <>
                <Box
                  sx={{
                    mt: 3,
                    borderRadius: "5px",
                    minHeight: 184,
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
                          // placeholder="100"
                          value={OrdersData[index]["firstOrderSize"]}
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
                            temp[index]["firstOrderSize"] = event.target.value;
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
                          // placeholder="150"
                          id="extraordersize"
                          name="extraOrderSize"
                          value={OrdersData[index]["extraOrderSize"]}
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
                            temp[index]["extraOrderSize"] = event.target.value;
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
                        <SelectInputParameters
                          placeHolder="Select"
                          value={OrdersData[index]["orderType"]}
                          onChange={async (event) => {
                            const temp = [...OrdersData];
                            temp[index]["orderType"] = event.value;
                            setOrdersData(temp);
                          }}
                          Width={
                            width < 769 && width > 600
                              ? "7rem"
                              : width < 600
                              ? "100%"
                              : "5rem"
                          }
                          options={OrderTypeOptions}
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
                        <SelectInputParameters
                          placeHolder="BTC/USDT"
                          value={OrdersData[index].pairs}
                          Width={width < 600 ? "100%" : "10rem"}
                          onChange={async (event) => {
                            const temp = [...OrdersData];
                            temp[index].pairs = event.value;
                            setOrdersData(temp);
                          }}
                          options={ParametersOptions}
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
                  {ParametersData[index].map(
                    (ParameterItem, ParametersIndex) => (
                      <>
                        {ParametersIndex !== 0 && (
                          <Grid item xs={12} sm={12} md={1.2} lg={1.2}>
                            <Box
                              sx={{
                                background:
                                  "linear-gradient(to right,#790F87,#794AE3)",
                                borderRadius: "6px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                height: 123,
                                width: width < 601 ? 66 : 66,
                                ml: width < 900 ? "45%" : "",
                                fontFamily: "Barlow, san-serif",
                                fontSize: 20,
                                fontWeight: 400,
                                transition: "transform .01s ease-in-out",
                                "&:hover": {
                                  transform: "scale(0.98)",
                                },
                              }}
                              onClick={() => {
                                const temp = [...ANDToggle];
                                temp[index][ParametersIndex] = !ANDToggle[
                                  index
                                ][ParametersIndex];

                                setANDToggle(temp);
                                handleANDToggle(index, ParametersIndex);
                              }}
                            >
                              {ANDToggle[index][ParametersIndex] ? "AND" : "OR"}
                            </Box>
                          </Grid>
                        )}
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
                                Parameters {Object.keys(ParameterItem)[0]}
                              </Typography>
                              <SelectInputParameters
                                // placeHolder="Bullish Green Vector (Vol.>200%)"
                                value={
                                  ParametersData[index][ParametersIndex][
                                    Object.keys(ParameterItem)[0]
                                  ]
                                }
                                onChange={(selectedOption) => {
                                  const temp = [...ParametersData];
                                  temp[index][ParametersIndex][
                                    Object.keys(ParameterItem)[0]
                                  ] = selectedOption.value;
                                  setParametersData(temp);
                                }}
                                options={parametersOneOptions}
                                keyName={"Parameter"}
                              />
                            </Box>

                            <SelectInputParameters
                              value={
                                ParametersData[index][ParametersIndex].operation
                              }
                              onChange={(selectedOption) => {
                                const temp = [...ParametersData];
                                temp[index][ParametersIndex].operation =
                                  selectedOption.value;
                                setParametersData(temp);
                              }}
                              options={parametersOperationsOptions}
                              keyName={"operation"}
                              placeHolder={"Operations"}
                              Width={"50%"}
                              margin={
                                width < 900 && width > 600
                                  ? "35vw"
                                  : width < 600 && width > 500
                                  ? "33vw"
                                  : width < 500
                                  ? "28vw"
                                  : 13.5
                              }
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
                                Parameters {Object.keys(ParameterItem)[1]}
                              </Typography>
                              <SelectInputParameters
                                // placeHolder="Bullish Green Vector (Vol.>200%)"
                                value={
                                  ParametersData[index][ParametersIndex][
                                    Object.keys(ParameterItem)[1]
                                  ]
                                }
                                onChange={(selectedOption) => {
                                  const temp = [...ParametersData];
                                  temp[index][ParametersIndex][
                                    Object.keys(ParameterItem)[1]
                                  ] = selectedOption.value;
                                  setParametersData(temp);
                                }}
                                options={parametersTwoOptions}
                                keyName={"Parameter"}
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
                              <Box
                                onClick={() => handleAddParameter(index)}
                                sx={{
                                  cursor: "pointer",
                                }}
                              >
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
                      </>
                    )
                  )}
                </Grid>
              </Box>
            )}
            {item === "dca" && (
              <Box
                sx={{
                  mt: 3,
                  borderRadius: "5px",
                  minHeight: 184,
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
                      <SelectInputParameters
                        placeHolder="Signal"
                        Width={
                          width < 900 && width > 600
                            ? "7rem"
                            : width < 600
                            ? "100%"
                            : "5rem"
                        }
                        value={DCAData[index]["dcaType"]}
                        onChange={async (event) => {
                          const temp = [...DCAData];
                          temp[index]["dcaType"] = event.value;
                          setDCAData(temp);
                        }}
                        options={ParametersOptions}
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
                        type="number"
                        // placeholder="1.05"
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
                        value={DCAData[index]["volumeMultiplier"]}
                        onChange={async (event) => {
                          const temp = [...DCAData];
                          temp[index]["volumeMultiplier"] = event.target.value;
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
                        type="number"
                        // placeholder="10"
                        sx={{
                          width:
                            width < 900 && width > 600
                              ? "7rem"
                              : width < 600
                              ? "100%"
                              : "5rem",
                          fontFamily: "Barlow, san-serif",
                        }}
                        value={DCAData[index]["maxExtraOrders"]}
                        onChange={async (event) => {
                          const temp = [...DCAData];
                          temp[index]["maxExtraOrders"] = event.target.value;
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
                        type="number"
                        // placeholder="1.5%"
                        sx={{
                          width:
                            width < 900 && width > 600
                              ? "7rem"
                              : width < 600
                              ? "100%"
                              : "5rem",
                          fontFamily: "Barlow, san-serif",
                        }}
                        value={DCAData[index]["minDistBetweenOrders"]}
                        onChange={async (event) => {
                          const temp = [...DCAData];
                          temp[index]["minDistBetweenOrders"] =
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
                        type="number"
                        // placeholder="1.05%"
                        sx={{
                          width:
                            width < 900 && width > 600
                              ? "7rem"
                              : width < 600
                              ? "100%"
                              : "5rem",
                          fontFamily: "Barlow, san-serif",
                        }}
                        value={DCAData[index]["startExtraOrder"]}
                        onChange={async (event) => {
                          const temp = [...DCAData];
                          temp[index]["startExtraOrder"] = event.target.value;
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
                        type="number"
                        // placeholder="1.05"
                        sx={{
                          width:
                            width < 900 && width > 600
                              ? "7rem"
                              : width < 600
                              ? "100%"
                              : "5rem",
                          fontFamily: "Barlow, san-serif",
                        }}
                        value={DCAData[index]["stepMultiplier"]}
                        onChange={async (event) => {
                          const temp = [...DCAData];
                          temp[index]["stepMultiplier"] = event.target.value;
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
                  minHeight: 184,
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
                      <SelectInputParameters
                        placeHolder="Signal"
                        value={TakeProfitData[index]["takeProfit"]}
                        Width={
                          width < 900 && width > 600
                            ? "7rem"
                            : width < 600
                            ? "100%"
                            : "5rem"
                        }
                        onChange={async (event) => {
                          const temp = [...TakeProfitData];
                          temp[index]["takeProfit"] = event.value;
                          setTakeProfitData(temp);
                        }}
                        options={ParametersOptions}
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
                        type="number"
                        // placeholder="1.5%"
                        value={TakeProfitData[index]["minTakeProfit"]}
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
                          temp[index]["minTakeProfit"] = event.target.value;
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
                  minHeight: 184,
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
                        type="number"
                        // placeholder="1.5%"
                        value={StopLossData[index]["stopLoss"]}
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
                          temp[index]["stopLoss"] = event.target.value;
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
