import * as React from "react";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box>
      <MuiAppBar
        position="fixed"
        sx={{
          color: "white",
          background: "rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "1px 1px 20px rgba(255,255,255,0.15)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            sx={{
              textTransform: "none",
              border: "none",
              background: "none",
              display: "flex",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                color: "white",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Why Candle Riderz
            </Typography>
            <Box
              sx={{ background: "white", height: 5, width: 8, marginTop: 1 }}
            ></Box>
          </Button>
          <Button
            sx={{
              textTransform: "none",
              border: "none",
              background: "none",
              display: "flex",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                color: "white",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Solutions
            </Typography>
            <Box
              sx={{ background: "white", height: 5, width: 8, marginTop: 1 }}
            ></Box>
          </Button>
          <Button
            sx={{
              textTransform: "none",
              border: "none",
              background: "none",
              display: "flex",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                color: "white",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Pricing
            </Typography>
          </Button>
          <Button
            sx={{
              textTransform: "none",
              border: "none",
              background: "none",
              display: "flex",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                color: "white",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Learn
            </Typography>
            <Box
              sx={{ background: "white", height: 5, width: 8, marginTop: 1 }}
            ></Box>
          </Button>
          <Button
            sx={{
              textTransform: "none",
              border: "none",
              background: "none",
              display: "flex",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                color: "white",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Company
            </Typography>
          </Button>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
