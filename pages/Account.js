import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import PrivateHeader from "../components/layout/PrivateHeader";
import PersonelData from "../components/cards/account-setting/PersonelData";
import Security from "../components/cards/account-setting/Security";
import SubscriptionPrices from "../components/cards/subscription/SubscriptionPrices";
import SubscriptionHistory from "../components/cards/subscription/SubscriptionHistory";
import Invoices from "../components/cards/subscription/Invoices";

const Account = () => {
  const [subscriptionType, setSubscriptionType] = useState("PRO RIDER");
  const [toggle, setToggle] = useState(false);
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box mb={8} mt={"85px"} minHeight={"100%"}>
      <Typography
        sx={{
          fontSize: "2.2rem",
          fontWeight: 600,
          ml: 1,
          fontFamily: "Barlow, san-serif",
        }}
      >
        Account Settings
      </Typography>
      <Grid container spacing={"20px"} mt={0}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <PersonelData />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Security />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card
            sx={{
              minHeight: width < 600 ? 150 : 330,
              minWidth: "100%",
              background: "#262626",
              border: "1.2px solid #3F4341",
              borderRadius: "4.8px",
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  fontSize: 18,
                  fontWeight: 600,
                  mt: -1,
                }}
              >
                BILLING
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  mt: "29px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    mt: -1,
                    display: "flex",
                    gap: 0.5,
                    whiteSpace: "nowrap",
                  }}
                >
                  SUBSCRIPTION TYPE :
                  <Typography
                    sx={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#ACB2B7",
                      width: 200,
                      overflow: "hidden",
                      textWrap: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {subscriptionType}
                  </Typography>
                </Typography>

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
                  onClick={() => setToggle(!toggle)}
                >
                  <Typography
                    color={"white"}
                    fontSize={13}
                    fontFamily={"Barlow, san-serif"}
                    fontWeight={500}
                  >
                    Manage subscriptions
                  </Typography>
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {toggle && (
        <Box>
          <SubscriptionPrices />
          <SubscriptionHistory />
          <Invoices/>
        </Box>
      )}
    </Box>
  );
};

function TradesLibrary() {
  return (
    <PrivateHeader title="Account Settings" current="5" Component={Account} />
  );
}

export default TradesLibrary;
