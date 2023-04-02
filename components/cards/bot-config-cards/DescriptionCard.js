import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const IconPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#272727" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  borderRadius: "8px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DescriptionCard = ({ title, icon, data }) => {
  return (
    <Card
      sx={{ minWidth: 200, background: "#191919", border: "1px solid #666666" }}
    >
      <CardContent>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "20vh" }}
        >
          <Grid item>
            <Stack
              justifyContent="center"
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <IconPaper>{icon}</IconPaper>

              <Stack>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  {title}
                </Typography>
                <Typography color="primary">{data}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DescriptionCard;
