import StrategyTabs from "../components/cards/strategy-tabs/StrategyTabs";
import { Box, Modal, Typography, Backdrop, Fade } from "@mui/material";
import PrivateHeader from "../components/layout/PrivateHeader";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Video } from "../utils/icons";
import { useRouter } from "next/router";
import { StrategyProvider } from "../context/StrategyContext";
import StrategyPLandStats from "../components/cards/strategyPL&Stats/StrategyPLandStats";
import StrategyOrdersAndVolume from "../components/cards/strategyOrdersAndVolume/StrategyOrdersAndVolume";
import StrategyDrawDownAndDeviation from "../components/cards/strategyDrawDownAndDeviation/StrategyDrawDownAndDeviation";

const StartegyComponent = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [width, setWidth] = useState(globalThis?.innerWidth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Box mb={8} mt={"85px"} minHeight={"100%"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: width < 600 && "left",
          minWidth: "100%",
          flexDirection: width < 600 && "column",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontSize: "2.2rem",
              fontWeight: 600,
              ml: 1,
              fontFamily: "Barlow, san-serif",
            }}
          >
            New Strategy / Edit Strategy
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
            Create, test and save your strategies
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#2A2C2D",
              borderRadius: 2,
              border: "1px solid #393B3C",
              gap: 1,
              width: 140,
              height: 35,
              cursor: "pointer",
              "&:active": {
                backgroundColor: "#434546",
              },
            }}
            onClick={handleOpen}
          >
            <Video />
            <Typography
              sx={{
                color: "white",
                fontFamily: "Barlow, san-serif",
                whiteSpace: "nowrap",
                mt: -0.3,
              }}
            >
              Strategy Guide
            </Typography>
          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "90vw",
                  margin: "auto",
                }}
              >
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=0fPQ1lNAUbY"
                  playing
                />
              </Box>
            </Fade>
          </Modal>
        </Box>
      </Box>
      <StrategyProvider>
        <Box mt={2.8}>
          <StrategyTabs strategyId={id} />
        </Box>

        <Box mt={"0px"}>
          <StrategyPLandStats />
        </Box>
        <Box mt={"20px"}>
          <StrategyOrdersAndVolume />
        </Box>
        <Box mt={"20px"}>
          <StrategyDrawDownAndDeviation />
        </Box>
      </StrategyProvider>
    </Box>
  );
};

function Startegy() {
  return (
    <StrategyProvider>
      <PrivateHeader
        title="New Strategy / Edit Strategy"
        current="2"
        Component={StartegyComponent}
      />
    </StrategyProvider>
  );
}

export default Startegy;
