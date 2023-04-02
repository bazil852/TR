import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function DateInfoCard({ date, profit }) {
  return (
    <Card sx={{ width: "80px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
          {date}
        </Typography>
        {profit >= 0 ? (
          <Typography color="#4BD569">+{profit}</Typography>
        ) : (
          <Typography color="#EB5757">-{profit}</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default DateInfoCard;
