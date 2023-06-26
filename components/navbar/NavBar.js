import React from "react";
import { Box } from "@mui/material";
import CryptoRates from "../cards/crypto-rates/CryptoRates";
import NavBarListItems from "./NavBarListItems";

const NavBar = () => {
  return (
    <Box
      sx={{
        background: "rgba(0,0,0,0.8)",
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
      <Box>
        <NavBarListItems />
      </Box>
    </Box>
  );
};

export default NavBar;
