import { DataGrid, GridColDef, DataGridSortIcon } from "@mui/x-data-grid";
import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import SearchBar from "../../widgets/SearchBar";
import Checkbox from "@material-ui/core/Checkbox";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import { signIn, getSession, useSession } from "next-auth/react";
import { Sort } from "../../../utils/icons";
import DataTable from "./DataTable";
import CryptocurrencyData from "../crypto-currencies-data/CryptocurrencyData";
const data = [
  {
    id: 1,
    token: "Binance BUSD",
    share: 2,
    change: 0,
    price: "100",
    amount: "150",
    total: "180",
  },
  {
    id: 2,
    token: "Binance BUSD",
    share: 2,
    change: "+2.98",
    price: "100",
    amount: "150",
    total: "180",
  },
  {
    id: 3,
    token: "Binance BUSD",
    share: 2,
    change: "-2.98",
    price: "100",
    amount: "150",
    total: "180",
  },
  {
    id: 4,
    token: "Binance BUSD",
    share: 2,
    change: "+2.98",
    price: "100",
    amount: "150",
    total: "180",
  },
  {
    id: 5,
    token: "Binance BUSD",
    share: 2,
    change: 0,
    price: "100",
    amount: "150",
    total: "180",
  },
  {
    id: 6,
    token: "Binance BUSD",
    share: 2,
    change: "-2.98",
    price: "100",
    amount: "150",
    total: "180",
  },
  {
    id: 7,
    token: "Binance BUSD",
    share: 2,
    change: "+2.98",
    price: "100",
    amount: "150",
    total: "180",
  },
  {
    id: 8,
    token: "Binance BUSD",
    share: 2,
    change: "+2.98",
    price: "100",
    amount: "150",
    total: "180",
  },
  {
    id: 9,
    token: "Binance BUSD",
    share: 2,
    change: "+2.98",
    price: "100",
    amount: "150",
    total: "180",
  },
  {
    id: 10,
    token: "Binance BUSD",
    share: 2,
    change: "+2.98",
    price: "100",
    amount: "150",
    total: "180",
  },
  {
    id: 11,
    token: "Binance BUSD",
    share: 2,
    change: "+2.98",
    price: "100",
    amount: "150",
    total: "180",
  },
  {
    id: 12,
    token: "Binance BUSD",
    share: 2,
    change: "+2.98",
    price: "100",
    amount: "150",
    total: "180",
  },
];

const ccxt = require("ccxt");

const ExchangeTable = () => {
  const exchanges = useSelector((state) => state.exchanges.value);
  const [tableData, setTableData] = useState([]);

  React.useEffect(() => {
    const symbol = ["BTC/USDT", "ETH/USDT"];
    if (exchanges?.length > 0) {
      const { USDMClient } = require("binance");
      const baseUrl = "https://testnet.binancefuture.com";
      const client = new USDMClient({
        api_key: exchanges[0]?.apiKey,
        api_secret: exchanges[0]?.apiSecret,
        baseUrl,
      });
      client
        .getBalance()
        .then((result) => {
          setTableData(
            result.map((item, i) => {
              return {
                ...item,
                id: i,
              };
            })
          );
        })
        .catch((err) => {
          console.error("getBalance error: ", err);
        });
      const binance = new ccxt.binance();
      binance
        .fetchTicker("BTC/USDT")
        .then((ticker) => {
          console.log(ticker);
        })
        .catch((error) => {
          console.error(`Error fetching ticker for ${"USDT"}: ${error}`);
        });
    }
  }, []);

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

  const columns = [
    { field: "token", title: "Token", sortable: true },
    { field: "share", title: "Share", sortable: true },
    { field: "change", title: "Change (24h)", sortable: true },
    { field: "price", title: "Price", sortable: true },
    { field: "amount", title: "Amount", sortable: true },
    { field: "total", title: "Total", sortable: true },
  ];

  const [value, setValue] = useState("usd");

  const handleToggle = (event, newValue) => {
    setValue(newValue);
  };
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
          <SearchBar />
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
        <Box
          sx={{
            background: "#19191985",
            padding: "0.25rem",
            borderRadius: "5px",
          }}
        >
          <ToggleButtonGroup
            value={value}
            exclusive
            onChange={handleToggle}
            aria-label="Platform"
            sx={{
              gap: "0.5rem",
            }}
          >
            <ToggleButton
              value="usd"
              style={{
                padding: "4px 15px",
                borderRadius: "3px",
                background: `${
                  value === "usd"
                    ? "linear-gradient(to right,#790D83,#7A5CFF)"
                    : "none"
                }`,
              }}
            >
              USD
            </ToggleButton>
            <ToggleButton
              value="btc"
              style={{
                padding: "4px 15px",
                borderRadius: "3px",
                background: `${
                  value === "btc"
                    ? "linear-gradient(to right,#790D83,#7A5CFF)"
                    : "none"
                }`,
              }}
            >
              BTC
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: "18px", pt: 3, pl: 1 }}>
        Portfolio Summary
      </Typography>
      {/* <Container
        sx={{
          // background: "#191919",
          // background:
          //   "linear-gradient(180deg, rgba(41, 8, 77, 0.72) 5%, #830d5c80 95%)",

          borderRadius: 2,
          // p: 1,
          // border: "1px solid #666666",
          marginTop: 3,
          marginBottom: 5,
          disableGutters: true,
          width: "48vw",
        }}
        component="main"
        //   width="30%"
      > */}
      {/* <DataGrid
        sx={{
          mt: 2,
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "&.MuiDataGrid-root": {
            border: "none",
          },
          ".MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          ".MuiDataGrid-row.Mui-even": {
            // backgroundColor: "#292929",
            backgroundColor: "#ffffff15",
            borderBottom: "none",
            backdropFilter: "blur(100px)",
            backgroundBlendMode: "overlay",
            borderTopLefttRadius: "15px",
          },
          height: 800,
          // width: "100%",
          padding: 0,
          width: "48vw",
          background: "rgba(41, 8, 77, 0.42)",
          "& .MuiDataGrid-iconSeparator svg": {
            color: "blue",
          },
          // marginTop: 5,
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
        }
        rowHeight={"55px"}
        // rows={tableData}
        rows={rows}
        columns={columns}
        pageSize={8}
        disableSelectionOnClick
      /> */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
          mb: 7,
        }}
      >
        <DataTable data={data} columns={columns} />
        <CryptocurrencyData />
      </Box>
      {/* </Container> */}
    </Box>
  );
};

export default ExchangeTable;
