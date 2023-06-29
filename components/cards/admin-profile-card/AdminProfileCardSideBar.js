import React from "react";
import { useSession } from "next-auth/react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

const AdminProfileCardSideBar = () => {
  let userInfo;
  if (typeof window !== "undefined") {
    userInfo = JSON.parse(localStorage?.getItem("userInfo"));
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        pl: 1.5,
      }}
    >
      <Box>
        <img
          src="https://static6.depositphotos.com/1003369/659/i/600/depositphotos_6591667-stock-photo-close-up-of-beautiful-womanish.jpg"
          style={{
            maxHeight: "3rem",
            maxWidth: "3rem",
            borderRadius: "50%",
          }}
        />
      </Box>
      <Box>
        <Typography
          color="white"
          sx={{ mr: 8, fontSize: "16px", paddingBottom: "5px" }}
        >
          {userInfo?.first_name}&nbsp;
          {userInfo?.last_name}
        </Typography>
        <Typography color="white" fontSize={12}>
          Admin
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminProfileCardSideBar;
