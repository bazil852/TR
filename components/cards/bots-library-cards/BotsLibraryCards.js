import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const BotsLibraryCards = () => {
  const boxData = [
    { title: "Total Profit", value: 1350 },
    { title: "Today's Profit", value: 35 },
    { title: "Total Deals", value: 35 },
    { title: "Totals", yesterday: 35, weekly: 45, monthly: 789 },
  ];
  return (
    <Grid container spacing={1}>
      {boxData.map((item, index) => {
        return (
          <Grid item key={index} xs={3}>
            <Box
              sx={{
                background: "#131313",
                borderRadius: 2,
                minHeight: 110,
                minWidth: "100%",
                p: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: 19,
                  fontWeight: 600,
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                }}
              >
                {item.title}
              </Typography>
              {item.title === "Totals" ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 400,
                        fontFamily: "Barlow, san-serif",
                        color: "#ACB2B7",
                      }}
                    >
                      Yesterday
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 400,
                        fontFamily: "Barlow, san-serif",
                        color: item.yesterday > 0 ? "#4BD469" : "#FF6060",
                      }}
                    >
                      {item.yesterday}$
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 400,
                        fontFamily: "Barlow, san-serif",
                        color: "#ACB2B7",
                      }}
                    >
                      This Week
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 400,
                        fontFamily: "Barlow, san-serif",
                        color: item.weekly > 0 ? "#4BD469" : "#FF6060",
                      }}
                    >
                      {item.weekly}$
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 400,
                        fontFamily: "Barlow, san-serif",
                        color: "#ACB2B7",
                      }}
                    >
                      This Month
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 400,
                        fontFamily: "Barlow, san-serif",
                        color: item.monthly > 0 ? "#4BD469" : "#FF6060",
                      }}
                    >
                      {item.monthly}$
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 400,
                    mt: 1.5,
                    fontFamily: "Barlow, san-serif",
                    color:
                      item.value > 0 && item.title !== "Total Deals"
                        ? "#4BD469"
                        : item.title === "Total Deals"
                        ? "#ACB2B7"
                        : "#FF6060",
                  }}
                >
                  {item.value}
                  {item.title === "Total Deals" ? "" : "$"}
                </Typography>
              )}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BotsLibraryCards;
