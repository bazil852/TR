import PrivateHeader from "../components/layout/PrivateHeader";
import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Backdrop,
  Fade,
  Button,
  InputBase,
  List,
  ListItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import ReactPlayer from "react-player";
import StrategyFolders from "../components/cards/strategy-library/StrategyFolders";
import MyStrategies from "../components/cards/strategy-library/MyStrategies";
import CommunityStrategies from "../components/cards/strategy-library/CommunityStrategies";
import { Video } from "../utils/icons";
import { alpha, styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { getSession } from "next-auth/react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

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

const StrategyLibrary = () => {
  const router = useRouter();
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [strategies, setStrategies] = useState([]);
  const [strategyFolder, setStrategyFolder] = useState([]);
  const [
    strategiesNotLinkedToFolder,
    setStrategiesNotLinkedToFolder,
  ] = useState([]);
  const [othersStrategies, setOthersStrategies] = useState([]);

  const [checkboxSearched, setCheckboxSearched] = useState("");
  const [checkedList, setCheckedList] = useState([]);

  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");

  const [limit, setLimit] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    fetchStrategiesByUserId();
    fetchStrategiesNotLinkedToFolderByUserId();
    fetchStrategyFoldersByUserId();
    fetchOthersStrategiesByUserId();
  }, []);
  useEffect(() => {
    setCheckedList(
      [...strategiesNotLinkedToFolder].filter((item) => item.checked)
    );
  }, [strategiesNotLinkedToFolder]);

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
  const fetchStrategiesNotLinkedToFolderByUserId = async () => {
    let session = await getSession();
    const response = await fetch(
      `/api/strategy/get-strategies-without-folder?id=${session?.user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newData = await response.json();
    console.log(newData);
    setStrategiesNotLinkedToFolder(newData);
  };
  const fetchStrategyFoldersByUserId = async () => {
    let session = await getSession();
    const response = await fetch(
      `/api/strategyFolder/get-strategy-folder?id=${session?.user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newData = await response.json();
    console.log(newData);
    setStrategyFolder(newData.body);
  };
  const fetchOthersStrategiesByUserId = async () => {
    let session = await getSession();
    const response = await fetch(
      `/api/strategy/get-others-strategies?id=${session?.user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newData = await response.json();
    console.log(newData);
    setOthersStrategies(newData.body);
  };

  const found = strategiesNotLinkedToFolder?.filter((item) => {
    if (!checkboxSearched) {
      return true;
    }
    return item?.generalSettings?.strategyName
      ?.toLowerCase()
      .includes(checkboxSearched.toLowerCase());
  });
  const handleCheckbox = (e, key) => {
    const newState = strategiesNotLinkedToFolder.map((obj) => {
      return obj._id === key ? { ...obj, checked: e.target.checked } : obj;
    });
    // setCheckedPaint(newState);
    setStrategiesNotLinkedToFolder(newState);
  };
  const handleCreateFolder = async () => {
    const { user } = await getSession();
    console.log(folderName, folderDescription, checkedList);
    let body = {
      folderName,
      folderDescription,
      strategiesList: checkedList.map((item) => item._id),
      user,
    };
    const response = await fetch(`/api/strategyFolder/create-strategy-folder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      setStrategyFolder([body]);
      setOpenModal(false);
      alert("Strategy Folder Created");
    } else {
      setOpenModal(false);
      alert("Strategy Folder Not Created");
    }
  };

  return (
    <Box mt={8} minHeight={"100%"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: width < 600 && "left",
          minWidth: "100%",
          flexDirection: width < 600 && "column",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontSize: "2.2rem",
              fontWeight: 600,
              ml: 1,
              fontFamily: "Barlow, san-serif",
            }}
          >
            Strategy Library
          </Typography>
          <Typography
            sx={{
              fontSize: "0.9rem",
              ml: 1,
              mb: 1,
              fontFamily: "Barlow, san-serif",
              color: "#ACB2B7",
            }}
          >
            Create, test and save your strategies
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#2A2C2D",
              borderRadius: 2,
              border: "1px solid #393B3C",
              gap: 1,
              width: 140,
              height: 35,
              cursor: "pointer",
              "&:active": {
                backgroundColor: "#434546",
              },
            }}
            onClick={handleOpen}
          >
            <Video />
            <Typography
              sx={{
                color: "white",
                fontFamily: "Barlow, san-serif",
                whiteSpace: "nowrap",
                mt: -0.3,
              }}
            >
              Strategy Guide
            </Typography>
          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "90vw",
                  margin: "auto",
                }}
              >
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=0fPQ1lNAUbY"
                  playing
                />
              </Box>
            </Fade>
          </Modal>
        </Box>
      </Box>

      <Box sx={{ display: "flex", mt: 4, gap: "0.7rem" }}>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
            <h1>Create New Folder</h1>
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
                  Folder Name
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <ValidationTextField
                  margin="normal"
                  required
                  id="folderName"
                  placeholder="Enter Name"
                  sx={{
                    width: "100%",
                    fontFamily: "Barlow, san-serif",
                  }}
                  name="folderName"
                  value={folderName}
                  onChange={(e) => {
                    const temp = e.target.value;
                    setFolderName(temp);
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
                  Folder Description
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <ValidationTextField
                  multiline
                  rows={3}
                  margin="normal"
                  required
                  id="folderDescription"
                  placeholder="Description"
                  sx={{
                    width: "100%",
                    fontFamily: "Barlow, san-serif",
                  }}
                  name="folderDescription"
                  value={folderDescription}
                  onChange={(e) => {
                    const temp = e.target.value;
                    setFolderDescription(temp);
                  }}
                  // value={props.GeneralSettingsData[props.index].notes}
                  // onChange={(e) => {
                  //   const temp = [...props.GeneralSettingsData];
                  //   temp[props.index].notes = e.target.value;
                  //   props.setGeneralSettingsData(temp);
                  // }}
                  // disabled={props.editSettings}
                />
              </Grid>
            </Grid>
            <Box>
              <div className="surface-container">
                <Typography variant="h5" component="div">
                  Select strategies
                </Typography>
                <div>
                  <Grid container alignItems="center" sx={{ marginTop: 1 }}>
                    <Grid item xs={1}>
                      <SearchIcon />
                    </Grid>
                    <Grid item xs={11}>
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
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  className="send-btn"
                  onClick={handleCreateFolder}
                >
                  Create Folder
                </Button>
              </div>
            </Box>
          </Box>
        </Modal>
        <Button
          sx={{
            height: "40px",
            width: "150px",
            fontSize: 16,
            fontWeight: 500,
            color: "#FFFFFF",
            fontFamily: "Barlow, san-serif",
            textTransform: "none",
            background:
              "linear-gradient(93.46deg, #350B41 -12.4%, #35256A 105.26%)",
          }}
          onClick={() => setOpenModal(true)}
        >
          New Folder
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
            background:
              "linear-gradient(93.46deg, #1E0625 -12.4%, #1E153D 105.26%)",
          }}
          onClick={() => {
            router.push("Startegy");
          }}
        >
          New Strategy
        </Button>
      </Box>
      <StrategyFolders data={strategyFolder} />
      <MyStrategies data={strategies} />
      <CommunityStrategies data={othersStrategies} />
    </Box>
  );
};

export default function Strategy() {
  return (
    <>
      <PrivateHeader
        current="1"
        Component={StrategyLibrary}
        title=" Strategy Library"
      />
    </>
  );
}
