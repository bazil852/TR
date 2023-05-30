import React, { useState, useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
// import { ccxt } from 'ccxt';
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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

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

const updatedExchangeData = [
  {
    exchangeName: "Binance Test 1.0",
    assets: [
      {
        accountAlias: "FzmYfWFzSgSgsR",
        asset: "BTC",
        balance: "0.03547866",
        crossWalletBalance: "0.03547866",
        crossUnPnl: "0.00000000",
        availableBalance: "0.03547866",
        maxWithdrawAmount: "0.03547866",
        marginAvailable: true,
        updateTime: 1682544381895,
      },
      {
        accountAlias: "FzmYfWFzSgSgsR",
        asset: "BNB",
        balance: "0.03547866",
        crossWalletBalance: "0.03547866",
        crossUnPnl: "0.00000000",
        availableBalance: "0.03547866",
        maxWithdrawAmount: "0.03547866",
        marginAvailable: true,
        updateTime: 1682544381895,
      },
      {
        accountAlias: "FzmYfWFzSgSgsR",
        asset: "ETH",
        balance: "0.03547866",
        crossWalletBalance: "0.03547866",
        crossUnPnl: "0.00000000",
        availableBalance: "0.03547866",
        maxWithdrawAmount: "0.03547866",
        marginAvailable: true,
        updateTime: 1682544381895,
      },
    ],
  },
  {
    exchangeName: "Binance Test 2.0",
    assets: [
      {
        accountAlias: "FzmYfWFzSgSgsR",
        asset: "BTC",
        balance: "0.03547866",
        crossWalletBalance: "0.03547866",
        crossUnPnl: "0.00000000",
        availableBalance: "0.03547866",
        maxWithdrawAmount: "0.03547866",
        marginAvailable: true,
        updateTime: 1682544381895,
      },
      {
        accountAlias: "FzmYfWFzSgSgsR",
        asset: "BNB",
        balance: "0.03547866",
        crossWalletBalance: "0.03547866",
        crossUnPnl: "0.00000000",
        availableBalance: "0.03547866",
        maxWithdrawAmount: "0.03547866",
        marginAvailable: true,
        updateTime: 1682544381895,
      },
      {
        accountAlias: "FzmYfWFzSgSgsR",
        asset: "ETH",
        balance: "0.03547866",
        crossWalletBalance: "0.03547866",
        crossUnPnl: "0.00000000",
        availableBalance: "0.03547866",
        maxWithdrawAmount: "0.03547866",
        marginAvailable: true,
        updateTime: 1682544381895,
      },
    ],
  },
];

const Wallet = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connectionData, setConnectionData] = useState();

  const [loading, setLoading] = useState(true);
  const [selectedExchange, setSelectedExchange] = useState("Select Exchange");

  const [allExchange, setAllExchange] = useState([]);

  useEffect(() => {
    fetchAssetsFromUserInfo();
  }, []);

  const fetchAssetsFromUserInfo = async () => {
    const { user } = await getSession();
    const response = await fetch(`/api/user/get-user-info?id=${user.id}`, {
      method: "GET",
    });
    const data = await response.json();

    if (data.body.exchanges[0]) {
      setAllExchange(data.body.exchanges);
      setSelectedExchange(data.body.exchanges[0].exchangeName);
      console.log("Exchange: ", data.body.exchanges[0].exchangeName);
      const { USDMClient } = require("binance");
      const baseUrl = "https://testnet.binancefuture.com";
      const client = new USDMClient({
        api_key: data.body.exchanges[0].apiKey,
        api_secret: data.body.exchanges[0].apiSecret,
        baseUrl,
      });

      client
        .getBalance()
        .then((result) => {
          console.log("getBalance result: ", result);
          setConnectionData(result);
          setConnected(true);
          setShowDrawer(false);
          setLoading(false);
        })
        .catch((err) => {
          console.error("getBalance error: ", err);
          setLoading;
        });
    } else {
      setLoading(false);
    }
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
    // console.log(session.user);
    var ccxt = require("ccxt");
    const { USDMClient } = require("binance");
    console.log("Exchangee", event.currentTarget);
    const API_KEY = data.get("apiKey");
    const API_SECRET = data.get("apiSecret");
    const baseUrl = "https://testnet.binancefuture.com";
    const client = new USDMClient({
      api_key: API_KEY,
      api_secret: API_SECRET,
      baseUrl,
    });

    client
      .getBalance()
      .then((result) => {
        console.log("getBalance result: ", result);
        setConnectionData(result);
        setConnected(true);
        setShowDrawer(false);
      })
      .catch((err) => {
        console.error("getBalance error: ", err);
      });

    const body = [
      ...allExchange,
      {
        exchangeName: data.get("exchangeName"),
        name: data.get("name"),
        apiKey: data.get("apiKey"),
        apiSecret: data.get("apiSecret"),
      },
    ];

    const response = await fetch(
      `/api/user/connect-binance?id=${session.user.id}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resp = await response.json();
    setAllExchange(resp.body.exchanges);
    setSelectedExchange(data.get("name"));

    if (resp.body.balances) {
      setConnectionData(resp.body);
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
  const walletData = [
    {
      coinName: "Binance",
      coin: Btc,
      available: "0.00",
      lockedBalances: "0.00",
    },
    {
      coinName: "Binance",
      coin: Btc,
      available: "0.00",
      lockedBalances: "0.00",
    },
    {
      coinName: "Binance",
      coin: Btc,
      available: "0.00",
      lockedBalances: "0.00",
    },
  ];

  return (
    <>
      <div style={{ margin: "40px 0px" }}>
        <CryptoRates />
      </div>
      <Button
        onClick={handleConnectAccount}
        variant="contained"
        sx={{ mt: 1, mb: 3 }}
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
      <Grid container spacing={1}>
        {walletData?.map((data, index) => (
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
                  {data.coinName}
                </Typography>
                <Typography color={"#9F90A2"} fontSize={"0.9rem"}>
                  Assets
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    my: 2,
                    border: "1.5px solid #764080",
                    borderRadius: 1,
                    height: "4rem",
                    pl: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(0.5px)",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <data.coin />
                  </Box>
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
                      {data.available}
                    </Typography>
                    <Typography color={"#5D3FA6"} fontWeight={500}>
                      USDT
                    </Typography>
                  </Box>
                </Box>
                <Box
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
                      {data.lockedBalances}
                    </Typography>
                    <Typography color={"#5D3FA6"} fontWeight={500}>
                      USDT
                    </Typography>
                  </Box>
                </Box>
                <Button
                  sx={{
                    background: "#C8181A",
                    textTransform: "none",
                    color: "white",
                    float: "right",
                    my: 2,
                    px: 1.5,
                  }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Wallet;
