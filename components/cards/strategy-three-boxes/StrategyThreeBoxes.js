import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import MeterChart from "./MeterChart";
import { useStrategy } from "../../../context/StrategyContext";

const StrategyThreeBoxes = () => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const { GeneralSettingsData, setGeneralSettingsData } = useStrategy();
  const { OrdersData, setOrdersData } = useStrategy();
  const { ParametersData, setParametersData } = useStrategy();
  const { DCAData, setDCAData } = useStrategy();
  const { TakeProfitData, setTakeProfitData } = useStrategy();
  const { StopLossData, setStopLossData } = useStrategy();

  console.log("FORM GENERAL:     ", DCAData[0]["dcaType"]);
  const StrategySettings = [
    {
      Cycles: 1,
      "First order size": 100,
      "Extra order size": 150,
      "Extra order type": "Signal",
      Parameters:
        "Bullish Green Vector (Vol.>200%) Greater than Exponential Moving Average 50...",
      "DCA Type": "Signal",
      "Volume multiplier": 1.05,
      "Max. extra orders": 10,
      "Min. dist. between orders": "1.5%",
      "Drop to start extra order": "",
      "Step multiplier": "",
      "Take Profit": "Indicator",
      "Stop loss": "",
      Advanced: "",
      Resume: "",
    },
  ];

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 3,
    width: 14,
    height: 14,
    border: "1.5px solid #363636",

    "input:disabled ~ &": {
      color: "#FFFFFF !important",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#00C209",
    border: "none",
    "&:before": {
      border: "none",
      display: "block",
      width: 14,
      height: 14,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
  });
  function BpCheckbox(props) {
    return (
      <Checkbox
        sx={{
          "&:hover": { bgcolor: "transparent" },
          paddingRight: "3px",
          paddingBottom: "0",
          paddingTop: "0",
          margin: "0",
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        inputProps={{ "aria-label": "Checkbox demo" }}
        {...props}
      />
    );
  }
  const [AllToggles, setAllToggles] = useState({
    "Strategy Name": false,
    Pairs: false,
    "First Order Size": false,
    "Order Type": false,
    Parameters: false,
    "DCA Type": false,
    "Volume Multiplier": false,
    "Max. Extra Orders": false,
    "Take Profit": false,
  });

  return (
    <Grid container spacing={"20px"}>
      <Grid item xs={12} sm={6} md={isDrawerOpen ? 6 : 3.5} lg={3.5}>
        <Box
          sx={{
            background: "#262626",
            border: "1.2px solid #3F4341",
            borderRadius: "4.8px",
            pt: 2,
            minHeight: 350,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "Barlow, san-serif",
              pb: 2,
              pl: 2,
            }}
          >
            VOLUME REQUIRED VS VOLUME AVAILABLE
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MeterChart />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={isDrawerOpen ? 6 : 3.5} lg={3.5}>
        <Box
          sx={{
            background: "#262626",
            border: "1.2px solid #3F4341",
            borderRadius: "4.8px",
            pt: 2,
            pl: 2,
            minHeight: 350,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "Barlow, san-serif",
              pb: 2,
            }}
          >
            MANDATORY FIELDS
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <FormControlLabel
              control={
                <BpCheckbox
                  checked={GeneralSettingsData[0]["strategyName"] !== ""}
                  disabled
                />
              }
              label="Strategy Name"
              sx={{
                "& .Mui-disabled": {
                  color: "#FFFFFF !important",
                },
                "& .MuiTypography-root": {
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "20px",
                  fontFamily: "Barlow, san-serif",
                },
              }}
            />

            <FormControlLabel
              control={
                <BpCheckbox
                  checked={OrdersData[0]["firstOrderSize"] !== ""}
                  disabled
                />
              }
              label="First order size"
              sx={{
                "& .Mui-disabled": {
                  color: "#FFFFFF !important",
                },
                "& .MuiTypography-root": {
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "20px",
                  fontFamily: "Barlow, san-serif",
                },
              }}
            />
            <FormControlLabel
              control={
                <BpCheckbox
                  checked={OrdersData[0]["orderType"] !== ""}
                  disabled
                />
              }
              label="Order type"
              sx={{
                "& .Mui-disabled": {
                  color: "#FFFFFF !important",
                },
                "& .MuiTypography-root": {
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "20px",
                  fontFamily: "Barlow, san-serif",
                },
              }}
            />
            <FormControlLabel
              control={
                <BpCheckbox
                  checked={ParametersData[0][0]["1"] !== ""}
                  disabled
                />
              }
              label="Parameters"
              sx={{
                "& .Mui-disabled": {
                  color: "#FFFFFF !important",
                },
                "& .MuiTypography-root": {
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "20px",
                  fontFamily: "Barlow, san-serif",
                },
              }}
            />
            <FormControlLabel
              control={
                <BpCheckbox checked={DCAData[0]["dcaType"] !== ""} disabled />
              }
              label="DCA Type"
              sx={{
                "& .Mui-disabled": {
                  color: "#FFFFFF !important",
                },
                "& .MuiTypography-root": {
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "20px",
                  fontFamily: "Barlow, san-serif",
                },
              }}
            />
            <FormControlLabel
              control={
                <BpCheckbox
                  checked={DCAData[0]["volumeMultiplier"] !== ""}
                  disabled
                />
              }
              label="Volume multiplier:"
              sx={{
                "& .Mui-disabled": {
                  color: "#FFFFFF !important",
                },
                "& .MuiTypography-root": {
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "20px",
                  fontFamily: "Barlow, san-serif",
                },
              }}
            />
            <FormControlLabel
              control={
                <BpCheckbox
                  checked={DCAData[0]["maxExtraOrders"] !== ""}
                  disabled
                />
              }
              label="Max. extra orders"
              sx={{
                "& .Mui-disabled": {
                  color: "#FFFFFF !important",
                },
                "& .MuiTypography-root": {
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "20px",
                  fontFamily: "Barlow, san-serif",
                },
              }}
            />
            <FormControlLabel
              control={
                <BpCheckbox
                  checked={TakeProfitData[0]["takeProfit"] !== ""}
                  disabled
                />
              }
              label="Take Profit"
              sx={{
                "& .Mui-disabled": {
                  color: "#FFFFFF !important",
                },
                "& .MuiTypography-root": {
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "20px",
                  fontFamily: "Barlow, san-serif",
                },
              }}
            />
          </Box>
        </Box>
      </Grid>
      {StrategySettings.map((Setting, index) => (
        <Grid
          item
          key={index}
          xs={12}
          sm={12}
          md={isDrawerOpen ? 12 : 5}
          lg={5}
        >
          <Box
            sx={{
              background: "#262626",
              border: "1.2px solid #3F4341",
              borderRadius: "4.8px",
              pt: 2,
              pl: 2,
              minHeight: 350,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 14,
                fontFamily: "Barlow, san-serif",
                pb: 1,
              }}
            >
              STRATEGY SETTING CYCLE {index + 1}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Cycles: {Setting.Cycles}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              First order size: {OrdersData[0]["firstOrderSize"]}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Extra order size: {OrdersData[0]["extraOrderSize"]}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Order type: {OrdersData[0]["orderType"]}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Parameters: {ParametersData[0][0]["1"]}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              DCA Type: {DCAData[0]["dcaType"]}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Volume multiplier: {DCAData[0]["volumeMultiplier"]}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Max. extra orders: {DCAData[0]["maxExtraOrders"]}
            </Typography>{" "}
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Min. dist. between orders: {DCAData[0]["minDistBetweenOrders"]}
            </Typography>{" "}
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Drop to start extra order: {DCAData[0]["startExtraOrder"]}
            </Typography>{" "}
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Step multiplier: {DCAData[0]["stepMultiplier"]}
            </Typography>{" "}
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Take Profit: {TakeProfitData[0]["takeProfit"]}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              {" "}
              Stop loss: {StopLossData[0]["stopLoss"]}
            </Typography>{" "}
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Advanced:{Setting.Advanced}{" "}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              {" "}
              Resume: {Setting.Resume}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default StrategyThreeBoxes;
