import React, { useState } from "react";
import { Box, Slider, Typography } from "@mui/material";

const LeverageSlider = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [inputValue, setInputValue] = useState(sliderValue.toString());

  const handleSliderChange = (event, newValue) => {
    if (newValue % 10 <= 2 || newValue % 10 >= 8) {
      newValue = Math.round(newValue / 10) * 10;
    }
    setSliderValue(newValue);
    setInputValue(newValue.toString());
  };

  const handleMouseUp = (event) => {
    let newValue = sliderValue;
    if (newValue % 10 <= 2 || newValue % 10 >= 8) {
      newValue = Math.round(newValue / 10) * 10;
      setSliderValue(newValue);
      setInputValue(newValue.toString());
    }
  };

  const handleInputChange = (event) => {
    const value = Number(event.target.value);
    setInputValue(event.target.value);

    if (value >= 1 && value <= backendValues[backendValues.length - 1]) {
      setSliderValue(value);
    }
  };

  const backendValues = [1, 10, 20, 30, 40, 50, 60];
  const marks = backendValues.map((val, index) => ({
    value: val,
    label: index % 2 === 0 ? val.toString().padStart(2, "0") : "",
  }));

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        sx={{
          fontFamily: "Barlow, san-serif",
          color: "white",
          fontWeight: 500,
          fontSize: 16,
        }}
      >
        Select Leverage
      </Typography>
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        onMouseUp={handleMouseUp}
        step={1}
        marks={marks}
        min={1}
        max={backendValues[backendValues.length - 1]}
        sx={{
          width: "100%",
          "& .MuiSlider-thumb": {
            width: 15,
            height: 15,
            backgroundColor: "white",
            "&:hover, &.Mui-focusVisible": {
              border: "2px solid #4B8BFF",
              boxShadow: "inherit",
            },
          },
          "& .MuiSlider-rail": {
            background: "#505967",
            height: 5,
          },
          "& .MuiSlider-track": {
            height: 5,
            backgroundImage: "linear-gradient( to right,#7958FA, #791189)",
            border: "none",
          },
          "& .MuiSlider-mark": {
            backgroundColor: "#505967",
            height: 6,
            width: 1.5,
            top: 32,
          },
          "& .MuiSlider-markLabel": {
            top: 40,
            fontFamily: "Barlow,san-serif",
            color: "#505967",
            fontSize: 14,
            fontWeight: 500,
          },
          "& .MuiSlider-valueLabel": {
            background: "none",
            fontFamily: "Barlow, sans-serif",
            color: "white",
            fontWeight: 600,
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "0.5rem",
        }}
      >
        <input
          id="leverageInput"
          value={inputValue}
          onChange={handleInputChange}
          type="number"
          min={1}
          max={backendValues[backendValues.length - 1]}
          style={{
            fontFamily: "Barlow, san-serif",
            color: "white",
            fontWeight: "500",
            fontSize: "16px",
            minWidth: "10px",
            border: "none",
            background: "none",
            textAlign: "center",
          }}
        />
        <Box
          sx={{
            fontFamily: "Barlow, san-serif",
            color: "white",
            fontWeight: 500,
            fontSize: 16,
          }}
        >
          X
        </Box>
      </Box>
    </Box>
  );
};

export default LeverageSlider;
