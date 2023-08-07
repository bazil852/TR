import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const StrategyFolders = (props) => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box mt={"19px"}>
      <Typography
        sx={{
          fontFamily: "Barlow, san-serif",
          fontSize: "24px",
          fontWeight: 600,
          pl: 1,
        }}
      >
        Strategy Folders
      </Typography>
      <Grid container spacing={"20px"} mt={"13px"}>
        {props.data.map((item, index) => (
          <Grid
            key={index}
            item
            xs={width < 480 ? 12 : 6}
            sm={4}
            md={isDrawerOpen ? 4 : 3}
            lg={3}
          >
            <Box
              sx={{
                mt: 2,
                minWidth: "100%",
                height: "135px !important",
                borderRadius: "11px 11px 11px 11px !important",
                background: "#2B2544 !important",
                position: "relative !important",
                "::before": {
                  content: "''",
                  position: "absolute !important",
                  top: "-15px !important",
                  width: "100px !important",
                  height: "45px !important",
                  background: "#2B2544 !important",
                  borderRadius: "10px 0 0 0 !important",
                  clipPath: `path(
                   " M 0 0 L 70 0 C 110 5, 160 140, 75 15 L 0 30 z"
                  ) !important`,
                },
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  fontFamily: "Barlow, san-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  top: -15,
                  left: width < 700 && width > 600 ? 5 : 10,
                  width: 70,
                  overflow: "hidden",
                  textWrap: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {item.folderName}
              </Typography>
              <Typography
                sx={{
                  position: "absolute",
                  fontFamily: "Barlow, san-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  left: width < 700 && width > 600 ? 3 : 10,
                  mt: 0.2,
                }}
              >
                Strategies
              </Typography>
              <Box
                className="folder2"
                sx={{
                  minWidth: "100%",
                  height: "102px",
                  paddingTop: "10px",
                  borderRadius: "11px 0 11px 11px",
                  position: "relative",
                  top: "25px",
                  display: "flex",
                  flexDirection: "column",
                  "::before": {
                    content: "''",
                    position: "absolute",
                    minWidth: "72%",
                    height: "15px",
                    top: "-12px",
                    right: 0,
                    background: "#6B569C",
                    borderRadius: "0 20px 0 0",
                    clipPath: `path('M 0 0 L 500 0, 200 20, 0 40, 100 30, 0 15 C -10 300, -50 2,40 0 ')`,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    padding: "0 2rem 0 0.5rem",
                  }}
                >
                  {item.folderDescription}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 10,
                    fontWeight: 400,
                    color: "#FFFFFF",
                    marginTop: "auto",
                    textAlign: "center",
                  }}
                >
                  {item.strategiesList?.length} Strategies
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StrategyFolders;
