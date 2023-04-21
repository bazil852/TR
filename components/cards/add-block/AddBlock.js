import React, { useEffect, useState } from "react";
import SelectInput from "../../widgets/SelectInput";

import { alpha, styled } from "@mui/material/styles";
import { InputBase, InputAdornment } from "@mui/material";
import { SmallDown } from "../../../utils/icons";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import GeneralSettings from "../../../components/cards/general-settings/GeneralSettings";
import Strategy from "../../../components/cards/strategy/Strategy";
import { signIn, getSession, useSession } from "next-auth/react";
import Chart from "../../deal-page/Chart";

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    height: 20,
    backgroundColor: "#452951",
    borderRadius: "8px",
    fontSize: 16,
    padding: "8px 12px",
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

const ValueBox = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    // borderRadius: 4,
    height: 28,
    width: 28,
    position: "relative",
    backgroundColor: "#FFFFFF33",
    // border: "1px solid #ced4da",
    fontSize: 16,
    color: "#CCCCCC",
    padding: "10px 12px",
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const names = [100, 200, 300, 400, 500];
const actionValues = ["buy", "sell", "none"];

const orderType = ["Market", "Limit"];
const profitCurrency = ["Quote", "Base Currency"];
const masDistance = [
  "Vector Candle",
  "Moving Averages",
  "Estimated Moving Averages",
  "Price",
  "Zig Zag",
  "Nadaraya-Watson",
];
const candleType = ["Upper Body", "Lower Body", "Upper Wick", "Lower Wick"];
const candleOption = ["red", "purple", "blue", "green"];
const movingAverageOptions = ["Above", "Below", "Crossing Up", "Crossing Down"];
const trend = ["Up Trend", "Down Trend"];
const avgPriceCondition = ["Above", "Below"];
const stopLoss = ["Fixed", "At candle body w % up or down", "Trailing SL"];
const takeProfit = [
  "Fixed",
  "At candle body",
  "At candle wick w % up or down",
  "Trailing TP",
];

const AddBlock = () => {
  const [count, setCount] = useState(1);

  const [botName, setBotName] = useState("");
  const [exchange, setExchange] = useState("");
  const [botType, setBotType] = useState("");
  const [strategyType, setStrategyType] = useState("");
  const [strategyPair, setStrategyPair] = useState("");

  // const [botSetting, setBotSetting] = useState({});

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
    // {/* <Strategy setType={setStrategyType} setPair={setStrategyPair} /> */}
    <Box
      sx={{
        mt: 5,
      }}
      component="main"
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontWeight: 600, fontSize: "30px" }}>
          Cycle 1
        </Typography>
        <Button
          onClick={handleCount}
          sx={{
            color: "white",
            mx: 2,
            background: "linear-gradient(to right,#790F87,#794AE3)",
            textTransform: "none",
          }}
        >
          <Typography sx={{ fontWeight: 600, px: 2, fontSize: "12px" }}>
            Add Cycle
          </Typography>
        </Button>
      </Box>
      {/* {Array(count)
          .fill()
          .map((_) => (
            <>
              <AddBlockComponent />
              {count === 1 ? <></> : <Box sx={{ marginTop: "35px" }}></Box>}
            </>
          ))} */}

      <AddBlockComponent setBotSettings={setBotSetting} />
    </Box>
    // {/* <Button sx={{ width: 150 }}>Submit</Button> */}
  );
};

export default AddBlock;

