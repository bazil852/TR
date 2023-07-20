import React, { useEffect, useState } from "react";
import { Box, Fade, Modal, Typography, Backdrop, Grid } from "@mui/material";
import ReactPlayer from "react-player";
import { Video } from "../utils/icons";
import PrivateHeader from "../components/layout/PrivateHeader";
import ProfitCalendar from "../components/calendar/ProfitCalendar";
import BotsLibraryCards from "../components/cards/bots-library-cards/BotsLibraryCards";
import BotsLibraryGraphTwo from "../components/cards/bots-library-graphs/BotsLibraryGraphTwo";
import BotsLibraryGraphOne from "../components/cards/bots-library-graphs/BotsLibraryGraphOne";
import BotsLibraryGraphThree from "../components/cards/bots-library-graphs/BotsLibraryGraphThree";
import { useSelector } from "react-redux";

const BotsLibraryComponent = () => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box mt={8} minHeight={"100%"} mb={10}>
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
            Bots Library
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
            Create your Bots, check the statistics
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
              width: 155,
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
      <Grid container mt={3} spacing={1}>
        <Grid
          item
          xs={12}
          md={isDrawerOpen ? 12 : 7}
          lg={isDrawerOpen && width < 1390 ? 12 : 7}
        >
          <Grid container spacing={1}>
            <Grid item md={12}>
              <BotsLibraryCards />
            </Grid>
            <Grid item md={6}>
              <BotsLibraryGraphOne />
            </Grid>
            <Grid item md={6}>
              <BotsLibraryGraphTwo />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          md={isDrawerOpen ? 12 : 5}
          lg={isDrawerOpen && width < 1390 ? 12 : 5}
        >
          <ProfitCalendar />
        </Grid>
      </Grid>
      <Box sx={{ minWidth: "100%", my: 1 }}>
        <BotsLibraryGraphThree />
      </Box>
    </Box>
  );
};

function BotsLibrary() {
  return (
    <PrivateHeader
      title="Bots Library"
      current="3"
      Component={BotsLibraryComponent}
    />
  );
}

export default BotsLibrary;
