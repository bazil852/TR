import React, { useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ValidationTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    height: 15,
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
  },
}));

const GeneralSettings = (props) => {
  const [width, setWidth] = useState(globalThis?.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        mt: 3,
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
              id="startegyname"
              placeholder="Strategy Name"
              sx={{
                fontFamily: "Barlow, san-serif",
                width: "100%",
              }}
              name="strategyName"
              value={props.GeneralSettingsData[props.index]["Strategy Name"]}
              onChange={(e) => {
                const temp = [...props.GeneralSettingsData];
                temp[props.index]["Strategy Name"] = e.target.value;
                props.setGeneralSettingsData(temp);
              }}
              disabled={props.editSettings}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              mb: width < 900 ? 1 : 3,
              gap: width < 900 ? 0 : 4.5,
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
            <ValidationTextField
              margin="normal"
              required
              id="startegyfolder"
              placeholder="Strategy Folder"
              sx={{
                width: "100%",
                fontFamily: "Barlow, san-serif",
              }}
              name="strategyFolder"
              value={props.GeneralSettingsData[props.index]["Strategy Folder"]}
              onChange={(e) => {
                const temp = [...props.GeneralSettingsData];
                temp[props.index]["Strategy Folder"] = e.target.value;
                props.setGeneralSettingsData(temp);
              }}
              disabled={props.editSettings}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              mb: width < 900 && width > 600 ? 1 : width < 600 ? 0 : 3,
              gap: width < 900 ? 0 : 10.7,
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
            <ValidationTextField
              margin="normal"
              required
              id="botlink"
              placeholder="Bot Link"
              sx={{ width: "100%", fontFamily: "Barlow, san-serif" }}
              name="botLink"
              value={props.GeneralSettingsData[props.index].BotLink}
              onChange={(e) => {
                const temp = [...props.GeneralSettingsData];
                temp[props.index].BotLink = e.target.value;
                props.setGeneralSettingsData(temp);
              }}
              disabled={props.editSettings}
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
                props.GeneralSettingsData[props.index]["Strategy Description"]
              }
              onChange={(e) => {
                const temp = [...props.GeneralSettingsData];
                temp[props.index]["Strategy Description"] = e.target.value;
                props.setGeneralSettingsData(temp);
              }}
              disabled={props.editSettings}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: width < 900 ? 0 : 14.7,
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
              value={props.GeneralSettingsData[props.index].Notes}
              onChange={(e) => {
                const temp = [...props.GeneralSettingsData];
                temp[props.index].Notes = e.target.value;
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
