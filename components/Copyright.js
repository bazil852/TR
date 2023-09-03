import React from "react";
import Typography from "@mui/material/Typography";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="#FFFFFF"
      align="center"
      {...props}
      fontFamily={"Barlow, san-serif"}
    >
      {/* {"Copyright © "} */}
      All rights reserved | Privacy | Terms and conditions
      {/* {new Date().getFullYear()} */}
    </Typography>
  );
};

export default Copyright;
