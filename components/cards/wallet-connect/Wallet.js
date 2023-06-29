import React, { useState, useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Select from "react-select";
import emailjs from "@emailjs/browser";
import nc from "next-connect";
import { createProxyMiddleware } from "http-proxy-middleware";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import { signIn, getSession, useSession } from "next-auth/react";
import SelectInput from "../../widgets/SelectInput";
import { useSelector, useDispatch } from "react-redux";
import { setExchange } from "../../../slices/exchange-slice";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

const ccxt = require("ccxt");

const cryptoSymbols = [
  "BTC", // Bitcoin
  "ETH", // Ethereum
  "XRP", // Ripple
  "BCH", // Bitcoin Cash
  "LTC", // Litecoin
  "ADA", // Cardano
  "DOT", // Polkadot
  "LINK", // Chainlink
  "XLM", // Stellar
  "DOGE", // Dogecoin
  "USDT", // Tether
  "BNB", // Binance Coin
  "XMR", // Monero
  "UNI", // Uniswap
  "EOS", // EOS
  "TRX", // TRON
  "XTZ", // Tezos
  "VET", // VeChain
  "DASH", // Dash
  "ZEC", // Zcash
];

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#292929",
    border: "1px solid #ced4da",
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
      borderColor: theme.palette.primary.main,
    },
  },
}));

const exchangeTypes = [
  "Binance Futures Testnet",
  "Binance Futures",
  "Binance Spot",
];

import CryptoRates from "../crypto-rates/CryptoRates";
import { Btc } from "../../../utils/icons";

