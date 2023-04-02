import React, { useState }  from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { TextField, IconButton, InputBase, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  input: {
    width: "435px",
    height: "48px",
    backgroundColor: "#292929",
    padding: '10px 12px',
    fontSize: 16
  },
}));

const SearchBar = (props) => {
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState('');

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  }
  return (
    <InputBase
      placeholder="Search…"
      value={searchValue}
      onChange={handleSearch}
      startAdornment={
        <InputAdornment position="start">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
      classes={{
        root: classes.input
      }}
    />
  );
};

export default SearchBar;
