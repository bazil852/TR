import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { HandShakeIcon } from "../../../utils/icons";

const ClosedDeals = () => {
  return (
    <Card
      sx={{
        minWidth: 200,
        minHeight: 400,
        background: "#191919",
        border: "1px solid #666666",
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
            <HandShakeIcon />
          </div>
          <Stack spacing={1}>
            <Typography color="#CCCCCC">Closed Deals</Typography>
            <Typography fontSize="24px" color="#CCCCCC">
              1266
            </Typography>
          </Stack>
        </Stack>
        <Typography mt={3} color="#CCCCCC">
          Active Deals: 9
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ClosedDeals;
