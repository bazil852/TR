import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const SubscriptionPrices = () => {
  const data = [
    {
      packageItem1: "Dashboard",
      packageItem2: "Strategies",
      packageItem3: "Backtesting",
      packageItem4: "Bots",
      packageItem5: "Community Strategies",
      packageItem6: "Exchanges",
    },
    {
      title1: "Rookie",
      title2: "Rider",
      packageItem1: "Yes",
      packageItem2: 1,
      packageItem3: "7/Week with 100 candles",
      packageItem4: 1,
      packageItem5: "No",
      packageItem6: 1,
      priceMonth: 9.99,
    },
    {
      title1: "Experienced",
      title2: "Rider",
      packageItem1: "Yes",
      packageItem2: 5,
      packageItem3: "70/Week with 300 candles",
      packageItem4: 5,
      packageItem5: "Yes",
      packageItem6: 3,
      priceMonth: 29.99,
    },
    {
      title1: "Pro",
      title2: "Rider",
      packageItem1: "Yes",
      packageItem2: "Unlimited",
      packageItem3: "700/Week with 600 candles",
      packageItem4: 50,
      packageItem5: "Yes",
      packageItem6: "Unlimited",
      priceMonth: 49.99,
    },
  ];

  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box mt={"20px"}>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button
          sx={{
            background: "linear-gradient(to right,#790F87,#794AE3)",
            cursor: "pointer",
            border: "none",
            px: 1,
            textTransform: "none",
            height: 28,
            width: 150,
            "&:hover": {
              border: "1px solid white",
            },
          }}
        >
          <Typography
            color={"white"}
            fontSize={13}
            fontFamily={"Barlow, san-serif"}
            fontWeight={500}
          >
            Monthly
          </Typography>
        </Button>
        <Button
          sx={{
            background: "linear-gradient(to right,#790F87,#794AE3)",
            cursor: "pointer",
            border: "none",
            px: 1,
            textTransform: "none",
            height: 28,
            width: 150,
            "&:hover": {
              border: "1px solid white",
            },
          }}
        >
          <Typography
            color={"white"}
            fontSize={13}
            fontFamily={"Barlow, san-serif"}
            fontWeight={500}
          >
            Yearly
          </Typography>
        </Button>
      </Box>

      <Box
        sx={{
          minWidth: "100%",
          background: "#262626",
          border: "1.2px solid #3F4341",
          borderRadius: "4.8px",
          minHeight: 300,
          mt: "20px",
          py: 3,
          px: 1,
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: width < 780 ? "wrap" : "nowrap",
          gap: width < 780 ? 2 : 0,
        }}
      >
        {data.map((item, index) => {
          return (
            <Box
              sx={{
                display: index === 0 && width < 780 ? "none" : "flex",
                flexDirection: "column",
                gap: 1.5,
                alignItems: index === 0 ? "flex-start" : "center",
              }}
              key={index}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: 100,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 28,
                    fontWeight: 700,
                    backgroundImage:
                      "linear-gradient(to bottom, white, #9077FF)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {item.title1}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 28,
                    fontWeight: 700,
                    mt: -1,
                    backgroundImage:
                      "linear-gradient(to bottom, #A996FF, #9077FF)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {item.title2}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    display: width < 780 ? "block" : "none",
                  }}
                >
                  Dashboard
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  {item.packageItem1}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    display: width < 780 ? "block" : "none",
                  }}
                >
                  Strategies
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  {item.packageItem2}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    display: width < 780 ? "block" : "none",
                  }}
                >
                  Backtesting
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  {item.packageItem3}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    display: width < 780 ? "block" : "none",
                  }}
                >
                  Bots
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  {item.packageItem4}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    display: width < 780 ? "block" : "none",
                  }}
                >
                  Community Strategies
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  {item.packageItem5}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    display: width < 780 ? "block" : "none",
                  }}
                >
                  Exchanges
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  {item.packageItem6}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: index === 0 ? "none" : "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: "13px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#ACB2B7",
                  }}
                >
                  $
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 20,
                    fontWeight: 670,
                    color: "#FFFFFF",
                  }}
                >
                  {item.priceMonth}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#ACB2B7",
                  }}
                >
                  /Month
                </Typography>
              </Box>
              <Button
                sx={{
                  background: "linear-gradient(to right,#790F87,#794AE3)",
                  cursor: "pointer",
                  border: "none",
                  px: 1,
                  textTransform: "none",
                  display: index === 0 ? "none" : "block",
                  height: 35,
                  width: 100,
                  "&:hover": {
                    border: "1px solid white",
                  },
                }}
              >
                <Typography
                  color={"white"}
                  fontSize={16}
                  fontFamily={"Barlow, san-serif"}
                  fontWeight={500}
                  mt={-0.3}
                >
                  Upgrade
                </Typography>
              </Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SubscriptionPrices;
