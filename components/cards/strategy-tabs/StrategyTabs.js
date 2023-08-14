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
  Autocomplete,
  TextField,
  Paper,
  Popover,
  InputAdornment,
} from "@mui/material";
import GeneralSettings from "../../../components/cards/general-settings/GeneralSettings";
import { getSession } from "next-auth/react";
import CandleStickGraph from "../../../components/cards/candleStick-strategy/CandleStickGraph";
import SelectInputParameters from "../../widgets/SelectInputParameters";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useStrategy } from "../../../context/StrategyContext";
import Chart from "../../charts/Chart";

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  backgroundColor: "#3E3E3E",
  borderRadius: "6px",

  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    height: 11,
    backgroundColor: "#3E3E3E",
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

const StrategyTabs = (props) => {
  const [botName, setBotName] = useState("");
  const [exchange, setExchange] = useState("");
  const [botType, setBotType] = useState("");
  const [strategyType, setStrategyType] = useState("");
  const [strategyPair, setStrategyPair] = useState("");
  const [chartData, setChartData] = useState("");

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
    <Box component="main">
      <StrategyTabsComponent
        setBotSettings={setBotSetting}
        strategyId={props.strategyId}
      />
    </Box>
  );
};

export default StrategyTabs;

const StrategyTabsComponent = (props) => {
  console.log(props.strategyId);
  const [value, setvalue] = useState(["general"]);
  const [ANDToggle, setANDToggle] = useState([[true]]);
  const { GeneralSettingsData, setGeneralSettingsData } = useStrategy();
  // console.log("general settings", GeneralSettingsData);
  const { OrdersData, setOrdersData } = useStrategy();
  const { DCAData, setDCAData } = useStrategy();
  const { TakeProfitData, setTakeProfitData } = useStrategy();
  const { StopLossData, setStopLossData } = useStrategy();
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

  const { ParametersData, setParametersData } = useStrategy();
  const [pairsOptions, setPairsOptions] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionTwo, setSelectedOptionTwo] = useState(null);
  const [toggle, setToggle] = useState(false);
  const handlePopoverOpen = (event, idx, ParameterIdx) => {
    if (event.currentTarget.getAttribute("midTwo") == 0)
      setSelectedOption({
        value: ParametersData[idx][ParameterIdx].middleTwo,
        label: ParametersData[idx][ParameterIdx].middleTwo,
      });
    else
      setSelectedOption({
        value: ParametersData[idx][ParameterIdx].middleOne,
        label: ParametersData[idx][ParameterIdx].middleOne,
      });
    if (
      event.currentTarget.id == idx &&
      event.currentTarget.getAttribute("newAttr") == ParameterIdx
    )
      setToggle(true);
    else setToggle(false);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleOptionChange = (index, ParametersIndex, selectedOption) => {
    setSelectedOption(selectedOption);
    const temp = [...ParametersData];
    temp[index][ParametersIndex].middleOne = selectedOption.value;
    setParametersData(temp);
  };

  const handleOptionTwoChange = (index, ParametersIndex, selectedOptionTwo) => {
    setSelectedOptionTwo(selectedOptionTwo);
    const temp = [...ParametersData];
    temp[index][ParametersIndex].middleTwo = selectedOptionTwo.value;
    setParametersData(temp);
  };

  const [inputValuesHighCandle, setInputValuesHighCandle] = useState({
    input1: "",
    input2: "",
    input3: "",
  });

  const [inputValuesSimple, setInputValuesSimple] = useState({
    input1: "",
    input2: "",
    input3: "",
  });

  const [inputValuesTwoSimple, setInputValuesTwoSimple] = useState({
    input1: "",
    input2: "",
    input3: "",
  });

  const [inputValuesTwoValue, setInputValuesTwoValue] = useState({
    input1: "",
  });

  const [inputValuesTwoPrice, setInputValuesTwoPrice] = useState({
    input1: "",
  });

  const [inputValuesExponential, setInputValuesExponential] = useState({
    input1: "",
    input2: "",
    input3: "",
  });

  const [inputValuesTwoExponential, setInputValuesTwoExponential] = useState({
    input1: "",
    input2: "",
    input3: "",
  });

  const [inputValuesKeltner, setInputValuesKeltner] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
  });

  const [inputValuesTwoKeltner, setInputValuesTwoKeltner] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
  });

  const [inputValuesTom, setInputValuesTom] = useState({
    tomDemarkValue: "",
  });

  const [inputValuesTwoTom, setInputValuesTwoTom] = useState({
    tomDemarkValue: "",
  });

  const handleInputChangeSimple = (event) => {
    const { name, value } = event.target;
    console.log(name, value, inputValuesSimple);
    setInputValuesSimple((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleInputChangeTwoSimple = (event) => {
    const { name, value } = event.target;
    console.log(name, value, inputValuesSimple);
    setInputValuesTwoSimple((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleInputChangeHighCandle = (event) => {
    const { name, value } = event.target;
    console.log(name, value, inputValuesHighCandle);
    setInputValuesHighCandle((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleInputChangeExponential = (event) => {
    const { name, value } = event.target;
    setInputValuesExponential((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleInputChangeTwoExponential = (event) => {
    const { name, value } = event.target;
    setInputValuesTwoExponential((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleInputChangeKeltner = (event) => {
    const { name, value } = event.target;
    setInputValuesKeltner((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleInputChangeTwoKeltner = (event) => {
    const { name, value } = event.target;
    setInputValuesTwoKeltner((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleInputChangeTom = (event) => {
    const { name, value } = event.target;
    setInputValuesTom((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleInputChangeTwoTom = (event) => {
    const { name, value } = event.target;
    setInputValuesTwoTom((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleInputChangeTwoValue = (event) => {
    const { name, value } = event.target;
    setInputValuesTwoValue((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleInputChangeTwoPrice = (event) => {
    const { name, value } = event.target;
    setInputValuesTwoPrice((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const getConcatenatedValue = () => {
    if (selectedOption?.value.startsWith("Simple Moving Average")) {
      const { input1, input2, input3 } = inputValuesSimple;
      const inputs = ["Simple Moving Average", input1, input2, input3]
        .filter(Boolean)
        .join(" ");
      console.log("concatenate", inputs);
      return inputs ? `${inputs}` : selectedOption?.label || "Select an option";
    } else if (selectedOption?.value.startsWith("Exponential Moving Average")) {
      const { input1, input2, input3 } = inputValuesExponential;
      const inputs = ["Exponential Moving Average", input1, input2, input3]
        .filter(Boolean)
        .join(" ");
      return inputs ? `${inputs}` : selectedOption?.label || "Select an option";
    } else if (selectedOption?.value.startsWith("Keltner Channel")) {
      const { input1, input2, input3, input4, input5 } = inputValuesKeltner;
      const inputs = ["Keltner Channel", input1, input2, input3, input4, input5]
        .filter(Boolean)
        .join(" ");
      return inputs ? `${inputs}` : selectedOption?.label || "Select an option";
    } else if (selectedOption?.value.startsWith("Tom Demark")) {
      const { tomDemarkValue } = inputValuesTom;
      return tomDemarkValue
        ? `Tom Demark ${tomDemarkValue}`
        : selectedOption?.label || "Select an option";
    }
    return selectedOption?.label || "Select an option";
  };

  const getConcatenatedValueTwo = () => {
    if (selectedOptionTwo?.value.startsWith("Simple Moving Average")) {
      const { input1, input2, input3 } = inputValuesTwoSimple;
      const inputs = ["Simple Moving Average", input1, input2, input3]
        .filter(Boolean)
        .join(" ");
      console.log("concatenate", inputs);
      return inputs
        ? `${inputs}`
        : selectedOptionTwo?.label || "Select an option";
    } else if (
      selectedOptionTwo?.value.startsWith("Exponential Moving Average")
    ) {
      const { input1, input2, input3 } = inputValuesTwoExponential;
      const inputs = ["Exponential Moving Average", input1, input2, input3]
        .filter(Boolean)
        .join(" ");
      return inputs
        ? `${inputs}`
        : selectedOptionTwo?.label || "Select an option";
    } else if (selectedOptionTwo?.value.startsWith("Keltner Channel")) {
      const { input1, input2, input3, input4, input5 } = inputValuesTwoKeltner;
      const inputs = ["Keltner Channel", input1, input2, input3, input4, input5]
        .filter(Boolean)
        .join(" ");
      return inputs
        ? `${inputs}`
        : selectedOptionTwo?.label || "Select an option";
    } else if (selectedOptionTwo?.value.startsWith("Tom Demark")) {
      const { tomDemarkValue } = inputValuesTwoTom;
      return tomDemarkValue
        ? `Tom Demark ${tomDemarkValue}`
        : selectedOptionTwo?.label || "Select an option";
    } else if (selectedOptionTwo?.value.startsWith("Value")) {
      const { input1 } = inputValuesTwoValue;
      return input1
        ? `Value ${input1}`
        : selectedOptionTwo?.label || "Select an option";
    } else if (selectedOptionTwo?.value.startsWith("Price")) {
      const { input1 } = inputValuesTwoPrice;
      return input1
        ? `Price ${input1}`
        : selectedOptionTwo?.label || "Select an option";
    }
    return selectedOptionTwo?.label || "Select an option";
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (props.strategyId) {
      fetchStrategyByStrategyId();
    }
    fetchPairsSymbolsByUserId();
    // fetchStrategiesByUserId();
  }, [props.strategyId]);

  useEffect(() => console.log("Updated State:", AllStrategyData), [
    AllStrategyData,
  ]);

  const fetchStrategyByStrategyId = async () => {
    // let session = await getSession();
    const response = await fetch(
      `/api/strategy/get-strategy-by-id?id=${props.strategyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newData = await response.json();
    console.log(newData);
    setAllStartegyData([newData.body]);
    setGeneralSettingsData([newData.body.generalSettings]);
    setOrdersData([newData.body.orders]);
    setParametersData([newData.body.parameters]);
    setDCAData([newData.body.dca]);
    setTakeProfitData([newData.body.takeProfit]);
    setStopLossData([newData.body.stopLoss]);
  };

  const fetchPairsSymbolsByUserId = async () => {
    const { user } = await getSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}portfolios/assets/symbols/user/${user.id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    let combinedAssetsSymbols = data.reduce((accumulator, currentObject) => {
      return accumulator.concat(currentObject.assetsSymbols);
    }, []);

    console.log(combinedAssetsSymbols);
    let uniqueDataArray = [...new Set(combinedAssetsSymbols)];

    console.log(uniqueDataArray);
    setPairsOptions(uniqueDataArray);
  };

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
      [
        {
          1: "",
          operation: "",
          2: "",
          relation: "",
          middleOne: "",
          middleTwo: "",
        },
      ],
    ]);
    setANDToggle([...ANDToggle, [true]]);
  };

  const dcaTypeOptions = [{ value: "Signal", label: "Signal" }];

  // const categoryMap = {
  //   "Simple Moving Average": [
  //     "Simple Moving Average 20",
  //     "Simple Moving Average 50",
  //   ],
  //   "Exponential Moving Average": [
  //     "Exponential Moving Average 20",
  //     "Exponential Moving Average 50",
  //   ],
  //   "Keltner Channel ": [
  //     "Keltner Channel Upper Band 50",
  //     "Keltner Channel Middle Band 50",
  //     "Keltner Channel Lower Band 50",
  //   ],
  //   "Tom Demark": [
  //     "Tom Demark Buy 9",
  //     "Tom Demark Sell 9",
  //     "Tom Demark Buy 13",
  //     "Tom Demark Sell 13",
  //   ],
  //   "Bollinger Bands": [
  //     "Tom Demark Buy 9",

  //   ],
  // };

  const takeProfitOptions = [
    { value: "Fixed", label: "Fixed" },
    { value: "Trailing SL", label: "Trailing SL" },
    {
      value: "All candle body w % up or down",
      label: "All candle body w % up or down",
    },
  ];
  const parametersOneOptions = [
    {
      value: "Price",
      label: "Price",
    },
    {
      value: "Indicator",
      label: "Indicator",
    },
    {
      value: "Oscillator",
      label: "Oscillator",
    },
    {
      value: "High Volume Candlestick",
      label: "High Volume Candlestick",
    },
  ];

  const parametersOneIndicatorOptions = [
    {
      value: "Simple Moving Average 20",
      label: "Simple Moving Average 20",
    },
    {
      value: "Simple Moving Average 50",
      label: "Simple Moving Average 50",
    },
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
    {
      value: "Tom Demark Buy 9",
      label: "Tom Demark Buy 9",
    },
    {
      value: "Tom Demark Sell 9",
      label: "Tom Demark Sell 9",
    },
    {
      value: "Tom Demark Buy 13",
      label: "Tom Demark Buy 13",
    },
    {
      value: "Tom Demark Sell 13",
      label: "Tom Demark Sell 13",
    },
    {
      value: "Bollinger Bands",
      label: "Bollinger Bands",
    },
  ];

  const priceAndHighVolumeParametersTwoIndicatorOptions = [
    { value: "Value", label: "Value" },
    ...parametersOneIndicatorOptions,
  ];

  const indicatorParametersTwoIndicatorOptions = [
    { value: "Price", label: "Price" },
    ...parametersOneIndicatorOptions,
  ];

  const parametersOneOscillatorOptions = [
    {
      value: "Relative Strength Index",
      label: "Relative Strength Index",
    },
  ];

  const parametersOneHighVolumeCandlestickOptions = [
    {
      value: "Bullish Green (Vol > 200%) Open",
      label: "Bullish Green (Vol > 200%) Open",
    },
    {
      value: "Bullish Blue (Vol > 150%) Open",
      label: "Bullish Blue (Vol > 150%) Open",
    },
    {
      value: "Bearish Red (Vol > 200%) Open",
      label: "Bearish Red (Vol > 200%) Open",
    },
    {
      value: "Bearish Purple (Vol > 150%) Open",
      label: "Bearish Purple (Vol > 150%) Open",
    },
    {
      value: "Bullish Green (Vol > 200%) Close",
      label: "Bullish Green (Vol > 200%) Close",
    },
    {
      value: "Bullish Blue (Vol > 150%) Close",
      label: "Bullish Blue (Vol > 150%) Close",
    },
    {
      value: "Bearish Red (Vol > 200%) Close",
      label: "Bearish Red (Vol > 200%) Close",
    },
    {
      value: "Bearish Purple (Vol > 150%) Close",
      label: "Bearish Purple (Vol > 150%) Close",
    },
    {
      value: "Bullish Green (Vol > 200%) High",
      label: "Bullish Green (Vol > 200%) High",
    },
    {
      value: "Bullish Blue (Vol > 150%) High",
      label: "Bullish Blue (Vol > 150%) High",
    },
    {
      value: "Bearish Red (Vol > 200%) High",
      label: "Bearish Red (Vol > 200%) High",
    },
    {
      value: "Bearish Purple (Vol > 150%) High",
      label: "Bearish Purple (Vol > 150%) High",
    },
    {
      value: "Bullish Green (Vol > 200%) Low",
      label: "Bullish Green (Vol > 200%) Low",
    },
    {
      value: "Bullish Blue (Vol > 150%) Low",
      label: "Bullish Blue (Vol > 150%) Low",
    },
    {
      value: "Bearish Red (Vol > 200%) Low",
      label: "Bearish Red (Vol > 200%) Low",
    },
    {
      value: "Bearish Purple (Vol > 150%) Low",
      label: "Bearish Purple (Vol > 150%) Low",
    },
  ];
  const parametersOperationsOptions = [
    { value: "Equal", label: "Equal" },
    { value: "GreaterThan", label: "Greater than" },
    { value: "GreaterOrEqual", label: "Greater or equal" },
    { value: "LessThan", label: "Less than" },
    { value: "LessOrEqual", label: "Less or equal" },
    { value: "CrossesUp", label: "Crosses up" },
    { value: "CrossesDown", label: "Crosses down" },
  ];

  const highVolumeParametersOperationsOptions = [
    { value: "GreaterThan", label: "Greater than" },
    { value: "GreaterOrEqual", label: "Greater or equal" },
    { value: "LessThan", label: "Less than" },
    { value: "LessOrEqual", label: "Less or equal" },
    { value: "CrossesUp", label: "Crosses up" },
    { value: "CrossesDown", label: "Crosses down" },
  ];

  const priceParametersOperationsOptions = [
    { value: "Equal", label: "Equal" },
    { value: "Greater Than", label: "Greater than" },
    { value: "Greater Or Equal", label: "Greater or equal" },
    { value: "Less Than", label: "Less than" },
    { value: "Less Or Equal", label: "Less or equal" },
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
    if (ParametersData[index].length <= 3) {
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
    }

    const handleANDToggle = (index, ParametersIndex) => {
      console.log(index, ParametersIndex);
      let temp2 = [...ParametersData];
      temp2[0][ParametersIndex].relation = ANDToggle[index][ParametersIndex]
        ? "AND"
        : "OR";

      setParametersData(temp2);
    };
  };

  const handleRemoveParameter = (index, ParameterIndex) => {
    const temp = [...ParametersData];
    temp[index] = temp[index].filter((_, id) => id !== ParameterIndex);
    setParametersData(temp);
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

    console.log("ALL STRAT DATA: ", AllStrategyData);
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

  const handleBacktest = async () => {
    const { user } = await getSession();

    console.log("ALL STRAT DATA: ", AllStrategyData);
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

    try {
      const response = await fetch("http://127.0.0.1:8000/backtest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // If you need to send a JSON body, uncomment the following line and replace '{}' with the appropriate JSON object
        body: JSON.stringify(AllStrategyData[0]),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        setChartData(data);
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
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
  const handlePopoverSave = (index, ParameterIndex) => {
    let newParameterData = [...ParametersData];
    const middleValue = getConcatenatedValue();
    console.log(middleValue);
    newParameterData[index][ParameterIndex].middleOne = middleValue;
    setParametersData(newParameterData);
    setAnchorEl(null);
  };
  const handlePopoverSaveTwo = (index, ParameterIndex) => {
    let newParameterData = [...ParametersData];
    const middleValue = getConcatenatedValueTwo();
    console.log(middleValue);
    newParameterData[index][ParameterIndex].middleTwo = middleValue;
    setParametersData(newParameterData);
    setAnchorEl(null);
  };
  const handleHighCandleStickPopoverSave = (index, ParameterIndex) => {
    let newParameterData = [...ParametersData];
    const { input1, input2, input3 } = inputValuesHighCandle;
    console.log("inputs", input1, input2, input3);
    const inputs = [input1, input2, input3].filter(Boolean).join(", ");
    console.log("concatenate", inputs);
    newParameterData[index][ParameterIndex].middleOne = inputs;
    setParametersData(newParameterData);
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          background: "#262626",
          border: "1.2px solid #3F4341",
          borderRadius: "4.8px",
          px: 3,
          pt: 1,
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
                gap: width > 1399 ? 2 : width < 601 ? 1 : 0,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "40px",
                  fontFamily: "Barlow, san-serif",
                  color: "rgba(255,255,255,0.2)",
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
                  width: "100%",
                  pt: 1,

                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                  "& .MuiButtonBase-root": {
                    display: width > 1399 ? "none" : "block",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    width: 400,
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
                      height: width < 601 ? 30 : 35,
                      pt: 0.2,
                      px: 2.5,
                      pl: width > 1399 ? 1.2 : 2.5,
                      pr: width > 1399 ? 1.2 : 2.5,
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
                      height: width < 601 ? 30 : 35,
                      pt: 0.2,
                      px: 2.5,
                      pl: width > 1399 ? 1.2 : 2.5,
                      pr: width > 1399 ? 1.2 : 2.5,
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
                      height: width < 601 ? 30 : 35,
                      pt: 0.2,
                      px: 2.5,
                      pl: width > 1399 ? 1.2 : 2.5,
                      pr: width > 1399 ? 1.2 : 2.5,
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
                      height: width < 601 ? 30 : 35,
                      pt: 0.2,
                      px: 2.5,
                      pl: width > 1399 ? 1.2 : 2.5,
                      pr: width > 1399 ? 1.2 : 2.5,
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
                      height: width < 601 ? 30 : 35,
                      pt: 0.2,
                      px: 2.5,
                      pl: width > 1399 ? 1.2 : 2.5,
                      pr: width > 1399 ? 1.2 : 2.5,
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
                      height: width < 601 ? 30 : 35,
                      pt: 0.2,
                      px: 2.5,
                      pl: width > 1399 ? 1.2 : 2.5,
                      pr: width > 1399 ? 1.2 : 2.5,
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
                      height: width < 601 ? 30 : 35,
                      pt: 0.2,
                      px: 2.5,
                      pl: width > 1399 ? 1.2 : 2.5,
                      pr: width > 1399 ? 1.2 : 2.5,
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
                      height: width < 601 ? 30 : 35,
                      pt: 0.2,
                      px: 2.5,
                      pl: width > 1399 ? 1.2 : 2.5,
                      pr: width > 1399 ? 1.2 : 2.5,
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
              <Box sx={{ minHeight: 100 }}>
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
                    minHeight: 178,
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
                        {/* <SelectInputParameters
                          placeHolder="BTC/USDT"
                          value={OrdersData[index].pairs}
                          Width={width < 600 ? "100%" : "10rem"}
                          onChange={async (event) => {
                            const temp = [...OrdersData];
                            temp[index].pairs = event.value;
                            setOrdersData(temp);
                          }}
                          options={ParametersOptions}
                        /> */}
                        <Autocomplete
                          id="free-solo-demo"
                          freeSolo
                          inputValue={OrdersData[index].pairs}
                          onInputChange={(event, newInputValue) => {
                            const temp = [...OrdersData];
                            temp[index].pairs = newInputValue;
                            setOrdersData(temp);
                          }}
                          options={pairsOptions}
                          sx={{}}
                          PaperComponent={({ children }) => (
                            <Paper
                              sx={{
                                width: width < 600 ? "100%" : "10rem",
                                maxHeight: "300px",
                                overflow: "auto",
                                background: "#2B2B2B",
                                mt: 0.5,
                              }}
                            >
                              {children}
                            </Paper>
                          )}
                          renderOption={(props, option, { selected }) => (
                            <li
                              {...props}
                              style={{
                                backgroundColor: selected
                                  ? "#000000"
                                  : "#2B2B2B",
                                color: "#FFFFFF",
                                fontFamily: "Barlow, sans-serif",
                                fontSize: "15px",
                              }}
                            >
                              {option}
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={""}
                              sx={{
                                width: width < 600 ? "100%" : "10rem",
                                fontFamily: "Barlow, sans-serif",
                                ".MuiOutlinedInput-root": {
                                  borderRadius: "7px",
                                  backgroundColor: "#3E3E3E",
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                  },
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                  },
                                  ".MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                  },
                                },
                                ".MuiOutlinedInput-input": {
                                  height: "0px",
                                  lineHeight: "0px",
                                  padding: "0px",
                                  fontFamily: "Barlow, sans-serif",
                                },
                                ".MuiFormLabel-root": {
                                  fontFamily: "Barlow, sans-serif",
                                },
                              }}
                            />
                          )}
                          filterOptions={(options, { inputValue }) => {
                            if (inputValue === "") {
                              return options;
                            }

                            let results = options.filter((option) =>
                              option
                                .toUpperCase()
                                .startsWith(inputValue.toUpperCase())
                            );

                            if (results.length === 0) {
                              results = ["No results found"];
                            }

                            return results;
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
                  {ParametersData[index].map(
                    (ParameterItem, ParametersIndex) => (
                      <>
                        {ParametersIndex !== 0 && (
                          <Grid
                            sx={{
                              paddingTop: width < 900 && "12px !important",
                            }}
                            item
                            xs={12}
                            sm={12}
                            md={1.2}
                            lg={1.2}
                          >
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
                        <Grid
                          sx={{
                            paddingTop:
                              width < 900 &&
                              ParametersIndex !== 0 &&
                              "12px !important",
                          }}
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          lg={4}
                        >
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
                                  width: "93.7px",
                                  marginRight:
                                    ParametersIndex === 0 ? "3.7px" : 0,
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
                                  temp[index][ParametersIndex].middleOne = "";
                                  setParametersData(temp);
                                }}
                                options={parametersOneOptions}
                                keyName={"Parameter"}
                              />
                            </Box>

                            {ParametersData[index][ParametersIndex][
                              Object.keys(ParameterItem)[0]
                            ] === "Indicator" && (
                              <>
                                <Box
                                  sx={{
                                    marginBottom: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      display: width < 900 ? "none" : "block",
                                      visibility: "hidden",
                                      fontWeight: 500,
                                      fontSize: 16,
                                      fontFamily: "Barlow, san-serif",
                                      color: "#CCCCCC",
                                      whiteSpace: "nowrap",
                                      mr: 1,
                                      width: "93.7px",
                                    }}
                                  >
                                    Parameters {Object.keys(ParameterItem)[1]}
                                  </Typography>
                                  <SelectInputParameters
                                    value={
                                      ParametersData[index][ParametersIndex]
                                        .middleOne
                                    }
                                    onChange={(selectedOption) =>
                                      handleOptionChange(
                                        index,
                                        ParametersIndex,
                                        selectedOption
                                      )
                                    }
                                    options={parametersOneIndicatorOptions}
                                    keyName={"middleOne"}
                                    placeHolder={"Select"}
                                    Width={"100%"}
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
                                  {ParametersData[index][ParametersIndex]
                                    .middleOne && (
                                    <Button
                                      id={index}
                                      newAttr={ParametersIndex}
                                      onClick={(e) =>
                                        handlePopoverOpen(
                                          e,
                                          index,
                                          ParametersIndex
                                        )
                                      }
                                      sx={{
                                        color: "white",
                                        background: "#3E3E3E",
                                        borderRadius: "6px",
                                        height: 30,
                                        minWidth: 20,
                                      }}
                                    >
                                      <ModeEditOutlineIcon />
                                    </Button>
                                  )}
                                </Box>
                                <Popover
                                  open={open}
                                  anchorEl={anchorEl}
                                  onClose={handlePopoverClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                  }}
                                  sx={{ mt: 0.5 }}
                                >
                                  <Box
                                    sx={{
                                      background: "#606060",
                                      minWidth: 250,
                                      minHeight: 100,
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: 1,
                                      py: 0.2,
                                    }}
                                  >
                                    {/* <Typography
                                      sx={{
                                        fontFamily: "Barlow, san-serif",
                                        fontWeight: 500,
                                        fontSize: 16,
                                        color: "#FFFFFF",
                                        px: 0.5,
                                        opacity: 0.7,
                                      }}
                                    >
                                      {selectedOption?.label ||
                                        "Select an option"}
                                    </Typography> */}
                                    {selectedOption?.value.startsWith(
                                      "Simple Moving Average"
                                    ) &&
                                      toggle && (
                                        <>
                                          <Typography
                                            sx={{
                                              fontFamily: "Barlow, san-serif",
                                              fontWeight: 500,
                                              fontSize: 16,
                                              color: "#FFFFFF",
                                              px: 0.5,
                                              opacity: 0.7,
                                            }}
                                          >
                                            {`Simple Moving Average ${inputValuesSimple.input1 ||
                                              ""}` || "Select an option"}
                                          </Typography>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              gap: 1,
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Length
                                              </label>
                                              <input
                                                type="number"
                                                name="input1"
                                                value={
                                                  inputValuesSimple.input1 || ""
                                                }
                                                onChange={
                                                  handleInputChangeSimple
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Source
                                              </label>
                                              <input
                                                type="text"
                                                name="input2"
                                                value={
                                                  inputValuesSimple.input2 || ""
                                                }
                                                onChange={
                                                  handleInputChangeSimple
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Offset
                                              </label>
                                              <input
                                                type="number"
                                                name="input3"
                                                value={
                                                  inputValuesSimple.input3 || ""
                                                }
                                                onChange={
                                                  handleInputChangeSimple
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                          </Box>
                                        </>
                                      )}
                                    {selectedOption?.value.startsWith(
                                      "Exponential Moving Average"
                                    ) &&
                                      toggle && (
                                        <>
                                          <Typography
                                            sx={{
                                              fontFamily: "Barlow, san-serif",
                                              fontWeight: 500,
                                              fontSize: 16,
                                              color: "#FFFFFF",
                                              px: 0.5,
                                              opacity: 0.7,
                                            }}
                                          >
                                            {`Exponential Moving Average ${inputValuesExponential.input1 ||
                                              ""}` || "Select an option"}
                                          </Typography>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              gap: 1,
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Length
                                              </label>
                                              <input
                                                type="number"
                                                name="input1"
                                                value={
                                                  inputValuesExponential.input1 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeExponential
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Source
                                              </label>
                                              <input
                                                type="text"
                                                name="input2"
                                                value={
                                                  inputValuesExponential.input2 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeExponential
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Offset
                                              </label>
                                              <input
                                                type="number"
                                                name="input3"
                                                value={
                                                  inputValuesExponential.input3 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeExponential
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                          </Box>
                                        </>
                                      )}
                                    {selectedOption?.value.startsWith(
                                      "Keltner Channel"
                                    ) &&
                                      toggle && (
                                        <>
                                          <Typography
                                            sx={{
                                              fontFamily: "Barlow, san-serif",
                                              fontWeight: 500,
                                              fontSize: 16,
                                              color: "#FFFFFF",
                                              px: 0.5,
                                              opacity: 0.7,
                                            }}
                                          >
                                            {`Keltner Channel ${inputValuesKeltner.input1 ||
                                              ""}` || "Select an option"}
                                          </Typography>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              gap: 1,
                                              px: 3,
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Length
                                              </label>
                                              <input
                                                type="number"
                                                name="input1"
                                                value={
                                                  inputValuesKeltner.input1 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeKeltner
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Multiplier
                                              </label>
                                              <input
                                                type="number"
                                                name="input2"
                                                value={
                                                  inputValuesKeltner.input2 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeKeltner
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Ma Type
                                              </label>
                                              <input
                                                type="text"
                                                name="input3"
                                                value={
                                                  inputValuesKeltner.input3 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeKeltner
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                ATR Length
                                              </label>
                                              <input
                                                type="number"
                                                name="input4"
                                                value={
                                                  inputValuesKeltner.input4 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeKeltner
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Source
                                              </label>
                                              <input
                                                type="text"
                                                name="input5"
                                                value={
                                                  inputValuesKeltner.input5 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeKeltner
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                          </Box>
                                        </>
                                      )}
                                    {selectedOption?.value.startsWith(
                                      "Tom Demark"
                                    ) &&
                                      toggle && (
                                        <>
                                          <Typography
                                            sx={{
                                              fontFamily: "Barlow, san-serif",
                                              fontWeight: 500,
                                              fontSize: 16,
                                              color: "#FFFFFF",
                                              px: 0.5,
                                              opacity: 0.7,
                                            }}
                                          >
                                            {`Tom Demark` || "Select an option"}
                                          </Typography>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "flex-start",
                                              pl: 1,
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Type
                                              </label>
                                              <input
                                                type="text"
                                                name="tomDemarkValue"
                                                value={
                                                  inputValuesTom.tomDemarkValue ||
                                                  ""
                                                }
                                                onChange={handleInputChangeTom}
                                                style={{
                                                  width: "180px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                          </Box>
                                        </>
                                      )}
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        mt: 1,
                                        gap: 1,
                                        mr: 1,
                                        mb: 1,
                                      }}
                                    >
                                      <Button
                                        sx={{
                                          background:
                                            "linear-gradient(to right,#790F87,#794AE3)",
                                          color: "#FFFFFF",
                                          borderRadius: 1.5,
                                          height: 22,
                                          minWidth: 20,
                                          fontFamily: "Barlow, san-serif",
                                          textTransform: "none",
                                        }}
                                        onClick={() =>
                                          handlePopoverSave(
                                            index,
                                            ParametersIndex
                                          )
                                        }
                                      >
                                        Apply
                                      </Button>
                                      <Button
                                        sx={{
                                          background: "#8F8F8F",
                                          color: "#FFFFFF",
                                          borderRadius: 1.5,
                                          height: 22,
                                          minWidth: 20,
                                          fontFamily: "Barlow, san-serif",
                                          textTransform: "none",
                                        }}
                                        onClick={handlePopoverClose}
                                      >
                                        Cancel
                                      </Button>
                                    </Box>
                                  </Box>
                                </Popover>
                              </>
                            )}

                            {ParametersData[index][ParametersIndex][
                              Object.keys(ParameterItem)[0]
                            ] === "Oscillator" && (
                              <>
                                <Box
                                  sx={{
                                    marginBottom: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      display: width < 900 ? "none" : "block",
                                      visibility: "hidden",
                                      fontWeight: 500,
                                      fontSize: 16,
                                      fontFamily: "Barlow, san-serif",
                                      color: "#CCCCCC",
                                      whiteSpace: "nowrap",
                                      mr: 1,
                                    }}
                                  >
                                    Parameters {Object.keys(ParameterItem)[1]}
                                  </Typography>
                                  <SelectInputParameters
                                    value={
                                      ParametersData[index][ParametersIndex]
                                        .middleOne
                                    }
                                    onChange={(selectedOption) => {
                                      const temp = [...ParametersData];
                                      temp[index][ParametersIndex].middleOne =
                                        selectedOption.value;
                                      setParametersData(temp);
                                    }}
                                    options={parametersOneOscillatorOptions}
                                    keyName={"middleOne"}
                                    placeHolder={"Select"}
                                    Width={"100%"}
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
                                </Box>
                              </>
                            )}

                            {ParametersData[index][ParametersIndex][
                              Object.keys(ParameterItem)[0]
                            ] === "High Volume Candlestick" && (
                              <>
                                <Box
                                  sx={{
                                    marginBottom: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      display: width < 900 ? "none" : "block",
                                      visibility: "hidden",
                                      fontWeight: 500,
                                      fontSize: 16,
                                      fontFamily: "Barlow, san-serif",
                                      color: "#CCCCCC",
                                      whiteSpace: "nowrap",
                                      mr: 1,
                                    }}
                                  >
                                    Parameters {Object.keys(ParameterItem)[1]}
                                  </Typography>
                                  <SelectInputParameters
                                    value={
                                      ParametersData[index][ParametersIndex]
                                        .middleOne
                                    }
                                    onChange={(selectedOption) => {
                                      const temp = [...ParametersData];
                                      temp[index][ParametersIndex].middleOne =
                                        selectedOption.value;
                                      setInputValuesHighCandle(
                                        (prevInputValues) => ({
                                          ...prevInputValues,
                                          ["input1"]: selectedOption.value,
                                        })
                                      );
                                      setParametersData(temp);
                                    }}
                                    options={
                                      parametersOneHighVolumeCandlestickOptions
                                    }
                                    keyName={"middleOne"}
                                    placeHolder={"Select"}
                                    Width={"100%"}
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
                                  {ParametersData[index][ParametersIndex]
                                    .middleOne && (
                                    <Button
                                      id={index}
                                      newAttr={ParametersIndex}
                                      onClick={(e) =>
                                        handlePopoverOpen(
                                          e,
                                          index,
                                          ParametersIndex
                                        )
                                      }
                                      onClick={handlePopoverOpen}
                                      sx={{
                                        color: "white",
                                        background: "#2D2D2D",
                                        borderRadius: "6px",
                                        height: 30,
                                        minWidth: 20,
                                      }}
                                    >
                                      <ModeEditOutlineIcon />
                                    </Button>
                                  )}
                                </Box>
                                <Popover
                                  open={open}
                                  anchorEl={anchorEl}
                                  onClose={handlePopoverClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                  }}
                                  sx={{ mt: 0.5 }}
                                >
                                  <Box
                                    sx={{
                                      background: "#606060",
                                      minWidth: 250,

                                      minHeight: 100,
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: 1,
                                      py: 0.2,
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontFamily: "Barlow, san-serif",
                                        fontWeight: 500,
                                        fontSize: 16,
                                        color: "#FFFFFF",
                                        px: 0.5,
                                        opacity: 0.7,
                                      }}
                                    >
                                      High Volume Candlestick
                                    </Typography>
                                    {ParametersData[index][ParametersIndex][
                                      Object.keys(ParameterItem)[0]
                                    ] === "High Volume Candlestick" && (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          gap: 1,
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <label
                                            style={{
                                              fontFamily: "Barlow, san-serif",
                                              color: "#FFFFFF",
                                              fontSize: "13px",
                                            }}
                                          >
                                            Type
                                          </label>
                                          <input
                                            type="text"
                                            name="input1"
                                            value={
                                              inputValuesHighCandle.input1 ||
                                              ParametersData[index][
                                                ParametersIndex
                                              ].middleOne
                                            }
                                            onChange={
                                              handleInputChangeHighCandle
                                            }
                                            style={{
                                              width: "210px",
                                              background: "#8F8F8F",
                                              border: "none",
                                              outline: "none",
                                              borderRadius: "4px",
                                              fontFamily: "Barlow, san-serif",
                                              color: "#FFFFFF",
                                              height: "25px",
                                              paddingLeft: "5px",
                                            }}
                                          />
                                        </Box>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <label
                                            style={{
                                              fontFamily: "Barlow, san-serif",
                                              color: "#FFFFFF",
                                              fontSize: "13px",
                                            }}
                                          >
                                            Price Point
                                          </label>
                                          <input
                                            type="text"
                                            name="input2"
                                            value={
                                              inputValuesHighCandle.input2 || ""
                                            }
                                            onChange={
                                              handleInputChangeHighCandle
                                            }
                                            style={{
                                              width: "70px",
                                              background: "#8F8F8F",
                                              border: "none",
                                              outline: "none",
                                              borderRadius: "4px",
                                              fontFamily: "Barlow, san-serif",
                                              color: "#FFFFFF",
                                              height: "25px",
                                              paddingLeft: "5px",
                                            }}
                                          />
                                        </Box>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <label
                                            style={{
                                              fontFamily: "Barlow, san-serif",
                                              color: "#FFFFFF",
                                              fontSize: "13px",
                                            }}
                                          >
                                            Min. Candle Size
                                          </label>
                                          <input
                                            type="number"
                                            name="input3"
                                            value={
                                              inputValuesHighCandle.input3 || ""
                                            }
                                            onChange={
                                              handleInputChangeHighCandle
                                            }
                                            style={{
                                              width: "110px",
                                              background: "#8F8F8F",
                                              border: "none",
                                              outline: "none",
                                              borderRadius: "4px",
                                              fontFamily: "Barlow, san-serif",
                                              color: "#FFFFFF",
                                              height: "25px",
                                              paddingLeft: "5px",
                                            }}
                                          />
                                        </Box>
                                      </Box>
                                    )}

                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        mt: 1,
                                        gap: 1,
                                        mr: 1,
                                        mb: 1,
                                      }}
                                    >
                                      <Button
                                        sx={{
                                          background:
                                            "linear-gradient(to right,#790F87,#794AE3)",
                                          color: "#FFFFFF",
                                          borderRadius: 1.5,
                                          height: 22,
                                          minWidth: 20,
                                          fontFamily: "Barlow, san-serif",
                                          textTransform: "none",
                                        }}
                                        onClick={() =>
                                          handleHighCandleStickPopoverSave(
                                            index,
                                            ParametersIndex
                                          )
                                        }
                                      >
                                        Apply
                                      </Button>
                                      <Button
                                        sx={{
                                          background: "#8F8F8F",
                                          color: "#FFFFFF",
                                          borderRadius: 1.5,
                                          height: 22,
                                          minWidth: 20,
                                          fontFamily: "Barlow, san-serif",
                                          textTransform: "none",
                                        }}
                                        onClick={handlePopoverClose}
                                      >
                                        Cancel
                                      </Button>
                                    </Box>
                                  </Box>
                                </Popover>
                              </>
                            )}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: width < 900 ? 0 : 2,
                                gap: 2,
                                flexWrap: width < 900 ? "wrap" : "nowrap",
                              }}
                            >
                              <Typography
                                sx={{
                                  display: width < 900 ? "none" : "block",
                                  visibility: "hidden",
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
                                value={
                                  ParametersData[index][ParametersIndex]
                                    .operation
                                }
                                onChange={(selectedOption) => {
                                  const temp = [...ParametersData];
                                  temp[index][ParametersIndex].operation =
                                    selectedOption.value;
                                  setParametersData(temp);
                                }}
                                options={
                                  ParametersData[index][ParametersIndex][
                                    Object.keys(ParameterItem)[0]
                                  ] === "Price"
                                    ? priceParametersOperationsOptions
                                    : ParametersData[index][ParametersIndex][
                                        Object.keys(ParameterItem)[0]
                                      ] === "High Volume Candlestick"
                                    ? highVolumeParametersOperationsOptions
                                    : parametersOperationsOptions
                                }
                                // options={parametersOperationsOptions}
                                keyName={"operation"}
                                placeHolder={"Operations"}
                                margin={
                                  width < 900 ? "0 auto 16px auto" : "auto"
                                }
                                Width={width < 900 ? "30%" : "135px"}
                              />
                            </Box>
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
                                  width: "93.7px",
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
                                options={[
                                  { value: "Indicator", label: "Indicator" },
                                ]}
                                keyName={"Parameter"}
                              />
                            </Box>
                            {ParametersData[index][ParametersIndex][
                              Object.keys(ParameterItem)[1]
                            ] === "Indicator" && (
                              <>
                                <Box
                                  sx={{
                                    marginTop: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      visibility: "hidden",
                                      fontWeight: 500,
                                      fontSize: 16,
                                      fontFamily: "Barlow, san-serif",
                                      color: "#CCCCCC",
                                      whiteSpace: "nowrap",
                                      mr: 1,
                                    }}
                                  >
                                    Parameters {Object.keys(ParameterItem)[1]}
                                  </Typography>

                                  <SelectInputParameters
                                    value={
                                      ParametersData[index][ParametersIndex]
                                        .middleTwo
                                    }
                                    onChange={(selectedOptionTwo) =>
                                      handleOptionTwoChange(
                                        index,
                                        ParametersIndex,
                                        selectedOptionTwo
                                      )
                                    }
                                    options={
                                      ParametersData[index][ParametersIndex][
                                        Object.keys(ParameterItem)[0]
                                      ] === "Indicator"
                                        ? indicatorParametersTwoIndicatorOptions
                                        : priceAndHighVolumeParametersTwoIndicatorOptions
                                    }
                                    // options={parametersOneIndicatorOptions}
                                    keyName={"middleTwo"}
                                    placeHolder={"Select"}
                                    Width={"100%"}
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
                                  {ParametersData[index][ParametersIndex]
                                    .middleTwo && (
                                    <Button
                                      id={index}
                                      newAttr={ParametersIndex}
                                      midTwo="0"
                                      onClick={(e) =>
                                        handlePopoverOpen(
                                          e,
                                          index,
                                          ParametersIndex
                                        )
                                      }
                                      sx={{
                                        color: "white",
                                        background: "#2D2D2D",
                                        borderRadius: "6px",
                                        height: 30,
                                        minWidth: 20,
                                      }}
                                    >
                                      <ModeEditOutlineIcon />
                                    </Button>
                                  )}
                                </Box>

                                <Popover
                                  open={open}
                                  anchorEl={anchorEl}
                                  onClose={handlePopoverClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                  }}
                                  sx={{ mt: 0.5, display: toggle && "none" }}
                                >
                                  <Box
                                    sx={{
                                      background: "#606060",
                                      minWidth: 250,
                                      minHeight: 101,
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: 1,
                                      py: 0.2,
                                    }}
                                  >
                                    {/* <Typography
                                      sx={{
                                        fontFamily: "Barlow, san-serif",
                                        fontWeight: 500,
                                        fontSize: 16,
                                        color: "#FFFFFF",
                                        px: 0.5,
                                        opacity: 0.7,
                                      }}
                                    >
                                      {selectedOption?.label ||
                                        "Select an option"}
                                    </Typography> */}
                                    {selectedOptionTwo?.value.startsWith(
                                      "Simple Moving Average"
                                    ) &&
                                      !toggle && (
                                        <>
                                          <Typography
                                            sx={{
                                              fontFamily: "Barlow, san-serif",
                                              fontWeight: 500,
                                              fontSize: 16,
                                              color: "#FFFFFF",
                                              px: 0.5,
                                              opacity: 0.7,
                                            }}
                                          >
                                            {`Simple Moving Average ${inputValuesTwoSimple.input1 ||
                                              ""}` || "Select an option"}
                                          </Typography>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              gap: 1,
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Length
                                              </label>
                                              <input
                                                type="number"
                                                name="input1"
                                                value={
                                                  inputValuesTwoSimple.input1 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeTwoSimple
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Source
                                              </label>
                                              <input
                                                type="text"
                                                name="input2"
                                                value={
                                                  inputValuesTwoSimple.input2 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeTwoSimple
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Offset
                                              </label>
                                              <input
                                                type="number"
                                                name="input3"
                                                value={
                                                  inputValuesTwoSimple.input3 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeTwoSimple
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                          </Box>
                                        </>
                                      )}
                                    {selectedOptionTwo?.value.startsWith(
                                      "Exponential Moving Average"
                                    ) &&
                                      !toggle && (
                                        <>
                                          <Typography
                                            sx={{
                                              fontFamily: "Barlow, san-serif",
                                              fontWeight: 500,
                                              fontSize: 16,
                                              color: "#FFFFFF",
                                              px: 0.5,
                                              opacity: 0.7,
                                            }}
                                          >
                                            {`Exponential Moving Average ${inputValuesTwoExponential.input1 ||
                                              ""}` || "Select an option"}
                                          </Typography>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              gap: 1,
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Length
                                              </label>
                                              <input
                                                type="number"
                                                name="input1"
                                                value={
                                                  inputValuesTwoExponential.input1 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeTwoExponential
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Source
                                              </label>
                                              <input
                                                type="text"
                                                name="input2"
                                                value={
                                                  inputValuesTwoExponential.input2 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeTwoExponential
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Offset
                                              </label>
                                              <input
                                                type="number"
                                                name="input3"
                                                value={
                                                  inputValuesTwoExponential.input3 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeTwoExponential
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                          </Box>
                                        </>
                                      )}
                                    {selectedOptionTwo?.value.startsWith(
                                      "Keltner Channel"
                                    ) &&
                                      !toggle && (
                                        <>
                                          <Typography
                                            sx={{
                                              fontFamily: "Barlow, san-serif",
                                              fontWeight: 500,
                                              fontSize: 16,
                                              color: "#FFFFFF",
                                              px: 0.5,
                                              opacity: 0.7,
                                            }}
                                          >
                                            {`Keltner Channel ${inputValuesTwoKeltner.input1 ||
                                              ""}` || "Select an option"}
                                          </Typography>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              gap: 1,
                                              px: 3,
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Length
                                              </label>
                                              <input
                                                type="number"
                                                name="input1"
                                                value={
                                                  inputValuesTwoKeltner.input1 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeTwoKeltner
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Multiplier
                                              </label>
                                              <input
                                                type="number"
                                                name="input2"
                                                value={
                                                  inputValuesTwoKeltner.input2 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeTwoKeltner
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Ma Type
                                              </label>
                                              <input
                                                type="text"
                                                name="input3"
                                                value={
                                                  inputValuesTwoKeltner.input3 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeTwoKeltner
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                ATR Length
                                              </label>
                                              <input
                                                type="number"
                                                name="input4"
                                                value={
                                                  inputValuesTwoKeltner.input4 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeTwoKeltner
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Source
                                              </label>
                                              <input
                                                type="text"
                                                name="input5"
                                                value={
                                                  inputValuesTwoKeltner.input5 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeTwoKeltner
                                                }
                                                style={{
                                                  width: "65px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                          </Box>
                                        </>
                                      )}
                                    {selectedOptionTwo?.value.startsWith(
                                      "Tom Demark"
                                    ) &&
                                      !toggle && (
                                        <>
                                          <Typography
                                            sx={{
                                              fontFamily: "Barlow, san-serif",
                                              fontWeight: 500,
                                              fontSize: 16,
                                              color: "#FFFFFF",
                                              px: 0.5,
                                              opacity: 0.7,
                                            }}
                                          >
                                            {`Tom Demark` || "Select an option"}
                                          </Typography>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "flex-start",
                                              pl: 1,
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Type
                                              </label>
                                              <input
                                                type="text"
                                                name="tomDemarkValue"
                                                value={
                                                  inputValuesTwoTom.tomDemarkValue ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeTwoTom
                                                }
                                                style={{
                                                  width: "180px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                          </Box>
                                        </>
                                      )}
                                    {selectedOptionTwo?.value.startsWith(
                                      "Value"
                                    ) &&
                                      !toggle && (
                                        <>
                                          <Typography
                                            sx={{
                                              fontFamily: "Barlow, san-serif",
                                              fontWeight: 500,
                                              fontSize: 16,
                                              color: "#FFFFFF",
                                              px: 0.5,
                                              opacity: 0.7,
                                            }}
                                          >
                                            {`Value` || "Select an option"}
                                          </Typography>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "flex-start",
                                              pl: 1,
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Value
                                              </label>
                                              <input
                                                type="number"
                                                name="input1"
                                                value={
                                                  inputValuesTwoValue.input1 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeTwoValue
                                                }
                                                style={{
                                                  width: "180px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                          </Box>
                                        </>
                                      )}

                                    {selectedOptionTwo?.value.startsWith(
                                      "Price"
                                    ) &&
                                      !toggle && (
                                        <>
                                          <Typography
                                            sx={{
                                              fontFamily: "Barlow, san-serif",
                                              fontWeight: 500,
                                              fontSize: 16,
                                              color: "#FFFFFF",
                                              px: 0.5,
                                              opacity: 0.7,
                                            }}
                                          >
                                            {`Price` || "Select an option"}
                                          </Typography>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "flex-start",
                                              pl: 1,
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  fontSize: "13px",
                                                }}
                                              >
                                                Price
                                              </label>
                                              <input
                                                type="number"
                                                name="input1"
                                                value={
                                                  inputValuesTwoPrice.input1 ||
                                                  ""
                                                }
                                                onChange={
                                                  handleInputChangeTwoPrice
                                                }
                                                style={{
                                                  width: "180px",
                                                  background: "#8F8F8F",
                                                  border: "none",
                                                  outline: "none",
                                                  borderRadius: "4px",
                                                  fontFamily:
                                                    "Barlow, san-serif",
                                                  color: "#FFFFFF",
                                                  height: "25px",
                                                  paddingLeft: "5px",
                                                }}
                                              />
                                            </Box>
                                          </Box>
                                        </>
                                      )}
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        mt: 1,
                                        gap: 1,
                                        mr: 1,
                                        mb: 1,
                                      }}
                                    >
                                      <Button
                                        sx={{
                                          background:
                                            "linear-gradient(to right,#790F87,#794AE3)",
                                          color: "#FFFFFF",
                                          borderRadius: 1.5,
                                          height: 22,
                                          minWidth: 20,
                                          fontFamily: "Barlow, san-serif",
                                          textTransform: "none",
                                        }}
                                        onClick={() =>
                                          handlePopoverSaveTwo(
                                            index,
                                            ParametersIndex
                                          )
                                        }
                                      >
                                        Apply
                                      </Button>
                                      <Button
                                        sx={{
                                          background: "#8F8F8F",
                                          color: "#FFFFFF",
                                          borderRadius: 1.5,
                                          height: 22,
                                          minWidth: 20,
                                          fontFamily: "Barlow, san-serif",
                                          textTransform: "none",
                                        }}
                                        onClick={handlePopoverClose}
                                      >
                                        Cancel
                                      </Button>
                                    </Box>
                                  </Box>
                                </Popover>
                              </>
                            )}

                            {ParametersIndex === 0 &&
                            ParametersData[index].length <= 3 ? (
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
                            ) : (
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
                                    Remove Parameters
                                  </Typography>
                                </Box>
                                <Box
                                  onClick={() =>
                                    handleRemoveParameter(
                                      index,
                                      ParametersIndex
                                    )
                                  }
                                  sx={{
                                    cursor: "pointer",
                                  }}
                                >
                                  <Typography
                                    style={{
                                      borderRadius: "3px",
                                      background:
                                        "linear-gradient(to right,#790F87,#794AE3)",
                                      height: "15px",
                                      width: "15px",
                                      textAlign: "center",
                                      lineHeight: "15px",
                                    }}
                                  >
                                    -
                                  </Typography>
                                </Box>
                              </Box>
                            )}
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
                  minHeight: 178,
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
                        options={dcaTypeOptions}
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
                        startAdornment={
                          <InputAdornment
                            position="start"
                            sx={{
                              "& .MuiTypography-root": {
                                background: "#3E3E3E",
                                padding: "1.5px 5px",
                                borderTopLeftRadius: "6px",
                                borderBottomLeftRadius: "6px",
                              },
                            }}
                          >
                            %
                          </InputAdornment>
                        }
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
                          "&:focus": {
                            boxShadow: "none",
                            borderColor: "none !important",
                          },
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
                  minHeight: 178,
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
                        placeHolder="Select"
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
                        options={takeProfitOptions}
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
                        startAdornment={
                          <InputAdornment
                            position="start"
                            sx={{
                              "& .MuiTypography-root": {
                                background: "#3E3E3E",
                                padding: "1.5px 5px",
                                borderTopLeftRadius: "6px",
                                borderBottomLeftRadius: "6px",
                              },
                            }}
                          >
                            %
                          </InputAdornment>
                        }
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
                  minHeight: 178,
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

      <Chart data={AllStrategyData} func={handleBacktest} />
      {/* <CandleStickGraph /> */}
    </>
  );
};
