import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { RateReviewOutlined } from "@mui/icons-material";

const CryptoCard = ({ title, rate, percentage }) => {
  return (
    <Card
      sx={{ minWidth: 100 }}
      style={{ background: "#19191985", borderRadius: "8px", opacity: "0.8" }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
          {title}
        </Typography>

        <Typography color="white" fontSize={14}>
          ${rate}
        </Typography>
        <Typography
          color={percentage >= 0 ? "#4BD569" : "#EB5757"}
          fontSize={14}
          pt={0.5}
        >
          {percentage}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CryptoCard;
