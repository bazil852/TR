import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

const ActiveTrades = ({ data }) => {
  return data.map((item) => (
    <Card
      sx={{
        minHeight: "100%",
        minWidth: "100%",
        background: "#262626",
        border: "1.2px solid #3F4341",
        borderRadius: "4.8px",
        py: 0.5,
        position: "relative",
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
            }}
          >
            {item.totalTrades}
          </Typography>

          <Typography
            sx={{
              color: "#ADB5BD",
              fontSize: 11,
              fontWeight: 400,
              fontFamily: "Barlow, san-serif",
              height: 10,
            }}
          >
            Last Trades
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
                width: 35,
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
                {item.buy}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "#ADB5BD",
                fontSize: 11,
                fontFamily: "Barlow, sans-serif",
                fontWeight: 400,
              }}
            >
              {item.buyDetail}
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
                background: "#5F3031",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
                minWidth: 35,
                height: 18,
              }}
            >
              <Typography
                sx={{
                  color: "#E24648",
                  fontSize: 12,
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 500,
                }}
              >
                {item.sell}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "#ADB5BD",
                fontSize: 11,
                fontFamily: "Barlow, sans-serif",
                fontWeight: 400,
              }}
            >
              {item.sellDetail}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  ));
};

export default ActiveTrades;
