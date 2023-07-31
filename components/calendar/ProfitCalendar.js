import { React, useEffect, useState } from "react";
import { Box, Card, CardContent, FormControl, Typography } from "@mui/material";
import { getDaysInMonth } from "../../utils/helpers";
import Select from "react-select";
import { useSelector } from "react-redux";

const dataArray = [
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: -356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: 356 },
  { value: -356 },
  { value: 356 },
  { value: 356 },
];

const customStyles = {
  control: (base) => ({
    ...base,
    height: "25px",
    minWidth: "110px",
    borderRadius: "6px",
    background: "linear-gradient(to right,#790D83,#7A5CFF)",
    fontFamily: "Barlow, san-serif",
    fontWeight: "600",
    border: "none",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  dropdownIndicator: (base) => ({
    ...base,
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
      width: "4px",
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
  { title: "Total Month", value: 9785 },
  { title: "Average Month", value: 7985 },
  { title: "Average Day", value: 9785 },
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
        background: "#131313",
        minHeight:
          width > 1197 && !isDrawerOpen
            ? 685
            : width > 1389 && isDrawerOpen
            ? 685
            : width > 1176 && width < 1198 && !isDrawerOpen
            ? 755
            : isDrawerOpen
            ? 300
            : width < 1037
            ? 300
            : 755,
        minWidth: "100%",
        borderRadius: 2,
        overflowX: "auto",
      }}
    >
      <CardContent>
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
              fontSize: 22,
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
          {dataArray?.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  background: "#2A2C2D",
                  borderRadius: 1,
                  height: 55,
                  width: width < 500 ? 50 : 55,
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
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            px: width < 500 ? 0 : 2,
            mt: 3,
            alignItems: "center",
          }}
        >
          {monthlyData.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  background: "#2A2C2D",
                  borderRadius: 1,
                  height: 60,
                  width: 130,
                  p: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
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
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProfitCalendar;
