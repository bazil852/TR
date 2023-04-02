import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { TotalProfitYellow } from "../../../utils/icons";

const TotalProfit = () => {
  return (
    <Card
      sx={{
        minWidth: 400,
        background: "#191919",
        border: "1px solid #666666",
        minHeight: 400,
      }}
    >
      <CardContent>
        <Stack alignItems="center" direction="row" spacing={3}>
          <div
            style={{
              backgroundColor: "#2C2C2C",
              padding: "15px",
            }}
          >
            <TotalProfitYellow />
          </div>
          <Stack spacing={1}>
            <Typography>Total Profit</Typography>
            <Typography fontSize="24px" color="#4BD569">
              +22 263.08 $
            </Typography>
          </Stack>
        </Stack>
        <Grid
          mt={2}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <Typography>Today Profit :</Typography>
              <Typography color="#4BD569">00.27 $</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <Typography>Average Profit By Day :</Typography>
              <Typography color="#4BD569">00.27 $</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <Typography>Yesterday Profit :</Typography>
              <Typography color="#4BD569">00.27 $</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <Typography>Average Profit By Week :</Typography>
              <Typography color="#4BD569">00.27 $</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <Typography>This Week Profit :</Typography>
              <Typography color="#4BD569">00.27 $</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <Typography>Average Profit By Month :</Typography>
              <Typography color="#4BD569">00.27 $</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <Typography>This Month Profit :</Typography>
              <Typography color="#4BD569">00.27 $</Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalProfit;
