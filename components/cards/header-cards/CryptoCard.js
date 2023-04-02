import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { RateReviewOutlined } from "@mui/icons-material";

const CryptoCard = ({ title, rate, percentage }) => {
  return (
    <Card sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Typography color="white">${rate}</Typography>
        <Typography color={percentage >= 0 ? "#4BD569" : "#EB5757"}>
          {percentage}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CryptoCard;
