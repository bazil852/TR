import React, { useEffect, useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

const DashboardTabs = ({ exchangeData }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [width, setWidth] = React.useState(globalThis?.innerWidth);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box>
      <Box
        sx={{
          width: "49vw",
          // width < 1300
          //   ? isDrawerOpen
          //     ? "72vw"
          //     : "91vw"
          //   : isDrawerOpen
          //   ? "78vw"
          //   : "93vw",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            marginBottom: 5,
            "& .MuiTabs-indicator": {
              backgroundColor: "transparent",
            },
          }}
        >
          {exchangeData.map((exchange, index) => (
            <Tab
              label={exchange.ExchangeName}
              key={index}
              sx={{
                fontWeight: 600,
                color: "white",
                fontSize: "1.2rem",
                "&.Mui-selected": {
                  background:
                    "linear-gradient(90deg, #790D83 0%, #7A5CFF 100%)",
                  color: "white",
                  borderRadius: 2,
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
      <Box my={5}>
        <Typography variant="h6">
          Pair: {exchangeData[selectedTab].ExchangeAssets.Pair}
        </Typography>
        <Typography variant="h6">
          Total: {exchangeData[selectedTab].ExchangeAssets.Total}
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardTabs;
