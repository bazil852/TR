import React, { useState } from "react";
import { Box, Popover, Typography } from "@mui/material";
import Camera from "./navbarIcons/Camera";
import Bell from "./navbarIcons/Bell";
import Eye from "./navbarIcons/Eye";

const NavBarListItems = () => {
  const [name, setName] = useState("R");

  const [CameraHoverAnchorEl, setCameraHoverAnchorEl] = useState(null);
  const [EyeHoverAnchorEl, setEyeHoverAnchorEl] = useState(null);
  const [BellHoverAnchorEl, setBellHoverAnchorEl] = useState(null);

  const [CameraClickAnchorEl, setCameraClickAnchorEl] = useState(null);
  const [EyeClickAnchorEl, setEyeClickAnchorEl] = useState(null);
  const [BellClickAnchorEl, setBellClickAnchorEl] = useState(null);
  const [NameClickAnchorEl, setNameClickAnchorEl] = useState(null);

  const handleCameraHoverPopoverOpen = (event) => {
    setCameraHoverAnchorEl(event.currentTarget);
  };
  const handleCameraHoverPopoverClose = () => {
    setCameraHoverAnchorEl(null);
  };
  const handleEyeHoverPopoverOpen = (event) => {
    setEyeHoverAnchorEl(event.currentTarget);
  };
  const handleEyeHoverPopoverClose = () => {
    setEyeHoverAnchorEl(null);
  };
  const handleBellHoverPopoverOpen = (event) => {
    setBellHoverAnchorEl(event.currentTarget);
  };
  const handleBellHoverPopoverClose = () => {
    setBellHoverAnchorEl(null);
  };

  const handleCameraClickPopoverOpen = (event) => {
    setCameraClickAnchorEl(event.currentTarget);
  };
  const handleCameraClickPopoverClose = () => {
    setCameraClickAnchorEl(null);
  };
  const handleEyeClickPopoverOpen = (event) => {
    setEyeClickAnchorEl(event.currentTarget);
  };
  const handleEyeClickPopoverClose = () => {
    setEyeClickAnchorEl(null);
  };
  const handleBellClickPopoverOpen = (event) => {
    setBellClickAnchorEl(event.currentTarget);
  };
  const handleBellClickPopoverClose = () => {
    setBellClickAnchorEl(null);
  };
  const handleNameClickPopoverOpen = (event) => {
    setNameClickAnchorEl(event.currentTarget);
  };
  const handleNameClickPopoverClose = () => {
    setNameClickAnchorEl(null);
  };

  const CameraHoverOpen = Boolean(CameraHoverAnchorEl);
  const EyeHoverOpen = Boolean(EyeHoverAnchorEl);
  const BellHoverOpen = Boolean(BellHoverAnchorEl);

  const CameraClickOpen = Boolean(CameraClickAnchorEl);
  const EyeClickOpen = Boolean(EyeClickAnchorEl);
  const BellClickOpen = Boolean(BellClickAnchorEl);
  const NameClickOpen = Boolean(NameClickAnchorEl);

  return (
    <Box
      sx={{
        width: 200,
        background: "#070909",
        position: "absolute",
        top: 0,
        right: 0,
        height: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          cursor: "pointer",
          pt: 1,
        }}
        aria-owns={
          CameraHoverOpen ? "mouse-over-hover-popover-camera" : undefined
        }
        aria-haspopup="true"
        onMouseEnter={handleCameraHoverPopoverOpen}
        onMouseLeave={handleCameraHoverPopoverClose}
        onClick={handleCameraClickPopoverOpen}
      >
        <Camera color="#ACB2B7" />
      </Box>
      <Box
        sx={{
          cursor: "pointer",
          pt: 1,
        }}
        aria-owns={EyeHoverOpen ? "mouse-over-hover-popover-eye" : undefined}
        aria-haspopup="true"
        onMouseEnter={handleEyeHoverPopoverOpen}
        onMouseLeave={handleEyeHoverPopoverClose}
        onClick={handleEyeClickPopoverOpen}
      >
        <Eye color="#ACB2B7" />
      </Box>
      <Box
        sx={{
          cursor: "pointer",
          pt: 1,
        }}
        aria-owns={BellHoverOpen ? "mouse-over-hover-popover-bell" : undefined}
        aria-haspopup="true"
        onMouseEnter={handleBellHoverPopoverOpen}
        onMouseLeave={handleBellHoverPopoverClose}
        onClick={handleBellClickPopoverOpen}
      >
        <Bell color="#ACB2B7" />
      </Box>
      <Box
        sx={{
          width: 30,
          height: 30,
          background: "#21BA61",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={handleNameClickPopoverOpen}
      >
        {name}
      </Box>
      <Popover
        id="mouse-over-hover-popover-camera"
        sx={{
          pointerEvents: "none",
        }}
        open={CameraHoverOpen}
        anchorEl={CameraHoverAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleCameraHoverPopoverClose}
        disableRestoreFocus
        PaperProps={{
          sx: {
            background: "#070909",
            width: 200,
            height: 65,
          },
        }}
      >
        <Typography
          sx={{
            p: 1,
            textAlign: "center",
            fontFamily: "Barlow, sans-serif",
            fontWeight: 400,
          }}
        >
          Change the color schemes of website
        </Typography>
      </Popover>
      <Popover
        id="mouse-over-click-popover-camera"
        open={CameraClickOpen}
        anchorEl={CameraClickAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleCameraClickPopoverClose}
        PaperProps={{
          sx: {
            background: "#070909",
            width: 200,
            height: 40,
          },
        }}
      >
        <Typography
          sx={{
            p: 1,
            textAlign: "center",
            fontFamily: "Barlow, sans-serif",
            fontWeight: 400,
          }}
        >
          change theme Dummy
        </Typography>
      </Popover>
      <Popover
        id="mouse-over-hover-popover-eye"
        sx={{
          pointerEvents: "none",
        }}
        open={EyeHoverOpen}
        anchorEl={EyeHoverAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleEyeHoverPopoverClose}
        disableRestoreFocus
        PaperProps={{
          sx: {
            background: "#070909",
            width: 250,
            height: 90,
          },
        }}
      >
        <Typography
          sx={{
            p: 1,
            textAlign: "center",
            fontFamily: "Barlow, sans-serif",
            fontWeight: 400,
          }}
        >
          Follow and track how smart money is trading an options contract over
          time
        </Typography>
      </Popover>
      <Popover
        id="mouse-over-click-popover-eye"
        open={EyeClickOpen}
        anchorEl={EyeClickAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleEyeClickPopoverClose}
        PaperProps={{
          sx: {
            background: "#070909",
            width: 200,
            height: 40,
          },
        }}
      >
        <Typography
          sx={{
            p: 1,
            textAlign: "center",
            fontFamily: "Barlow, sans-serif",
            fontWeight: 400,
          }}
        >
          display setting Dummy
        </Typography>
      </Popover>
      <Popover
        id="mouse-over-hover-popover-bell"
        sx={{
          pointerEvents: "none",
        }}
        open={BellHoverOpen}
        anchorEl={BellHoverAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleBellHoverPopoverClose}
        disableRestoreFocus
        PaperProps={{
          sx: {
            background: "#070909",
            width: 250,
            height: 65,
          },
        }}
      >
        <Typography
          sx={{
            p: 1,
            textAlign: "center",
            fontFamily: "Barlow, sans-serif",
            fontWeight: 400,
          }}
        >
          Recent announcements, bug fixes, new features etc.
        </Typography>
      </Popover>
      <Popover
        id="mouse-over-click-popover-bell"
        open={BellClickOpen}
        anchorEl={BellClickAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleBellClickPopoverClose}
        PaperProps={{
          sx: {
            background: "#070909",
            width: 200,
            height: 40,
          },
        }}
      >
        <Typography
          sx={{
            p: 1,

            textAlign: "center",
            fontFamily: "Barlow, sans-serif",
            fontWeight: 400,
          }}
        >
          Notifications Dummy
        </Typography>
      </Popover>
      <Popover
        id="mouse-over-click-popover-name"
        open={NameClickOpen}
        anchorEl={NameClickAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleNameClickPopoverClose}
        PaperProps={{
          sx: {
            background: "#070909",
            width: 200,
            height: 40,
          },
        }}
      >
        <Typography
          sx={{
            p: 1,
            textAlign: "center",
            fontFamily: "Barlow, sans-serif",
            fontWeight: 400,
          }}
        >
          Profile Dummy
        </Typography>
      </Popover>
    </Box>
  );
};

export default NavBarListItems;
