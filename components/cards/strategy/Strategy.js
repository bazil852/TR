import React, { useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signIn, getSession } from "next-auth/react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import SelectInput from "../../widgets/SelectInput";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    // borderRadius: 4,
    height: 27,
    position: "relative",
    backgroundColor: "#292929",
    // border: "1px solid #ced4da",
    fontSize: 16,
    color: "#CCCCCC",
    padding: "10px 12px",
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Strategy = (props) => {
  const names = ["Long", "Short"];
  const listOfPairs = ["BTC", "ETH", "DOGE", "SOL"];

  return (
    <Container
      sx={{
        background: "#191919",
        borderRadius: 1,
        p: 3,
        border: "1px solid #666666",
        marginBottom: 5,
      }}
      component="main"
      maxWidth="100%"
    >
      <Box>
        <Typography sx={{ mt: 1 }} color="white" component="h1" variant="h5">
          Strategy
        </Typography>
      </Box>
      <Divider sx={{ marginTop: 1, background: "#7A8580" }} />
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 10, md: 16 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Typography
              sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
              color="#CCCCCC"
            >
              Strategy Type
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <SelectInput
                placeHolder={"Strategy Type"}
                options={names}
                width={365}
                keyName={"strategyType"}
                onChange={async (event) => {
                  props.setType(event.target.value);
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={7}>
            <Typography
              sx={{ marginBottom: 1, mt: 2, fontSize: 16 }}
              color="#CCCCCC"
            >
              Pairs
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Autocomplete
                id="pairs"
                freeSolo
                options={listOfPairs}
                disableClearable
                fullWidth
                renderInput={(params) => {
                  const { InputLabelProps, InputProps, ...rest } = params;
                  return (
                    <ValidationTextField
                      margin="normal"
                      required
                      fullWidth
                      {...params.InputProps}
                      {...rest}
                    />
                  );
                }}
                onSelect={async (event) => {
                  props.setPair(event.target.value);
                }}
              />
              {/* <ValidationTextField
                margin="normal"
                required
                fullWidth
                id="pairs"
                name="pairs"
              /> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Strategy;