const Wallet = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connectionData, setConnectionData] = useState();

  const [loading, setLoading] = useState(true);
  const [selectedExchange, setSelectedExchange] = useState("Select Exchange");

  const [allExchangesAssetsData, setAllExchangesAssetsData] = useState([]);

  const [allExchange, setAllExchange] = useState([]);

  const [selectedAssets, setSelectedAssets] = useState({});
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleAssetChange = (selectedOption, exchangeName) => {
    setSelectedAssets((prevSelectedAssets) => ({
      ...prevSelectedAssets,
      [exchangeName]: selectedOption,
    }));
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      cursor: "default",
      background: "none",
      border: "1.5px solid #764080",
      boxShadow: "none",
    }),
    menu: (provided) => ({
      ...provided,
      background: "#452951",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "white",
      background: state.isSelected ? "#5D3FA6" : "transparent",
      cursor: "pointer",
      "&:hover": {
        background: state.isSelected ? "#5D3FA6" : "transparent",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
  };

  useEffect(() => {
    fetchAssetsFromUserInfo();
  }, []);

  const fetchAssetsFromUserInfo = async () => {
    const { user } = await getSession();
    console.log("session", user);
    const response = await fetch(`/api/user/get-user-info?id=${user.id}`, {
      method: "GET",
    });
    const data = await response.json();

    if (data.body.exchanges[0]) {
      setAllExchange(data.body.exchanges);
      const allExchangesAssets = await getExchangesAssets(data.body.exchanges);
      console.log(allExchangesAssets);
      setAllExchangesAssetsData(allExchangesAssets);
      setConnected(true);
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

        // const { USDMClient } = require("binance");
        // const baseUrl = "https://testnet.binancefuture.com";
        // const client = new USDMClient({
        //   api_key: item?.apiKey,
        //   api_secret: item?.apiSecret,
        //   baseUrl,
        // });

        const binance = new ccxt.binance();
        // console.log("client is ", client);
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
                // result = data;
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
          // const result = await client.getBalance();
          // console.log("getBalance result: ", result);
          if (item?.exchangeName === "Binance Spot") {
            console.log("spot is", result);
            // const newResult = result.filter(item=> item.free !== "0")
            for (const asset of result) {
              if (asset.coin === "USDT") {
                asset["usdtBal"] = +asset.free;
                asset["asset"] = asset.coin;
              } else {
                // const symbol = asset.coin;
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
                // const symbol = `${asset.coin}/USDT`;

                // const ticker = await binance.fetchTicker(symbol);
                // const usdtPrice = ticker.last;
                // const usdtBalance = parseFloat(asset.free) * usdtPrice;
                // asset["usdtBal"] = usdtBalance;
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

    const singleExchangesAssets = await getExchangesAssets([dataObject]);
    console.log(singleExchangesAssets);

    let oldExchangesAssets = [...allExchangesAssetsData];

    oldExchangesAssets.push(...singleExchangesAssets);

    setAllExchangesAssetsData(oldExchangesAssets);

    setConnected(true);
    setShowDrawer(false);

    let url;

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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}exchanges/${userInfo.id}`,
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
    if (response.ok) {
      const resp = await response.json();
      // setAllExchange(resp.body?.exchanges);
      // setSelectedExchange(data.get("name"));

      if (resp.body?.balances) {
        // setConnectionData(resp.body);
        // setConnected(true);
        // setShowDrawer(false);
      }
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
    let session = await getSession();
    const response = await fetch(
      `/api/user/delete-exchange?id=${session.user.id}`,
      {
        method: "DELETE",
        body: JSON.stringify({ exchangeId: id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resp = await response.json();
    console.log(resp);
    setAllExchangesAssetsData(
      allExchangesAssetsData.filter((item) => item._id !== id)
    );
  };

  return (
    <>
      <div style={{ margin: "40px 0px" }}>
        <CryptoRates />
      </div>

      <Button
        type="submit"
        variant="contained"
        sx={{
          my: 2,
          ml: 0.5,
          textTransform: "none",
          background: "linear-gradient(90deg, #790D83 0%, #7A5CFF 100%)",
          color: "white",
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

      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "black",
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
            variant="h5"
            color="white"
            sx={{ textAlign: "center", mt: 17, mb: 2 }}
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
          <Button type="submit" sx={{ mt: 2 }} fullWidth variant="contained">
            Connect
          </Button>
        </Box>
      </Drawer>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : connected ? (
        <Grid container spacing={1}>
          {allExchangesAssetsData?.map((data, index) => (
            <Grid item xs={4} key={index}>
              <Card
                sx={{
                  backgroundImage:
                    "url(https://i.postimg.cc/K8q3CHyH/Rectangle-18960.png)",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  p: "2vw",
                }}
              >
                <CardContent>
                  <Typography fontSize={"1.1rem"} fontWeight={500}>
                    {data.exchangeName}
                  </Typography>
                  <Typography color={"#9F90A2"} fontSize={"0.9rem"}>
                    Assets
                  </Typography>
                  <Box my={2}>
                    <Select
                      options={data.assets.map((asset) => ({
                        value: asset,
                        label: asset.asset,
                      }))}
                      onChange={(selectedOption) =>
                        handleAssetChange(selectedOption, data.exchangeName)
                      }
                      value={selectedAssets[data.exchangeName]}
                      styles={customStyles}
                      placeholder="Select Asset"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography color={"#9F90A2"}>Available</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography color={"#9F90A2"} fontWeight={500}>
                        {selectedAssets[data.exchangeName]
                          ? selectedAssets[
                              data.exchangeName
                            ]?.value?.usdtBal.toFixed(2)
                          : "0.00"}
                      </Typography>
                      <Typography color={"#5D3FA6"} fontWeight={500}>
                        USDT
                      </Typography>
                    </Box>
                  </Box>
                  {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography color={"#9F90A2"}>Locked Balances</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography color={"#9F90A2"} fontWeight={500}>
                      {selectedAssets[data.exchangeName]
                        ? selectedAssets[data.exchangeName].value
                            .crossWalletBalance
                        : "0.00"}
                    </Typography>
                    <Typography color={"#5D3FA6"} fontWeight={500}>
                      USDT
                    </Typography>
                  </Box>
                </Box> */}
                  <Button
                    sx={{
                      background: "#C8181A",
                      textTransform: "none",
                      color: "white",
                      float: "right",
                      my: 2,
                      px: 1.5,
                    }}
                    onClick={() => handleDeleteExchange(data?._id)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          <Typography sx={{ marginBottom: 2 }}>No Wallet Connected</Typography>
        </Box>
      )}
    </>
  );
};

export default Wallet;
