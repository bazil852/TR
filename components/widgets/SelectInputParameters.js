import React from "react";

import Select from "react-select";
const SelectInputParameters = (props) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      backgroundColor: "#2B2B2B",
      width: props.Width,
      marginLeft: props.keyName === "Operator" && "auto",
      minHeight: "30px",
      // height: "30px",
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
