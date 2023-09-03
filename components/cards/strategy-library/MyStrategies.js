import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";

const MyStrategies = (props) => {
  const router = useRouter();
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Box sx={{ mt: 8 }}>
      <Typography
        sx={{
          fontFamily: "Barlow, san-serif",
          fontSize: "24px",
          fontWeight: 600,
          pl: 1,
          mb: 1,
        }}
      >
        My Strategies
      </Typography>
      <Grid container spacing={"20px"}>
        {props.data.map((item, index) => (
          <Grid item xs={12} sm={6} md={isDrawerOpen ? 6 : 4} lg={4} xl={3}>
            <Paper
              sx={{
                background: "#262626",
                border: "1.2px solid #3F4341",
                borderRadius: "4.8px",
                padding: "1rem 0.5rem 1rem 0.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 12,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#ACB2B7",
                    whiteSpace: "nowrap",
                    width: 200,
                    overflow: "hidden",
                    textWrap: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.generalSettings.strategyName}
                </Typography>
              </Box>
              <Button
                onClick={() => {
                  router.push({
                    pathname: "/Startegy",
                    query: { id: item._id },
                  });
                }}
                sx={{
                  background:
                    "linear-gradient(93.46deg, #790D83 -12.4%, #7A5CFF 105.26%)",
                  color: "#FFFFFF",
                  height: 30,
                  minWidth: 20,
                  position: "absolute",
                  right: 11,
                }}
              >
                <EditIcon />
              </Button>
              <Box
                key={index}
                sx={{
                  display: "flex",
                  pt: 6.5,
                  pb: 1,
                  gap:
                    width < 600 && width > 400
                      ? "1rem"
                      : width < 400
                      ? "0.2rem"
                      : width < 941 && width > 899
                      ? "0.2rem"
                      : "0.5rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize:
                        width < 670 && width > 599
                          ? 14
                          : width > 1535
                          ? 15
                          : 16,
                      fontWeight: 300,
                      color: "#ACB2B7",
                    }}
                  >
                    Winrate
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: width < 670 && width > 599 ? 14 : 16,
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {item.winRate ? item.winRate : "NA"} %
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize:
                        width < 670 && width > 599
                          ? 14
                          : width > 1535
                          ? 15
                          : 16,
                      fontWeight: 300,
                      color: "#ACB2B7",
                    }}
                  >
                    Pnl
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: width < 670 && width > 599 ? 14 : 16,
                      fontWeight: 600,
                      color: "#22A25B",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.profitAndLoss ? item.profitAndLoss : "NA"} %
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize:
                        width < 670 && width > 599
                          ? 14
                          : width > 1535
                          ? 15
                          : 16,
                      fontWeight: 300,
                      color: "#ACB2B7",
                      minWidth: "fit-content",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Total Trades
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: width < 670 && width > 599 ? 14 : 16,
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {item.totalTrade ? item.totalTrade : 0}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize:
                        width < 670 && width > 599
                          ? 14
                          : width > 1535
                          ? 15
                          : 16,
                      fontWeight: 300,
                      color: "#ACB2B7",
                    }}
                  >
                    Wins/Losses
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: width < 670 && width > 599 ? 14 : 16,
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {item.wins ? item.wins : 0}W /{" "}
                    {item.losses ? item.losses : 0}L
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyStrategies;
