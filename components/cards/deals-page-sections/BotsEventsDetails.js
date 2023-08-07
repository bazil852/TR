import React from "react";
import { Box, Typography } from "@mui/material";

const BotsEventsDetails = () => {
  const BotEventsData = [
    {
      Dates: ["123456789"],
      EventTypes: ["Buy"],
      Messages: ["Base Order"],
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
        mt: "20px",
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
        BOT EVENTS
      </Typography>

      {BotEventsData.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
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
              Date
            </Typography>

            {item.Dates.map((Date, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 15,
                }}
              >
                {Date}
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
              Event Type
            </Typography>

            {item.EventTypes.map((EventType, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 15,
                }}
              >
                {EventType}
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
              Message
            </Typography>

            {item.Messages.map((Message, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 15,
                }}
              >
                {Message}
              </Typography>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default BotsEventsDetails;
