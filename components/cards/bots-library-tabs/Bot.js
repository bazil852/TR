import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Checkbox,
} from "@mui/material";
import { useSelector } from "react-redux";
import { BtcIcon, EditIcon } from "../../../utils/icons";
import RefreshIcon from "@mui/icons-material/Refresh";

const Bot = ({
  dataArray,
  handleBotsCheckbox,
  handleBotStatus,
  handleViewModal,
}) => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  const stateText = {
    on: "Turn Off",
    off: "Turn On",
  };

  return (
    <Card sx={{ borderRadius: 2, background: "#131313" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // justifyContent: "space-between",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Checkbox
            key={dataArray._id}
            onChange={(e) => {
              handleBotsCheckbox(e, dataArray._id);
            }}
          />
          <Typography
            sx={{
              fontFamily: "Barlow, san-serif",
              color: "white",
              fontWeight: 600,
              fontSize: 18,
              textTransform: "capitalize",
            }}
          >
            {dataArray?.botName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: 1.4 }}>
          <Typography
            sx={{
              fontFamily: "Barlow, san-serif",
              color: "white",
              fontWeight: 500,
              fontSize: 13,
              textTransform: "capitalize",
              pr: 0.2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <BtcIcon /> BTC /
          </Typography>
          <Typography
            sx={{
              fontFamily: "Barlow, san-serif",
              color: "white",
              fontWeight: 400,
              fontSize: 13,
              textTransform: "capitalize",
            }}
          >
            USDT
          </Typography>
        </Box>

        <Grid container spacing={1} mt={3}>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={6}
            key={dataArray?._id}
            display={"flex"}
            alignContent={"stretch"}
          >
            <Box
              sx={{
                background: "#2A2C2D",
                borderRadius: 2,
                minHeight: 60,
                minWidth: "100%",
                p: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  mb: 1,
                }}
              >
                Total Profit
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "Barlow, san-serif",
                  mb: 1,
                  color: "#FFFFFF",
                }}
              >
                0$
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={6}
            key={dataArray?._id}
            display={"flex"}
            alignContent={"stretch"}
          >
            <Box
              sx={{
                background: "#2A2C2D",
                borderRadius: 2,
                minHeight: 60,
                minWidth: "100%",
                p: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  mb: 1,
                }}
              >
                Total Deals
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "Barlow, san-serif",
                  mb: 1,
                  color: "#FFFFFF",
                }}
              >
                0
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={6}
            key={dataArray?._id}
            display={"flex"}
            alignContent={"stretch"}
          >
            <Box
              sx={{
                background: "#2A2C2D",
                borderRadius: 2,
                minHeight: 60,
                minWidth: "100%",
                p: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  mb: 1,
                }}
              >
                Status
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "Barlow, san-serif",
                  mb: 1,
                  color:
                    dataArray?.state === "on"
                      ? "#4BD469"
                      : dataArray?.state === "off"
                      ? "#FF6060"
                      : "#FFFFFF",
                }}
              >
                {dataArray?.state === "on" ? "ON-OK" : "OFF-NOT OK"}
                {/* {item.title === "Total Profit" ? "$" : ""} */}
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={6}
            key={dataArray?._id}
            display={"flex"}
            alignContent={"stretch"}
          >
            <Box
              sx={{
                background: "#2A2C2D",
                borderRadius: 2,
                minHeight: 60,
                minWidth: "100%",
                p: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  mb: 1,
                }}
              >
                Side
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "Barlow, san-serif",
                  mb: 1,
                  color:
                    dataArray?.botType === "SHORT" ||
                    dataArray?.botType === "Short"
                      ? "#FF6060"
                      : dataArray?.botType === "LONG" ||
                        dataArray?.botType === "Long"
                      ? "#4BD469"
                      : "#FFFFFF",
                }}
              >
                {dataArray?.botType === "Short"
                  ? "SHORT"
                  : dataArray?.botType === "Long"
                  ? "LONG"
                  : "N/A"}
              </Typography>
            </Box>
          </Grid>

          {/* {dataArray.statsBox?.map((item, index) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={6}
                key={index}
                display={"flex"}
                alignContent={"stretch"}
              >
                <Box
                  sx={{
                    background: "#2A2C2D",
                    borderRadius: 2,
                    minHeight: 60,
                    minWidth: "100%",
                    p: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 600,
                      fontFamily: "Barlow, san-serif",
                      color: "white",
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 500,
                      fontFamily: "Barlow, san-serif",
                      mb: 1,
                      color:
                        item.value > 0 && item.title === "Total Profit"
                          ? "#4BD469"
                          : item.value === "ON-OK"
                          ? "#4BD469"
                          : item.value === "OFF-NOT OK"
                          ? "#FF6060"
                          : item.value === "SHORT" || item.value === "Short"
                          ? "#FF6060"
                          : item.value === "LONG" || item.value === "Long"
                          ? "#4BD469"
                          : "#FFFFFF",
                    }}
                  >
                    {item.value}
                    {item.title === "Total Profit" ? "$" : ""}
                  </Typography>
                </Box>
              </Grid>
            );
          })} */}
        </Grid>
        <Box
          sx={{
            background: "#2A2C2D",
            borderRadius: 2,
            minHeight: 160,
            minWidth: "100%",
            py: 1,
            px: width > 1199 ? 0 : 5,
            mt: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Barlow, san-serif",
              color: "white",
              fontWeight: 600,
              fontSize: 15,
              color: "#ACB2B7",
              textAlign: "center",
            }}
          >
            {dataArray?.strategyId[0]?.generalSettings?.strategyName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent:
                isDrawerOpen && width > 999
                  ? "center"
                  : width < 928
                  ? "center"
                  : width > 1199
                  ? "center"
                  : "space-between",
              mt: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: 150,
                mx: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                Side
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                {dataArray?.botType}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: 150,
                mx: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                First Order
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                {dataArray?.strategyId[0]?.orders?.firstOrderSize}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: 150,
                mx: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                Extra Order
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                {dataArray?.strategyId[0]?.orders?.extraOrderSize}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: 150,
                mx: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                Max. Cover Orders
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                {dataArray?.strategyId[0]?.dca?.maxExtraOrders}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: 150,
                mx: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                Multiplier.
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                {dataArray?.strategyId[0]?.dca?.volumeMultiplier}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: 150,
                mx: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                Max. Amount Used
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                0
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: 150,
                mx: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                Take Profit
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                {dataArray?.strategyId[0]?.takeProfit?.takeProfit}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: 150,
                mx: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                Stop Loss
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Barlow, san-serif",
                  color: "white",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "#ACB2B7",
                }}
              >
                {dataArray?.strategyId[0]?.stopLoss?.stopLoss}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            mt: 2,
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            flexDirection:
              width < 400
                ? "column"
                : width > 599 && width < 755
                ? "column"
                : "",
            gap: width < 400 ? 1 : width > 599 && width < 755 ? 1 : 0,
          }}
        >
          <Button
            sx={{
              textTransform: "none",
              background: "linear-gradient(#1B1B1B, #191717)",
              outline: "none",
              fontFamily: "Barlow, san-serif",
              color: "#FFFFFF",
              fontSize: 14,
              border: "1.5px solid #343131",
              height: 30,
              minWidth:
                width < 400 ? 200 : width > 599 && width < 755 ? 200 : 75,
              borderBottomLeftRadius:
                width < 400 ? 0 : width > 599 && width < 755 ? 0 : 8,
              borderTopLeftRadius:
                width < 400 ? 0 : width > 599 && width < 755 ? 0 : 8,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <RefreshIcon sx={{ fontSize: 18, mr: 0.5 }} /> Copy
          </Button>
          <Button
            sx={{
              textTransform: "none",
              background: "linear-gradient(#1B1B1B, #191717)",
              outline: "none",
              fontFamily: "Barlow, san-serif",
              color: "#FFFFFF",
              fontSize: 14,
              border: "1.5px solid #343131",
              height: 30,
              minWidth:
                width < 400 ? 200 : width > 599 && width < 755 ? 200 : 75,
              borderRadius: 0,
            }}
            onClick={() => handleViewModal(dataArray?._id, dataArray?.logs)}
          >
            <RefreshIcon sx={{ fontSize: 18, mr: 0.5 }} /> Logs
          </Button>
          <Button
            sx={{
              textTransform: "none",
              background: "linear-gradient(#1B1B1B, #191717)",
              outline: "none",
              fontFamily: "Barlow, san-serif",
              color: "#FFFFFF",
              fontSize: 14,
              border: "1.5px solid #343131",
              height: 30,
              minWidth:
                width < 400 ? 200 : width > 599 && width < 755 ? 200 : 75,
              borderRadius: 0,
            }}
          >
            <Box sx={{ pr: 0.5, pt: 1 }}>
              <EditIcon />
            </Box>
            Edit
          </Button>
          <Button
            sx={{
              textTransform: "none",
              background: "linear-gradient(#1B1B1B, #191717)",
              outline: "none",
              fontFamily: "Barlow, san-serif",
              color: "#FFFFFF",
              fontSize: 14,
              border: "1.5px solid #343131",
              height: 30,
              minWidth:
                width < 400 ? 200 : width > 599 && width < 755 ? 200 : 75,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius:
                width < 400 ? 0 : width > 599 && width < 755 ? 0 : 8,
              borderBottomRightRadius:
                width < 400 ? 0 : width > 599 && width < 755 ? 0 : 8,
            }}
            onClick={() => handleBotStatus(dataArray?._id, dataArray?.state)}
          >
            <RefreshIcon sx={{ fontSize: 18, mr: 0.5 }} />{" "}
            {stateText[dataArray?.state] || "Invalid State"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Bot;
