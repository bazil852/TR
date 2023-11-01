import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Tab,
  Tabs,
  Typography,
  Modal,
  List,
  ListItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Bot from "./Bot";
import { getSession } from "next-auth/react";
import { alpha, styled } from "@mui/material/styles";
import SelectInputParameters from "../../widgets/SelectInputParameters";
import TimeFrameSelectInput from "../../widgets/TimeFrameSelectInput";
import { useSelector } from "react-redux";
import Select from "react-select";

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    height: 15,
    backgroundColor: "#3E3E3E",
    borderRadius: "4px",
    fontSize: 16,
    fontWeight: 500,
    padding: "8px 5px",
    color: "#FFFFFF",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    "::placeholder": {
      zIndex: "10px",
      color: "#FFFFFF !important",
    },
  },
}));

const CustomCheckbox = styled(Checkbox)({
  "&.Mui-checked": {
    color: "white",
  },
});

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "none",
    backgroundColor: "#3E3E3E",
    minHeight: "30px",
    borderRadius: "4px",
  }),
  container: (provided) => ({
    ...provided,
    border: "none",
    width: "100%",
    minHeight: "20px",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "#FFFFFF",
    fontSize: "15px",
    fontFamily: "Barlow, san-serif",
    backgroundColor: state.isSelected ? "#000000" : "none",
    ":hover": { background: "#131313", color: "#FFFFFF" },
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    width: state.isFocused ? "20px" : "20px",
    justifyContent: state.isFocused ? "flex-end" : "flex-end",
    padding: "0",
  }),
  menu: (provided) => ({
    ...provided,
    background: "#3E3E3E",
    color: "#FFFFFF",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    minHeight: "30px",
    padding: "2px 4px",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "15px",
    fontFamily: "Barlow, san-serif",
    fontWeight: 500,
    color: "#FFFFFF",
    whiteSpace: "normal",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "15px",
    fontFamily: "Barlow, san-serif",
    color: "#ACB2B7",
    overflow: "hidden",
    textWrap: "nowrap",
    textOverflow: "ellipsis",
    opacity: 0.8,
  }),
};

