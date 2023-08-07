import { Box, Typography } from "@mui/material";
import React from "react";

const TradesDetails = () => {
  const TradesData = [
    {
      IDs: ["123456789"],
      Sides: ["Buy"],
      OrderSizes: ["Base Order"],
      Statuses: ["Filled"],
      Rates: ["Rate"],
      Amounts: ["Amount"],
      Volumes: ["Volume"],
      Created: ["Created"],
      Updated: ["Updated"],
    },
  ];
  return (
    <Box
      sx={{
        background: "#262626",
        border: "1.2px solid #3F4341",
        borderRadius: "4.8px",
        py: 1,
        px: 2,
        minHeight: 180,
        mt: 2.8,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Barlow, san-serif",
          fontSize: 20,
          fontWeight: 600,
          mb: 2,
        }}
      >
        TRADES
      </Typography>

      {TradesData.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
            gap: "1rem",
            pb: 1,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              ID
            </Typography>

            {item.IDs.map((ID, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 15,
                }}
              >
                {ID}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Side
            </Typography>
            {item.Sides.map((Side, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 15,
                }}
              >
                {Side}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Order Size
            </Typography>
            {item.OrderSizes.map((OrderSize, idx) => (
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 15,
                }}
              >
                {OrderSize}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Status
            </Typography>
            {item.Statuses.map((Status, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 15,
                }}
              >
                {Status}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Rate
            </Typography>

            {item.Rates.map((Rate, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 15,
                }}
              >
                {Rate}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Amount
            </Typography>

            {item.Amounts.map((Amount, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 15,
                }}
              >
                {Amount}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Volume
            </Typography>
            {item.Volumes.map((Volume, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 15,
                }}
              >
                {Volume}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Created
            </Typography>

            {item.Created.map((CreatedValue, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 15,
                }}
              >
                {CreatedValue}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Updated
            </Typography>
            {item.Updated.map((UpdatedValue, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 15,
                }}
              >
                {UpdatedValue}
              </Typography>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TradesDetails;
