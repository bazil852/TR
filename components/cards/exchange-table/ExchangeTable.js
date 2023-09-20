import React from "react";
import { useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import DataTable from "./DataTable";

const ExchangeTable = ({ data, loading }) => {
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [selectedTab, setSelectedTab] = useState(0);

  const [selectedAssets, setSelectedAssets] = useState([]);

  console.log(data);
  React.useEffect(() => {
    setSelectedAssets(data[selectedTab]);
  }, [selectedTab, data]);

  const columns = [
    {
      field: "coin_name",
      title: "TOKEN",
      // sortable: true,
    },

    {
      field: "quantity",
      title: "AMOUNT",
      // sortable: true,
    },
    {
      field: "crossWalletBalance",
      title: "ALLOCATION",
      // sortable: true,
    },

    { field: "change_24h", title: "CHANGE" },
    {
      field: "usdt_price",
      title: "VALUE",
      // sortable: true,
    },
  ];

  const [value, setValue] = useState("usd");

  const handleToggle = (event, newValue) => {
    setValue(newValue);
  };

  // const foundTableData = selectedAssets?.filter((item) => {
  //   if (!inputSearch) {
  //     return true;
  //   }
  //   return item?.asset.toLowerCase().includes(inputSearch.toLowerCase());
  // });

  return (
    <Box
      sx={{
        mt: "20px",
        display: "flex",
        flexWrap: "nowrap",
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={"20px"} alignContent={"stretch"} mb={0}>
          <Grid item xs={12} sm={12} md={isDrawerOpen ? 12 : 6} lg={6}>
            <DataTable data={data} columns={columns} />
          </Grid>
          <Grid item xs={12} sm={12} md={isDrawerOpen ? 12 : 6} lg={6}>
            {/* <CryptocurrencyData data={selectedAssets} /> */}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ExchangeTable;
