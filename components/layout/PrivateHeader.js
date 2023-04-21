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
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch } from "react-redux";
import { setWidth } from "../../slices/dashboardWidthController-slice";
import { useRouter } from "next/router";
import {
  DashboardIcon,
  DCABotsIcon,
  MyExchangesIcon,
  TradingBotsIcon,
  HandShake,
  VgridBot,
  ChevronDown,
  VdcaBot,
  History,
  Lock,
} from "../../utils/icons";

import { signOut, useSession } from "next-auth/react";
import { Stack } from "@mui/system";
import CryptoCard from "../cards/header-cards/CryptoCard";
import AdminProfileCard from "../cards/admin-profile-card/AdminProfileCard";
import AdminProfileCardSideBar from "../cards/admin-profile-card/AdminProfileCardSideBar";
import SearchBar from "../widgets/SearchBar";

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
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  // padding: theme.spacing(0, 0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   // zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

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

const sideBarFirstTwoItems = [
  { index: 0, title: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  {
    index: 1,
    title: "My Exchanges",
    icon: Lock,
    path: "/my-exchanges",
  },
];
const sideBarLastTwoItems = [
  {
    index: 5,
    title: "My Deals",
    icon: HandShake,
    path: "/AllDeals",
  },
  {
    index: 6,
    title: "History",
    icon: History,
    path: "/DealPage",
  },
];
// const ccxt = require("ccxt");

// const binance = new ccxt.binance();

export default function PrivateHeader({ title, current, Component }) {
  // const symbolBTC = "BTC/USDT";
  // const symbolETH = "ETH/USDT";
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const [toggle, setToggle] = React.useState(false);
  const router = useRouter();
  const session = useSession();
  // const [btcTickerValue, setBtcTickerValue] = React.useState({});
  // const [ethTickerValue, setEthTickerValue] = React.useState({});

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     binance
  //       .fetchTicker(symbolBTC)
  //       .then((ticker) => {
  //         setBtcTickerValue(ticker);
  //       })
  //       .catch((error) => {
  //         console.error(`Error fetching ticker for ${symbolBTC}: ${error}`);
  //       });

  //     binance
  //       .fetchTicker(symbolETH)
  //       .then((ticker) => {
  //         setEthTickerValue(ticker);
  //       })
  //       .catch((error) => {
  //         console.error(`Error fetching ticker for ${symbolETH}: ${error}`);
  //       });
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);
  // React.useEffect(() => {
  //   const handleWidth = () => {
  //     if (window.innerWidth < 1600) {
  //       setExceedingWidth(false);
  //       console.log("now is", exceedingWidth);
  //     } else {
  //       setExceedingWidth(true);
  //       console.log("now is", exceedingWidth);
  //     }
  //   };
  //   dispatch(
  //     setWidth({
  //       value: exceedingWidth,
  //     })
  //   );
  //   window.addEventListener("exceedingWidth", handleWidth);
  //   return () => window.removeEventListener("exceedingWidth", handleWidth);
  // }, [dispatch]);
  React.useEffect(() => {
    const handleResize = () => {
      dispatch(setWidth(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1600) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
    dispatch(
      setWidth({
        value: open,
      })
    );
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        PaperProps={{
          sx: {
            color: "#795BFF",
            border: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            background: `${
              open
                ? "linear-gradient(to bottom left, #29084D , #191919)"
                : " linear-gradient(to bottom left, #19191985 10% , #191919 ) "
            }`,
          },
        }}
        variant="permanent"
        open={open}
      >
        <DrawerHeader
          sx={{ display: "flex", justifyContent: "space-between", p: 1 }}
        >
          <Typography
            sx={{
              display: `${open ? "inline-block" : "none"}`,
              fontWeight: "600",
              fontSize: "20px",
              paddingLeft: "15px",
              margin: "0px",
            }}
          >
            VeBot
          </Typography>
          {!open ? (
            <IconButton
              // aria-label="open drawer"
              onClick={handleDrawerOpen}
              // edge="start"
              // sx={{
              //   // marginRight: 5,
              //   color: "white",
              //   // ...(open && { display: "none" }),
              // }}
            >
              <MenuIcon
                sx={{
                  color: "white",
                }}
              />
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
        <Box
          sx={{
            display: `${open ? "inline-block" : "none"}`,
            padding: "5px 15px",
          }}
        >
          <SearchBar />
        </Box>

        <List>
          {sideBarFirstTwoItems.map((item) => {
            return (
              <ListItem
                key={item.title}
                // disablePadding
                sx={{
                  color: "#FFFFFF",
                  padding: "0px",
                  margin: "0px",
                  "&::before": {
                    content: '""',
                    backgroundColor: "white",
                    minHeight: 30,
                    width: "5px",
                    position: "absolute",
                    left: 0,
                    opacity: 0,
                    borderRadius: "1px",
                  },
                  "&:hover::before": {
                    opacity: 1,
                  },
                }}
                onClick={() => {
                  router.push(item.path);
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 45,
                    justifyContent: open ? "initial" : "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <item.icon
                      fill={item.index == current ? "#8E75FF" : "#D9D9D9"}
                      // viewBox="0 0 24 24"
                      // style={{
                      //   width: "100%",
                      //   height: "100%",
                      // }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: item.index == current && "#8E75FF",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <List>
          <Box sx={{ display: "flex" }}>
            <ListItem
              sx={{
                color: "#FFFFFF",
                padding: "0px",
                margin: "0px",
                mt: "-15px",
                "&::before": {
                  content: '""',
                  backgroundColor: "white",
                  minHeight: 30,
                  width: "5px",
                  position: "absolute",
                  left: 0,
                  opacity: 0,
                  borderRadius: "1px",
                },
                "&:hover::before": {
                  opacity: 1,
                },
              }}
              onClick={() => {
                router.push("/trading-bots");
              }}
            >
              <ListItemButton
                sx={{
                  mr: `${open ? "20px" : "0px"}`,
                  borderTopRightRadius: `${open ? "5px" : "0px"}`,
                  borderBottomRightRadius: `${open ? "5px" : "0px"}`,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <TradingBotsIcon
                    style={{ marginLeft: `${open ? "-2px" : "-5px"}` }}
                  />
                </ListItemIcon>
                <ListItemText sx={{ display: `${open ? "flex" : "none"}` }}>
                  Trading Bots
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <Box
              sx={{
                display: `${open ? "inline-block" : "none"}`,
                mr: 4,
                ml: 0,
                cursor: "pointer",
              }}
            >
              <ChevronDown onClick={() => setToggle(!toggle)} />
            </Box>
          </Box>

          {toggle && open && (
            <ListItem
              sx={{
                color: "#FFFFFF",
                padding: "0px",
                margin: "0px",
                "&::before": {
                  content: '""',
                  backgroundColor: "white",
                  minHeight: 30,
                  width: "5px",
                  position: "absolute",
                  left: 0,
                  opacity: 0,
                  borderRadius: "1px",
                },
                "&:hover::before": {
                  opacity: 1,
                },
              }}
              onClick={() => {
                router.push("/dca-bots");
              }}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    pl: 3,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <VdcaBot />
                </ListItemIcon>
                <ListItemText>VDCA Bot</ListItemText>
              </ListItemButton>
            </ListItem>
          )}
          {toggle && open && (
            <ListItem
              sx={{
                color: "#FFFFFF",
                padding: "0px",
                margin: "0px",
                "&::before": {
                  content: '""',
                  backgroundColor: "white",
                  minHeight: 30,
                  width: "5px",
                  position: "absolute",
                  left: 0,
                  opacity: 0,
                  borderRadius: "1px",
                },
                "&:hover::before": {
                  opacity: 1,
                },
              }}
              onClick={() => {
                router.push("/bot-config");
              }}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    pl: 3,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <VgridBot fill={"pink"} />
                </ListItemIcon>
                <ListItemText>VGrid bot</ListItemText>
              </ListItemButton>
            </ListItem>
          )}
        </List>
        <List sx={{ marginTop: "-15px" }}>
          {sideBarLastTwoItems.map((item) => {
            return (
              <ListItem
                key={item.title}
                // disablePadding
                sx={{
                  color: "#FFFFFF",
                  padding: "0px",
                  margin: "0px",
                  "&::before": {
                    content: '""',
                    backgroundColor: "white",
                    minHeight: 30,
                    width: "5px",
                    position: "absolute",
                    left: 0,
                    opacity: 0,
                    borderRadius: "1px",
                  },
                  "&:hover::before": {
                    opacity: 1,
                  },
                }}
                onClick={() => {
                  router.push(item.path);
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 45,
                    justifyContent: open ? "initial" : "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <item.icon
                      fill={item.index == current ? "#8E75FF" : "#D9D9D9"}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: item.index == current && "#8E75FF",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
          <ListItem
            sx={{
              display: `${open ? "flex" : "none"}`,
              mt: 8,
              pb: 2,
              // pl: 2,
              cursor: "pointer",
              color: "#FFFFFF",
              "&::before": {
                content: '""',
                backgroundColor: "white",
                minHeight: 30,
                width: "5px",
                position: "absolute",
                left: 0,
                opacity: 0,
                borderRadius: "1px",
              },
              "&:hover::before": {
                opacity: 1,
              },
            }}
          >
            <SettingsIcon />
            <Typography sx={{ pl: 1, fontSize: "15px" }}>Settings</Typography>
          </ListItem>
          <ListItem
            sx={{
              display: `${open ? "block" : "none"}`,
              pb: 8,
              // pl: 1.5,
              "&::before": {
                content: '""',
                backgroundColor: "white",
                minHeight: 30,
                width: "5px",
                position: "absolute",
                left: 0,
                opacity: 0,
                borderRadius: "1px",
              },
              "&:hover::before": {
                opacity: 1,
              },
            }}
          >
            <Button
              sx={{
                color: "#FFFFFF",
                "&:hover": {
                  background: "none",
                },
              }}
              onClick={() => {
                signOut({ callbackUrl: "http://localhost:3000/login" });
              }}
            >
              <LogoutIcon />
              <Typography sx={{ pl: 1, fontSize: "14px" }}>Log Out</Typography>
            </Button>
          </ListItem>
          <ListItem sx={{ display: `${open ? "block" : "none"}` }}>
            <AdminProfileCardSideBar />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 0 }}>
        {/* <DrawerHeader /> */}
        <Box
          open={open}
          sx={{
            background: "none",
            boxShadow: 0,
          }}
        >
          <Box>
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
              <Grid item xs={4}>
                <Typography
                  variant="h2"
                  component="div"
                  color="#FFFFFF"
                  fontSize={30}
                  fontWeight={600}
                  sx={{ cursor: "pointer", ml: 1 }}
                >
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Grid container justifyContent="flex-end">
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
                      <Grid item>
                        <AdminProfileCard />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {Component && (
          <div>
            <Component />
          </div>
        )}
      </Box>
    </Box>
  );
}
