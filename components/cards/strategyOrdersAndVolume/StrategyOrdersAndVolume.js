import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import StragtegyOrdersAndVolumeBarGraph from "./StragtegyOrdersAndVolumeBarGraph";
import StrategyORdersAndVolumePieGraph from "./StrategyORdersAndVolumePieGraph";

const StrategyOrdersAndVolume = () => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [width, setWidth] = useState(globalThis?.innerWidth);

  const statsData = [
    { name: "Total Volume", amount: 0, percentage: 0 },
    { name: "Avg. Volume", amount: 0, percentage: 0 },
    { name: "Avg. Orders", amount: 0, percentage: 0 },
  ];

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontSize: "2.2rem",
            fontWeight: 600,
            ml: 1,
            fontFamily: "Barlow, san-serif",
          }}
        >
          Strategy Orders and Volume
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            ml: 1,
            mb: 1,
            fontFamily: "Barlow, san-serif",
            color: "#ACB2B7",
          }}
        >
          Orders and Volume used per trade
        </Typography>
      </Box>
      <Grid container spacing={"20px"} mt={0}>
        {statsData.map((item, index) => {
          return (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={isDrawerOpen&&width>999 ? 4 : 3}
              lg={
                width < 1500 && width > 1299 && isDrawerOpen
                  ? 3
                  : width < 1300
                  ? 3
                  : 2
              }
              xl={2}
            >
              <Box
                sx={{
                  background: "#262626",
                  border: "1.2px solid #3F4341",
                  borderRadius: "4.8px",
                  minWidth: "100%",
                  height: 98,
                  px: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 22,
                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 16,
                    fontWeight: 400,
                    color:
                      typeof item.amount !== "undefined"
                        ? item.amount > 0
                          ? "#21CC6D"
                          : "#E24628"
                        : "#21CC6D",
                  }}
                >
                  {typeof item.amount !== "undefined" ? `${item.amount}$` : ""}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 16,
                    fontWeight: 400,
                    color: item.percentage > 0 ? "#21CC6D" : "#E24628",
                  }}
                >
                  {typeof item.percentage !== "undefined"
                    ? `${item.percentage}%`
                    : ""}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Grid container spacing={"20px"} mt={"0px"}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <StragtegyOrdersAndVolumeBarGraph />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <StrategyORdersAndVolumePieGraph />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StrategyOrdersAndVolume;
