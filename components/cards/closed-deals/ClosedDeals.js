import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { YellowHandShakeBig } from "../../../utils/icons";
import { useSelector } from "react-redux";

const ClosedDeals = () => {
  const widthAbove1600 = useSelector((state) => state.dashboardWidth.value);
  return (
    <Card
      sx={{
        minWidth: 200,
        minHeight: widthAbove1600 < 1600 ? 340 : 357,
        maxHeight: widthAbove1600 < 1600 ? "auto" : 357,
        background: "#2D1537",
        borderRadius: "8px",
      }}
    >
      <CardContent sx={{ pl: 4 }}>
        <Stack alignItems="center" direction="row" spacing={3}>
          <div
            style={{
              backgroundColor: "#482255",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <YellowHandShakeBig />
          </div>
          <Stack spacing={1}>
            <Typography color="#CCCCCC">Closed Deals</Typography>
            <Typography fontSize="24px" fontWeight="600" color="#CCCCCC">
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
