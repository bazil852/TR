import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  CircularProgress,
  Grid,
} from "@mui/material";
import { withStyles } from "@mui/styles";

const progressData = [
  { title: "Bitcoin Bot 1 hour", value: 2435 },
  { title: "ATOM Bot", value: 1325 },
  { title: "TRON Bot", value: 735 },
  { title: "Solana Bot", value: 580 },
  { title: "AVAX Bot", value: 428 },
  { title: "Stellar Bot", value: 208 },
];

const roundUp = (num, precision) => Math.ceil(num / precision) * precision;

const ColorLinearProgress = withStyles({
  root: {
    minWidth: 200,
    height: 18,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  bar: {
    background: "linear-gradient(45deg, #544DFF 30%, #23C9FF 90%)",
    borderRight: "3px solid white",
  },
})(LinearProgress);

const BotsLibraryProgressGraph = () => {
  const [loading, setLoading] = useState(true);
  const [normalizedData, setNormalizedData] = useState([]);

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
    <Box>
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
          <Grid key={index} container my={4} minWidth={"400px"}>
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
                  }}
                >
                  {progressData[index].value}
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
