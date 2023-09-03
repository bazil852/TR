import React, { useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SelectInputParameters from "../../widgets/SelectInputParameters";
import { getSession } from "next-auth/react";

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    height: 15,
    backgroundColor: "#3E3E3E",
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
  },
}));

const GeneralSettings = (props) => {
  console.log(props);
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const [strategyFolderOptions, setStrategyFolderOptions] = useState([]);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    fetchStrategyFolderByUserId();
  }, []);
  const fetchStrategyFolderByUserId = async () => {
    let { user } = await getSession();
    const response = await fetch(
      `/api/strategyFolder/get-strategy-folders-id?id=${user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newData = await response.json();
    console.log(newData);
    setStrategyFolderOptions(newData.body);
  };

  return (
    <Box
      sx={{
        mt: "23px",
        borderRadius: "5px",
        px:
          width > 1200 && width < 1300
            ? 5
            : width > 1300 && width < 1400
            ? 10
            : width > 1400
            ? 15
            : "",
      }}
    >
      <Grid container spacing={width < 600 ? 1 : 3}>
        <Grid item xs={12} sm={6} md={5} lg={5}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              mb: width < 900 ? 1 : 3,
              gap: width < 900 ? 0 : 5,
              flexWrap: width < 900 ? "wrap" : "nowrap",
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
                fontFamily: "Barlow, san-serif",
                color: "#CCCCCC",
                whiteSpace: "nowrap",
              }}
            >
              Strategy Name
            </Typography>
            <ValidationTextField
              margin="normal"
              required
              id="strategyName"
              placeholder="Strategy Name"
              sx={{
                width: "100%",
                fontFamily: "Barlow, san-serif",
              }}
              name="strategyName"
              value={props.GeneralSettingsData[props.index]["strategyName"]}
              onChange={(e) => {
                const temp = [...props.GeneralSettingsData];
                temp[props.index]["strategyName"] = e.target.value;
                props.setGeneralSettingsData(temp);
              }}
              disabled={props.editSettings}
            />
            {/* <SelectInputParameters
              placeHolder={"Strategy Name"}
              value={props.GeneralSettingsData[props.index]["Strategy Name"]}
              onChange={(e) => {
                const temp = [...props.GeneralSettingsData];
                temp[props.index]["Strategy Name"] = e.value;
                props.setGeneralSettingsData(temp);
              }}
              options={ParametersOptions}
            /> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              mb: width < 900 ? 1 : 3,
              gap: width < 900 ? 0 : 4.6,
              flexWrap: width < 900 ? "wrap" : "nowrap",
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
                fontFamily: "Barlow, san-serif",
                color: "#CCCCCC",
                whiteSpace: "nowrap",
              }}
            >
              Strategy Folder
            </Typography>
            <SelectInputParameters
              placeHolder="Strategy Folder"
              value={props.GeneralSettingsData[props.index]["strategyFolder"]}
              onChange={(e) => {
                const temp = [...props.GeneralSettingsData];
                temp[props.index]["strategyFolder"] = e.value;
                props.setGeneralSettingsData(temp);
              }}
              options={strategyFolderOptions}
              Width={"100%"}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              mb: width < 900 && width > 600 ? 1 : width < 600 ? 0 : 3,
              gap: width < 900 ? 0 : 10.9,
              flexWrap: width < 900 ? "wrap" : "nowrap",
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
                fontFamily: "Barlow, san-serif",
                color: "#CCCCCC",
                whiteSpace: "nowrap",
              }}
            >
              Bot Link
            </Typography>
            <SelectInputParameters
              placeHolder="Bot Link"
              value={props.GeneralSettingsData[props.index].botLink}
              onChange={(e) => {
                const temp = [...props.GeneralSettingsData];
                temp[props.index].botLink = e.value;
                props.setGeneralSettingsData(temp);
              }}
              // options={ParametersOptions}
              options={[]}
              Width={"100%"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={7} lg={7}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: width < 600 ? 0 : 1,
              mb: width < 900 && width > 600 ? 1.5 : width < 600 ? 1 : 2.5,
              gap: width < 900 ? 0 : 2,
              flexWrap: width < 900 ? "wrap" : "nowrap",
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
                fontFamily: "Barlow, san-serif",
                color: "#CCCCCC",
                whiteSpace: "nowrap",
              }}
            >
              Strategy Description
            </Typography>
            <ValidationTextField
              margin="normal"
              required
              id="startegydescription"
              placeholder="Strategy Description"
              sx={{
                width: "100%",
                fontFamily: "Barlow, san-serif",
              }}
              name="strategyDescription"
              value={
                props.GeneralSettingsData[props.index]["strategyDescription"]
              }
              onChange={(e) => {
                const temp = [...props.GeneralSettingsData];
                temp[props.index]["strategyDescription"] = e.target.value;
                props.setGeneralSettingsData(temp);
              }}
              disabled={props.editSettings}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: width < 900 ? 0 : 14.75,
              flexWrap: width < 900 ? "wrap" : "nowrap",
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
                fontFamily: "Barlow, san-serif",
                color: "#CCCCCC",
                whiteSpace: "nowrap",
              }}
            >
              Notes
            </Typography>

            <ValidationTextField
              multiline
              rows={3}
              margin="normal"
              required
              id="notes"
              placeholder="Notes"
              sx={{
                width: "100%",
                fontFamily: "Barlow, san-serif",
              }}
              name="notes"
              value={props.GeneralSettingsData[props.index].notes}
              onChange={(e) => {
                const temp = [...props.GeneralSettingsData];
                temp[props.index].notes = e.target.value;
                props.setGeneralSettingsData(temp);
              }}
              disabled={props.editSettings}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralSettings;
