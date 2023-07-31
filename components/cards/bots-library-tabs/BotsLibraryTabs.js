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

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    height: 11,
    backgroundColor: "#2A2A2A",
    borderRadius: "6px",
    fontSize: 15,
    fontWeight: 400,
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
      (item) => item.exchange_name === exchange
    );

    let body = {
      botName,
      description,
      botType,
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
    console.log(data);
    if (response.ok) {
      let newBots = bot.map((item) =>
        item._id === botId
          ? { ...item, state: tempStateText[item?.state] }
          : item
      );

      setBots(newBots);
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

  return (
    <Box>
      <Modal open={showModal} onClose={handleModalClose}>
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
              {/* <Grid>
                  <Button onClick={handleRefreshLogs}>Refresh</Button>
                </Grid> */}
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
      </Modal>
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
            width: 700,
            maxHeight: 1000,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h1>Create Bot</h1>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  fontFamily: "Barlow, san-serif",
                  color: "#CCCCCC",
                  whiteSpace: "nowrap",
                }}
              >
                Bot Name
              </Typography>
            </Grid>
            <Grid item xs={8}>
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
          <Grid container alignItems="center" sx={{ marginTop: 2 }}>
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  fontFamily: "Barlow, san-serif",
                  color: "#CCCCCC",
                  whiteSpace: "nowrap",
                }}
              >
                Bot Type
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <SelectInputParameters
                placeHolder="Select"
                value={exchange}
                onChange={async (event) => {
                  setBotType(event.value);
                }}
                options={[
                  { value: "Short", label: "Short" },
                  { value: "Long", label: "Long" },
                ]}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" sx={{ marginTop: 2 }}>
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  fontFamily: "Barlow, san-serif",
                  color: "#CCCCCC",
                  whiteSpace: "nowrap",
                }}
              >
                Bot Description
              </Typography>
            </Grid>
            <Grid item xs={8}>
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
          <Grid container alignItems="center" sx={{ marginTop: 2 }}>
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  fontFamily: "Barlow, san-serif",
                  color: "#CCCCCC",
                  whiteSpace: "nowrap",
                }}
              >
                Exchange
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <SelectInputParameters
                placeHolder="Select"
                value={exchange}
                onChange={async (event) => {
                  setExchange(event.value);
                }}
                options={exchanges.map((item) => {
                  return {
                    value: item.exchange_name,
                    label: item.exchange_name,
                  };
                })}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" sx={{ marginTop: 2 }}>
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  fontFamily: "Barlow, san-serif",
                  color: "#CCCCCC",
                  whiteSpace: "nowrap",
                }}
              >
                TimeFrame
              </Typography>
            </Grid>
            <Grid item xs={8}>
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
          <Box sx={{ marginTop: 2 }}>
            <div className="surface-container">
              <Typography variant="h5" component="div">
                Select strategies
              </Typography>
              <div>
                <Grid container alignItems="center" sx={{ marginTop: 1 }}>
                  <Grid item xs={3}>
                    <Button onClick={handleReset}>Reset</Button>
                  </Grid>
                  <Grid item xs={1} sx={{ marginTop: 1 }}>
                    <SearchIcon />
                  </Grid>
                  <Grid item xs={8}>
                    <ValidationTextField
                      margin="normal"
                      required
                      id="search"
                      placeholder="Search strategies"
                      sx={{
                        width: "100%",
                        fontFamily: "Barlow, san-serif",
                      }}
                      onChange={(e) => {
                        setCheckboxSearched(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </div>

              <div>
                <List
                  sx={{
                    height: 200,
                    marginTop: 2,
                    marginBottom: 2,
                    overflow: "auto",
                    border: "1px solid #000",
                  }}
                >
                  {found?.map((item, index) => (
                    <ListItem key={item._id} dense divider>
                      <Checkbox
                        checked={item.checked}
                        onChange={(e) => {
                          handleCheckbox(e, item._id);
                        }}
                        disabled={disable}
                      />
                      <ListItemText
                        primary={
                          <Typography variant="h6" component="div">
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
                        <Typography variant="h6" component="div">
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
                    <Typography variant="body1" component="div">
                      +{checkedList.length - 5} more
                    </Typography>
                  </div>
                )}
              </Grid>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <Button
                variant="outlined"
                className="cancel-btn"
                sx={{ marginRight: 1 }}
                onClick={() => {
                  handleReset();
                  setOpenModal(false);
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="primary"
                className="send-btn"
                onClick={handleCreateBot}
              >
                Create Bot
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
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

      <Grid container my={1} spacing={1}>
        <Grid item xs={12} sm={6} md={5}>
          <InputBase
            placeholder="Search by bot's name"
            sx={{
              height: "38px",
              minWidth: "100%",
              background: "#ffffff1f",
              borderRadius: 1,
              fontFamily: "Barlow, san-serif",
              fontWeight: 400,
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
        <Grid item xs={12} sm={6} md={5}>
          <InputBase
            placeholder="Pairs"
            sx={{
              minWidth: "100%",
              height: "38px",
              paddingLeft: "10px",
              background: "#ffffff1f",
              borderRadius: 1,
              fontFamily: "Barlow, san-serif",
              fontWeight: 400,
              fontSize: 16,
            }}
            value={pairs}
            onChange={handlePairs}
          />
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
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
            height: "40px",
            width: "150px",
            fontSize: 16,
            fontWeight: 500,
            color: "#FFFFFF",
            fontFamily: "Barlow, san-serif",
            textTransform: "none",
            border: "1px solid #634372",
            background:
              "linear-gradient(93.46deg, #350B41 -12.4%, #35256A 105.26%)",
          }}
          onClick={() => setOpenModal(true)}
        >
          New Bot
        </Button>
        <Button
          sx={{
            height: "40px",
            width: "150px",
            fontSize: 16,
            fontWeight: 500,
            color: "#FFFFFF",
            fontFamily: "Barlow, san-serif",
            textTransform: "none",
            border: "1px solid #634372",
            background:
              "linear-gradient(93.46deg, #350B41 -12.4%, #35256A 105.26%)",
          }}
          onClick={handleDeleteBot}
        >
          Delete Bot
        </Button>
      </Box>
      <Grid container spacing={1} mt={3}>
        {bot.map((item, index) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
              <Bot
                dataArray={item}
                handleBotsCheckbox={handleBotsCheckbox}
                handleBotStatus={handleBotStatus}
                handleViewModal={handleViewModal}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default BotsLibraryTabs;
