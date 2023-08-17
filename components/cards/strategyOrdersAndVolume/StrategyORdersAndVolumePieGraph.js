import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Graph2_pie from "./Graph2_pie";

const StrategyORdersAndVolumePieGraph = () => {
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  const data = [
    { value: 1048, name: "Base Order" },
    { value: 735, name: "Extra Order 1" },
    { value: 400, name: "Extra Order 2" },
    { value: 335, name: "Extra Order 3" },
    { value: 235, name: "Extra Order 4" },
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
          ORDERS DISTRIBUTION
        </Typography>
      </Box>
      <Box
        sx={{
          mt: -8.7,
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
        <Graph2_pie dataArray={data} />
      </Box>
    </Box>
  );
};

export default StrategyORdersAndVolumePieGraph;
