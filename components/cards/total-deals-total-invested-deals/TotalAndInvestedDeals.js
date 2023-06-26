import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const formatValue = (number) => {
  return number >= 10000 ? `${(number / 1000).toFixed(1)}k` : number.toFixed(0);
};

const TotalAndInvestedDeals = ({ data }) => {
  return data.map((item) => (
    <Card
      sx={{
        background: "#383B3B",
        minHeight: 125,
        minWidth: "100%",
        border: "1px solid #3F4341",
        borderRadius: 1,
        py: 0.5,
      }}
    >
      <CardContent
        sx={{
          px: 1,
          py: 0,
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            left: 15,
          }}
        >
          <Typography
            sx={{
              color: "#90969D",
              fontSize: 14,
              fontFamily: "Barlow, sans-serif",
              fontWeight: 300,
            }}
          >
            {item.name}
          </Typography>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: 20,
              fontFamily: "Barlow, sans-serif",
              fontWeight: 500,
              mt: 1,
            }}
          >
            ${formatValue(item.total)}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              mt: 1,
              mb: -0.5,
            }}
          >
            <Box
              sx={{
                background: item.lastWeek < 0 ? "#7f1010" : "#264639",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
                minWidth: 50,
                height: 20,
              }}
            >
              <Typography
                sx={{
                  color: item.lastWeek < 0 ? "#ff0000" : "#27966A",
                  fontSize: 12,
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 500,
                }}
              >
                {item.lastWeek < 0 ? "-" : ""}$
                {formatValue(Math.abs(item.lastWeek))}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "#90969D",
                fontSize: 13.1,
                fontFamily: "Barlow, sans-serif",
                fontWeight: 400,
              }}
            >
              Since last week
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              mt: 1,
              mb: -2,
            }}
          >
            <Box
              sx={{
                background: item.lastMonth < 0 ? "#7f1010" : "#264639",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
                minWidth: 50,
                height: 20,
              }}
            >
              <Typography
                sx={{
                  color: item.lastMonth < 0 ? "#ff0000" : "#27966A",
                  fontSize: 12,
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 500,
                }}
              >
                {item.lastMonth < 0 ? "-" : ""}$
                {formatValue(Math.abs(item.lastMonth))}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "#90969D",
                fontSize: 13.1,
                fontFamily: "Barlow, sans-serif",
                fontWeight: 400,
              }}
            >
              Since last month
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  ));
};

export default TotalAndInvestedDeals;
