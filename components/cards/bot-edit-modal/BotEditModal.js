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
import { alpha, styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import TimeFrameSelectInput from "../../widgets/TimeFrameSelectInput";
import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";

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

const BotEditModal = ({
  openModal,
  setOpenModal,
  botInfo,
  allBots,
  updateBots,
}) => {
  console.log(botInfo);
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
  //   const [openModal, setOpenModal] = useState(false);

  const [showModal, setShowModal] = React.useState(false);
  const [logs, setLogs] = React.useState("");

  const [bot, setBots] = useState([]);
  const [checkedBot, setCheckedBots] = useState([]);

  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  const [width, setWidth] = useState(globalThis?.innerWidth);

  console.log(strategies);

  useEffect(() => {
    //Functions
    fetchAllExchangesWithoutAssetsByUserId();
    fetchStrategiesByUserId();
    //useState
    setBotName(botInfo?.botName);
    setBotType({ value: botInfo?.botType, label: botInfo?.botType });
    setDescription(botInfo?.description);
    setExchange({
      value: botInfo?.exchange?.exchange_name,
      label: botInfo?.exchange?.exchange_name,
    });
    setBotTimeFrame(botInfo?.timeFrame);
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
    console.log(newData, botInfo);
    newData.body.forEach((item) => {
      // Check if there's a matching _id in botInfo.StrategyId
      const existsInBotInfo = botInfo?.strategyId?.some(
        (botItem) => botItem?._id === item?._id
      );

      // If it exists, add the "check" key with the value of true
      if (existsInBotInfo) {
        item.checked = true;
      }
    });
    setStrategies(newData.body);
  };

  const found = strategies?.filter((item) => {
    if (!checkboxSearched) {
      return true;
    }
    return item?.generalSettings?.strategyName
      ?.toLowerCase()
      .includes(checkboxSearched.toLowerCase());
  });
  console.log(checkboxSearched);

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

  const onChangeBotType = (option) => {
    console.log(option);
    setBotType(option);
  };
  const onChangeExchange = (option) => {
    setExchange(option);
  };

  const handleUpdateBot = async () => {
    const { user } = await getSession();
    console.log(botName, description, checkedList, exchange);

    let selectedExchangeIndex = exchanges.findIndex(
      (item) => item.exchange_name === exchange?.value
    );
    console.log(exchanges, selectedExchangeIndex, botTimeFrame);

    const temp = botType;
    console.log(temp);

    let body = {
      botName,
      description,
      botType: temp?.value,
      timeFrame: botTimeFrame,
      strategyId: checkedList.map((item) => item._id),
      user,
      exchange: exchanges[selectedExchangeIndex].id,
      state: "off",
      _id: botInfo._id,
    };
    console.log(body);
    const response = await fetch(`/api/bot/update-bot?id=${botInfo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      let newBots = [...allBots];
      let editedBotIndex = newBots.findIndex(
        (item) => item._id === botInfo._id
      );
      newBots[editedBotIndex] = data.body;
      updateBots(newBots);
      //   setBots(newBots);
      // setStrategyFolder([body]);
      //   handleReset();
      setOpenModal(false);
      alert("Strategy Folder Updated");
    } else {
      handleReset();
      setOpenModal(false);
      alert("Strategy Folder Not Updated");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Modal open={openModal} onClose={handleModalClose}>
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
          Edit Bot
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
              onClick={handleUpdateBot}
            >
              Update Bot
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default BotEditModal;
