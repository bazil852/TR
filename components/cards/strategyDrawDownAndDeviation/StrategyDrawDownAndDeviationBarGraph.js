import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Graph1_Bar from "./Graph1_Bar";

const StrategyDrawDownAndDeviationBarGraph = () => {
  const data = [
    {
      drawdown: [
        2.0,
        4.9,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        22,
        23,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        22,
        23,
      ],
    },
    {
      deviation: [
        2.6,
        5.9,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        22,
        23,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        22,
        23,
      ],
    },
  ];

  const [width, setWidth] = useState(globalThis?.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        background: "#262626",
        border: "1.2px solid #3F4341",
        borderRadius: "4.8px",
        height: width < 468 ? 420 : 390,
        width: "100%",
        mt: "20px",
      }}
    >
      <Box
        sx={{
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 22,
            fontWeight: 600,
            pt: 2,
          }}
        >
          DRAWDOWN AND DEVIATION PER TRADE
        </Typography>
      </Box>

      <Graph1_Bar data={data} />
    </Box>
  );
};

export default StrategyDrawDownAndDeviationBarGraph;
