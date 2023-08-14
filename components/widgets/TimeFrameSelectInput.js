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
              backgroundColor: "#3E3E3E",
              mt: 0.5,
              overflow: "overlay",
              "& .MuiMenuItem-root": {
                color: "white",
                "&:hover": {
                  backgroundColor: "#3E3E3E",
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
          height: 32,
          borderRadius: "4px",
          color: "white",
          fontFamily: "Barlow, san-serif",
          backgroundColor: "#3E3E3E",
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
        }}
      >
        <ListSubheader
          sx={{
            color: "#929292",
            background: "#131313",
            fontWeight: 800,
            fontFamily: "Barlow, san-serif",
          }}
        >
          SECONDS
        </ListSubheader>
        <MenuItem value={"1s"} sx={{ fontFamily: "Barlow, san-serif" }}>
          1 second
        </MenuItem>
        <MenuItem value={"5s"} sx={{ fontFamily: "Barlow, san-serif" }}>
          5 seconds
        </MenuItem>
        <MenuItem value={"10s"} sx={{ fontFamily: "Barlow, san-serif" }}>
          10 seconds
        </MenuItem>
        <MenuItem value={"15s"} sx={{ fontFamily: "Barlow, san-serif" }}>
          15 seconds
        </MenuItem>
        <MenuItem value={"30s"} sx={{ fontFamily: "Barlow, san-serif" }}>
          30 seconds
        </MenuItem>
        <ListSubheader
          sx={{
            color: "#929292",
            background: "#131313",
            fontWeight: 800,
            fontFamily: "Barlow, san-serif",
          }}
        >
          MINUTES
        </ListSubheader>
        <MenuItem value={"1m"} sx={{ fontFamily: "Barlow, san-serif" }}>
          1 minute
        </MenuItem>
        <MenuItem value={"2m"} sx={{ fontFamily: "Barlow, san-serif" }}>
          2 minutes
        </MenuItem>
        <MenuItem value={"3m"} sx={{ fontFamily: "Barlow, san-serif" }}>
          3 minutes
        </MenuItem>
        <MenuItem value={"5m"} sx={{ fontFamily: "Barlow, san-serif" }}>
          5 minutes
        </MenuItem>
        <MenuItem value={"15m"} sx={{ fontFamily: "Barlow, san-serif" }}>
          15 minutes
        </MenuItem>
        <MenuItem value={"24m"} sx={{ fontFamily: "Barlow, san-serif" }}>
          24 minutes
        </MenuItem>
        <MenuItem value={"30m"} sx={{ fontFamily: "Barlow, san-serif" }}>
          30 minutes
        </MenuItem>
        <MenuItem value={"45m"} sx={{ fontFamily: "Barlow, san-serif" }}>
          45 minutes
        </MenuItem>
        <MenuItem value={"90m"} sx={{ fontFamily: "Barlow, san-serif" }}>
          90 minutes
        </MenuItem>
        <MenuItem value={"100m"} sx={{ fontFamily: "Barlow, san-serif" }}>
          100 minutes
        </MenuItem>
        <ListSubheader
          sx={{
            color: "#929292",
            background: "#131313",
            fontWeight: 800,
            fontFamily: "Barlow, san-serif",
          }}
        >
          HOURS
        </ListSubheader>
        <MenuItem value={"1h"} sx={{ fontFamily: "Barlow, san-serif" }}>
          1 hour
        </MenuItem>
        <MenuItem value={"2h"} sx={{ fontFamily: "Barlow, san-serif" }}>
          2 hours
        </MenuItem>
        <MenuItem value={"3h"} sx={{ fontFamily: "Barlow, san-serif" }}>
          3 hours
        </MenuItem>
        <MenuItem value={"4h"} sx={{ fontFamily: "Barlow, san-serif" }}>
          4 hours
        </MenuItem>
        <MenuItem value={"5h"} sx={{ fontFamily: "Barlow, san-serif" }}>
          5 hours
        </MenuItem>
        <MenuItem value={"8h"} sx={{ fontFamily: "Barlow, san-serif" }}>
          8 hours
        </MenuItem>
        <MenuItem value={"12h"} sx={{ fontFamily: "Barlow, san-serif" }}>
          12 hours
        </MenuItem>
        <MenuItem value={"20h"} sx={{ fontFamily: "Barlow, san-serif" }}>
          20 hours
        </MenuItem>
        <MenuItem value={"21h"} sx={{ fontFamily: "Barlow, san-serif" }}>
          21 hours
        </MenuItem>
        <MenuItem value={"22h"} sx={{ fontFamily: "Barlow, san-serif" }}>
          22 hours
        </MenuItem>
        <ListSubheader
          sx={{
            color: "#929292",
            background: "#131313",
            fontWeight: 800,
            fontFamily: "Barlow, san-serif",
          }}
        >
          DAYS
        </ListSubheader>
        <MenuItem value={"1d"} sx={{ fontFamily: "Barlow, san-serif" }}>
          1 day
        </MenuItem>
        <MenuItem value={"2d"} sx={{ fontFamily: "Barlow, san-serif" }}>
          2 days
        </MenuItem>
      </Select>
    </>
  );
};

export default TimeFrameSelectInput;
