import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  useTheme,
  List,
  Typography,
  CssBaseline,
  IconButton,
  ListItem,
  Container,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import { useDispatch } from "react-redux";
import { setWidth } from "../../slices/dashboardWidthController-slice";
import { useRouter } from "next/router";
import {
  Gift,
  Dash,
  BlueDash,
  HandShake,
  VgridBot,
  VdcaBot,
  Lock,
  TradingBotsIcon,
} from "../../utils/icons";
import NavBar from "../navbar/NavBar";
import { signOut } from "next-auth/react";

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
  ...theme.mixins.toolbar,
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
export default function PrivateHeader({ title, current, Component }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();
  const [realAccountBalance, setRealAccountBalance] = React.useState(1250);
  const [paperTradingBalance, setPaperTradingBalance] = React.useState(1250);
  const router = useRouter();
  const [windowWidth, setWindowWidth] = React.useState(globalThis?.innerWidth);
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  const handleClick = (item) => {
    router.push(`${item.path}?selected=${item.index}`);
  };

  const getSelectedIndexFromUrl = () => {
    const selectedIndex = parseInt(router.query.selected);
    return isNaN(selectedIndex) ? -1 : selectedIndex;
  };

  const getListItemStyle = (index) => {
    return {
      color: selectedItem === index ? "#9079F6" : "white",
      width: index === 1 ? "80%" : "100%",
      pl: 1,
      minHeight: 45,
      cursor: "pointer",
      "&::before": {
        content: '""',
        backgroundColor: "#FFFFFF",
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
      "&:hover": {
        backgroundColor: !open ? "none" : "rgba(255,255,255,0.1)",
        borderRadius: "0px",
        borderTopRightRadius: index === 1 ? "10px" : "",
        borderBottomRightRadius: index === 1 ? "10px" : "",
      },
    };
  };

  const items = [
    {
      index: 0,
      title: "Dashboard",
      icon: selectedItem === 0 ? BlueDash : Dash,
      path: "/dashboard",
    },
    {
      index: 1,
      title: "Strategy Library",
      icon: selectedItem === 1 ? Lock : Lock,
      path: "/StrategyLibrary",
    },

    {
      index: 2,
      title: "VDCA",
      icon: selectedItem === 2 ? VdcaBot : VdcaBot,
      path: "/bot-config",
    },
    {
      index: 3,
      title: "Deals",
      icon: selectedItem === 3 ? VgridBot : VgridBot,
      path: "/bot-config",
    },
    {
      index: 4,
      title: "Exchanges API",
      icon: selectedItem === 5 ? HandShake : HandShake,
      path: "/my-exchanges",
    },
    {
      index: 5,
      title: "Account",
      icon: selectedItem === 5 ? TradingBotsIcon : TradingBotsIcon,
      path: "/AllDeals",
    },
  ];

  React.useEffect(() => {
    setSelectedItem(() => getSelectedIndexFromUrl());
  }, [getSelectedIndexFromUrl()]);

  React.useEffect(() => {
    const handleOpen = () => {
      dispatch(setWidth(open));
    };
    handleOpen();
  }, [dispatch, open]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setToggle(false);
  };

  return (
    <Box sx={{ display: windowWidth < 1000 ? "absolute" : "flex" }}>
      <CssBaseline />
      <Drawer
        PaperProps={{
          sx: {
            height: windowWidth < 1000 && !open ? 60 : "100%",
            color: "#795BFF",
            border: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            background: `${open ? "#131414" : "#0A0A0A)"}`,
          },
        }}
        variant="permanent"
        open={open}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
          }}
        >
          {!open ? (
            <IconButton
              onClick={handleDrawerOpen}
              sx={{
                left: windowWidth < 600 ? 0 : -3,
                top: windowWidth < 600 ? 5 : "",
                height: 35,
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <IconButton
                onClick={handleDrawerClose}
                sx={{ position: "absolute", right: 5 }}
              >
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon sx={{ color: "#FFFFFF" }} />
                ) : (
                  <CloseIcon sx={{ color: "#FFFFFF" }} />
                )}
              </IconButton>
            </>
          )}
        </DrawerHeader>
        <Box
          sx={{
            display: open ? "flex" : "none",
            flexDirection: "column",
            gap: 1,
            pl: 3,
            mt: -1,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontFamily: "Barlow, san-serif",
                color: "#ffffff",
              }}
            >
              Real Account Balance
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontFamily: "Barlow, san-serif",
                color: "#ffffff",
                fontWeight: 600,
              }}
            >
              ${realAccountBalance}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontFamily: "Barlow, san-serif",
                color: "#ffffff",
              }}
            >
              Paper Trading Balance
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontFamily: "Barlow, san-serif",
                color: "#ffffff",
                fontWeight: 600,
              }}
            >
              ${paperTradingBalance}
            </Typography>
          </Box>
        </Box>

        <List
          sx={{
            mt: open ? 2 : 0,
            mb: 6,
            display: windowWidth < 1000 && !open && "none",
          }}
        >
          {items.map((item) => (
            <div key={item.index}>
              {item.title === "Strategy Library" ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ListItem
                    sx={getListItemStyle(item.index)}
                    onClick={() => handleClick(item)}
                  >
                    <ListItemIcon
                      sx={{
                        display: "flex",
                        justifyContent: open ? "center" : "center",
                        alignItems: "center",
                        pr: !open ? 3 : "",
                      }}
                    >
                      <item.icon />
                    </ListItemIcon>
                    <Typography
                      sx={{
                        display: open ? "flex" : "none",
                        fontFamily: "Barlow, san-serif",
                        fontWeight: 500,
                      }}
                    >
                      {item.title}
                    </Typography>
                  </ListItem>
                  <Box
                    sx={{
                      background: "linear-gradient(to right,#790D83,#7A5CFF)",
                      display: open ? "flex" : "none",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 1,
                      cursor: "pointer",
                      height: 20,
                      width: 20,
                    }}
                    onClick={() => {
                      router.push("Startegy");
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Barlow, san-serif",
                        fontSize: 20,
                        fontWeight: 600,
                        mt: -0.5,
                        color: "#FFFFFF",
                        fontWeight: "bold",
                      }}
                    >
                      +
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <ListItem
                  sx={getListItemStyle(item.index)}
                  onClick={() => handleClick(item)}
                >
                  <ListItemIcon
                    sx={{
                      display: "flex",
                      justifyContent: open ? "center" : "center",
                      alignItems: "center",
                      pr: !open ? 3 : "",
                    }}
                  >
                    <item.icon />
                  </ListItemIcon>
                  <Typography
                    sx={{
                      display: open ? "flex" : "none",
                      fontFamily: "Barlow, san-serif",
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </Typography>
                </ListItem>
              )}
            </div>
          ))}
        </List>
        <Box mb={"20vh"} display={open ? "inline-block" : "none"}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Gift />
            <Typography
              sx={{
                fontSize: 16,
                fontFamily: "Barlow, san-serif",
                color: "#5156BE",
                fontWeight: 500,
                mt: 1.5,
              }}
            >
              Unlimited Access
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontFamily: "Barlow, san-serif",
                color: "#ffffff",
                mt: 2.5,
              }}
            >
              Upgrade your plan
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                fontFamily: "Barlow, san-serif",
                color: "#ffffff",
              }}
            >
              from a Free trial to
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                fontFamily: "Barlow, san-serif",
                color: "#ffffff",
              }}
            >
              'Buisness Plan'
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 2,
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
              <Typography
                sx={{
                  color: "white",
                  fontSize: "13px",
                  fontFamily: "Barlow, san-serif",
                  fontWeight: 500,
                }}
              >
                Upgrade Now
              </Typography>
            </Button>
          </Box>
          <Box mt={5} onClick={() => signOut({ callbackUrl: "/login" })}>
            <ListItem sx={getListItemStyle(6)}>
              <ListItemIcon
                sx={{
                  display: "flex",
                  justifyContent: open ? "center" : "center",
                  alignItems: "center",
                  pr: !open ? 3 : "",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <Typography
                sx={{
                  display: open ? "flex" : "none",
                  fontFamily: "Barlow, san-serif",
                  fontWeight: 500,
                  color: "#FFFFFF",
                }}
              >
                LogOut
              </Typography>
            </ListItem>
          </Box>
        </Box>
      </Drawer>
      <Box sx={{ position: "fixed", minWidth: "100%", zIndex: 1000 }}>
        <NavBar />
      </Box>
      <Container>
        {Component && (
          <div>
            <Component />
          </div>
        )}
      </Container>
    </Box>
  );
}
