import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

const CloseTrades = ({ data }) => {
  return data.map((item) => (
    <Card
      sx={{
        background: "#262626",
        minHeight: "100%",
        minWidth: "100%",
        border: "1.2px solid #3F4341",
        borderRadius: "4.8px",
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
        <Button
          sx={{
            position: "absolute",
            right: 5,
            top: 3,
            borderRadius: "50%",
            background: "#3B3B3B",
            border: "1px solid #5C5A66",
            height: 17,
            minWidth: 9,
            fontWeight: 600,
            color: "#AFAFAF",
            fontSize: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "none",
          }}
        >
          i
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
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
            {item.totalTrades}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              mt: 2,
              mb: -0.5,
            }}
          >
            <Box
              sx={{
                background: "#264639",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
                minWidth: 20,
                height: 18,
              }}
            >
              <Typography
                sx={{
                  color: "#27966A",
                  fontSize: 12,
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 500,
                }}
              >
                {item.lastWeek}
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
              Last week
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              mt: 1,
              mb: -2.5,
            }}
          >
            <Box
              sx={{
                background: "#264639",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
                minWidth: 20,
                height: 18,
              }}
            >
              <Typography
                sx={{
                  color: "#27966A",
                  fontSize: 12,
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 500,
                }}
              >
                {item.lastMonth}
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
              Last month
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  ));
};
export default CloseTrades;
