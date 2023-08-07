import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  CircularProgress,
  Grid,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const BotsLibraryProgressGraph = ({ progressData, valueType }) => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [loading, setLoading] = useState(true);
  const [normalizedData, setNormalizedData] = useState([]);
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  let barHeight = 18;
  if (progressData.length === 1) {
    barHeight = 55;
  } else if (progressData.length === 2) {
    barHeight = 40;
  } else if (progressData.length === 3) {
    barHeight = 35;
  } else if (progressData.length === 4) {
    barHeight = 25;
  } else {
    barHeight = 18;
  }

  const roundUp = (num, precision) => Math.ceil(num / precision) * precision;

  const ColorLinearProgress = withStyles({
    root: {
      minWidth: 200,
      height: barHeight,
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    bar: {
      background: "linear-gradient(45deg, #544DFF 30%, #23C9FF 90%)",
      borderRight: "3px solid white",
    },
  })(LinearProgress);

  useEffect(() => {
    const maxValue =
      roundUp(Math.max(...progressData.map((p) => p.value)), 50) + 100;

    const newData = progressData.map((p) => ({
      ...p,
      value: (p.value / maxValue) * 100,
    }));

    setNormalizedData(newData);
    setLoading(false);
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const allZero = normalizedData.every((val) => val.value === 0);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height:
          width < 1130 && !isDrawerOpen
            ? 364
            : width > 1129 && width < 1201 && !isDrawerOpen
            ? 364
            : width > 1200 && width < 1220 && !isDrawerOpen
            ? 340
            : width > 1220 && width < 1296 && !isDrawerOpen
            ? 308
            : width === 1220 && !isDrawerOpen
            ? 309
            : width > 1295 && !isDrawerOpen
            ? 326
            : width < 1037 && width > 999 && isDrawerOpen
            ? 406
            : width < 1043 && width > 1036 && isDrawerOpen
            ? 330
            : width > 1389 && isDrawerOpen && width < 1538
            ? 339
            : width < 1000 && isDrawerOpen
            ? 364
            : width > 1537 && isDrawerOpen
            ? 326
            : 300,
      }}
    >
      {allZero ? (
        <Typography
          sx={{
            fontSize: "16px",
            fontFamily: "Barlow, sans-serif",
            fontWeight: "600",
            color: "#ACB2B7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
          }}
        >
          No data to show
        </Typography>
      ) : (
        normalizedData.map((data, index) => (
          <Grid
            key={index}
            container
            my={1}
            minWidth={width < 900 && width > 599 ? "70vw" : "380px"}
            alignItems={"center"}
          >
            <Grid item xs={3.5}>
              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontFamily: "Barlow, sans-serif",
                    fontWeight: "400",
                    color: "#FFFFFF",
                  }}
                >
                  {data.title}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <ColorLinearProgress variant="determinate" value={data.value} />
              </Box>
            </Grid>
            <Grid item xs={2.5}>
              <Box>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontFamily: "Barlow, sans-serif",
                    fontWeight: "500",
                    color: "#ACB2B7",
                    textAlign: "center",
                    pl: 1,
                  }}
                >
                  {progressData[index].value}
                  {valueType}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ))
      )}
    </Box>
  );
};

export default BotsLibraryProgressGraph;
