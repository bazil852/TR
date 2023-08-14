import React, { useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SelectInputParameters from "../../widgets/SelectInputParameters";
import { Plus } from "../../../utils/icons";
import { getSession } from "next-auth/react";

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

const priceParametersOperationsOptions = [
  { value: "Equal", label: "Equal" },
  { value: "Greater Than", label: "Greater than" },
  { value: "Greater Or Equal", label: "Greater or equal" },
  { value: "Less Than", label: "Less than" },
  { value: "Less Or Equal", label: "Less or equal" },
];

const highVolumeParametersOperationsOptions = [
  { value: "GreaterThan", label: "Greater than" },
  { value: "GreaterOrEqual", label: "Greater or equal" },
  { value: "LessThan", label: "Less than" },
  { value: "LessOrEqual", label: "Less or equal" },
  { value: "CrossesUp", label: "Crosses up" },
  { value: "CrossesDown", label: "Crosses down" },
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

const StrategyParameters = (props) => {
  console.log(props);
  return (
    <>
      {ParametersIndex !== 0 && (
        <Grid item xs={12} sm={12} md={1.2} lg={1.2}>
          <Box
            sx={{
              background: "linear-gradient(to right,#790F87,#794AE3)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              height: 123,
              width: props.width < 601 ? 66 : 66,
              ml: props.width < 900 ? "45%" : "",
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
              temp[index][ParametersIndex] = !ANDToggle[index][ParametersIndex];

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
              gap: props.width < 900 ? 0 : 2,
              flexWrap: props.width < 900 ? "wrap" : "nowrap",
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
                props.ParametersData[props.parameterIndex][ParametersIndex][
                  Object.keys(ParameterItem)[0]
                ]
              }
              onChange={(selectedOption) => {
                const temp = [...ParametersData];
                temp[props.parameterIndex][ParametersIndex][
                  Object.keys(ParameterItem)[0]
                ] = selectedOption.value;
                temp[props.parameterIndex][ParametersIndex].middleOne = "";
                setParametersData(temp);
              }}
              options={parametersOneOptions}
              keyName={"Parameter"}
            />
          </Box>

          {props.ParametersData[props.parameterIndex][ParametersIndex][
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
                <SelectInputParameters
                  value={ParametersData[index][ParametersIndex].middleOne}
                  onChange={(selectedOption) =>
                    handleOptionChange(index, ParametersIndex, selectedOption)
                  }
                  options={parametersOneIndicatorOptions}
                  keyName={"middleOne"}
                  placeHolder={"Select"}
                  Width={"100%"}
                  margin={
                    props.width < 900 && props.width > 600
                      ? "35vw"
                      : props.width < 600 && props.width > 500
                      ? "33vw"
                      : props.width < 500
                      ? "28vw"
                      : 13.5
                  }
                />
                {ParametersData[index][ParametersIndex].middleOne && (
                  <Button
                    onClick={(event) => {
                      console.log(
                        "button",
                        ParametersData[index][ParametersIndex].middleOne
                      );
                      setSelectedOption({
                        value: ParametersData[index][ParametersIndex].middleOne,
                        label: ParametersData[index][ParametersIndex].middleOne,
                      });
                      handlePopoverOpen(event);
                    }}
                    sx={{
                      color: "white",
                      background: "#2D2D2D",
                      borderRadius: "6px",
                      height: 30,
                      minWidth: 20,
                    }}
                  >
                    <ModeEditOutlineIcon />
                    <p>{ParametersData[index][ParametersIndex].middleOne}</p>
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
                  ) && (
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
                              fontFamily: "Barlow, san-serif",
                              color: "#FFFFFF",
                              fontSize: "13px",
                            }}
                          >
                            Length
                          </label>
                          <input
                            type="number"
                            name="input1"
                            value={inputValuesSimple.input1 || ""}
                            onChange={handleInputChangeSimple}
                            style={{
                              width: "65px",
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
                            Source
                          </label>
                          <input
                            type="text"
                            name="input2"
                            value={inputValuesSimple.input2 || ""}
                            onChange={handleInputChangeSimple}
                            style={{
                              width: "65px",
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
                            Offset
                          </label>
                          <input
                            type="number"
                            name="input3"
                            value={inputValuesSimple.input3 || ""}
                            onChange={handleInputChangeSimple}
                            style={{
                              width: "65px",
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
                    </>
                  )}
                  {selectedOption?.value.startsWith(
                    "Exponential Moving Average"
                  ) && (
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
                              fontFamily: "Barlow, san-serif",
                              color: "#FFFFFF",
                              fontSize: "13px",
                            }}
                          >
                            Length
                          </label>
                          <input
                            type="number"
                            name="input1"
                            value={inputValuesExponential.input1 || ""}
                            onChange={handleInputChangeExponential}
                            style={{
                              width: "65px",
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
                            Source
                          </label>
                          <input
                            type="text"
                            name="input2"
                            value={inputValuesExponential.input2 || ""}
                            onChange={handleInputChangeExponential}
                            style={{
                              width: "65px",
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
                            Offset
                          </label>
                          <input
                            type="number"
                            name="input3"
                            value={inputValuesExponential.input3 || ""}
                            onChange={handleInputChangeExponential}
                            style={{
                              width: "65px",
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
                    </>
                  )}
                  {selectedOption?.value.startsWith("Keltner Channel") && (
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
                        {`Keltner Channel ${inputValuesKeltner.input1 || ""}` ||
                          "Select an option"}
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
                              fontFamily: "Barlow, san-serif",
                              color: "#FFFFFF",
                              fontSize: "13px",
                            }}
                          >
                            Length
                          </label>
                          <input
                            type="number"
                            name="input1"
                            value={inputValuesKeltner.input1 || ""}
                            onChange={handleInputChangeKeltner}
                            style={{
                              width: "65px",
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
                            Multiplier
                          </label>
                          <input
                            type="number"
                            name="input2"
                            value={inputValuesKeltner.input2 || ""}
                            onChange={handleInputChangeKeltner}
                            style={{
                              width: "65px",
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
                            Ma Type
                          </label>
                          <input
                            type="text"
                            name="input3"
                            value={inputValuesKeltner.input3 || ""}
                            onChange={handleInputChangeKeltner}
                            style={{
                              width: "65px",
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
                            ATR Length
                          </label>
                          <input
                            type="number"
                            name="input4"
                            value={inputValuesKeltner.input4 || ""}
                            onChange={handleInputChangeKeltner}
                            style={{
                              width: "65px",
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
                            Source
                          </label>
                          <input
                            type="text"
                            name="input5"
                            value={inputValuesKeltner.input5 || ""}
                            onChange={handleInputChangeKeltner}
                            style={{
                              width: "65px",
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
                    </>
                  )}
                  {selectedOption?.value.startsWith("Tom Demark") && (
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
                              fontFamily: "Barlow, san-serif",
                              color: "#FFFFFF",
                              fontSize: "13px",
                            }}
                          >
                            Type
                          </label>
                          <input
                            type="text"
                            name="tomDemarkValue"
                            value={inputValuesTom.tomDemarkValue || ""}
                            onChange={handleInputChangeTom}
                            style={{
                              width: "180px",
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
                        background: "linear-gradient(to right,#790F87,#794AE3)",
                        color: "#FFFFFF",
                        borderRadius: 1.5,
                        height: 22,
                        minWidth: 20,
                        fontFamily: "Barlow, san-serif",
                        textTransform: "none",
                      }}
                      onClick={() => handlePopoverSave(index, ParametersIndex)}
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

          {props.ParametersData[props.parameterIndex][ParametersIndex][
            Object.keys(ParameterItem)[0]
          ] === "Oscillator" && (
            <>
              <Box sx={{ marginBottom: 2 }}>
                <SelectInputParameters
                  value={
                    props.ParametersData[props.parameterIndex][ParametersIndex]
                      .middleOne
                  }
                  onChange={(selectedOption) => {
                    const temp = [...ParametersData];
                    temp[props.parameterIndex][ParametersIndex].middleOne =
                      selectedOption.value;
                    setParametersData(temp);
                  }}
                  options={parametersOneOscillatorOptions}
                  keyName={"middleOne"}
                  placeHolder={"Select"}
                  Width={"80%"}
                  margin={
                    props.width < 900 && props.width > 600
                      ? "35vw"
                      : props.width < 600 && props.width > 500
                      ? "33vw"
                      : props.width < 500
                      ? "28vw"
                      : 13.5
                  }
                />
              </Box>
            </>
          )}

          {props.ParametersData[props.parameterIndex][ParametersIndex][
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
                <SelectInputParameters
                  value={
                    props.ParametersData[props.parameterIndex][ParametersIndex]
                      .middleOne
                  }
                  onChange={(selectedOption) => {
                    const temp = [...ParametersData];
                    temp[props.parameterIndex][ParametersIndex].middleOne =
                      selectedOption.value;
                    setInputValuesHighCandle((prevInputValues) => ({
                      ...prevInputValues,
                      ["input1"]: selectedOption.value,
                    }));
                    setParametersData(temp);
                  }}
                  options={parametersOneHighVolumeCandlestickOptions}
                  keyName={"middleOne"}
                  placeHolder={"Select"}
                  Width={"80%"}
                  margin={
                    props.width < 900 && props.width > 600
                      ? "35vw"
                      : props.width < 600 && props.width > 500
                      ? "33vw"
                      : props.width < 500
                      ? "28vw"
                      : 13.5
                  }
                />
                {props.ParametersData[props.parameterIndex][ParametersIndex]
                  .middleOne && (
                  <Button
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
                            ParametersData[index][ParametersIndex].middleOne
                          }
                          onChange={handleInputChangeHighCandle}
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
                          value={inputValuesHighCandle.input2 || ""}
                          onChange={handleInputChangeHighCandle}
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
                          value={inputValuesHighCandle.input3 || ""}
                          onChange={handleInputChangeHighCandle}
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
                        background: "linear-gradient(to right,#790F87,#794AE3)",
                        color: "#FFFFFF",
                        borderRadius: 1.5,
                        height: 22,
                        minWidth: 20,
                        fontFamily: "Barlow, san-serif",
                        textTransform: "none",
                      }}
                      onClick={() =>
                        handleHighCandleStickPopoverSave(index, ParametersIndex)
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

          <SelectInputParameters
            value={
              props.ParametersData[props.parameterIndex][ParametersIndex]
                .operation
            }
            onChange={(selectedOption) => {
              const temp = [...props.ParametersData];
              temp[props.parameterIndex][ParametersIndex].operation =
                selectedOption.value;
              setParametersData(temp);
            }}
            options={
              props.ParametersData[props.parameterIndex][ParametersIndex][
                Object.keys(ParameterItem)[0]
              ] === "Price"
                ? priceParametersOperationsOptions
                : props.ParametersData[props.parameterIndex][ParametersIndex][
                    Object.keys(ParameterItem)[0]
                  ] === "High Volume Candlestick"
                ? highVolumeParametersOperationsOptions
                : parametersOperationsOptions
            }
            // options={parametersOperationsOptions}
            keyName={"operation"}
            placeHolder={"Operations"}
            Width={"50%"}
            margin={
              props.width < 900 && props.width > 600
                ? "35vw"
                : props.width < 600 && props.width > 500
                ? "33vw"
                : props.width < 500
                ? "28vw"
                : 13.5
            }
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: props.width < 900 ? 0 : 2,
              gap: props.width < 900 ? 0 : 2,
              flexWrap: props.width < 900 ? "wrap" : "nowrap",
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
                props.ParametersData[props.parameterIndex][ParametersIndex][
                  Object.keys(ParameterItem)[1]
                ]
              }
              onChange={(selectedOption) => {
                const temp = [...ParametersData];
                temp[props.parameterIndex][ParametersIndex][
                  Object.keys(ParameterItem)[1]
                ] = selectedOption.value;
                setParametersData(temp);
              }}
              options={[{ value: "Indicator", label: "Indicator" }]}
              keyName={"Parameter"}
            />
          </Box>
          {props.ParametersData[props.parameterIndex][ParametersIndex][
            Object.keys(ParameterItem)[1]
          ] === "Indicator" && (
            <>
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <SelectInputParameters
                  value={
                    props.ParametersData[props.parameterIndex][ParametersIndex]
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
                    props.ParametersData[props.parameterIndex][ParametersIndex][
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
                    props.width < 900 && props.width > 600
                      ? "35vw"
                      : props.width < 600 && props.width > 500
                      ? "33vw"
                      : props.width < 500
                      ? "28vw"
                      : 13.5
                  }
                />
                {props.ParametersData[props.parameterIndex][ParametersIndex]
                  .middleTwo && (
                  <Button
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
                  ) && (
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
                              fontFamily: "Barlow, san-serif",
                              color: "#FFFFFF",
                              fontSize: "13px",
                            }}
                          >
                            Length
                          </label>
                          <input
                            type="number"
                            name="input1"
                            value={inputValuesTwoSimple.input1 || ""}
                            onChange={handleInputChangeTwoSimple}
                            style={{
                              width: "65px",
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
                            Source
                          </label>
                          <input
                            type="text"
                            name="input2"
                            value={inputValuesTwoSimple.input2 || ""}
                            onChange={handleInputChangeTwoSimple}
                            style={{
                              width: "65px",
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
                            Offset
                          </label>
                          <input
                            type="number"
                            name="input3"
                            value={inputValuesTwoSimple.input3 || ""}
                            onChange={handleInputChangeTwoSimple}
                            style={{
                              width: "65px",
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
                    </>
                  )}
                  {selectedOptionTwo?.value.startsWith(
                    "Exponential Moving Average"
                  ) && (
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
                              fontFamily: "Barlow, san-serif",
                              color: "#FFFFFF",
                              fontSize: "13px",
                            }}
                          >
                            Length
                          </label>
                          <input
                            type="number"
                            name="input1"
                            value={inputValuesTwoExponential.input1 || ""}
                            onChange={handleInputChangeTwoExponential}
                            style={{
                              width: "65px",
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
                            Source
                          </label>
                          <input
                            type="text"
                            name="input2"
                            value={inputValuesTwoExponential.input2 || ""}
                            onChange={handleInputChangeTwoExponential}
                            style={{
                              width: "65px",
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
                            Offset
                          </label>
                          <input
                            type="number"
                            name="input3"
                            value={inputValuesTwoExponential.input3 || ""}
                            onChange={handleInputChangeTwoExponential}
                            style={{
                              width: "65px",
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
                    </>
                  )}
                  {selectedOptionTwo?.value.startsWith("Keltner Channel") && (
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
                              fontFamily: "Barlow, san-serif",
                              color: "#FFFFFF",
                              fontSize: "13px",
                            }}
                          >
                            Length
                          </label>
                          <input
                            type="number"
                            name="input1"
                            value={inputValuesTwoKeltner.input1 || ""}
                            onChange={handleInputChangeTwoKeltner}
                            style={{
                              width: "65px",
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
                            Multiplier
                          </label>
                          <input
                            type="number"
                            name="input2"
                            value={inputValuesTwoKeltner.input2 || ""}
                            onChange={handleInputChangeTwoKeltner}
                            style={{
                              width: "65px",
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
                            Ma Type
                          </label>
                          <input
                            type="text"
                            name="input3"
                            value={inputValuesTwoKeltner.input3 || ""}
                            onChange={handleInputChangeTwoKeltner}
                            style={{
                              width: "65px",
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
                            ATR Length
                          </label>
                          <input
                            type="number"
                            name="input4"
                            value={inputValuesTwoKeltner.input4 || ""}
                            onChange={handleInputChangeTwoKeltner}
                            style={{
                              width: "65px",
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
                            Source
                          </label>
                          <input
                            type="text"
                            name="input5"
                            value={inputValuesTwoKeltner.input5 || ""}
                            onChange={handleInputChangeTwoKeltner}
                            style={{
                              width: "65px",
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
                    </>
                  )}
                  {selectedOptionTwo?.value.startsWith("Tom Demark") && (
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
                              fontFamily: "Barlow, san-serif",
                              color: "#FFFFFF",
                              fontSize: "13px",
                            }}
                          >
                            Type
                          </label>
                          <input
                            type="text"
                            name="tomDemarkValue"
                            value={inputValuesTwoTom.tomDemarkValue || ""}
                            onChange={handleInputChangeTwoTom}
                            style={{
                              width: "180px",
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
                    </>
                  )}
                  {selectedOptionTwo?.value.startsWith("Value") && (
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
                              fontFamily: "Barlow, san-serif",
                              color: "#FFFFFF",
                              fontSize: "13px",
                            }}
                          >
                            Value
                          </label>
                          <input
                            type="number"
                            name="input1"
                            value={inputValuesTwoValue.input1 || ""}
                            onChange={handleInputChangeTwoValue}
                            style={{
                              width: "180px",
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
                    </>
                  )}

                  {selectedOptionTwo?.value.startsWith("Price") && (
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
                              fontFamily: "Barlow, san-serif",
                              color: "#FFFFFF",
                              fontSize: "13px",
                            }}
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            name="input1"
                            value={inputValuesTwoPrice.input1 || ""}
                            onChange={handleInputChangeTwoPrice}
                            style={{
                              width: "180px",
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
                        background: "linear-gradient(to right,#790F87,#794AE3)",
                        color: "#FFFFFF",
                        borderRadius: 1.5,
                        height: 22,
                        minWidth: 20,
                        fontFamily: "Barlow, san-serif",
                        textTransform: "none",
                      }}
                      onClick={() =>
                        handlePopoverSaveTwo(index, ParametersIndex)
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
                  background: "linear-gradient(to right,#790F87,#794AE3)",
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
  );
};

export default StrategyParameters;
