import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import MeterChart from "./MeterChart";

const StrategyThreeBoxes = () => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

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
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
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

  // Inspired by blueprintjs
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
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={isDrawerOpen ? 6 : 3.5} lg={3.5}>
        <Box
          sx={{
            background: "#191919",
            pt: 2,
            borderRadius: 1,
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
            background: "#191919",
            pt: 2,
            pl: 2,
            borderRadius: 1,
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
                  checked={AllToggles["Strategy Name"]}
                  onChange={() =>
                    setAllToggles({
                      ...AllToggles,
                      "Strategy Name": !AllToggles["Strategy Name"],
                    })
                  }
                />
              }
              label="Strategy Name"
              sx={{
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
                  checked={AllToggles.Pairs}
                  onChange={() =>
                    setAllToggles({ ...AllToggles, Pairs: !AllToggles.Pairs })
                  }
                />
              }
              label="Pairs"
              sx={{
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
                  checked={AllToggles["First Order Size"]}
                  onChange={() =>
                    setAllToggles({
                      ...AllToggles,
                      "First Order Size": !AllToggles["First Order Size"],
                    })
                  }
                />
              }
              label="First order size"
              sx={{
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
                  checked={AllToggles["Order Type"]}
                  onChange={() =>
                    setAllToggles({
                      ...AllToggles,
                      "Order Type": !AllToggles["Order Type"],
                    })
                  }
                />
              }
              label="Order type"
              sx={{
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
                  checked={AllToggles.Parameters}
                  onChange={() =>
                    setAllToggles({
                      ...AllToggles,
                      Parameters: !AllToggles.Parameters,
                    })
                  }
                />
              }
              label="Parameters"
              sx={{
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
                  checked={AllToggles["DCA Type"]}
                  onChange={() =>
                    setAllToggles({
                      ...AllToggles,
                      "DCA Type": !AllToggles["DCA Type"],
                    })
                  }
                />
              }
              label="DCA Type"
              sx={{
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
                  checked={AllToggles["Volume Multiplier"]}
                  onChange={() =>
                    setAllToggles({
                      ...AllToggles,
                      "Volume Multiplier": !AllToggles["Volume Multiplier"],
                    })
                  }
                />
              }
              label="Volume multiplier:"
              sx={{
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
                  checked={AllToggles["Max. Extra Orders"]}
                  onChange={() =>
                    setAllToggles({
                      ...AllToggles,
                      "Max. Extra Orders": !AllToggles["Max. Extra Orders"],
                    })
                  }
                />
              }
              label="Max. extra orders"
              sx={{
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
                  checked={AllToggles["Take Profit"]}
                  onChange={() =>
                    setAllToggles({
                      ...AllToggles,
                      "Take Profit": !AllToggles["Take Profit"],
                    })
                  }
                />
              }
              label="Take Profit"
              sx={{
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
              background: "#191919",
              pt: 2,
              pl: 2,
              borderRadius: 1,
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
              First order size: {Setting["First order size"]}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Extra order size: {Setting["Extra order size"]}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Extra order type: {Setting["Extra order type"]}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Parameters: {Setting.Parameters}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              DCA Type: {Setting["DCA Type"]}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Volume multiplier: {Setting["Volume multiplier"]}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Max. extra orders: {Setting["Max. extra orders"]}
            </Typography>{" "}
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Min. dist. between orders: {Setting["Min. dist. between orders"]}
            </Typography>{" "}
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Drop to start extra order: {Setting["Drop to start extra order"]}
            </Typography>{" "}
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Step multiplier: {Setting["Step multiplier"]}
            </Typography>{" "}
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                fontFamily: "Barlow, san-serif",
              }}
            >
              Take Profit: {Setting["Take Profit"]}
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
              Stop loss: {Setting["Stop loss"]}
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
