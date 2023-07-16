import PrivateHeader from "../components/layout/PrivateHeader";
import React, { useEffect, useState } from "react";
import { Box, Modal, Typography, Backdrop, Fade, Button } from "@mui/material";
import ReactPlayer from "react-player";
import StrategyFolders from "../components/cards/strategy-library/StrategyFolders";
import MyStrategies from "../components/cards/strategy-library/MyStrategies";
import CommunityStrategies from "../components/cards/strategy-library/CommunityStrategies";
import { Video } from "../utils/icons";

const StrategyLibrary = () => {
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
    <Box mt={8} minHeight={"100%"}>
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
            Strategy Library
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

      <Box sx={{ display: "flex", mt: 4, gap: "0.7rem" }}>
        <Button
          sx={{
            height: "40px",
            width: "150px",
            fontSize: 16,
            fontWeight: 500,
            color: "#FFFFFF",
            fontFamily: "Barlow, san-serif",
            textTransform: "none",
            background:
              "linear-gradient(93.46deg, #350B41 -12.4%, #35256A 105.26%)",
          }}
        >
          New Folder
        </Button>
        <Button
          sx={{
            height: "40px",
            width: "150px",
            fontSize: 16,
            fontWeight: 500,
            color: "#FFFFFF",
            fontFamily: "Barlow, san-serif",
            textTransform: "none",
            background:
              "linear-gradient(93.46deg, #1E0625 -12.4%, #1E153D 105.26%)",
          }}
        >
          New Strategy
        </Button>
      </Box>
      <StrategyFolders />
      <MyStrategies />
      <CommunityStrategies />
    </Box>
  );
};

export default function Strategy() {
  return (
    <>
      <PrivateHeader
        current="1"
        Component={StrategyLibrary}
        title=" Strategy Library"
      />
    </>
  );
}
