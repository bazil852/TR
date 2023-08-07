import { React, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  Typography,
} from "@mui/material";
import { getDaysInMonth } from "../../utils/helpers";
import Select from "react-select";
import { useSelector } from "react-redux";

const dataArray = [
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: -0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: -0 },
  { value: 0 },
  { value: 0 },
];

const customStyles = {
  control: (base) => ({
    ...base,
    minHeight: "10px",
    height: "auto",
    width: "110px",
    borderRadius: "6px",
    background: "linear-gradient(to right,#790D83,#7A5CFF)",
    fontFamily: "Barlow, san-serif",
    fontWeight: "600",
    border: "none",
    padding: "0",
    fontSize: "13px",
    boxSizing: "border-box",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
    position: "relative",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "5px 5px 6px 0px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menu: (base) => ({
    ...base,
    borderRadius: "4px",
    marginTop: "5px",
    width: "100%",
    color: "white",
    background: "#333333",
  }),
  menuList: (provided) => ({
    ...provided,
    "&::-webkit-scrollbar": {
      width: "3px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      fontFamily: "Barlow, san-serif",
      background: isFocused || isSelected ? "#555" : "transparent",
    };
  },
};

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

const monthlyData = [
  { title: "Total Month", value: 0 },
  { title: "Average Month", value: 0 },
  { title: "Average Day", value: 0 },
];

function ProfitCalendar() {
  const [days, setDays] = useState("");
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  const [selectedMonth, setSelectedMonth] = useState({
    value: 1,
    label: "January",
  });

  const handleChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
    const date = new Date();
    const currentYear = date.getFullYear();
    setDays(getDaysInMonth(currentYear, selectedOption.value));
  };

  const monthOptions = monthData.map((item) => ({
    value: item.monthNumber,
    label: item.month,
  }));

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card
      sx={{
        background: "#262626",
        border: "1.2px solid #3F4341",
        borderRadius: "4.8px",
        minHeight: "100%",
        minWidth: "100%",
        overflowX: "auto",
      }}
    >
      <CardContent
        sx={{
          paddingLeft: width > 1449 ? 0 : 2,
          paddingRight: width > 1449 ? 0 : 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            px: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Barlow, san-serif",
              fontWeight: 600,
              fontSize: width > 1449 ? 21 : 22,
              color: "white",
            }}
          >
            BOTS PERFORMANCE / DAY
          </Typography>
          <Box mt={1}>
            <FormControl>
              <Select
                styles={customStyles}
                options={monthOptions}
                value={selectedMonth}
                onChange={handleChange}
                isSearchable={false}
                menuPosition={"fixed"}
              />
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: width < 500 ? 0.5 : 1.5,
            px: width < 500 ? 0 : 2,
            mt: 3,
          }}
        >
          <Grid container spacing={1}>
            {dataArray?.map((item, index) => {
              return (
                <Grid
                  item
                  xs={
                    width > 0 && width < 269
                      ? 6
                      : width > 269 && width < 319
                      ? 3
                      : width > 319 && width < 412
                      ? 2.4
                      : width > 499 && width < 569
                      ? 1.7
                      : width > 569 && width < 669
                      ? 1.5
                      : width > 669 && width < 776
                      ? 1.2
                      : width > 776 && width < 1037
                      ? 1
                      : width > 1036 && width < 1131 && !isDrawerOpen
                      ? 2.4
                      : width > 1036 && width < 1210 && isDrawerOpen
                      ? 1
                      : width > 1209 && width < 1390 && isDrawerOpen
                      ? 0.8
                      : 2
                  }
                >
                  <Box
                    key={index}
                    sx={{
                      background: "#3E3E3E",
                      borderRadius: 1.5,
                      height: 55,
                      p: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: width < 500 ? 14 : 16,
                        fontWeight: 600,
                        fontFamily: "Barlow, san-serif",
                        color: "white",
                      }}
                    >
                      {index + 1}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: width < 500 ? 10 : 12,
                        fontWeight: 500,
                        fontFamily: "Barlow, san-serif",
                        color: item.value > 0 ? "#4BD469" : "#FF6060",
                      }}
                    >
                      {item.value > 0 ? "+" : ""}
                      {item.value}$
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: width < 500 ? 0.5 : 1.5,
            px: width < 500 ? 0 : 2,
            mt: 3,
            alignItems: "center",
          }}
        >
          <Grid container spacing={1}>
            {monthlyData.map((item, index) => {
              return (
                <Grid
                  item
                  xs={width < 500 && width > 399 ? 6 : width < 400 ? 12 : 4}
                  sm={width < 750 ? 4 : 2.5}
                  md={
                    width < 1037 && !isDrawerOpen
                      ? 2
                      : width < 1200 && width > 999 && isDrawerOpen
                      ? 3
                      : width < 1000 && isDrawerOpen
                      ? 2
                      : 5
                  }
                  lg={
                    width > 1199 && width < 1390 && isDrawerOpen
                      ? 2.5
                      : width > 1449 && width < 1480 && isDrawerOpen
                      ? 5
                      : 4
                  }
                >
                  <Box
                    key={index}
                    sx={{
                      background: "#3E3E3E",
                      borderRadius: 1.5,
                      height: 55,
                      px: 1,
                      py: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: width > 1449 ? 14.5 : 16,
                        fontWeight: 600,
                        fontFamily: "Barlow, san-serif",
                        color: "white",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 500,
                        fontFamily: "Barlow, san-serif",
                        color: item.value > 0 ? "#4BD469" : "#FF6060",
                      }}
                    >
                      {item.value > 0 ? "+" : ""}
                      {item.value}$
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProfitCalendar;
