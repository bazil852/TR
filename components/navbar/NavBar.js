import React from "react";
import { Box } from "@mui/material";
import CryptoRates from "../cards/crypto-rates/CryptoRates";
import NavBarListItems from "./NavBarListItems";

const NavBar = () => {
  return (
    <Box
      sx={{
        background: "#0B0D0D",
        minWidth: "100%",
        position: "absolute",
        top: 0,
        height: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CryptoRates />
      <Box sx={{ float: "right" }}>
        <NavBarListItems />
      </Box>
    </Box>
  );
};

export default NavBar;
