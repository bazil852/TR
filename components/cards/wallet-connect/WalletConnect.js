import React, { useState, useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
// import { ccxt } from 'ccxt';
import emailjs from "@emailjs/browser";
import nc from "next-connect";
import { createProxyMiddleware } from "http-proxy-middleware";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { signIn, getSession, useSession } from "next-auth/react";
import SelectInput from "../../widgets/SelectInput";
import { useSelector, useDispatch } from "react-redux";
import { setExchange } from "../../../slices/exchange-slice";

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

const exchangeTypes = ["Binace Futures Testnet", "Binance Futures"];

const WalletConnect = () => {
  const exchanges = useSelector((state) => state.exchanges.value);
  const assets = useSelector((state) => state.asset.value);
  const dispatch = useDispatch();

  const [showDrawer, setShowDrawer] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connectionData, setConnectionData] = useState();
  const [selectedData, setselectedData] = useState({});

  useEffect(() => {
    if (assets.length > 0) {
      setConnectionData(assets);
      setConnected(true);
      setShowDrawer(false);
    }
  }, []);

  const handleClose = () => {
    setShowDrawer(false);
  };
  const handleConnectAccount = () => {
    setShowDrawer(true);
  };

  const handleBinance = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let oldSession = await getSession();
    // console.log(session.user);
    var ccxt = require("ccxt");
    const payload = {
      name: data.get("name"),
      apiKey: data.get("apiKey"),
      apiSecret: data.get("apiSecret"),
      email: oldSession.user.email,
    };
    const { USDMClient } = require("binance");

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

    const body = {
      name: data.get("name"),
      apiKey: data.get("apiKey"),
      apiSecret: data.get("apiSecret"),
      userId: oldSession.user.id,
    };

    let newExchanges = [
      ...oldSession.user.exchanges,
      {
        name: body.name,
        apiKey: body.apiKey,
        apiSecret: body.apiSecret,
      },
    ];

    dispatch(setExchange(newExchanges));

    const response = await fetch("/api/user/connect-binance", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resp = await response.json();

    if (resp.body.balances) {
      setConnectionData(resp.body);
      setConnected(true);
      setShowDrawer(false);
    }
  };

  const handleSelect = (event) => {
    setselectedData(event.target.value);
  };

  return (
    <Container
      sx={{
        background: "#191919",
        borderRadius: 1,
        p: 3,
        border: "1px solid #666666",
      }}
      component="main"
      maxWidth="xs"
    >
      {connected ? (
        <Box>
          <Typography>Wallet</Typography>
          <Box>
            <ul>
              {connectionData.map((connectionData) => (
                <li key={connectionData.asset}>
                  {connectionData.asset}: {connectionData.balance}
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography color="white" variant="h4" sx={{ mb: 2 }}>
            Analyze and manage assets:
          </Typography>
          <Typography
            color="white"
            variant="p"
            sx={{ textAlign: "center", mb: 2 }}
          >
            Track, manage and analyze your assets performance by gathering all
            exchange accounts, wallets, and virtual portfolios in one place.
          </Typography>

          <Button
            onClick={handleConnectAccount}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Connect account
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
                placeHolder={"Exchange"}
                options={exchangeTypes}
                width={"100%"}
                keyName={"exchangeTypes"}
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
                sx={{ mt: 2 }}
                fullWidth
                variant="contained"
              >
                Connect
              </Button>
            </Box>
          </Drawer>
        </Box>
      )}

      {/* {connected && (
        <Box sx={{ minWidth: 120 }}>
          <Typography variant="p">
            User Accout Type: {connectionData.accountType}
          </Typography>
          <Typography variant="p">Can User Withdraw:</Typography>
          {connectionData.canWithdraw && <Typography>Yes</Typography>}
          <Typography variant="p">Can User Deposit:</Typography>
          {connectionData.canDeposit && <Typography>Yes</Typography>}
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedData}
            label="Age"
            onChange={handleSelect}
          >
            {connectionData.balances.from(connectionData.balances(10)).map(item => {
              return <MenuItem value={item}>{item.assest}</MenuItem>;
            })}
          </Select>
        </FormControl>
        </Box>
      )} */}
    </Container>
  );
};

export default WalletConnect;
