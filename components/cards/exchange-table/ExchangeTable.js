import React from "react";
import { useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import DataTable from "./DataTable";
import CryptocurrencyData from "../crypto-currencies-data/CryptocurrencyData";

const ccxt = require("ccxt");

const ExchangeTable = (props) => {
  const exchanges = useSelector((state) => state.exchanges.value);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);
  const [tableData, setTableData] = useState([]);

  const [inputSearch, setInputSearch] = useState("");

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

  const columns = [
    {
      field: "asset",
      title: "TOKEN",
      // sortable: true,
    },

    {
      field: "availableBalance",
      title: "AMOUNT",
      // sortable: true,
    },
    {
      field: "crossWalletBalance",
      title: "ALLOCATION",
      // sortable: true,
    },

    { field: "change", title: "CHANGE" },
    {
      field: "balance",
      title: "VALUE",
      // sortable: true,
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
          // width: "48vw",
          marginTop: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <Box
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
        </Box> */}
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

      {/* <Box
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
      </Box> */}

      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
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
          <Grid container spacing={1} alignContent={"stretch"}>
            <Grid item xs={12} sm={12} md={isDrawerOpen ? 12 : 6} lg={6}>
              <DataTable data={foundTableData} columns={columns} />
            </Grid>
            <Grid item xs={12} sm={12} md={isDrawerOpen ? 12 : 6} lg={6}>
              <CryptocurrencyData data={selectedAssets} />
            </Grid>
          </Grid>
        )}
      </Box>
      {/* </Container> */}
    </Box>
  );
};

export default ExchangeTable;
