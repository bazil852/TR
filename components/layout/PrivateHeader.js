import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import {
  DashboardIcon,
  DCABotsIcon,
  MyExchangesIcon,
  TradingBotsIcon,
} from "../../utils/icons";

import { signOut, useSession } from "next-auth/react";
import { Stack } from "@mui/system";
import CryptoCard from "../cards/header-cards/CryptoCard";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const sideBarItems = [
  { index: 0, title: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  {
    index: 1,
    title: "My Exchanges",
    icon: MyExchangesIcon,
    path: "/my-exchanges",
  },
  {
    index: 2,
    title: "Trading Bots",
    icon: TradingBotsIcon,
    path: "/trading-bots",
  },
  { index: 3, title: "DCA Bot", icon: DCABotsIcon, path: "/dca-bots" },
  {
    index: 4,
    title: "Bot Config",
    icon: DCABotsIcon,
    path: "/bot-config",
  },
];

const ccxt = require("ccxt");

const binance = new ccxt.binance();

export default function PrivateHeader({ title, current, Component }) {
  const symbolBTC = "BTC/USDT";
  const symbolETH = "ETH/USDT";
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const session = useSession();

  const [btcTickerValue, setBtcTickerValue] = React.useState({});
  const [ethTickerValue, setEthTickerValue] = React.useState({});

  React.useEffect(() => {
    const interval = setInterval(() => {
      binance
        .fetchTicker(symbolBTC)
        .then((ticker) => {
          setBtcTickerValue(ticker);
        })
        .catch((error) => {
          console.error(`Error fetching ticker for ${symbolBTC}: ${error}`);
        });

      binance
        .fetchTicker(symbolETH)
        .then((ticker) => {
          setEthTickerValue(ticker);
        })
        .catch((error) => {
          console.error(`Error fetching ticker for ${symbolETH}: ${error}`);
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1600) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          background: "#0F0F0F",
          boxShadow: 0,
          paddingBottom: 2,
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              color: "#FFFFFF",
              ...(open && { display: "none" }),
            }}
          ></IconButton>
          <Grid
            sx={{ pt: 2 }}
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={5}>
              <Grid container>
                <Grid item xs="5">
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    color="#FFFFFF"
                    sx={{ cursor: "pointer", ml: 1 }}
                  >
                    {title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid spacing={2} container>
                    <Grid item>
                      <CryptoCard
                        title={symbolBTC}
                        rate={btcTickerValue?.last}
                        percentage={btcTickerValue?.percentage}
                      />
                    </Grid>
                    <Grid item>
                      <CryptoCard
                        title={symbolETH}
                        rate={ethTickerValue?.last}
                        percentage={ethTickerValue?.percentage}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Grid container spacing={2} item>
                    <Grid item>
                      <CryptoCard
                        title="Paper Trading Balance"
                        rate="B 1 2 3 B 1 2 3 $ 1 2 3"
                        percentage="B 1 2 3 B 1 2 3 $ 1 2 3"
                      />
                    </Grid>

                    <Grid item>
                      <CryptoCard
                        title="Paper Trading Balance"
                        rate="B 1 2 3 B 1 2 3 $ 1 2 3"
                        percentage="B 1 2 3 B 1 2 3 $ 1 2 3"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography color="white">Advanced Plan</Typography>
                  <Typography color="primary" sx={{ cursor: "pointer" }}>
                    Upgrade
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    sx={{ color: "#FFFFFF" }}
                    onClick={() => {
                      signOut({ callbackUrl: "http://localhost:3000/login" });
                    }}
                  >
                    Log Out
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer
        PaperProps={{
          sx: {
            color: "#795BFF",
            background: " #191919",
          },
        }}
        variant="permanent"
        open={open}
      >
        <DrawerHeader>
          <Typography color="primary" sx={{ mr: 8 }}>
            {session?.data?.user.firstName}&nbsp;
            {session?.data?.user.lastName}
          </Typography>
          {!open ? (
            <IconButton
              // aria-label="open drawer"
              onClick={handleDrawerOpen}
              // edge="start"
              sx={{
                // marginRight: 5,
                color: "#FFFFFF",
                // ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon sx={{ color: "#FFFFFF" }} />
              ) : (
                <CloseIcon sx={{ color: "#FFFFFF" }} />
              )}
            </IconButton>
          )}
        </DrawerHeader>
        <List>
          {sideBarItems.map((item) => {
            return (
              <ListItem
                key={item.title}
                // disablePadding
                sx={{ display: "block", color: "#FFFFFF" }}
                onClick={() => {
                  router.push(item.path);
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <item.icon
                      fill={item.index == current ? "#795BFF" : "#E6E6E6"}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: item.index == current && "primary.main",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {Component && (
          <div style={{ marginTop: 60 }}>
            <Component />
          </div>
        )}
      </Box>
    </Box>
  );
}
