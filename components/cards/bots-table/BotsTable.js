import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import SearchBar from "../../widgets/SearchBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  TextField,
  IconButton,
  InputBase,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Edit, Sort } from "../../../utils/icons";
const useStyles = makeStyles(() => ({
  input: {
    // width: "685px",
    height: "48px",
    backgroundColor: "#35193C",
    padding: "10px 12px",
    fontSize: 16,
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

// const columns = [
//   {
//     field: "name",
//     headerName: "Name",
//     width: 580,
//     renderHeader: () => {
//       return <strong>{"Name"}</strong>;
//     },
//     renderCell: (cellValues) => {
//       return (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//             }}
//           >
//             <div
//               style={{
//                 padding: 2,
//                 paddingLeft: 4,
//                 paddingRight: 4,
//                 marginRight: 8,
//                 backgroundColor: "#FFFFFF22",
//                 color: "#CCCCCC",
//                 // width: "48px",
//                 // height: "20px",
//                 // left: "222px",
//                 // top: "1502px",

//                 // backgroundColor: "#FFFFFF",
//                 // opacity: 0.6,
//                 backgroundBlendMode: "overlay",
//                 backdropFilter: blur("100px"),
//               }}
//             >
//               {cellValues.row.strategyTime === "short" ? "Short" : "Long"}
//             </div>
//             <div
//               style={{
//                 fontFamily: "Poppins",
//                 fontStyle: "normal",
//                 fontWeight: 400,
//                 fontSize: "16px",
//                 lineHeight: "24px",
//                 color: "#795BFF",
//               }}
//             >
//               {cellValues.row.name}
//             </div>
//           </div>
//           <div>{cellValues.row.description}</div>
//           <div
//             style={{
//               padding: 2,
//               paddingLeft: 4,
//               paddingRight: 4,
//               backgroundColor: "#FFFFFF22",
//               color: "#CCCCCC",
//               width: "206px",
//               // height: "20px",
//               // left: "222px",
//               // top: "1502px",

//               // backgroundColor: "#FFFFFF",
//               // opacity: 0.6,
//               backgroundBlendMode: "overlay",
//               backdropFilter: blur("100px"),
//             }}
//           >
//             {cellValues.row.botType}
//           </div>
//         </div>
//       );
//     },
//   },
//   {
//     field: "exchange",
//     headerName: "Exchange",
//     width: 280,
//     renderHeader: () => {
//       return <strong>{"Exchange"}</strong>;
//     },
//     renderCell: (cellValues) => {
//       return (
//         <div
//         // style={{
//         //   fontFamily: "Poppins",
//         //   fontStyle: "normal",
//         //   fontWeight: 400,
//         //   fontSize: "16px",
//         //   lineHeight: "24px",
//         //   color: "#795BFF",
//         // }}
//         >
//           <div
//             style={{
//               fontFamily: "Poppins",
//               fontStyle: "normal",
//               fontWeight: 400,
//               fontSize: "16px",
//               lineHeight: "24px",
//               color: "#795BFF",
//             }}
//           >
//             {cellValues.row.exchange}
//           </div>
//           <div>{cellValues.row.exchange}</div>
//         </div>
//       );
//     },
//   },
//   {
//     field: "pair",
//     headerName: "Pair",
//     width: 220,
//     sortable: false,
//     renderHeader: () => {
//       return <strong>{"Pair"}</strong>;
//     },
//     renderCell: (cellValues) => {
//       return (
//         <div
//           style={{
//             fontFamily: "Poppins",
//             fontStyle: "normal",
//             fontWeight: 400,
//             fontSize: "16px",
//             lineHeight: "24px",
//             color: "#795BFF",
//           }}
//         >
//           {cellValues.row.pair}
//         </div>
//       );
//     },
//   },
//   {
//     field: "activeDeal",
//     width: 160,
//     sortable: false,
//     renderHeader: () => {
//       return <strong>{"Active Deal"}</strong>;
//     },
//   },
//   {
//     field: "status",
//     headerName: "Status",
//     type: "boolean",
//     width: 200,
//     sortable: false,
//     renderHeader: () => {
//       return <strong>{"Status"}</strong>;
//     },
//     renderCell: (cellValues) => {
//       return <AntSwitch checked={cellValues.row.status} />;
//     },
//   },
//   {
//     headerName: "Action",
//     width: 200,
//     sortable: false,
//     renderHeader: () => {
//       return <strong>{"Action"}</strong>;
//     },
//     renderCell: (cellValues) => {
//       return (
//         <div
//           style={{
//             display: "flex",
//             float: "right",
//             justifyContent: "space-between",
//           }}
//         >
//           <div
//             style={{
//               padding: 2,
//               height: "30px",
//               paddingLeft: 5,
//               paddingRight: 5,
//               marginRight: 4,
//               backgroundColor: "#FFFFFF22",
//             }}
//           >
//             <VisibilityIcon />
//           </div>
//           <div
//             style={{
//               padding: 2,
//               height: "30px",
//               paddingLeft: 5,
//               paddingRight: 5,
//               marginRight: 4,
//               backgroundColor: "#FFFFFF22",
//             }}
//           >
//             <EditIcon />
//           </div>
//           <div
//             style={{
//               padding: 2,
//               height: "30px",
//               paddingLeft: 5,
//               paddingRight: 5,
//               backgroundColor: "#F87171",
//             }}
//           >
//             <DeleteIcon />
//           </div>
//         </div>
//       );
//     },
//   },
// ];

const rows = [
  // {
  //   id: 1,
  //   botName: "BTC Short bot Green Vector 15 Min",
  //   exchange: "Binance",
  //   strategyPair: "BTC/BUSD",
  //   activeDeal: "Yes",
  //   status: true,
  //   strategyType: "short",
  //   // description: "TP: 3.0% BO: 1.%, So: 0.25 %, OS: 1, 02, SOS: 0.25, MSTC: 1,",
  //   botType: "Trading View Custom Signal",
  // },
  {
    id: "640181ea8d59365339492f1b",
    botName: "bot 2.0",
    exchange: "OKX",
    botType: "Multiple Pair",
    strategyType: "Short",
    strategyPair: "BTC",
    orderSize: "100",
    availablePercentage: "89",
    safetyOrderSize: 12,
    candleSizeAndVol: "88",
    orderType: "Limit",
    profitCurrency: "ETH",
    indicator: "Vector Candle",
    indicatorValues: {
      redAction: "buy",
      purpleAction: "buy",
      blueAction: "sell",
      greenAction: "none",
      minimumTp: "22",
    },
    buyOnCondition: "12",
    avgPrice: "Below",
    avgPricePercent: 66,
    ignoreCondition: "22",
    maxOrders: "12",
    maxVol: "200",
    stopLoss: "Fixed",
    takeProfit: "Trailing TP",
    takeProfitPercent: 66,
  },
];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BotsTable = () => {
  const [value, setValue] = React.useState(0);
  const [tableRow, setTableRow] = React.useState([]);
  const [searchByBotsName, setSearchByBotsName] = React.useState("");
  const [width, setWidth] = React.useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  const handleSearch = (event) => {
    setSearchByBotsName(event.target.value);
  };
  useEffect(async () => {
    const response = await fetch("/api/user/create-strategy", {
      method: "GET",
    });

    const data = await response.json();
    let body = data.body.map((item) => {
      return {
        ...item,
        id: item._id,
      };
    });
    setTableRow(body);
  }, []);

  const columns = [
    {
      field: "botName",
      headerName: "Name",
      width: 450,
      disableColumnMenu: true,
      hideSortIcons: true,
      renderHeader: () => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            <strong>{"Name"}</strong>
            <Sort />
          </div>
        );
      },
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  padding: 2,
                  paddingLeft: 4,
                  paddingRight: 4,
                  marginRight: 8,
                  borderRadius: "4px",
                  marginBottom: "5px",
                  background:
                    cellValues.row.strategyTime === "short"
                      ? "#3A0B15"
                      : "#1E3332",
                  color: "#CCCCCC",
                  // width: "48px",
                  // height: "20px",
                  // left: "222px",
                  // top: "1502px",
                  // backgroundColor: "#FFFFFF",
                  // opacity: 0.6,
                  // backgroundBlendMode: "overlay",
                  // backdropFilter: blur("100px"),
                }}
              >
                {cellValues.row.strategyTime === "short" ? "Short" : "Long"}
              </div>
              <div
                style={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 420,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#795BFF",
                }}
              >
                {cellValues.row.botName}
              </div>
            </div>
            <div>{`TP: ${cellValues?.row?.indicatorValues?.minimumTp}%, BO: ${cellValues?.row?.buyOnCondition}%, SO: ${cellValues?.row?.safetyOrderSize}%, OS: ${cellValues?.row?.orderSize}, `}</div>
            <div
              style={{
                padding: 2,
                paddingLeft: 4,
                marginTop: "7px",
                // paddingRight: 4,
                backgroundColor: "#FFFFFF22",
                color: "#CCCCCC",
                borderRadius: "4px",
                // width: "206px",
                // height: "20px",
                // left: "222px",
                // top: "1502px",

                // backgroundColor: "#FFFFFF",
                // opacity: 0.6,
                backgroundBlendMode: "overlay",
                backdropFilter: blur("100px"),
              }}
            >
              {cellValues.row.botType}
            </div>
          </div>
        );
      },
    },
    {
      field: "exchange",
      headerName: "Exchange",
      width: 220,
      disableColumnMenu: true,
      hideSortIcons: true,
      renderHeader: () => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            <strong>{"Exchange"}</strong>
            <Sort />
          </div>
        );
      },
      renderCell: (cellValues) => {
        return (
          <div
          // style={{
          //   fontFamily: "Poppins",
          //   fontStyle: "normal",
          //   fontWeight: 400,
          //   fontSize: "16px",
          //   lineHeight: "24px",
          //   color: "#795BFF",
          // }}
          >
            <div
              style={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#795BFF",
              }}
            >
              {cellValues.row.exchange}
            </div>
            <div>{cellValues.row.exchange}</div>
          </div>
        );
      },
    },
    {
      field: "pair",
      headerName: "Pair",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return <strong>{"Pair"}</strong>;
      },
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#795BFF",
            }}
          >
            {cellValues.row.strategyPair}
          </div>
        );
      },
    },
    {
      field: "activeDeal",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return <strong>{"Active Deal"}</strong>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      type: "boolean",
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return <strong>{"Status"}</strong>;
      },
      renderCell: (cellValues) => {
        return (
          <AntSwitch
            // color={
            //   cellValues.row.status
            //     ? "linear-gradient(to right,#790D83,#7A5CFF)"
            //     : "#5A2B6A"
            // }
            checked={cellValues.row.status}
          />
        );
      },
    },
    {
      headerName: "Action",
      width: 170,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return <strong>{"Action"}</strong>;
      },
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              display: "flex",
              float: "right",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                padding: 2,
                height: "30px",
                paddingLeft: 5,
                paddingRight: 5,
                marginRight: 4,
                borderRadius: "5px",
                backgroundColor: "#5B2A6D",
                cursor: "pointer",
              }}
            >
              <VisibilityIcon />
            </div>
            <div
              style={{
                padding: 4,
                height: "30px",
                width: "35px",
                paddingLeft: 6,
                marginRight: 4,
                borderRadius: "5px",
                backgroundColor: "#5B2A6D",
                cursor: "pointer",
              }}
            >
              <Edit
                viewBox="0 0 15 15"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <div
              style={{
                padding: 2,
                height: "30px",
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: "5px",
                backgroundColor: "#CB5F5F",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(cellValues.row)}
            >
              <DeleteIcon />
            </div>
          </div>
        );
      },
    },
  ];

  // React.useEffect(() => {
  //   setTableRow(rows);
  // }, []);

  React.useEffect(() => {
    switch (value) {
      case 0:
        setTableRow(rows);
        break;
      case 1:
        setTableRow(rows.filter((item) => item.status === true));
        break;
      case 2:
        setTableRow(rows.filter((item) => item.status === false));
        break;
      case 3:
        setTableRow(rows.filter((item) => item.strategyTime === "short"));
        break;
      case 4:
        setTableRow(rows.filter((item) => item.strategyTime === "long"));
        break;
      case 5:
        setTableRow(rows.filter((item) => item.exchange === "Binance"));
        break;
      case 6:
        setTableRow(
          rows.filter((item) => item.exchange === "Binance Futures USDT-M")
        );
        break;
      default:
        break;
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const handleDelete = (newValue, event) => {
    console.log(newValue, event);
    setTableRow(tableRow.filter((item) => item.id !== newValue.id));
  };
  const handleClearFilter = () => {
    setTableRow(rows);
  };

  const classes = useStyles();
  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 2.5,
          minWidth: "100%",
          my: 5.5,
        }}
      >
        <Button
          sx={{
            background: "linear-gradient(to right,#790D83,#7A5CFF)",
            textTransform: "none",
            border: "none",
            transition: "transform 0.2s",
            borderRadius: "5px",
            padding: "8px 15px",
            "&:hover": {
              transform: "scale(0.95)",
              backgroundColor: "linear-gradient(to right,#790D83,#7A5CFF)",
              cursor: "pointer",
            },
          }}
        >
          <Typography sx={{ color: "white", fontSize: "13px" }}>
            {" "}
            Stop All Bots
          </Typography>
        </Button>
        <Button
          sx={{
            background: "linear-gradient(to right,#790D83,#7A5CFF)",
            textTransform: "none",
            border: "none",
            transition: "transform 0.2s",
            borderRadius: "5px",
            padding: "8px 15px",
            "&:hover": {
              transform: "scale(0.95)",
              backgroundColor: "linear-gradient(to right,#790D83,#7A5CFF)",
              cursor: "pointer",
            },
          }}
        >
          <Typography sx={{ color: "white", fontSize: "13px" }}>
            {" "}
            Start All Bots
          </Typography>
        </Button>
        <Button
          sx={{
            background: "linear-gradient(to right,#790D83,#7A5CFF)",
            textTransform: "none",
            border: "none",
            transition: "transform 0.2s",
            borderRadius: "5px",
            padding: "8px 15px",
            "&:hover": {
              transform: "scale(0.95)",
              backgroundColor: "linear-gradient(to right,#790D83,#7A5CFF)",
              cursor: "pointer",
            },
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            {" "}
            Sell At Market All Bots
          </Typography>
        </Button>
      </Container>
      <Container
        sx={{
          background: "#2C162F",
          borderRadius: 2,
          p: 3,
          marginTop: 5,
          marginBottom: 5,
          disableGutters: true,
        }}
        component="main"
        maxWidth="100%"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            marginBottom: 5,
            "& .MuiTabs-indicator": {
              backgroundColor: "white",
            },
          }}
        >
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="All"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Enabled"
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Disabled"
            {...a11yProps(2)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Short"
            {...a11yProps(3)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Long"
            {...a11yProps(4)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Binance"
            {...a11yProps(5)}
          />
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Binance Futures USDT-M"
            {...a11yProps(6)}
          />
        </Tabs>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={4} xl={4}>
            <InputBase
              placeholder="Search by bot's name"
              sx={{
                minWidth: "100%",
                height: "38px",
                background: "#ffffff1f",
                borderRadius: "3px",
                fontSize: 16,
              }}
              value={searchByBotsName}
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton
                    style={{
                      color: "white",
                      paddingRight: "0px",
                      paddingLeft: "5px",
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={5} sm={5} xl={6}>
            <InputBase
              placeholder="Pairs"
              sx={{
                minWidth: "100%",
                height: "38px",
                paddingLeft: "10px",
                background: "#ffffff1f",
                borderRadius: "3px",
                fontSize: 16,
              }}
            />
          </Grid>
          <Grid item xs={3} sm={3} xl={2}>
            <Button
              sx={{
                background: "linear-gradient(to right,#790D83,#7A5CFF)",
                textTransform: "none",
                border: "none",
                transition: "transform 0.2s",
                borderRadius: "7px",
                padding: "6px 15px",
                width: "100%",
                "&:hover": {
                  transform: "scale(0.95)",
                  backgroundColor: "linear-gradient(to right,#790D83,#7A5CFF)",
                  cursor: "pointer",
                },
              }}
              variant="contained"
              onClick={handleClearFilter}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
        {/* <Box sx={{ height: 709, disableGutters: true, width: "100%"}}> */}
        <Box
          sx={{
            width: "100%",
            ...(width >= 1600 && {
              width: "100%",
              pl: 7,
              pr: 5,
            }),
            ...(width >= 1800 && {
              width: "100%",
              pl: 14,
              pr: 14,
            }),
          }}
        >
          <Box
            sx={{
              "::-webkit-scrollbar-vertical": {
                display: "none",
              },
              // minWidth: "100%",
              px: 0,
            }}
          >
            <DataGrid
              sx={{
                ".MuiDataGrid-columnSeparator": {
                  display: "none",
                },
                "&.MuiDataGrid-root": {
                  border: "none",
                },
                " & .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                ".MuiDataGrid-cell:focus-within": {
                  outline: "none !important",
                },
                ".MuiDataGrid-row.Mui-even": {
                  backgroundColor: "#2D1537",
                  backgroundBlendMode: "overlay",
                },
                height: 710,
                // minWidth: "100%",
                padding: 0,
                marginTop: 5,
              }}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0
                  ? "Mui-even"
                  : "Mui-odd"
              }
              rowHeight={"110px"}
              rows={tableRow}
              columns={columns}
              pageSize={5}
              checkboxSelection
              disableSelectionOnClick
            />
          </Box>
        </Box>
        {/* </Box> */}
      </Container>
    </>
  );
};

export default BotsTable;
