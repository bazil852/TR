import React, { useState, useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import Select from "react-select";
import { getSession } from "next-auth/react";
import SelectInput from "../../widgets/SelectInput";
import {
  InputBase,
  Box,
  Drawer,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Switch,
} from "@mui/material";

const ccxt = require("ccxt");

const cryptoSymbols = [
  "BTC",
  "ETH",
  "XRP",
  "BCH",
  "LTC",
  "ADA",
  "DOT",
  "LINK",
  "XLM",
  "DOGE",
  "USDT",
  "BNB",
  "XMR",
  "UNI",
  "EOS",
  "TRX",
  "XTZ",
  "VET",
  "DASH",
  "ZEC",
];

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#292929",
    fontFamily: "Barlow,san-serif",
    border: "1px solid #B3B4B9",
    fontSize: 16,
    color: "#CCCCCC",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: "#B3B4B9",
    },
  },
}));
const exchangeTypes = [
  "Binance Futures Testnet",
  "Binance Futures",
  "Binance Spot",
];
import GraphOfConsolidatedPOrtfolio from "../consolidated-invested-portfolio/GraphOfConsolidatedPOrtfolio";

const Draw = styled(Drawer)({
  "& .MuiDrawer-paper": {
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "grey",
      borderRadius: "20px",
    },
  },
});