const BotsLibraryTabs = () => {
  const [value, setValue] = useState(0);
  const [searchByBotsName, setSearchByBotsName] = useState("");
  const [pairs, setPairs] = useState("");

  const [strategies, setStrategies] = useState([]);
  const [exchanges, setExchanges] = useState([]);

  const [checkboxSearched, setCheckboxSearched] = useState("");
  const [checkedList, setCheckedList] = useState([]);

  const [botName, setBotName] = useState("");
  const [botType, setBotType] = useState("");
  const [description, setDescription] = useState("");
  const [exchange, setExchange] = useState("");
  const [botTimeFrame, setBotTimeFrame] = useState("");

  const [disable, setDisable] = useState(false);
  const [limit, setLimit] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [showModal, setShowModal] = React.useState(false);
  const [logs, setLogs] = React.useState("");

  const [bot, setBots] = useState([]);
  const [checkedBot, setCheckedBots] = useState([]);

  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  const [width, setWidth] = useState(globalThis?.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    fetchStrategiesByUserId();
    fetchAllExchangesWithoutAssetsByUserId();
    fetchBotsByUserId();
  }, []);

  useEffect(() => {
    const temp = [...strategies].filter((item) => item.checked);
    console.log(temp);
    if (temp.length === 1) {
      setDisable(true);
    }
    setCheckedList(temp);
  }, [strategies]);

  const fetchAllExchangesWithoutAssetsByUserId = async () => {
    const { user } = await getSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}exchanges/without-asset/${user.id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      setExchanges(data);
    }
  };

  const fetchStrategiesByUserId = async () => {
    let session = await getSession();
    const response = await fetch(
      `/api/strategy/get-strategy?id=${session?.user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newData = await response.json();
    console.log(newData);
    setStrategies(newData.body);
  };

  const fetchBotsByUserId = async () => {
    let session = await getSession();
    const response = await fetch(
      `/api/bot/get-bots-by-userId?id=${session?.user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newData = await response.json();
    console.log(newData);
    setBots(newData.body);
  };

  const found = strategies?.filter((item) => {
    if (!checkboxSearched) {
      return true;
    }
    return item?.generalSettings?.strategyName
      ?.toLowerCase()
      .includes(checkboxSearched.toLowerCase());
  });
  const handleCheckbox = (e, key) => {
    const newState = strategies.map((obj) => {
      return obj._id === key ? { ...obj, checked: e.target.checked } : obj;
    });
    console.log("checkbox", newState);
    // setCheckedPaint(newState);
    setStrategies(newState);
  };

  const handleReset = () => {
    const temp = strategies.map((obj) => {
      return { ...obj, checked: false };
    });
    console.log("checkbox", temp);
    setDisable(false);
    setStrategies(temp);
  };

  const handleCreateBot = async () => {
    const { user } = await getSession();
    console.log(botName, description, checkedList, exchange);

    let selectedExchangeIndex = exchanges.findIndex(
      (item) => item.exchange_name === exchange?.value
    );
    console.log(exchanges, selectedExchangeIndex);

    let temp = botType;

    let body = {
      botName,
      description,
      botType: temp?.value,
      timeFrame: botTimeFrame,
      strategyId: checkedList.map((item) => item._id),
      user,
      exchange: exchanges[selectedExchangeIndex].id,
      state: "off",
    };
    console.log(body);
    const response = await fetch(`/api/bot/create-bot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      let newBots = [...bot, data.body];

      setBots(newBots);
      // setStrategyFolder([body]);
      handleReset();
      setOpenModal(false);
      alert("Strategy Folder Created");
    } else {
      handleReset();
      setOpenModal(false);
      alert("Strategy Folder Not Created");
    }
  };

  const handleSearch = (event) => {
    setSearchByBotsName(event.target.value);
  };

  const handlePairs = (event) => {
    setPairs(event.target.value);
  };

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const handleClearFilter = () => {
    console.log("handle clear filter");
  };

  const handleBotsCheckbox = (e, id) => {
    console.log(e.target.checked, id);
    if (e.target.checked) {
      let temp = [...checkedBot, id];
      setCheckedBots(temp);
    } else {
      let temp = checkedBot.filter((item) => item !== id);
      setCheckedBots(temp);
    }
  };

  console.log(checkedBot);

  const handleDeleteBot = async () => {
    const response = await fetch(`/api/bot/delete-bot`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkedBot),
    });
    if (response.ok) {
      // Filter out the bots that have been deleted
      let newBots = bot.filter((item) => !checkedBot.includes(item._id));

      setBots(newBots);
    } else {
      alert("Something Went Wrong");
    }
  };

  const handleBotStatus = async (botId, botState) => {
    const tempStateText = {
      on: "off",
      off: "on",
    };
    console.log(botState, tempStateText[botState]);
    const response = await fetch(`/api/bot/turn-on-and-off-bot?id=${botId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempStateText[botState]),
    });
    
    const data = await response.json();
    console.log("Data to be sent to heroku : ",data['body']);
    if (response.ok) {
      let newBots = bot.map((item) =>
        item._id === botId
          ? { ...item, state: tempStateText[item?.state] }
          : item
      );

      setBots(newBots);
    }
    if (tempStateText[botState] === 'on'){
      try { 
        const response = await fetch("https://trading-candle-riders-b2f01d4db9dd.herokuapp.com/start", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // If you need to send a JSON body, uncomment the following line and replace '{}' with the appropriate JSON object
          body: JSON.stringify(data['body']),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Success:", data);
        } else {
          console.error("Errorrsarasr:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Errorrrr:", error);
      }
    }
  };

  const handleViewModal = async (botId, logs) => {
    // const session = await getSession();
    setLogs(logs);
    // setSelectedRow(row);
    setShowModal(true);

    const response = await fetch(`/api/bot/get-bot-by-id?id=${botId}`, {
      method: "GET",
    });

    const data = await response.json();
    // let filteredBot = data.body.filter((item) => item?._id === row._id);
    setLogs(data.body.logs);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // const handleRefreshLogs = async () => {
  //   const session = await getSession();
  //   const response = await fetch(
  //     `/api/strategy/get-strategy?id=${session?.user?.id}`,
  //     {
  //       method: "GET",
  //     }
  //   );

  //   const data = await response.json();

  //   let filteredBot = data.body.filter((item) => item?._id === selectedRow._id);
  //   setLogs(filteredBot[0].logs);
  // };

  const onChangeBotType = (option) => {
    console.log(option);
    setBotType(option);
  };
  const onChangeExchange = (option) => {
    setExchange(option);
  };

  return (
    <Box>
      {/* <Modal open={showModal} onClose={handleModalClose}>
        <Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              // overflowY: "scroll",
              width: 700,
              maxHeight: 600,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid>
                <Typography sx={{ fontWeight: 650, fontSize: "2rem" }}>
                  Logs
                </Typography>
              </Grid>
            </Grid>
            <Box
              sx={{
                overflowY: "scroll",
                width: 650,
                maxHeight: 450,
                "&::-webkit-scrollbar": {
                  width: "0.4em",
                },
                "&::-webkit-scrollbar-track": {
                  boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                  webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,.1)",
                  outline: "1px solid slategrey",
                },
              }}
            >
              <p dangerouslySetInnerHTML={{ __html: logs }}></p>
            </Box>
          </Box>
        </Box>
      </Modal> */}
      <Modal
        open={openModal}
        onClose={() => {
          handleReset();
          setOpenModal(false);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width:
              width < 600 && width > 400 ? "85%" : width < 400 ? "90%" : "70%",
            height: "90%",
            background: "#262626",
            border: "1.2px solid #3F4341",
            borderRadius: 2,
            boxShadow: 24,
            px: 4,
            pt: 1,
            pb: 2,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "3px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "grey",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: width < 500 ? "1.8rem" : "2.2rem",
              fontWeight: 600,
              fontFamily: "Barlow, san-serif",
            }}
          >
            Create Bot
          </Typography>
          <Grid
            container
            alignItems="center"
            mt={1}
            spacing={width < 800 ? "" : "20px"}
          >
            <Grid item xs={12} sm={width < 800 ? 12 : 4}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 18,
                  fontFamily: "Barlow, san-serif",
                  whiteSpace: "nowrap",
                }}
              >
                Bot Name
              </Typography>
            </Grid>
            <Grid item xs={12} sm={width < 800 ? 12 : 8}>
              <ValidationTextField
                margin="normal"
                required
                id="botName"
                placeholder="Enter Name"
                sx={{
                  width: "100%",
                  fontFamily: "Barlow, san-serif",
                }}
                name="botName"
                value={botName}
                onChange={(e) => {
                  const temp = e.target.value;
                  setBotName(temp);
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={width < 800 ? "" : "20px"} mt={1}>
            <Grid item xs={12} sm={width < 800 ? 12 : 4}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 18,
                  fontFamily: "Barlow, san-serif",
                  whiteSpace: "nowrap",
                }}
              >
                Bot Type
              </Typography>
            </Grid>
            <Grid item xs={12} sm={width < 800 ? 12 : 8}>
              <Select
                placeHolder="Select"
                options={[
                  { value: "Short", label: "Short" },
                  { value: "Long", label: "Long" },
                ]}
                styles={customStyles}
                onChange={onChangeBotType}
                isSearchable={false}
                value={botType}
              />
            </Grid>
          </Grid>
          <Grid container spacing={width < 800 ? "" : "20px"} mt={1}>
            <Grid item xs={12} sm={width < 800 ? 12 : 4}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 18,
                  fontFamily: "Barlow, san-serif",
                  whiteSpace: "nowrap",
                }}
              >
                Bot Description
              </Typography>
            </Grid>
            <Grid item xs={12} sm={width < 800 ? 12 : 8}>
              <ValidationTextField
                multiline
                rows={3}
                margin="normal"
                required
                id="description"
                placeholder="Description"
                sx={{
                  width: "100%",
                  fontFamily: "Barlow, san-serif",
                }}
                name="description"
                value={description}
                onChange={(e) => {
                  const temp = e.target.value;
                  setDescription(temp);
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={width < 800 ? "" : "20px"} mt={1}>
            <Grid item xs={12} sm={width < 800 ? 12 : 4}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 18,
                  fontFamily: "Barlow, san-serif",
                  whiteSpace: "nowrap",
                }}
              >
                Exchange
              </Typography>
            </Grid>
            <Grid item xs={12} sm={width < 800 ? 12 : 8}>
              <Select
                placeHolder="Select"
                options={exchanges.map((item) => {
                  return {
                    value: item.exchange_name,
                    label: item.exchange_name,
                  };
                })}
                styles={customStyles}
                onChange={onChangeExchange}
                isSearchable={false}
                value={exchange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={width < 800 ? "" : "20px"} mt={1}>
            <Grid item xs={12} sm={width < 800 ? 12 : 4}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 18,
                  fontFamily: "Barlow, san-serif",
                  whiteSpace: "nowrap",
                }}
              >
                TimeFrame
              </Typography>
            </Grid>
            <Grid item xs={12} sm={width < 800 ? 12 : 8}>
              <TimeFrameSelectInput
                placeHolder={"Select TimeFrame"}
                fullWidth
                keyName={"timeFrame"}
                onChange={(event) => {
                  console.log(event.target.value);
                  setBotTimeFrame(event.target.value);
                }}
                value={botTimeFrame}
              />
            </Grid>
          </Grid>
          <Box>
            <div className="surface-container">
              <Typography
                sx={{
                  fontSize: width < 400 ? 20 : 25,
                  fontWeight: 600,
                  fontFamily: "Barlow, san-serif",
                }}
              >
                Select strategies
              </Typography>
              <div>
                <Grid container alignItems="center" sx={{ marginTop: 1 }}>
                  <Grid item xs={3}>
                    <Button
                      sx={{
                        background:
                          "linear-gradient(93.46deg, #790D83 -12.4%, #7A5CFF 105.26%)",
                        textTransform: "none",
                        color: "#FFFFFF",
                        minWidth: 60,
                        height: 25,
                        fontFamily: "Barlow, san-serif",
                        fontSize: 16,
                        fontWeight: 600,
                        mb: 2,
                      }}
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <SearchIcon />
                      <ValidationTextField
                        margin="normal"
                        required
                        id="search"
                        placeholder="Search strategies..."
                        sx={{
                          width: "100%",
                          fontFamily: "Barlow, san-serif",
                        }}
                        onChange={(e) => {
                          setCheckboxSearched(e.target.value);
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </div>

              <div>
                <List
                  sx={{
                    height: "30vh",
                    marginTop: 2,
                    marginBottom: 2,
                    overflow: "auto",
                    background: "#262626",
                    border: "2px solid #3F4341",
                    borderRadius: "4.8px",
                    boxShadow: "4px 4px 4px #131313",
                    "&::-webkit-scrollbar": {
                      width: "3px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "grey",
                      borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "transparent",
                    },
                  }}
                >
                  {found?.map((item, index) => (
                    <ListItem key={item._id} dense divider>
                      <CustomCheckbox
                        checked={item.checked}
                        onChange={(e) => {
                          handleCheckbox(e, item._id);
                        }}
                        disabled={disable}
                      />
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontFamily: "Barlow, san-serif",
                              fontWeight: 600,
                              fontSize: width < 400 ? 17 : 20,
                            }}
                          >
                            {item?.generalSettings?.strategyName}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </div>

              <Grid container spacing={2}>
                {checkedList
                  .slice(0, !limit ? 5 : checkedList.length)
                  .map((data) => (
                    <Grid key={data._id} item>
                      <div className="selected-checkbox">
                        <Typography
                          sx={{
                            fontFamily: "Barlow, san-serif",
                            fontWeight: 600,
                            fontSize: 22,
                            pl: 2,
                          }}
                        >
                          {data.generalSettings.strategyName}
                        </Typography>
                        {/* <RedCrossIcon
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              handleDelete(e, data._id);
                            }}
                          /> */}
                      </div>
                    </Grid>
                  ))}
                {!limit && checkedList.length > 5 && (
                  <div onClick={handleSeeMore} className="see-more-container">
                    <Typography
                      sx={{
                        fontFamily: "Barlow, san-serif",
                        fontWeight: 600,
                        fontSize: 22,
                        pl: 2,
                      }}
                    >
                      +{checkedList.length - 5} more
                    </Typography>
                  </div>
                )}
              </Grid>
            </div>
            <Box
              sx={{
                display: "flex",
                gap: width < 460 ? 1 : "20px",
                justifyContent: "flex-end",
                flexDirection: width < 460 ? "column" : "row",
                mt: 10,
              }}
            >
              <Button
                sx={{
                  background:
                    "linear-gradient(93.46deg, #790D83 -12.4%, #7A5CFF 105.26%)",
                  textTransform: "none",
                  color: "#FFFFFF",
                  minWidth: 90,
                  height: width < 460 ? 30 : 40,
                  fontFamily: "Barlow, san-serif",
                  fontSize: 18,
                  fontWeight: 600,
                }}
                onClick={() => {
                  handleReset();
                  setOpenModal(false);
                }}
              >
                Cancel
              </Button>

              <Button
                sx={{
                  background:
                    "linear-gradient(93.46deg, #790D83 -12.4%, #7A5CFF 105.26%)",
                  textTransform: "none",
                  color: "#FFFFFF",
                  minWidth: 90,
                  height: width < 460 ? 30 : 40,
                  fontFamily: "Barlow, san-serif",
                  fontSize: 18,
                  fontWeight: 600,
                }}
                onClick={handleCreateBot}
              >
                Create Bot
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "white",
            },
          }}
        >
          <Tab
            sx={{
              fontWeight: 600,
              color: "white",
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
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
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
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
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
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
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
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
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
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
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
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
              fontSize: 16,
              fontFamily: "Barlow, san-serif",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            label="Binance Futures USDT-M"
            {...a11yProps(6)}
          />
        </Tabs>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Button
            sx={{
              background: "linear-gradient(to right,#790D83,#7A5CFF)",
              textTransform: "none",
              border: "none",
              borderRadius: 1,
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: 15,
                fontFamily: "Barlow, san-serif",
                fontWeight: 500,
              }}
            >
              Stop All Bots
            </Typography>
          </Button>
          <Button
            sx={{
              background: "linear-gradient(to right,#790D83,#7A5CFF)",
              textTransform: "none",
              border: "none",
              borderRadius: 1,
              my: 1,
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: 15,
                fontFamily: "Barlow, san-serif",
                fontWeight: 500,
              }}
            >
              Start All Bots
            </Typography>
          </Button>
        </Box>
      </Box>

      <Grid container my={1} spacing={"20px"}>
        <Grid item xs={12} sm={8.5} md={9.5}>
          <InputBase
            placeholder="Search by bot's name"
            sx={{
              height: "38px",
              minWidth: "100%",
              borderRadius: 1,
              fontFamily: "Barlow, san-serif",
              fontWeight: 500,
              fontSize: 16,
            }}
            value={searchByBotsName}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  style={{
                    color: "white",
                    marginLeft: "5px",
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>

        <Grid item xs={6} sm={3.5} md={2.5}>
          <Button
            sx={{
              background: "linear-gradient(to right,#790D83,#7A5CFF)",
              textTransform: "none",
              border: "none",
              borderRadius: 1,
              color: "white",
              fontFamily: "Barlow, san-serif",
              fontWeight: 500,
              width: "100%",
              height: 45,
            }}
            onClick={handleClearFilter}
          >
            Clear Filters
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", mt: 3, gap: "0.7rem", flexWrap: "wrap" }}>
        <Button
          sx={{
            height: "49px",
            width: "150px",
            fontSize: 16,
            fontWeight: 500,
            color: "#FFFFFF",
            fontFamily: "Barlow, san-serif",
            textTransform: "none",
            border: "1.5px solid #3A383F",
            borderRadius: "5px",
            background:
              "linear-gradient(93.46deg, #350B41 -12.4%, #35256A 105.26%)",
          }}
          onClick={() => setOpenModal(true)}
        >
          New Bot
        </Button>
        <Button
          sx={{
            height: "49px",
            width: "150px",
            fontSize: 16,
            fontWeight: 500,
            color: "#FFFFFF",
            fontFamily: "Barlow, san-serif",
            textTransform: "none",
            border: "1.5px solid #3A383F",
            borderRadius: "5px",
            background:
              "linear-gradient(93.46deg, #350B41 -12.4%, #35256A 105.26%)",
          }}
          onClick={handleDeleteBot}
        >
          Delete Bot
        </Button>
      </Box>
      <Grid container spacing={"20px"} mt={0.6}>
        {bot.map((item, index) => {
          return (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={6}
              lg={isDrawerOpen && width < 1350 ? 6 : 4}
              xl={4}
            >
              <Bot
                dataArray={item}
                handleBotsCheckbox={handleBotsCheckbox}
                handleBotStatus={handleBotStatus}
                handleViewModal={handleViewModal}
                allBots={bot}
                updateBots={setBots}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default BotsLibraryTabs;
