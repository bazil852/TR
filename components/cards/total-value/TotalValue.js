import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const TotalValue = (props) => {
  const data = [
    { time: "Last 24 Hours", points: "2.49" },
    { time: "Last 7 Days", points: "2.49" },
    { time: "Last 30 Days", points: "-1.76" },
  ];

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", gap: "1.3rem", rowGap: "0px" }}
    >
      <Card
        sx={{
          background: "#19191985",
          height: "80px",
          width: "180px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: "1rem",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography style={{ fontWeight: 600, fontSize: "16px" }}>
            Total Value
          </Typography>
          <Typography style={{ color: "#00DE5F", fontSize: "16px" }}>
            USD ${props?.totalValue.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
      {data.map((item, index) => {
        return (
          <Card
            key={index}
            sx={{
              background: "#19191985",
              height: "80px",
              width: "180px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: "1rem",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography style={{ fontWeight: 600, fontSize: "14px" }}>
                {item.time}
              </Typography>
              <Typography
                style={{
                  color: item.points < 0 ? "red" : "#00DE5F",
                  fontSize: "14px",
                }}
              >
                {item.points < 0 ? "" : "+"}
                {item.points}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default TotalValue;
