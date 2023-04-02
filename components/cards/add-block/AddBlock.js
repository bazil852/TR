import React, { useEffect, useState } from "react";
import SelectInput from "../../widgets/SelectInput";

import { alpha, styled } from "@mui/material/styles";
import { InputBase, InputAdornment } from "@mui/material";

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

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    // borderRadius: 4,
    height: 27,
    position: "relative",
    backgroundColor: "#292929",
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
    <>
      <GeneralSettings
        setName={setBotName}
        setExchangeName={setExchange}
        setBot={setBotType}
      />
      <Strategy setType={setStrategyType} setPair={setStrategyPair} />
      <Container
        sx={{
          background: "#191919",
          borderRadius: 1,
          p: 3,
          border: "1px solid #666666",
        }}
        component="main"
        maxWidth="100%"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={handleCount}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Block +
          </Button>
          <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
            Settings
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
      </Container>
      {/* <Button sx={{ width: 150 }}>Submit</Button> */}
    </>
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
  const listOfPairs = ["BTC", "ETH", "DOGE", "SOL"];
  return (
    <>
      <Box component="form" id="myForm" onSubmit={handleSubmit}>
        <Box
          sx={{
            background: "#202020",
            p: 3,
            marginTop: 2,
            borderRadius: 6,
          }}
        >
          <Typography sx={{ mt: 1 }} color="white" component="h1" variant="h5">
            Orders
          </Typography>
          <Divider sx={{ marginTop: 1, background: "#7A8580" }} />
          <Box sx={{ mt: 1, flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              // columns={{ xs: 4, sm: 10, md: 22 }}
            >
              <Grid item xs={4} xxl={2}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                  color="#CCCCCC"
                >
                  Order Size
                </Typography>
                <ValidationTextField
                  type="number"
                  margin="normal"
                  required
                  fullWidth
                  id="orderSize"
                  name="orderSize"
                />
              </Grid>
              <Grid item xs={4} xxl={2}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                  color="#CCCCCC"
                >
                  % of Available
                </Typography>
                <ValidationTextField
                  margin="normal"
                  required
                  fullWidth
                  id="availablePercentage"
                  name="availablePercentage"
                />
              </Grid>
              <Grid item xs={4} xxl={4}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                  color="#CCCCCC"
                >
                  Safety Order Size
                </Typography>
                <ValidationTextField
                  margin="normal"
                  // required
                  fullWidth
                  id="safetyOrderSize"
                  name="safetyOrderSize"
                />
              </Grid>
              <Grid item xs={4} xxl={4}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                  color="#CCCCCC"
                >
                  Candle size and Volume Multiplier
                </Typography>
                <ValidationTextField
                  margin="normal"
                  // required
                  fullWidth
                  id="candleSizeAndVol"
                  name="candleSizeAndVol"
                />
              </Grid>
              <Grid item xs={4} xxl={2}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                  color="#CCCCCC"
                >
                  Profit Currency
                </Typography>
                <Autocomplete
                  id="profitCurrency"
                  freeSolo
                  options={listOfPairs}
                  disableClearable
                  fullWidth
                  renderInput={(params) => {
                    const { InputLabelProps, InputProps, ...rest } = params;
                    return (
                      <ValidationTextField
                        margin="normal"
                        required
                        fullWidth
                        {...params.InputProps}
                        {...rest}
                        name="profitCurrency"
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={4} xxl={2}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                  color="#CCCCCC"
                >
                  Order Type
                </Typography>
                <SelectInput
                  placeHolder={"Order Type"}
                  options={orderType}
                  width={"100%"}
                  keyName={"orderType"}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#202020",
            p: 3,
            marginTop: 5,
            borderRadius: 6,
          }}
        >
          <Typography sx={{ mt: 1 }} color="white" component="h1" variant="h5">
            Signal
          </Typography>
          <Divider sx={{ marginTop: 1, background: "#7A8580" }} />
          <Box sx={{ mt: 1, flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              // columns={{ xs: 4, sm: 10, md: 16 }}
            >
              <Grid item xs={8} sm={6} xl={4}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                  color="#CCCCCC"
                >
                  Indicator
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <SelectInput
                    placeHolder={"Possible to chose from MA's"}
                    options={masDistance}
                    width={470}
                    keyName={"indicator"}
                    onChange={handleIndicatorChange}
                    value={""}
                  />
                </Box>
              </Grid>
              {showVectorCandle && (
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
              )}
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#202020",
            p: 3,
            marginTop: 5,
            borderRadius: 6,
          }}
        >
          <Typography sx={{ mt: 1 }} color="white" component="h1" variant="h5">
            Advanced Settings
          </Typography>
          <Divider sx={{ marginTop: 1, background: "#7A8580" }} />
          <Box sx={{ mt: 1, flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                  color="#CCCCCC"
                >
                  Buy only every X conditions met
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <ValidationTextField
                    margin="normal"
                    // required
                    fullWidth
                    id="buyOnCondition"
                    name="buyOnCondition"
                    // sx={{ width: 285 }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                  color="#CCCCCC"
                >
                  Buy Only x% Above/Below avg. Price
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <SelectInput
                    placeHolder={"Order Type"}
                    options={avgPriceCondition}
                    width={350}
                    keyName={"avgPrice"}
                  />
                  <InputBase
                    // type="text"
                    name="avgPricePercent"
                    value={maPercentage}
                    onChange={handleChangeMaPercentage}
                    type="number"
                    sx={{
                      paddingLeft: 2,
                      paddingRight: 2,
                      height: 48,
                      width: 120,
                      backgroundColor: "#FFFFFF33",
                      color: "#CCCCCC",
                    }}
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                    inputProps={{ min: "0", max: "100" }}
                    error={error}
                    helperText={
                      error ? "Please enter a number between 0 and 100" : ""
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                  color="#CCCCCC"
                >
                  Ignore first X Conditions
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <ValidationTextField
                    margin="normal"
                    // required
                    fullWidth
                    id="ignoreCondition"
                    name="ignoreCondition"
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                  color="#CCCCCC"
                >
                  Max orders
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <ValidationTextField
                    margin="normal"
                    // required
                    fullWidth
                    id="maxOrders"
                    name="maxOrders"
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                  color="#CCCCCC"
                >
                  Max volume
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <ValidationTextField
                    margin="normal"
                    // required
                    fullWidth
                    id="maxVol"
                    name="maxVol"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#202020",
            p: 3,
            marginTop: 5,
            borderRadius: 6,
          }}
        >
          <Typography sx={{ mt: 1 }} color="white" component="h1" variant="h5">
            Stop Loss
          </Typography>
          <Divider sx={{ marginTop: 1, background: "#7A8580" }} />
          <Box sx={{ mt: 1, flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 10, md: 16 }}
            >
              <Grid item xs={2} sm={4} md={4}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                  color="#CCCCCC"
                >
                  Stop Loss
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <SelectInput
                    placeHolder={"Trailing SL"}
                    options={stopLoss}
                    width={350}
                    keyName={"stopLoss"}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#202020",
            p: 3,
            marginTop: 5,
            borderRadius: 6,
          }}
        >
          <Typography sx={{ mt: 1 }} color="white" component="h1" variant="h5">
            Take Profit
          </Typography>
          <Divider sx={{ marginTop: 1, background: "#7A8580" }} />
          <Box sx={{ mt: 1, flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography
                  sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
                  color="#CCCCCC"
                >
                  Take Profit
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <SelectInput
                    placeHolder={"At candle body"}
                    options={takeProfit}
                    width={350}
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
                        height: 48,
                        width: 120,
                        backgroundColor: "#FFFFFF33",
                        color: "#CCCCCC",
                      }}
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
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
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, marginTop: 5 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};
