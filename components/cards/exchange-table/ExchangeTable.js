import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import SearchBar from "../../widgets/SearchBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { InputBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { useSelector, useDispatch } from "react-redux";

import { signIn, getSession, useSession } from "next-auth/react";

const rows = [
  {
    id: 1,
    token: "Binance BUSD",
    share: 2,
    change: "+2.98",
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
    change: "-2.98",
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

  const columns = [
    {
      field: "asset",
      headerName: "Token",
      width: 108,
      renderHeader: () => {
        return <strong>{"Token"}</strong>;
      },
      // renderCell: (cellValues) => {
      //   // let newValue = cellValues.value.split(" ");
      //   return (
      //     <div
      //       style={{
      //         display: "flex",
      //         flexDirection: "column",
      //       }}
      //     >
      //       <div>{cellValues}</div>
      //       {/* <div>{newValue[1]}</div> */}
      //     </div>
      //   );
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
      field: "crossWalletBalance",
      width: 109,
      renderHeader: () => {
        return <strong>{"Price"}</strong>;
      },
    },
    {
      field: "availableBalance",
      headerName: "Amount",
      width: 122,
      renderHeader: () => {
        return <strong>{"Amount"}</strong>;
      },
      // renderCell: (cellValues) => {
      //   // let newValue = cellValues.value.split(" ");
      //   return (
      //     <div
      //       style={{
      //         display: "flex",
      //         flexDirection: "column",
      //       }}
      //     >
      //       <div>{cellValues}</div>
      //     </div>
      //   );
      // },
    },
    {
      field: "balance",
      headerName: "Total",
      width: 110,
      renderHeader: () => {
        return <strong>{"Total"}</strong>;
      },
    },
  ];

  return (
    <Container
      sx={{
        background: "#191919",
        borderRadius: 1,
        p: 1,
        border: "1px solid #666666",
        marginTop: 5,
        marginBottom: 5,
        disableGutters: true,
        width: "42vw",
      }}
      component="main"
      //   width="30%"
    >
      <DataGrid
        sx={{
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
            backgroundColor: "#292929",
            backgroundBlendMode: "overlay",
          },
          height: 749,
          width: "100%",
          padding: 0,
          // marginTop: 5,
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
        }
        rowHeight={"80px"}
        rows={tableData}
        columns={columns}
        pageSize={8}
        disableSelectionOnClick
      />
    </Container>
  );
};

export default ExchangeTable;
