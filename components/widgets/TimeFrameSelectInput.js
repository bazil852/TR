import React from "react";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { GlobalStyles } from "@mui/material";
const TimeFrameSelectInput = (props) => {
  return (
    <>
      <GlobalStyles
        styles={{
          "*::-webkit-scrollbar": {
            width: "5px",
          },
          "*::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "2px",
            zIndex: 100,
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
        }}
      />
      <Select
        id={props.keyName}
        name={props.keyName}
        onChange={props.onChange}
        input={<OutlinedInput />}
        value={props.value}
        disabled={props.disabled}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "#452951",
              mt: 0.5,
              overflow: "overlay",
              "& .MuiMenuItem-root": {
                color: "white",
                "&:hover": {
                  backgroundColor: "#4E2C60",
                },
              },
              "& .Mui-selected": {
                opacity: 0.4,
                backgroundColor: "transparent",
              },
              "& .MuiList-root": {
                paddingTop: 0,
                paddingBottom: 0,
              },
              "& .MuiMenu-paper": {
                marginTop: "8px",
              },
              "& .MuiListItem-root": {
                paddingTop: "10px",
                paddingBottom: "10px",
                "&:hover": {
                  backgroundColor: "none",
                },
              },
            },
          },
        }}
        sx={{
          "& .MuiSelect-select .notranslate::after": `${props.placeHolder}`
            ? {
                content: `"${props.placeHolder}"`,
                opacity: 0.42,
              }
            : {},
          minWidth: "100%",
          height: 37,
          borderRadius: "8px",
          color: "white",
          backgroundColor: "#452951",
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
        }}
      >
        <ListSubheader
          sx={{ color: "#929292", background: "#452951", fontWeight: 800 }}
        >
          SECONDS
        </ListSubheader>
        <MenuItem value={"1s"}>1 second</MenuItem>
        <MenuItem value={"5s"}>5 seconds</MenuItem>
        <MenuItem value={"10s"}>10 seconds</MenuItem>
        <MenuItem value={"15s"}>15 seconds</MenuItem>
        <MenuItem value={"30s"}>30 seconds</MenuItem>
        <ListSubheader
          sx={{ color: "#929292", background: "#452951", fontWeight: 800 }}
        >
          MINUTES
        </ListSubheader>
        <MenuItem value={"1m"}>1 minute</MenuItem>
        <MenuItem value={"2m"}>2 minutes</MenuItem>
        <MenuItem value={"3m"}>3 minutes</MenuItem>
        <MenuItem value={"5m"}>5 minutes</MenuItem>
        <MenuItem value={"15m"}>15 minutes</MenuItem>
        <MenuItem value={"24m"}>24 minutes</MenuItem>
        <MenuItem value={"30m"}>30 minutes</MenuItem>
        <MenuItem value={"45m"}>45 minutes</MenuItem>
        <MenuItem value={"90m"}>90 minutes</MenuItem>
        <MenuItem value={"100m"}>100 minutes</MenuItem>
        <ListSubheader
          sx={{ color: "#929292", background: "#452951", fontWeight: 800 }}
        >
          HOURS
        </ListSubheader>
        <MenuItem value={"1h"}>1 hour</MenuItem>
        <MenuItem value={"2h"}>2 hours</MenuItem>
        <MenuItem value={"3h"}>3 hours</MenuItem>
        <MenuItem value={"4h"}>4 hours</MenuItem>
        <MenuItem value={"5h"}>5 hours</MenuItem>
        <MenuItem value={"8h"}>8 hours</MenuItem>
        <MenuItem value={"12h"}>12 hours</MenuItem>
        <MenuItem value={"20h"}>20 hours</MenuItem>
        <MenuItem value={"21h"}>21 hours</MenuItem>
        <MenuItem value={"22h"}>22 hours</MenuItem>
        <ListSubheader
          sx={{ color: "#929292", background: "#452951", fontWeight: 800 }}
        >
          DAYS
        </ListSubheader>
        <MenuItem value={"1d"}>1 day</MenuItem>
        <MenuItem value={"2d"}>2 days</MenuItem>
      </Select>
    </>
  );
};

export default TimeFrameSelectInput;
