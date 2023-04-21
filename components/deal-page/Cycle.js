import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Box, Card } from "@mui/material";

const Cycle = ({ title }) => {
  return (
    <Grid item lg={5.9} md={5.9} sx={{ mb: 2, mx: 0.5 }}>
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "24px",
          mt: 4,
          mb: 2,
          ml: 1,
        }}
      >
        {title}
      </Typography>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: "linear-gradient(#3C1D47,#331B36)",
          borderRadius: "8px",
          p: 2,
          gap: 1,
          maxHeight: "600px",
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <Box>
              <Typography
                sx={{
                  p: 2,
                  fontWeight: 600,
                }}
              >
                Order
              </Typography>
              <Typography sx={{ py: 0.5, ml: 0.5 }}>
                Order Size 200 Multiplier 10%
              </Typography>
              <Typography
                sx={{
                  p: 1,
                  mb: 1,
                  fontSize: "14px",
                  background: "#422348",
                  borderRadius: "8px",
                }}
              >
                Red or Purpel Vector Candles
              </Typography>
              <Typography sx={{ py: 0.5, ml: 0.5 }}>Take Profit</Typography>
              <Typography
                sx={{
                  p: 1,
                  mb: 1,
                  fontSize: "14px",
                  background: "#422348",
                  borderRadius: "8px",
                }}
              >
                Dynamic 50 Ema 15 min
              </Typography>
              <Typography sx={{ py: 0.5, ml: 0.5 }}>Stop Loss</Typography>
              <Typography
                sx={{
                  p: 1,
                  mb: 1,
                  fontSize: "14px",
                  background: "#422348",
                  borderRadius: "8px",
                }}
              >
                Trend Identification
              </Typography>
              <Typography
                sx={{
                  p: 1,
                  mb: 1,
                  fontSize: "14px",
                  background: "#422348",
                  borderRadius: "8px",
                }}
              >
                Buy only every 2 Tiggers
              </Typography>
              <Typography
                sx={{
                  p: 1,
                  mb: 1,
                  fontSize: "14px",
                  background: "#422348",
                  borderRadius: "8px",
                }}
              >
                Buy Only Below Average Deal Price By 1 %
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} sx={{ pl: 1 }}>
            <Box>
              <Typography
                sx={{
                  p: 2,
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                Tigger Conditions
              </Typography>
              <Typography sx={{ py: 0.5, ml: 0.5 }}>
                Order type Limit
              </Typography>
              <Typography
                sx={{
                  p: 1,
                  mb: 1,
                  fontSize: "14px",
                  background: "#422348",
                  borderRadius: "5px",
                }}
              >
                vector Candel Blew ema 50, 15 min
              </Typography>
              <Typography sx={{ py: 0.5, ml: 0.5 }}>Profit Currency</Typography>
              <Typography
                sx={{
                  p: 1,
                  mb: 1,
                  fontSize: "14px",
                  background: "#422348",
                  borderRadius: "5px",
                }}
              >
                Ma Distance 1%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Cycle;
