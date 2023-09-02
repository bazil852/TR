import React from "react";

import Select from "react-select";
const SelectInputParameters = (props) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      backgroundColor: "#3E3E3E",
      width: props.Width,
      marginLeft: props.keyName === "operation" && "auto",
      minHeight: "28px",
      borderRadius: "6px",
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
      backgroundColor: state.isSelected ? "#000000" : "#2B2B2B",
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
      background: "#2B2B2B",
      color: "#FFFFFF",
      width:
        props.keyName === "orderType"
          ? props.Width
          : props.keyName === "dcaType"
          ? props.Width
          : props.keyName === "takeProfit"
          ? props.Width
          : props.keyName === "leverage"
          ? props.Width
          : "100%",
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
  };
  const selectedValue = { value: props.value, label: props.value };

  return (
    <Select
      placeholder={props.placeHolder}
      options={props.options}
      styles={customStyles}
      onChange={props.onChange}
      isSearchable={false}
      value={selectedValue.value !== "" && selectedValue}
    />
  );
};

export default SelectInputParameters;
