import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Up, Down } from "../../../utils/icons";
import Select from "react-select";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "none",
    backgroundColor: "none",
    width: "85px",
    minHeight: "30px",
    boxShadow: "none",
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
    height: 30,
    display: "flex",
    alignItems: "center",
    background: state.isSelected
      ? "linear-gradient(to right,#790F87,#794AE3)"
      : "none",
    borderRadius: state.isSelected ? "6.4px" : "",
    ":hover": { background: "rgba(0,0,0,0.1)", color: "#FFFFFF" },
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    background: "#5c5a66e3",
    color: "#FFFFFF",
    width: "100px",
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
  menuList: (provided) => ({
    ...provided,
    "&::-webkit-scrollbar": {
      width: "0px",
    },
  }),
};

function StrategyCalender() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const getCalendarDays = (month, year) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = [];
    for (let i = 1 - startingDay; i <= 42 - startingDay; i++) {
      days.push({
        date: new Date(year, month, i).getDate(),
        month: new Date(year, month, i).getMonth(),
        currentMonth: month,
      });
    }
    return days;
  };

  const calendarDays = getCalendarDays(month, year);

  const increaseMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const decreaseMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const increaseYear = () => {
    setYear(year + 1);
  };

  const decreaseYear = () => {
    setYear(year - 1);
  };

  const monthOptions = months.map((month, index) => ({
    value: index,
    label: month,
  }));
  const yearOptions = [...Array(30).keys()].map((_, i) => ({
    value: year + i - 15,
    label: year + i - 15,
  }));

  const currentDate = new Date();
  const isToday = (day) => {
    return (
      day.date === currentDate.getDate() &&
      day.month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    );
  };

  const isPastDay = (day) => {
    const todayDate = new Date().getDate();
    return day.date <= todayDate && day.month === new Date().getMonth();
  };

  const startOfMonthIndex = calendarDays.findIndex(
    (day) => day.date === 1 && day.month === month
  );
  const todaysDateIndex = calendarDays.findIndex(isToday);

  return (
    <Box
      sx={{
        background: "#262626",
        border: "1.2px solid #3F4341",
        borderRadius: "4.8px",
        minWidth: "100%",
        height: 280,
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          pl: 4.35,
          gap: 2,
          mt: 1,
        }}
      >
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mr: -0.5,
            }}
          >
            <Box
              onClick={increaseMonth}
              sx={{
                cursor: "pointer",
                height: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 15,
              }}
            >
              <Up />
            </Box>
            <Box
              onClick={decreaseMonth}
              sx={{
                cursor: "pointer",
                height: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 15,
              }}
            >
              <Down />
            </Box>
          </Box>
          <Select
            styles={customStyles}
            value={monthOptions[month]}
            options={monthOptions}
            onChange={(option) => setMonth(option.value)}
            isSearchable={false}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mr: -0.5,
            }}
          >
            <Box
              onClick={increaseYear}
              sx={{
                cursor: "pointer",
                height: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 15,
              }}
            >
              <Up />
            </Box>
            <Box
              onClick={decreaseYear}
              sx={{
                cursor: "pointer",
                height: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 15,
              }}
            >
              <Down />
            </Box>
          </Box>
          <Select
            styles={customStyles}
            value={yearOptions.find((option) => option.value === year)}
            options={yearOptions}
            onChange={(option) => setYear(option.value)}
            isSearchable={false}
          />
        </Box>
      </Box>

      <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
        <TableHead>
          <TableRow>
            {days.map((day) => (
              <TableCell
                key={day}
                align="center"
                sx={{
                  fontFamily: "Barlow, san-serif",
                  border: "none",
                  padding: "0px",
                }}
              >
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <TableRow key={rowIndex} sx={{ borderTop: "9px solid #262626" }}>
              {Array.from({ length: 7 }).map((_, colIndex) => {
                const index = rowIndex * 7 + colIndex;
                const day = calendarDays[index];
                return (
                  <TableCell
                    key={colIndex}
                    align="center"
                    sx={{
                      color: day.month === day.currentMonth ? "white" : "grey",
                      fontFamily: "Barlow, san-serif",
                      fontWeight: 500,
                      border: "none",
                      padding: "0px",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: isToday(day) ? "50%" : "100%",
                        background: isPastDay(day)
                          ? "rgba(255,255,255,0.1)"
                          : "transparent",
                        borderRadius:
                          colIndex === 0
                            ? "4px 0 0 4px"
                            : colIndex === 6
                            ? "0 4px 4px 0"
                            : index === startOfMonthIndex
                            ? "3px 0 0 3px"
                            : "0",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        ...(isToday(day) && {
                          background:
                            "linear-gradient(to right,#383446,#6F1B86)",
                          border: "2px solid white",
                          position: "relative",
                        }),
                      }}
                    >
                      {day.date}
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default StrategyCalender;
