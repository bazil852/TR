import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Graph1_Bar from "./Graph1_Bar";

const StrategyDrawDownAndDeviationBarGraph = () => {
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  const data = [
    { drawdown: [2.0, 4.9, 3, 4, 5, 6, 7, 8, 9, 7, 6, 5, 4] },
    { deviation: [2.6, 5.9, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 7, 8] },
  ];

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
        height: 400,
        minWidth: "100%",
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "auto",
          width: "100%",
          mt: -5,
          " ::-webkit-scrollbar": {
            height: 3,
          },
          "::-webkit-scrollbar-track": {
            background: "none",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
        }}
      >
        <Graph1_Bar data={data} />
      </Box>
    </Box>
  );
};

export default StrategyDrawDownAndDeviationBarGraph;