const AddBlockComponent = (props) => {
  const [maPercentage, setMaPercentage] = useState("");
  const [dynamicPercentage, setDynamicPercentage] = useState("");
  const [error, setError] = useState(false);

  const [showTPPercentageTab, setShowTPPercentageTab] = useState(false);
  const [showVectorCandle, setShowVectorCandle] = useState(false);
  const [showMovingAverages, setShowMovingAverages] = useState(false);
  const [showEstimatedMovingAverages, setShowEstimatedMovingAverages] =
    useState(false);

  const handleChangeMaPercentage = (event) => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setMaPercentage(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleChangeXcondition = () => {
    console.log("happy");
  };
  const handleChangeFirstXcondition = () => {
    console.log("happy");
  };

  const handleChangeDynamicPercentage = (event) => {
    if (event.target.value.match(/^(100|[1-9]?[0-9])$/)) {
      setDynamicPercentage(event.target.value);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleOnChange = async (event) => {
    if (
      event.target.value === "Fixed" ||
      event.target.value === "At candle wick w % up or down"
    ) {
      setShowTPPercentageTab(true);
    } else {
      setShowTPPercentageTab(false);
    }
  };

  const handleIndicatorChange = async (event) => {
    if (event.target.value === "Vector Candle") {
      setShowVectorCandle(true);
      setShowMovingAverages(false);
      setShowEstimatedMovingAverages(false);
    }
    if (event.target.value === "Moving Averages") {
      setShowVectorCandle(false);
      setShowMovingAverages(false);
      setShowEstimatedMovingAverages(false);
    }
    if (event.target.value === "Estimated Moving Averages") {
      setShowVectorCandle(false);
      setShowMovingAverages(false);
      setShowEstimatedMovingAverages(false);
    }
  };
  const handleCandleChange = () => {
    console.log("handleCandleChange");
  };
  const handleCandleTypeChange = () => {
    console.log("handleCandleTypeChange");
  };
  const handleMinCandleSize = () => {
    console.log("handleMinCandleSize");
  };
  const handleBotStartsAtSignal = () => {
    console.log("handleBotStartsAtSignal");
  };
  const handleOrderAtEvery = () => {
    console.log("handleOrderAtEvery");
  };
  const handleMaxVolume = () => {
    console.log("handleMaxVolume");
  };
  const handleMaxOrder = () => {
    console.log("handleMaxOrder");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let session = await getSession();
    let formData = {
      orderSize: data.get("orderSize"),
      availablePercentage: data.get("availablePercentage"),
      safetyOrderSize: data.get("safetyOrderSize"),
      candleSizeAndVol: data.get("candleSizeAndVol"),
      orderType: data.get("orderType"),
      profitCurrency: data.get("profitCurrency"),
      indicator: data.get("indicator"),

      indicatorValues: {
        redAction: data.get("redAction"),
        purpleAction: data.get("purpleAction"),
        blueAction: data.get("blueAction"),
        greenAction: data.get("greenAction"),
        minimumTp: data.get("minimumTp"),
      },

      buyOnCondition: data.get("buyOnCondition"),
      avgPrice: data.get("avgPrice"),
      avgPricePercent: data.get("avgPricePercent"),
      ignoreCondition: data.get("ignoreCondition"),
      maxOrders: data.get("maxOrders"),
      maxVol: data.get("maxVol"),
      stopLoss: data.get("stopLoss"),
      takeProfit: data.get("takeProfit"),
      takeProfitPercent: data.get("takeProfitPercent"),
      userId: session.user.id,
    };

    console.log(formData);

    props.setBotSettings(formData);

    // event.currentTarget.reset();
    // const response = await fetch("/api/user/create-strategy", {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const newData = await response.json();
    // console.log(newData);
  };
  const [botName, setBotName] = useState("");
  const [exchange, setExchange] = useState("");
  const [botType, setBotType] = useState("");
  const [strategyType, setStrategyType] = useState("");
  const [strategyPair, setStrategyPair] = useState("");
  const [time, setTime] = useState(new Date());
  const day = new Date();

  const dateOptions = { weekday: "short", month: "short", day: "numeric" };
  const dayOfMonth = day.getDate();
  const weekOfMonth = Math.ceil(dayOfMonth / 7);
  const monthOfYear = day.getMonth() + 1;
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const [activeTab, setActiveTab] = useState("general");
  const USDT = [
    21.0, 20.74, 20.5, 20.0, 14.23, 19.99, 19.5, 19.33, 19.0, 18.5, 18.0, 17.5,
    17.0, 16.8, 16.5, 16.0, 15.5, 15.0, 14.5, 14.0,
  ];
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const listOfPairs = ["BTC", "ETH", "DOGE", "SOL"];
  return (
    <Box>
      <Box component="form" id="myForm" onSubmit={handleSubmit}>
        <Box
          sx={{
            background: "linear-gradient(to right,#3E2146,#371655)",
            mt: 2,
            borderRadius: "5px",
            p: 3,
            marginBottom: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: "40px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "white",
                fontSize: "16px",
                padding: "8px 10px",
                ...(width >= 1200 && {
                  padding: "8px 15px",
                }),
                whiteSpace: "nowrap",
                cursor: "pointer",
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
                background:
                  activeTab === "general"
                    ? "linear-gradient(to right,#790F87,#794AE3)"
                    : "#452951",
                ...(width <= 1100 && {
                  padding: "8px 8px",
                }),
              }}
              onClick={() => handleTabClick("general")}
            >
              General Settings
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                padding: "8px 10px",
                ...(width >= 1200 && {
                  padding: "8px 15px",
                }),
                cursor: "pointer",
                whiteSpace: "nowrap",
                background:
                  activeTab === "orders"
                    ? "linear-gradient(to right,#790F87,#794AE3)"
                    : "#452951",
                ...(width <= 1100 && {
                  padding: "8px 8px",
                }),
              }}
              onClick={() => handleTabClick("orders")}
            >
              Orders
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                padding: "8px 10px",
                ...(width >= 1200 && {
                  padding: "8px 15px",
                }),
                cursor: "pointer",
                whiteSpace: "nowrap",
                background:
                  activeTab === "indicators"
                    ? "linear-gradient(to right,#790F87,#794AE3)"
                    : "#452951",
                ...(width <= 1100 && {
                  padding: "8px 8px",
                }),
              }}
              onClick={() => handleTabClick("indicators")}
            >
              Indicators
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                padding: "8px 10px",
                ...(width >= 1200 && {
                  padding: "8px 15px",
                }),
                cursor: "pointer",
                whiteSpace: "nowrap",
                background:
                  activeTab === "take-profit"
                    ? "linear-gradient(to right,#790F87,#794AE3)"
                    : "#452951",
                ...(width <= 1100 && {
                  padding: "8px 8px",
                }),
              }}
              onClick={() => handleTabClick("take-profit")}
            >
              Take Profit
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                padding: "8px 10px",
                ...(width >= 1200 && {
                  padding: "8px 15px",
                }),
                cursor: "pointer",
                whiteSpace: "nowrap",
                background:
                  activeTab === "stop-loss"
                    ? "linear-gradient(to right,#790F87,#794AE3)"
                    : "#452951",
                ...(width <= 1100 && {
                  padding: "8px 8px",
                }),
              }}
              onClick={() => handleTabClick("stop-loss")}
            >
              Stop Loss
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "white",
                padding: "8px 10px",
                ...(width >= 1200 && {
                  padding: "8px 15px",
                }),
                cursor: "pointer",
                whiteSpace: "nowrap",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                background:
                  activeTab === "advanced"
                    ? "linear-gradient(to right,#790F87,#794AE3)"
                    : "#452951",
                ...(width <= 1100 && {
                  padding: "8px 8px",
                }),
              }}
              onClick={() => handleTabClick("advanced")}
            >
              Advanced Settings
            </Typography>
          </Box>
          <Divider
            variant="fullWidth"
            sx={{
              marginX: -3,
              marginTop: 3,
              marginBottom: 5,
              background: "#7A8580",
            }}
          />
          <Box sx={{ mt: 1, flexGrow: 1 }}>
            <Grid
              container
              spacing={1}
              // columns={{ xs: 4, sm: 10, md: 22 }}
            >
              <Grid item xs={2.25}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 14, ml: 0.5 }}
                  color="#CCCCCC"
                >
                  Order Type
                </Typography>
                <SelectInput
                  placeHolder={"Order Type"}
                  options={orderType}
                  keyName={"orderType"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2.25}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 14, ml: 0.5 }}
                  color="#CCCCCC"
                >
                  Base order size
                </Typography>
                <ValidationTextField
                  type="number"
                  margin="normal"
                  required
                  fullWidth
                  id="orderSize"
                  name="orderSize"
                  sx={{
                    ...(width <= 1050 && {
                      pl: 1,
                    }),
                  }}
                />
              </Grid>
              <Grid item xs={2.25}>
                <Typography
                  sx={{
                    marginBottom: 1,
                    mt: 2,
                    fontSize: 14,
                  }}
                  color="#CCCCCC"
                >
                  Safety order multiplier
                </Typography>
                <ValidationTextField
                  margin="normal"
                  // required
                  fullWidth
                  id="candleSizeAndVol"
                  name="candleSizeAndVol"
                />
              </Grid>
              <Grid item xs={2.25}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 14, ml: 0.5 }}
                  color="#CCCCCC"
                >
                  Safety order size
                </Typography>
                <ValidationTextField
                  margin="normal"
                  // required
                  fullWidth
                  id="safetyOrderSize"
                  name="safetyOrderSize"
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    sx={{ marginBottom: 1, mt: 2, fontSize: 14 }}
                    color="#CCCCCC"
                  >
                    Max orders
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      background: "#452951",
                      borderRadius: "8px",
                    }}
                  >
                    <ValidationTextField
                      margin="normal"
                      // required
                      fullWidth
                      id="maxOrder"
                      name="maxOrder"
                      // sx={{ width: 285 }}
                    />{" "}
                    <InputBase
                      // type="text"
                      name="maxOrder"
                      // value={maPercentage}
                      onChange={handleMaxOrder}
                      type="number"
                      sx={{
                        paddingLeft: 2,
                        paddingRight: 2,
                        borderRadius: "8px",
                        height: 37,
                        width: 90,
                        backgroundColor: "#6D4873",
                        color: "#CCCCCC",
                      }}
                      endAdornment={
                        <InputAdornment position="center">%</InputAdornment>
                      }
                      inputProps={{ min: "0", max: "100" }}
                      error={error}
                      helperText={
                        error ? "Please enter a number between 0 and 100" : ""
                      }
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    sx={{ marginBottom: 1, mt: 2, fontSize: 14 }}
                    color="#CCCCCC"
                  >
                    Max volume
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      background: "#452951",
                      borderRadius: "8px",
                    }}
                  >
                    <ValidationTextField
                      margin="normal"
                      // required
                      fullWidth
                      id="maxVolume"
                      name="maxVolume"
                      // sx={{ width: 285 }}
                    />{" "}
                    <InputBase
                      // type="text"
                      name="maxVolume"
                      // value={maPercentage}
                      onChange={handleMaxVolume}
                      type="number"
                      sx={{
                        paddingLeft: 2,
                        paddingRight: 2,
                        borderRadius: "8px",
                        height: 37,
                        width: 90,
                        backgroundColor: "#6D4873",
                        color: "#CCCCCC",
                      }}
                      endAdornment={
                        <InputAdornment position="center">%</InputAdornment>
                      }
                      inputProps={{ min: "0", max: "100" }}
                      error={error}
                      helperText={
                        error ? "Please enter a number between 0 and 100" : ""
                      }
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <GeneralSettings
          setName={setBotName}
          setExchangeName={setExchange}
          setBot={setBotType}
          setType={setStrategyType}
          setPair={setStrategyPair}
        />
        <Box
          sx={{
            background: "linear-gradient(to right,#3E2146,#371655)",
            mt: 5,
            borderRadius: "5px",
            p: 3,
            marginBottom: 5,
          }}
        >
          <Typography
            sx={{ mt: 1, fontWeight: 600 }}
            color="white"
            component="h1"
            variant="h5"
          >
            Indicators{" "}
            <button
              style={{
                border: "none",
                background: "linear-gradient(#790F87,#794AE3)",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "2px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "17px",
                }}
              >
                +
              </Typography>
            </button>
          </Typography>
          <Box sx={{ mt: 1, flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              sx={{ mb: 0 }}
              // columns={{ xs: 4, sm: 10, md: 16 }}
            >
              <Grid item xs={3} sm={3} xl={3}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                  color="#CCCCCC"
                >
                  Choose Indicator
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <SelectInput
                    placeHolder={"Choose Indicator"}
                    options={masDistance}
                    // width={470}
                    fullWidth
                    keyName={"indicator"}
                    onChange={handleIndicatorChange}
                    value={""}
                  />
                </Box>
              </Grid>
              <Grid item xs={3} sm={3} xl={3}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                  color="#CCCCCC"
                >
                  Select Candle
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <SelectInput
                    placeHolder={"Select Candle"}
                    options={candleOption}
                    // width={470}
                    fullWidth
                    keyName={"indicator"}
                    onChange={handleCandleChange}
                    value={""}
                  />
                </Box>
              </Grid>
              <Grid item xs={3} sm={3} xl={3}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                  color="#CCCCCC"
                >
                  Candle Type
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <SelectInput
                    placeHolder={"Choose Candle Type"}
                    options={candleType}
                    // width={470}
                    fullWidth
                    keyName={"indicator"}
                    onChange={handleCandleTypeChange}
                    value={""}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={3}
                sm={3}
                xl={3}
                sx={{
                  pl: 1,
                  display: "flex",
                  flexDirection: "column",
                  ...(width >= 1600 && {
                    flexDirection: "row",
                  }),
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    backgroundColor: "#452951",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: "0 10px",
                    }}
                  >
                    <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                      Hr
                    </Typography>
                    <Divider
                      variant="fullWidth"
                      sx={{
                        background: "#7A8580",
                        width: "30px",
                      }}
                    />
                    <Typography sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
                      {time.getHours().toString().padStart(2, "0")}
                    </Typography>
                    <Divider
                      variant="fullWidth"
                      sx={{
                        background: "#7A8580",
                        width: "30px",
                      }}
                    />
                    <Typography>-</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: "0 10px",
                    }}
                  >
                    <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                      Min
                    </Typography>
                    <Divider
                      variant="fullWidth"
                      sx={{
                        background: "#7A8580",
                        width: "30px",
                      }}
                    />
                    <Typography sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
                      {time.getMinutes().toString().padStart(2, "0")}
                    </Typography>
                    <Divider
                      variant="fullWidth"
                      sx={{
                        background: "#7A8580",
                        width: "30px",
                      }}
                    />
                    <Typography>-</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: "0 10px",
                    }}
                  >
                    <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                      Sec
                    </Typography>
                    <Divider
                      variant="fullWidth"
                      sx={{
                        background: "#7A8580",
                        width: "30px",
                      }}
                    />
                    <Typography sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
                      {time.getSeconds().toString().padStart(2, "0")}
                    </Typography>
                    <Divider
                      variant="fullWidth"
                      sx={{
                        background: "#7A8580",
                        width: "30px",
                      }}
                    />
                    <Typography>-</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    backgroundColor: "#452951",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: "0 10px",
                    }}
                  >
                    <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                      d
                    </Typography>
                    <Divider
                      variant="fullWidth"
                      sx={{
                        background: "#7A8580",
                        width: "30px",
                      }}
                    />
                    <Typography sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
                      {dayOfMonth.toString().padStart(2, "0")}
                    </Typography>
                    <Divider
                      variant="fullWidth"
                      sx={{
                        background: "#7A8580",
                        width: "30px",
                      }}
                    />
                    <Typography>-</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: "0 10px",
                    }}
                  >
                    <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                      w
                    </Typography>
                    <Divider
                      variant="fullWidth"
                      sx={{
                        background: "#7A8580",
                        width: "30px",
                      }}
                    />
                    <Typography sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
                      {weekOfMonth.toString().padStart(2, "0")}
                    </Typography>
                    <Divider
                      variant="fullWidth"
                      sx={{
                        background: "#7A8580",
                        width: "30px",
                      }}
                    />
                    <Typography>-</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: "0 10px",
                    }}
                  >
                    <Typography sx={{ opacity: 0.7, fontSize: "1rem" }}>
                      M
                    </Typography>
                    <Divider
                      variant="fullWidth"
                      sx={{
                        background: "#7A8580",
                        width: "30px",
                      }}
                    />
                    <Typography sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
                      {monthOfYear.toString().padStart(2, "0")}
                    </Typography>
                    <Divider
                      variant="fullWidth"
                      sx={{
                        background: "#7A8580",
                        width: "30px",
                      }}
                    />
                    <Typography>-</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                container
                sx={{
                  mt: -13,
                  pl: 1.5,
                  ...(width >= 1600 && {
                    mt: 0,
                  }),
                }}
                spacing={2}
              >
                <Grid item xs={3}>
                  <Typography
                    sx={{ marginBottom: 1, mt: 1.5, fontSize: 16, ml: 0.5 }}
                    color="#CCCCCC"
                  >
                    Min candle size
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      background: "#452951",
                      borderRadius: "8px",
                    }}
                  >
                    <ValidationTextField
                      margin="normal"
                      // required
                      fullWidth
                      id="minCanldeSize"
                      name="minCanldeSize"
                      // sx={{ width: 285 }}
                    />{" "}
                    <InputBase
                      // type="text"
                      name="minCanldeSize"
                      // value={maPercentage}
                      onChange={handleMinCandleSize}
                      type="number"
                      sx={{
                        paddingLeft: 2,
                        paddingRight: 2,
                        borderRadius: "8px",
                        height: 37,
                        width: 90,
                        backgroundColor: "#6D4873",
                        color: "#CCCCCC",
                      }}
                      endAdornment={
                        <InputAdornment position="center">%</InputAdornment>
                      }
                      inputProps={{ min: "0", max: "100" }}
                      error={error}
                      helperText={
                        error ? "Please enter a number between 0 and 100" : ""
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      marginBottom: 1,
                      mt: 2,
                      fontSize: 16,
                      ml: 0.5,
                      ...(width <= 1100 && {
                        fontSize: 14,
                      }),
                    }}
                    color="#CCCCCC"
                  >
                    Bot starts at signal
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      background: "#452951",
                      borderRadius: "8px",
                    }}
                  >
                    <ValidationTextField
                      margin="normal"
                      // required
                      fullWidth
                      id="botStartsAtSignal"
                      name="botStartsAtSignal"
                      // sx={{ width: 285 }}
                    />{" "}
                    <InputBase
                      // type="text"
                      name="botStartsAtSignal"
                      // value={maPercentage}
                      onChange={handleBotStartsAtSignal}
                      type="number"
                      sx={{
                        paddingLeft: 2,
                        paddingRight: 2,
                        borderRadius: "8px",
                        height: 37,
                        width: 90,
                        backgroundColor: "#6D4873",
                        color: "#CCCCCC",
                      }}
                      endAdornment={
                        <InputAdornment position="center">%</InputAdornment>
                      }
                      inputProps={{ min: "0", max: "100" }}
                      error={error}
                      helperText={
                        error ? "Please enter a number between 0 and 100" : ""
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                    color="#CCCCCC"
                  >
                    Order at every
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      background: "#452951",
                      borderRadius: "8px",
                    }}
                  >
                    <ValidationTextField
                      margin="normal"
                      // required
                      fullWidth
                      id="orderAtEvery"
                      name="orderAtEvery"
                      // sx={{ width: 285 }}
                    />{" "}
                    <InputBase
                      // type="text"
                      name="orderAtEvery"
                      // value={maPercentage}
                      onChange={handleOrderAtEvery}
                      type="number"
                      sx={{
                        paddingLeft: 2,
                        paddingRight: 2,
                        borderRadius: "8px",
                        height: 37,
                        width: 90,
                        backgroundColor: "#6D4873",
                        color: "#CCCCCC",
                      }}
                      endAdornment={
                        <InputAdornment position="center">%</InputAdornment>
                      }
                      inputProps={{ min: "0", max: "100" }}
                      error={error}
                      helperText={
                        error ? "Please enter a number between 0 and 100" : ""
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
              {/* {showVectorCandle && (
                // <Grid>
                <>
                  <Grid item xs={8} sm={6} xl={4}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                      color="#CCCCCC"
                    >
                      Red Action
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <SelectInput
                        placeHolder={"Red Action"}
                        options={actionValues}
                        width={470}
                        keyName={"redAction"}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={8} sm={6} xl={4}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                      color="#CCCCCC"
                    >
                      Purple Action
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <SelectInput
                        placeHolder={"Purple Action"}
                        options={actionValues}
                        width={470}
                        keyName={"purpleAction"}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={8} sm={6} xl={4}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                      color="#CCCCCC"
                    >
                      Blue Action
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <SelectInput
                        placeHolder={"Blue Action"}
                        options={actionValues}
                        width={470}
                        keyName={"blueAction"}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={8} sm={6} xl={4}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                      color="#CCCCCC"
                    >
                      Green Action
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <SelectInput
                        placeHolder={"Green Action"}
                        options={actionValues}
                        width={470}
                        keyName={"greenAction"}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={8} sm={6} xl={4}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                      color="#CCCCCC"
                    >
                      Minimum TP
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <ValidationTextField
                        margin="normal"
                        // required
                        fullWidth
                        id="minimumTp"
                        name="minimumTp"
                      />
                    </Box>
                  </Grid>
                </>
              )}
              {showMovingAverages && (
                <>
                  <Grid item xs={8} sm={6} xl={4}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                      color="#CCCCCC"
                    >
                      Buy Condition Value
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <SelectInput
                        placeHolder={"Buy Condition Value"}
                        options={movingAverageOptions}
                        width={470}
                        keyName={"buyConditionValue"}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={8} sm={6} xl={4}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                      color="#CCCCCC"
                    >
                      Sell Condition Value
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <SelectInput
                        placeHolder={"Sell Condition Value"}
                        options={movingAverageOptions}
                        width={470}
                        keyName={"sellConditionValue"}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={8} sm={6} xl={4}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                      color="#CCCCCC"
                    >
                      Value
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <ValidationTextField
                        margin="normal"
                        required
                        fullWidth
                        id="movingAvgValue"
                        name="movingAvgValue"
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={8} sm={6} xl={4}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                      color="#CCCCCC"
                    >
                      Timeframe
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <ValidationTextField
                        margin="normal"
                        required
                        fullWidth
                        id="timeframe"
                        name="timeframe"
                      />
                    </Box>
                  </Grid>
                </>
              )}
              {showEstimatedMovingAverages && (
                <>
                  <Grid item xs={8} sm={6} xl={4}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                      color="#CCCCCC"
                    >
                      Buy Condition Value
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <SelectInput
                        placeHolder={"Buy Condition Value"}
                        options={movingAverageOptions}
                        width={470}
                        keyName={"buyConditionValue"}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={8} sm={6} xl={4}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                      color="#CCCCCC"
                    >
                      Sell Condition Value
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <SelectInput
                        placeHolder={"Sell Condition Value"}
                        options={movingAverageOptions}
                        width={470}
                        keyName={"sellConditionValue"}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={8} sm={6} xl={4}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                      color="#CCCCCC"
                    >
                      Value
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <ValidationTextField
                        margin="normal"
                        required
                        fullWidth
                        id="movingAvgValue"
                        name="movingAvgValue"
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={8} sm={6} xl={4}>
                    <Typography
                      sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                      color="#CCCCCC"
                    >
                      Timeframe
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <ValidationTextField
                        margin="normal"
                        required
                        fullWidth
                        id="timeframe"
                        name="timeframe"
                      />
                    </Box>
                  </Grid>
                </>
              )} */}
            </Grid>
          </Box>
        </Box>
        <Typography
          sx={{ mt: 3, ml: 1, fontWeight: 600 }}
          color="white"
          component="h1"
          variant="h5"
        >
          Advanced Settings
        </Typography>
        <Box
          sx={{
            background: "linear-gradient(to left,#3E2146,#301631)",
            mt: 2,
            borderRadius: "5px",
            p: 3,
            marginBottom: 5,
          }}
        >
          <Box sx={{ mt: 1, flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} xl={4}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                  color="#CCCCCC"
                >
                  Buy only every X conditions met
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    background: "#452951",
                    borderRadius: "8px",
                  }}
                >
                  <ValidationTextField
                    margin="normal"
                    // required
                    fullWidth
                    id="buyOnCondition"
                    name="buyOnCondition"
                    // sx={{ width: 285 }}
                  />{" "}
                  <InputBase
                    // type="text"
                    name="buyOnConditionX"
                    // value={maPercentage}
                    onChange={handleChangeXcondition}
                    type="number"
                    sx={{
                      paddingLeft: 2,
                      paddingRight: 2,
                      borderRadius: "8px",
                      height: 37,
                      width: 80,
                      backgroundColor: "#6D4873",
                      color: "#CCCCCC",
                    }}
                    endAdornment={
                      <InputAdornment position="center">%</InputAdornment>
                    }
                    inputProps={{ min: "0", max: "100" }}
                    error={error}
                    helperText={
                      error ? "Please enter a number between 0 and 100" : ""
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={6} xl={4}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                  color="#CCCCCC"
                >
                  Buy Only x% Above/Below avg. Price
                </Typography>
                <Box
                  sx={{
                    background: "#452951",
                    mr: 2,
                    borderRadius: "8px",
                  }}
                >
                  <Grid container>
                    <Grid item xs={10}>
                      <SelectInput
                        placeHolder={"Order Type"}
                        options={avgPriceCondition}
                        keyName={"avgPrice"}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <InputBase
                        // type="text"
                        name="avgPricePercent"
                        value={maPercentage}
                        onChange={handleChangeMaPercentage}
                        type="number"
                        sx={{
                          paddingLeft: 2,
                          paddingRight: 2,
                          borderRadius: "8px",
                          height: 37,
                          width: 80,
                          backgroundColor: "#6D4873",
                          color: "#CCCCCC",
                        }}
                        endAdornment={
                          <InputAdornment position="center">%</InputAdornment>
                        }
                        inputProps={{ min: "0", max: "100" }}
                        error={error}
                        helperText={
                          error ? "Please enter a number between 0 and 100" : ""
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={6} xl={4}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                  color="#CCCCCC"
                >
                  Ignore first X Conditions
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    background: "#452951",
                    borderRadius: "8px",
                  }}
                >
                  <ValidationTextField
                    margin="normal"
                    // required
                    fullWidth
                    id="ignoreCondition"
                    name="ignoreCondition"
                  />{" "}
                  <InputBase
                    // type="text"
                    name="ignoreConditionX"
                    // value={maPercentage}
                    onChange={handleChangeFirstXcondition}
                    type="number"
                    sx={{
                      paddingLeft: 2,
                      paddingRight: 2,
                      borderRadius: "8px",
                      height: 37,
                      width: 80,
                      backgroundColor: "#6D4873",
                      color: "#CCCCCC",
                    }}
                    endAdornment={
                      <InputAdornment position="center">%</InputAdornment>
                    }
                    inputProps={{ min: "0", max: "100" }}
                    error={error}
                    helperText={
                      error ? "Please enter a number between 0 and 100" : ""
                    }
                  />
                </Box>
              </Grid>
            </Grid>
            <Divider
              variant="fullWidth"
              sx={{
                marginX: -3,
                marginTop: 3,
                marginBottom: 5,
                background: "#7A8580",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            background: "linear-gradient(to left,#3E2146,#301631)",
            mt: 5,
            borderRadius: "5px",
            p: 3,
            marginBottom: 5,
          }}
        >
          <Typography
            sx={{ mt: 1, fontWeight: 600 }}
            color="white"
            component="h1"
            variant="h5"
          >
            Stop Loss
          </Typography>
          <Divider
            variant="fullWidth"
            sx={{
              marginX: -3,
              marginTop: 1,
              background: "#7A8580",
            }}
          />
          <Box sx={{ mt: 1, flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 10, md: 16 }}
            >
              <Grid item xs={8} sm={8} md={8}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                  color="#CCCCCC"
                >
                  Stop Loss
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <SelectInput
                    placeHolder={"Trailing SL"}
                    options={stopLoss}
                    fullWidth
                    keyName={"stopLoss"}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            background: "linear-gradient(to left,#3E2146,#301631)",
            mt: 5,
            borderRadius: "5px",
            p: 3,
            marginBottom: 5,
          }}
        >
          <Typography
            sx={{ mt: 1, fontWeight: 600 }}
            color="white"
            component="h1"
            variant="h5"
          >
            Take Profit
          </Typography>
          <Divider
            variant="fullWidth"
            sx={{
              marginX: -3,
              marginTop: 1,
              background: "#7A8580",
            }}
          />
          <Box sx={{ mt: 1, flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16, ml: 0.5 }}
                  color="#CCCCCC"
                >
                  Take Profit
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <SelectInput
                    placeHolder={"At candle body"}
                    options={takeProfit}
                    fullWidth
                    keyName={"takeProfit"}
                    onChange={handleOnChange}
                    value={""}
                  />
                  {showTPPercentageTab && (
                    <InputBase
                      // type="text"
                      name="takeProfitPercent"
                      value={maPercentage}
                      onChange={handleChangeMaPercentage}
                      type="number"
                      sx={{
                        paddingLeft: 2,
                        paddingRight: 2,
                        borderRadius: "8px",
                        height: 43,
                        width: 120,
                        backgroundColor: "#FFFFFF33",
                        color: "#CCCCCC",
                      }}
                      endAdornment={
                        <InputAdornment position="center">%</InputAdornment>
                      }
                      inputProps={{ min: "0", max: "100" }}
                      error={error}
                      helperText={
                        error ? "Please enter a number between 0 and 100" : ""
                      }
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Grid container>
          <Grid item xs={8}></Grid>
          <Grid item xs={4} sx={{ pl: 2 }}>
            <Box
              sx={{
                mt: 4,
                mb: 2,
              }}
            >
              <button
                style={{
                  background: "linear-gradient(to right,#790F87,#794AE3)",
                  cursor: "pointer",
                  border: "none",
                  padding: "7px 20px",
                }}
              >
                <Typography>Test Your Strategy!</Typography>
              </button>
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid
            items
            md={8}
            lg={8}
            sx={{
              background:
                "linear-gradient(180deg, rgba(121, 13, 131, 0.0925) 0%, rgba(41, 8, 77, 0.37) 100%)",
              p: 2,
              borderRadius: "8px",
              minHeight: 450,
            }}
          >
            <Grid container>
              <Grid item xs={11}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          lineHeight: "16px",
                          letterSpacing: "1px",
                          p: 1,
                        }}
                      >
                        AVAX/ TetherUS 1h Binance Trading View 020.23 H20.24
                        L19.29 C 20.00 -0.23(-1.14%)
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          lineHeight: "16px",
                          letterSpacing: "1px",
                          p: 1,
                        }}
                      >
                        Zig Zag 5 10 Precent T.. 5 -5 25 85 45 85
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          lineHeight: "16px",
                          letterSpacing: "1px",
                          p: 1,
                        }}
                      >
                        Dashed Dashed 14 Datted 4 Datted 6 Datted 15 Solid 13
                        Solid top_right BTCUSD Dashed London New York, Tokyo,
                        HongKong, Sydney
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        m: 2,
                        px: 1,
                        py: 2,
                        height: "fit-content",
                        background: "linear-gradient(#310B4E, #3D0D58)",
                        backgroundBlendMode: "overlay",
                        backdropFilter: "blur(100px)",
                        borderRadius: "8px",
                        minWidth: "130px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            letterSpacing: "1px",
                            pb: 1,
                          }}
                        >
                          ADR
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            letterSpacing: "1px",
                            pb: 1,
                          }}
                        >
                          1.92 USDT
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            letterSpacing: "1px",
                            pb: 1,
                          }}
                        >
                          ADRXS
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            letterSpacing: "1px",
                            pb: 1,
                          }}
                        >
                          5.76 USDT
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            letterSpacing: "1px",
                            pb: 1,
                          }}
                        >
                          AWR
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            letterSpacing: "1px",
                            pb: 1,
                          }}
                        >
                          6.98 USDT
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            letterSpacing: "1px",
                            pb: 1,
                          }}
                        >
                          AMR
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            letterSpacing: "1px",
                            pb: 1,
                          }}
                        >
                          41.03 USDT
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Chart />
                </Box>
              </Grid>
              <Grid item xs={1} sx={{ pl: 1 }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      pb: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    USDT
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        padding: "0px",
                        margin: "0px 3px",
                        cursor: "pointer",
                      }}
                    >
                      <SmallDown />
                    </button>
                  </Typography>
                  {USDT.map((item, index) => (
                    <Typography
                      key={index}
                      sx={{
                        fontSize: "12px",
                        pb: 1,
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} sx={{ pl: 2 }}>
            <Box
              sx={{
                background:
                  "linear-gradient(180deg, rgba(121, 13, 131, 0.0925) 0%, rgba(41, 8, 77, 0.37) 100%)",
                borderRadius: "8px",
                minHeight: 600,
              }}
            >
              <Box sx={{ display: "flex", minWidth: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "50%",
                  }}
                >
                  {[...Array(10)].map((_, index) => (
                    <Typography
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: "16px",
                        textAlign: "center",
                        px: "auto",
                        py: 3,
                        borderBottom: "1px solid grey",
                      }}
                    ></Typography>
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "50%",
                  }}
                >
                  {[...Array(10)].map((_, index) => (
                    <Typography
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: "16px",
                        textAlign: "center",
                        borderBottom: "1px solid grey",
                        px: "auto",
                        py: 3,
                        borderLeft: "1px solid grey",
                      }}
                    ></Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
