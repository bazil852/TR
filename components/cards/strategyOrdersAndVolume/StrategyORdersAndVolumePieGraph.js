import React from "react";
import { Box, Typography } from "@mui/material";
import Graph2_pie from "./Graph2_pie";

const StrategyORdersAndVolumePieGraph = () => {
  const data = [
    { value: 1048, name: "Base Order" },
    { value: 735, name: "Extra Order 1" },
    { value: 400, name: "Extra Order 2" },
    { value: 335, name: "Extra Order 3" },
    { value: 235, name: "Extra Order 4" },
  ];

  return (
    <Box
      sx={{
        background: "#262626",
        border: "1.2px solid #3F4341",
        borderRadius: "4.8px",
        height: 360,
        minWidth: "100%",
        position: "relative",
        overflow: "hidden",
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
          ORDERS DISTRIBUTION
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Graph2_pie data={data} />
      </Box>
    </Box>
  );
};

export default StrategyORdersAndVolumePieGraph;
