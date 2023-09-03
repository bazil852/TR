import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Checkbox,
  Modal,
} from "@mui/material";
import { useSelector } from "react-redux";
import { BtcIcon, EditIcon } from "../../../utils/icons";
import RefreshIcon from "@mui/icons-material/Refresh";
import { styled } from "@mui/material/styles";
import { getSession } from "next-auth/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BotEditModal from "../bot-edit-modal/BotEditModal";

const CustomCheckbox = styled(Checkbox)({
  "&.Mui-checked": {
    color: "white",
  },
});

const Bot = ({
  dataArray,
  handleBotsCheckbox,
  handleBotStatus,
  handleViewModal,
  allBots,
  updateBots,
}) => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const [showModal, setShowModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [logs, setLogs] = React.useState("");

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  const stateText = {
    on: "Turn Off",
    off: "Turn On",
  };

  const handleLogsViewModal = async (botId, logs) => {
    // const session = await getSession();
    setLogs(logs);
    // setSelectedRow(row);
    setShowLogsModal(true);

    const response = await fetch(`/api/bot/get-bot-by-id?id=${botId}`, {
      method: "GET",
    });

    const data = await response.json();
    // let filteredBot = data.body.filter((item) => item?._id === row._id);
    setLogs(data.body.logs);
  };
  const handleLogsModalClose = () => {
    setShowLogsModal(false);
  };

  const handleRefreshLogs = async (botId) => {
    const response = await fetch(`/api/bot/get-bot-by-id?id=${botId}`, {
      method: "GET",
    });

    const data = await response.json();
    setLogs(data.body.logs);
  };

  return (
    <>
      <BotEditModal
        openModal={showModal}
        setOpenModal={setShowModal}
        botInfo={dataArray}
        allBots={allBots}
        updateBots={updateBots}
      />
      <Modal open={showLogsModal} onClose={handleLogsModalClose}>
        <Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              // overflowY: "scroll",
              width: 700,
              maxHeight: 600,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid>
                <Typography sx={{ fontWeight: 650, fontSize: "2rem" }}>
                  Logs
                </Typography>
              </Grid>
              <Grid>
                <Button onClick={() => handleRefreshLogs(dataArray?._id)}>
                  Refresh
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                overflowY: "scroll",
                width: 650,
                maxHeight: 450,
                "&::-webkit-scrollbar": {
                  width: "0.4em",
                },
                "&::-webkit-scrollbar-track": {
                  boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                  webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,.1)",
                  outline: "1px solid slategrey",
                },
              }}
            >
              <p dangerouslySetInnerHTML={{ __html: logs }}></p>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Card
        sx={{
          background: "#262626",
          border: "1.2px solid #3F4341",
          borderRadius: "4.8px",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                flexWrap: "wrap",
              }}
            >
              <CustomCheckbox
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
            <Box
              sx={{ display: "flex", alignItems: "center", marginLeft: 1.4 }}
            >
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
          </Box>

          <Grid container spacing={1} mt={3}>
            <Grid
              item
              xs={12}
              sm={6}
              md={isDrawerOpen && width > 999 ? 6 : 3}
              lg={
                isDrawerOpen && width > 1300 && width < 1350
                  ? 3
                  : width > 1299 && !isDrawerOpen
                  ? 3
                  : 6
              }
              xl={3}
              key={dataArray?._id}
              display={"flex"}
              alignContent={"stretch"}
            >
              <Box
                sx={{
                  background: "#3E3E3E",
                  borderRadius: 2,
                  minHeight: 60,
                  minWidth: "100%",
                  p: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "Barlow, san-serif",
                    color: "white",
                    mb: 1,
                    whiteSpace: "nowrap",
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
              md={isDrawerOpen && width > 999 ? 6 : 3}
              lg={
                isDrawerOpen && width > 1300 && width < 1350
                  ? 3
                  : width > 1299 && !isDrawerOpen
                  ? 3
                  : 6
              }
              xl={3}
              key={dataArray?._id}
              display={"flex"}
              alignContent={"stretch"}
            >
              <Box
                sx={{
                  background: "#3E3E3E",
                  borderRadius: 2,
                  minHeight: 60,
                  minWidth: "100%",
                  p: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "Barlow, san-serif",
                    color: "white",
                    mb: 1,
                    whiteSpace: "nowrap",
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
              md={isDrawerOpen && width > 999 ? 6 : 3}
              lg={
                isDrawerOpen && width > 1300 && width < 1350
                  ? 3
                  : width > 1299 && !isDrawerOpen
                  ? 3
                  : 6
              }
              xl={3}
              key={dataArray?._id}
              display={"flex"}
              alignContent={"stretch"}
            >
              <Box
                sx={{
                  background: "#3E3E3E",
                  borderRadius: 2,
                  minHeight: 60,
                  minWidth: "100%",
                  p: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "Barlow, san-serif",
                    color: "white",
                    mb: 1,
                    whiteSpace: "nowrap",
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
                  {dataArray?.state === "on" ? "ON" : "OFF"}
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={isDrawerOpen && width > 999 ? 6 : 3}
              lg={
                isDrawerOpen && width > 1300 && width < 1350
                  ? 3
                  : width > 1299 && !isDrawerOpen
                  ? 3
                  : 6
              }
              xl={3}
              key={dataArray?._id}
              display={"flex"}
              alignContent={"stretch"}
            >
              <Box
                sx={{
                  background: "#3E3E3E",
                  borderRadius: 2,
                  minHeight: 60,
                  minWidth: "100%",
                  p: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "Barlow, san-serif",
                    color: "white",
                    mb: 1,
                    whiteSpace: "nowrap",
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
              background: "#3E3E3E",
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
              flexWrap: width < 1100 ? "wrap" : "",
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
                background: "linear-gradient(to right, #292828, #262222)",
                outline: "none",
                fontFamily: "Barlow, san-serif",
                color: "#FFFFFF",
                fontSize: 14,
                border: "1.5px solid #343131",
                height: 30,
                minWidth:
                  width < 400 ? 200 : width > 599 && width < 755 ? 200 : 75,
                borderBottomLeftRadius:
                  width < 400 ? 0 : width > 599 && width < 755 ? 0 : 5,
                borderTopLeftRadius:
                  width < 400 ? 0 : width > 599 && width < 755 ? 0 : 5,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <RefreshIcon sx={{ fontSize: 18, mr: 0.5 }} /> Copy
            </Button>
            <Button
              sx={{
                textTransform: "none",
                background: "linear-gradient(to right, #292828, #262222)",
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
              onClick={() =>
                handleLogsViewModal(dataArray?._id, dataArray?.logs)
              }
            >
              <VisibilityIcon sx={{ fontSize: 18, mr: 0.5 }} /> Logs
            </Button>
            <Button
              sx={{
                textTransform: "none",
                background: "linear-gradient(to right, #292828, #262222)",
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
              onClick={() => {
                setShowModal(true);
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
                background: "linear-gradient(to right, #292828, #262222)",
                outline: "none",
                fontFamily: "Barlow, san-serif",
                color: "#FFFFFF",
                fontSize: 14,
                border: "1.5px solid #343131",
                height: 30,
                minWidth:
                  width < 400 ? 200 : width > 599 && width < 755 ? 200 : 91,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius:
                  width < 400 ? 0 : width > 599 && width < 755 ? 0 : 5,
                borderBottomRightRadius:
                  width < 400 ? 0 : width > 599 && width < 755 ? 0 : 5,
              }}
              onClick={() => handleBotStatus(dataArray?._id, dataArray?.state)}
            >
              <RefreshIcon sx={{ fontSize: 18, mr: 0.5 }} />{" "}
              {stateText[dataArray?.state] || "Invalid State"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Bot;
