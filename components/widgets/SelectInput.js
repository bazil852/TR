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
      sx={{
        "& .MuiSelect-select .notranslate::after": `${props.placeHolder}`
          ? {
              content: `"${props.placeHolder}"`,
              opacity: 0.42,
            }
          : {},
        width: props.width,
        // width: 250,
        height: 48,
        borderRadius: 0,
        color: "white",
        backgroundColor: "#292929",
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
      }}
    >
      <MenuItem disabled value="">
        <em>{props.placeHolder}</em>
      </MenuItem>
      {props.options.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectInput;
