import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

const SelectInput = (props) => {
  return (
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
            backgroundColor: "#000000",
            mt: 0.5,
            "& .MuiMenuItem-root": {
              color: "white",
              "&:hover": {
                backgroundColor: "#000000",
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
        color: "white",
        backgroundColor: "#292929",
        fontFamily: "Barlow,san-serif",
        border: "1px solid #B3B4B9",
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": {
          border: 0,
        },
      }}
    >
      {props.options.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectInput;