const Wallet = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connectionData, setConnectionData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedExchange, setSelectedExchange] = useState("Select Exchange");
  const [allExchange, setAllExchange] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState({});
  const [switchStates, setSwitchStates] = useState(
    allExchange.map(() => false)
  );

  const handleChange = (index) => {
    const newSwitchStates = [...switchStates];
    newSwitchStates[index] = !newSwitchStates[index];
    setSwitchStates(newSwitchStates);
  };

  const handleAssetChange = (selectedOption, exchangeName) => {
    console.log(selectedOption, exchangeName);
    setSelectedAssets((prevSelectedAssets) => ({
      ...prevSelectedAssets,
      [exchangeName]: selectedOption,
    }));
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      cursor: "default",
      border: "1px solid #B3B4B9",
      backgroundColor: "#27292A",
    }),
    menu: (provided) => ({
      ...provided,
      background: "#27292A",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "white",
      background: state.isSelected ? "#27292A" : "transparent",
      cursor: "pointer",
      "&:hover": {
        background: state.isSelected ? "#27292A" : "transparent",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    menuList: (provided) => ({
      ...provided,
      "&::-webkit-scrollbar": {
        width: "4px",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),
  };

  useEffect(() => {
    fetchAssetsFromUserInfo();
  }, []);

  const fetchAssetsFromUserInfo = async () => {
    const { user } = await getSession();
    console.log(user);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}exchanges/${user.id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      setAllExchange(data);
      if (data.length > 0) {
        setConnected(true);
      } else {
        setConnected(false);
      }

      // const allExchangesAssets = await getExchangesAssets(data.body.exchanges);
      // console.log(allExchangesAssets);
      // setAllExchangesAssetsData(allExchangesAssets);
      setShowDrawer(false);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getExchangesAssets = async (data) => {
    console.log(data);

    let exchangeArray = [];
    let client;
    await Promise.all(
      data.map(async (item) => {
        if (item?.exchangeName === "Binance Futures Testnet") {
          const { USDMClient } = require("binance");
          console.log("Exchangee", item);
          const baseUrl = "https://testnet.binancefuture.com";
          client = new USDMClient({
            api_key: item?.apiKey,
            api_secret: item?.apiSecret,
            baseUrl,
            recvWindow: 10000,
          });
        }
        if (item?.exchangeName === "Binance Futures") {
          const { USDMClient } = require("binance");
          console.log("Exchangee", item);
          client = new USDMClient({
            api_key: item?.apiKey,
            api_secret: item?.apiSecret,
            recvWindow: 10000,
          });
        }
        if (item?.exchangeName === "Binance Spot") {
          const { MainClient } = require("binance");
          console.log("Exchangee", item);
          client = new MainClient();
        }

        const binance = new ccxt.binance();
        try {
          let result;
          if (item?.exchangeName === "Binance Spot") {
            console.log("Testing new server.");
            await fetch("https://binance1.herokuapp.com/api/binance/balances", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(item),
            })
              .then((response) => response.json())
              .then((data) => {
                result = data.filter((item) =>
                  cryptoSymbols.includes(item.coin)
                );
                console.log("Result from server: ", data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });

            console.log("getBalance result: ", result);
          } else {
            result = await client.getBalance();
            console.log("getBalance result: ", result);
          }
          if (item?.exchangeName === "Binance Spot") {
            console.log("spot is", result);
            for (const asset of result) {
              if (asset.coin === "USDT") {
                asset["usdtBal"] = +asset.free;
                asset["asset"] = asset.coin;
              } else {
                try {
                  const symbol = `${asset.coin}/USDT`;

                  const ticker = await binance.fetchTicker(symbol);
                  const usdtPrice = ticker.last;
                  const usdtBalance = parseFloat(asset.free) * usdtPrice;
                  asset["usdtBal"] = usdtBalance;
                  asset["asset"] = asset.coin;
                } catch (err) {
                  console.log(err);
                }
              }
            }
          } else {
            for (const asset of result) {
              if (asset.asset === "USDT") {
                asset["usdtBal"] = asset.balance;
              } else {
                const symbol = `${asset.asset}/USDT`;
                const ticker = await binance.fetchTicker(symbol);
                const usdtPrice = ticker.last;
                const usdtBalance = parseFloat(asset.balance) * usdtPrice;
                asset["usdtBal"] = usdtBalance;
              }
            }
          }

          exchangeArray.push({
            _id: item?._id,
            exchangeName: item.name,
            assets: result,
          });
        } catch (err) {
          console.error("getBalance error: ", err);
        }
      })
    );

    return exchangeArray;
  };

  const handleClose = () => {
    setShowDrawer(false);
  };
  const handleConnectAccount = () => {
    setShowDrawer(true);
  };

  const handleBinance = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let dataObject = {};

    for (let pair of data.entries()) {
      dataObject[pair[0]] = pair[1];
    }

    console.log(dataObject);

    setConnected(true);
    setShowDrawer(false);

    if (event.currentTarget?.exchangeName === "Binance Futures Testnet") {
      url = "https://www.google.com/";
    }
    if (event.currentTarget?.exchangeName === "Binance Futures") {
      url = "https://www.google.com/";
    }
    if (event.currentTarget?.exchangeName === "Binance Spot") {
      url = "https://www.google.com/";
    }

    let session = await getSession();

    const body = [
      ...allExchange,
      {
        exchangeType: data.get("exchangeName"),
        exchangeName: data.get("name"),
        apiKey: data.get("apiKey"),
        apiSecret: data.get("apiSecret"),
      },
    ];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}exchanges/${session.user.id}`,
      {
        method: "POST",
        body: JSON.stringify({
          exchangeType: data.get("exchangeName"),
          exchangeName: data.get("name"),
          apiKey: data.get("apiKey"),
          secretKey: data.get("apiSecret"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resp = await response.json();
    console.log(resp);
    setAllExchange([...allExchange, resp]);
    setSelectedExchange(data.get("name"));

    if (response.ok) {
      setConnected(true);
      setShowDrawer(false);
    }
  };

  const handleExchangeOnChange = (event) => {
    console.log(event.target.value);

    var ccxt = require("ccxt");
    const { USDMClient } = require("binance");

    const API_KEY = event.target.value.apiKey;
    const API_SECRET = event.target.value.apiSecret;
    const baseUrl = "https://testnet.binancefuture.com";
    const client = new USDMClient({
      api_key: API_KEY,
      api_secret: API_SECRET,
      baseUrl,
    });

    client
      .getBalance()
      .then((result) => {
        console.log("getBalance result: handleExchange", result);
        setConnectionData(result);
        setConnected(true);
        setShowDrawer(false);
      })
      .catch((err) => {
        console.error("getBalance error: ", err);
      });
  };

  const handleDeleteExchange = async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}exchanges/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const newExchanges = allExchange.filter(
        (item) => item.exchange.id !== id
      );
      setAllExchange(newExchanges);
    }
  };

  console.log("allExchange", selectedAssets);

  const totalAssets = [
    {
      asset: "USDT",
      availableBalance: 26869.36865522,
      usdt_price: 2682.82340546,
    },
    {
      asset: "BTC",
      availableBalance: 0.07095732,
      usdt_price: 247.920650792,
    },
    {
      asset: "BUSD",
      availableBalance: 2000.80032012,
      usdt_price: 200.600240087988,
    },
    {
      asset: "ETH",
      availableBalance: 1.04312268,
      usdt_price: 1950.4307870639998,
    },
    {
      asset: "BNB",
      availableBalance: 5.95036998,
      usdt_price: 1460.81583009,
    },
    {
      asset: "USDC",
      availableBalance: 0,
      usdt_price: 0,
    },
  ];
  const [width, setWidth] = useState(globalThis?.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box>
      <Button
        type="submit"
        variant="contained"
        sx={{
          my: 2,
          ml: 0.5,
          textTransform: "none",
          background: "linear-gradient(90deg, #790D83 0%, #7A5CFF 100%)",
          color: "white",
          fontFamily: "Barlow,san-serif",
          fontWeight: "600",
          "&:hover": {
            background: "linear-gradient(90deg, #790D83 0%, #7A5CFF 100%)",
            opacity: 0.9,
          },
        }}
        onClick={handleConnectAccount}
      >
        + Add Exchange
      </Button>

      <Draw
        PaperProps={{
          sx: {
            backgroundColor: "black",
            pb: 10,
          },
        }}
        anchor="right"
        open={showDrawer}
        onClose={handleClose}
      >
        <Box
          sx={{
            width: 300,
            p: 1,
          }}
          role="presentation"
          component="form"
          onSubmit={handleBinance}
        >
          <Typography
            variant="h4"
            color="white"
            sx={{
              textAlign: "center",
              mt: 5,
              mb: 2,
              fontFamily: "Barlow, san-serif",
              fontWeight: 600,
            }}
          >
            Connect Exchange
          </Typography>
          <Typography color="white" variant="p">
            Select Exchange:
          </Typography>
          <SelectInput
            placeHolder={"Select Exchange"}
            options={exchangeTypes}
            width={"100%"}
            keyName={"exchangeName"}
          />
          <Typography color="white" variant="p">
            Name:
          </Typography>
          <ValidationTextField
            sx={{ mb: 1 }}
            size="small"
            required
            fullWidth
            id="name"
            name="name"
            autoFocus
          />
          <Typography color="white" variant="p">
            API Key:
          </Typography>
          <ValidationTextField
            sx={{ mb: 1 }}
            size="small"
            required
            fullWidth
            id="apiKey"
            name="apiKey"
            autoFocus
          />
          <Typography color="white" variant="p">
            API Secret:
          </Typography>
          <ValidationTextField
            sx={{ mb: 1 }}
            size="small"
            required
            fullWidth
            id="apiSecret"
            name="apiSecret"
            autoFocus
          />
          <Button
            type="submit"
            sx={{
              mt: 2,
              background: "linear-gradient(90deg, #790D83 0%, #7A5CFF 100%)",
              fontFamily: "Barlow, san-serif",
            }}
            fullWidth
            variant="contained"
          >
            Connect
          </Button>
        </Box>
      </Draw>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : connected ? (
        <Grid container spacing={1} mb={8}>
          {allExchange?.map((data, index) => {
            console.log("exchange card", data);
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <Card
                  sx={{
                    background: "#262626",
                    boxShadow: "none",
                    p: "1vw",
                    minWidth: "100%",
                    minHeight: 550,
                  }}
                >
                  <CardContent>
                    <Box sx={{ height: 80 }}>
                      <Typography
                        fontFamily={"Barlow,san-serif"}
                        fontWeight={600}
                        fontSize={20}
                      >
                        {`${data.exchange.exchange_name} : ${data.exchange.exchange_type}`}
                      </Typography>
                      <Typography
                        color={"#ACB2B7"}
                        fontSize={"0.9rem"}
                        fontFamily={"Barlow,san-serif"}
                      >
                        Assets
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          pr:
                            width < 900 && width > 700
                              ? 13
                              : width < 700 && width > 600
                              ? 6
                              : width < 600 && width > 500
                              ? 13
                              : width < 500 && width > 400
                              ? 8
                              : width < 400
                              ? 5
                              : "",
                        }}
                      >
                        <GraphOfConsolidatedPOrtfolio data={data.assets} />
                      </Box>
                      <Box my={2}>
                        <Select
                          options={data.assets.map((asset) => ({
                            value: asset,
                            label: asset.coin_name,
                          }))}
                          onChange={(selectedOption) =>
                            handleAssetChange(
                              selectedOption,
                              data.exchange.exchange_name
                            )
                          }
                          value={selectedAssets[data.exchangeName]}
                          styles={customStyles}
                          placeholder="Select Asset"
                          isSearchable={false}
                          menuPortalTarget={document.body}
                          menuPosition={"fixed"}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          color={"#ACB2B7"}
                          fontFamily={"Barlow,san-serif"}
                        >
                          Available
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Typography
                            color={"#ACB2B7"}
                            fontWeight={500}
                            fontFamily={"Barlow,san-serif"}
                          >
                            {selectedAssets[data.exchange.exchange_name]
                              ? selectedAssets[
                                  data.exchange.exchange_name
                                ]?.value?.usdt_price.toFixed(2)
                              : "0.00"}
                          </Typography>
                          <Typography
                            color={"#B3B4B9"}
                            fontWeight={500}
                            fontFamily={"Barlow,san-serif"}
                          >
                            USDT
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        pt: 3,
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          color={"#FFFFFF"}
                          fontWeight={600}
                          fontFamily={"Barlow,san-serif"}
                        >
                          Add to Portfolio
                        </Typography>
                        <Switch
                          checked={switchStates[index]}
                          onChange={() => handleChange(index)}
                          name={`switch-${index}`}
                          inputProps={{
                            "aria-label": `controlled switch ${index}`,
                          }}
                          sx={{
                            "& .MuiSwitch-track": {
                              background: switchStates[index]
                                ? "#7A5CFF"
                                : "#FFFFFF",
                            },
                            "& .MuiSwitch-thumb": {
                              background: switchStates[index]
                                ? "#FFFFFF"
                                : "#ACB2B7",
                            },
                          }}
                        />
                      </Box>
                      <Button
                        sx={{
                          background: "#C8181A",
                          textTransform: "none",
                          color: "white",
                          px: 1.5,
                          fontFamily: "Barlow,san-serif",
                        }}
                        onClick={() => handleDeleteExchange(data?.exchange.id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box>
          <Typography
            sx={{
              marginBottom: 2,
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
              color: "#ACB2B7",
              fontWeight: 600,
              pl: 1,
            }}
          >
            No Wallet Connected
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Wallet;
