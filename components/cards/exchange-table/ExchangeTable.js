import { DataGrid, GridColDef, DataGridSortIcon } from "@mui/x-data-grid";
import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Tabs, Tab } from "@mui/material";
import SearchBar from "../../widgets/SearchBar";
import Checkbox from "@mui/material/Checkbox";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import DashboardTabs from "../dashboard-tabs/DashboardTabs";
import { useSelector, useDispatch } from "react-redux";

import { signIn, getSession, useSession } from "next-auth/react";
import { Sort } from "../../../utils/icons";
import DataTable from "./DataTable";
import CryptocurrencyData from "../crypto-currencies-data/CryptocurrencyData";

import { CircularProgress } from "@mui/material";

import Button from "@mui/material/Button";

const ccxt = require("ccxt");

const ExchangeTable = (props) => {
  const exchanges = useSelector((state) => state.exchanges.value);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [tableData, setTableData] = useState([]);
  // const [loading, setLoading] = React.useState(true);

  const [inputSearch, setInputSearch] = useState("");

  // React.useEffect(() => {
  //   let updatedAssets = props.assets?.map((item) => {
  //     return {
  //       ...item,
  //       crossWalletBalance: parseFloat(item.crossWalletBalance).toFixed(2),
  //       availableBalance: parseFloat(item.availableBalance).toFixed(2),
  //       balance: parseFloat(item.balance).toFixed(2),
  //     };
  //   });
  //   setTableData(updatedAssets);
  //   // console.log(updatedAssets);
  //   if (updatedAssets.length !== 0) {
  //     setLoading(false);
  //   }
  // }, [props.assets]);

  const [selectedTab, setSelectedTab] = useState(0);

  const [selectedAssets, setSelectedAssets] = useState([]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  console.log(props.allExchangesAssets);
  React.useEffect(() => {
    let updatedAssets = props.allExchangesAssets[
      selectedTab
    ]?.exchangeAssets?.map((item) => {
      return {
        ...item,
        crossWalletBalance: parseFloat(item.crossWalletBalance).toFixed(2),
        availableBalance: parseFloat(item.availableBalance).toFixed(2),
        balance: parseFloat(item.balance).toFixed(2),
      };
    });
    setSelectedAssets(updatedAssets);
  }, [selectedTab, props.allExchangesAssets]);

  console.log("asset", selectedAssets);

  // const columnst = [
  //   {
  //     field: "asset",
  //     headerName: "Token",
  //     width: 100,
  //     disableColumnMenu: true,
  //     sortIcon: (
  //       <img src={Sort} alt="sort arrow icon" style={{ marginLeft: 4 }} />
  //     ),
  //   },
  //   {
  //     field: "share",
  //     headerName: "Share",
  //     width: 70,
  //     disableColumnMenu: true,
  //   },
  //   {
  //     field: "change",
  //     headerName: "Change (24h)",
  //     width: 120,
  //     disableColumnMenu: true,
  //   },
  //   // renderCell: (cellValues) => {
  //   if (cellValues.value.charAt(0) === "+") {
  //     return (
  //       <div style={{ color: "#4BD469" }}>
  //         {cellValues.value}
  //         <NorthIcon fontSize="6px" />
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div style={{ color: "#EB5757" }}>
  //         {cellValues.value}
  //         <SouthIcon fontSize="6px" />
  //       </div>
  //     );
  //   }
  // },

  //   {
  //     field: "crossWalletBalance",
  //     headerName: "Price",
  //     width: 70,
  //     disableColumnMenu: true,
  //   },
  //   {
  //     field: "availableBalance",
  //     headerName: "Amount",
  //     width: 80,
  //     disableColumnMenu: true,

  //     // renderCell: (cellValues) => {
  //     //   // let newValue = cellValues.value.split(" ");
  //     //   return (
  //     //     <div
  //     //       style={{
  //     //         display: "flex",
  //     //         flexDirection: "column",
  //     //       }}
  //     //     >
  //     //       <div>{cellValues}</div>
  //     //     </div>
  //     //   );
  //     // },
  //   },
  //   {
  //     field: "balance",
  //     headerName: "Total",
  //     width: 70,
  //     disableColumnMenu: true,
  //   },
  // ];

  // const columns = [
  //   { field: "token", title: "Token", sortable: true },
  //   { field: "share", title: "Share", sortable: true },
  //   { field: "change", title: "Change (24h)", sortable: true },
  //   { field: "price", title: "Price", sortable: true },
  //   { field: "amount", title: "Amount", sortable: true },
  //   { field: "total", title: "Total", sortable: true },
  // ];

  const columns = [
    {
      field: "asset",
      title: "Token",
      width: 108,
      // renderHeader: () => {
      //   return <strong>{"Token"}</strong>;
      // },
    },
    // {
    //   field: "share",
    //   headerName: "Share",
    //   width: 108,
    //   renderHeader: () => {
    //     return <strong>{"Share"}</strong>;
    //   },
    // },
    // {
    //   field: "change",
    //   headerName: "Change (24h)",
    //   width: 165,
    //   renderHeader: () => {
    //     return <strong>{"Change (24h)"}</strong>;
    //   },
    // renderCell: (cellValues) => {
    //   if (cellValues.value.charAt(0) === "+") {
    //     return (
    //       <div style={{ color: "#4BD469" }}>
    //         {cellValues.value}
    //         <NorthIcon fontSize="6px" />
    //       </div>
    //     );
    //   } else {
    //     return (
    //       <div style={{ color: "#EB5757" }}>
    //         {cellValues.value}
    //         <SouthIcon fontSize="6px" />
    //       </div>
    //     );
    //   }
    // },
    // },
    {
      field: "availableBalance",
      title: "Amount",
      width: 122,
      // renderHeader: () => {
      //   return <strong>{"Amount"}</strong>;
      // },
    },
    {
      field: "crossWalletBalance",
      width: 109,
      title: "Price",
      // renderHeader: () => {
      //   return <strong>{"Price"}</strong>;
      // },
    },

    { field: "change", title: "Change (24h)", sortable: true },
    {
      field: "balance",
      title: "Total",
      width: 110,
      // renderHeader: () => {
      //   return <strong>{"Total"}</strong>;
      // },
    },
  ];

  const [value, setValue] = useState("usd");

  const handleToggle = (event, newValue) => {
    setValue(newValue);
  };

  const foundTableData = selectedAssets?.filter((item) => {
    if (!inputSearch) {
      return true;
    }
    return item?.asset.toLowerCase().includes(inputSearch.toLowerCase());
  });

  return (
    <Box>
      <Box
        sx={{
          p: 1,
          width: "48vw",
          marginTop: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchBar
            setInputSearch={setInputSearch}
            inputSearch={inputSearch}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Checkbox
              style={{
                color: "white",
                "&$checked": {
                  color: "white",
                },
              }}
            />{" "}
            <Typography sx={{ fontSize: "14px" }}>
              Hide Small Balances
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "48vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 2,
          pl: 1,
          pr: 1,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
            Portfolio Summary
          </Typography>
        </Box>
        {/* <Box>
          <Button
            sx={{
              background: "linear-gradient(to right,#790D83,#7A5CFF)",
              textTransform: "none",
              border: "none",
              transition: "transform 0.2s",
              borderRadius: "15px",
              padding: "8px 15px",
              "&:hover": {
                transform: "scale(0.95)",
                backgroundColor: "linear-gradient(to right,#790D83,#7A5CFF)",
                cursor: "pointer",
              },
            }}
            onClick={props.handleRefresh}
          >
            Refresh
          </Button>
        </Box> */}
      </Box>

      <Box
        sx={{
          width: "49vw",
          margin: isDrawerOpen ? "auto" : "",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            // marginBottom: 5,
            "& .MuiTabs-indicator": {
              backgroundColor: "transparent",
            },
          }}
        >
          {props.allExchangesAssets.map((exchange, index) => (
            <Tab
              label={exchange.exchangeName}
              key={index}
              sx={{
                fontWeight: 600,
                color: "white",
                fontSize: "1rem",
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

      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
          mb: 7,
        }}
      >
        {props?.loading ? (
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
              flexWrap: "wrap",
              gap: "0.8rem",
              minHeight: "700px",
            }}
          >
            <DataTable data={foundTableData} columns={columns} />
            <CryptocurrencyData data={selectedAssets} />
          </Box>
        )}
      </Box>
      {/* </Container> */}
    </Box>
  );
};

export default ExchangeTable;
