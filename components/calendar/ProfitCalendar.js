import { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { CardContent } from "@mui/material";
import { getDaysInMonth } from "../../utils/helpers";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DateInfoCard from "../cards/date-card/DateInfoCard";

const monthData = [
  {
    monthNumber: 1,
    month: "January",
  },
  {
    monthNumber: 2,
    month: "February",
  },
  {
    monthNumber: 3,
    month: "March",
  },
  {
    monthNumber: 4,
    month: "April",
  },
  {
    monthNumber: 5,
    month: "May",
  },
  {
    monthNumber: 6,
    month: "June",
  },
  {
    monthNumber: 7,
    month: "July",
  },
  {
    monthNumber: 8,
    month: "August",
  },
  {
    monthNumber: 9,
    month: "September",
  },
  {
    monthNumber: 10,
    month: "October",
  },
  {
    monthNumber: 11,
    month: "November",
  },
  {
    monthNumber: 12,
    month: "December",
  },
];

function ProfitCalendar() {
  const [month, setMonth] = useState(2);
  const [days, setDays] = useState("");

  const dummy = Array(32).fill(1);

  const handleChange = (event) => {
    setMonth(event.target.value);

    const date = new Date();
    const currentYear = date.getFullYear();
    setDays(getDaysInMonth(currentYear, event.target.value));
  };

  return (
    <Card
      sx={{
        background: "#191919",
        height: "600px",
        border: "1px solid #666666",
        width: "500px",
      }}
    >
      <CardContent sx={{ padding: "0px" }}>
        <Typography sx={{ fontSize: 18, p: "20px" }} color="White">
          Profit By Day Calendar
        </Typography>
        <hr sx={{ border: "1px solid #7A8580" }} />
        <div style={{ padding: "20px" }}>
          <FormControl sx={{ m: 1, pb: 2, minWidth: 120 }}>
            <Select
              value={month}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {monthData.map((item) => {
                return (
                  <MenuItem value={item.monthNumber} key={item.monthNumber}>
                    {item.month}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Grid container rowSpacing={2} columnSpacing={2}>
            {dummy?.map((item, index) => {
              return (
                <Grid xs={3} item key={index}>
                  <DateInfoCard date={1} profit={200} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfitCalendar;
