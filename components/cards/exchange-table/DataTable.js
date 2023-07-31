import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useState, useMemo } from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Select from "react-select";
import dynamic from "next/dynamic";
const CryptoIcon = dynamic(() => import("crypto-icons-react"), { ssr: false });

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#27292A",
    borderRadius: "7px",
    border: "none",
    borderTop: "2px solid #333536 ",
    cursor: "pointer",
    width: 120,
    textAlign: "center",
    color: "#8F9498",
    minHeight: "30px",
    fontSize: "14px",
    boxShadow: state.isFocused ? "none" : provided.boxShadow,
    "&:hover": {
      borderColor: "transparent",
    },
    "&:focus": {
      borderColor: "transparent",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "rgba(255, 255, 255, 0.1)" : "#000000",
    color: state.isSelected ? "lightgrey" : "inherit",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "inherit",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#000000",
  }),
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <MonetizationOnIcon sx={{ fontSize: "35px" }} />;
    }
    return this.props.children;
  }
}

const DataTable = ({ data, columns, rowsPerPage = 10 }) => {
  console.log(data);
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({ field: null, direction: null });
  const [options, setOptions] = useState([]);

  const [selectedExchange, setSelectedExchange] = useState(
    data.length > 0 && data[0]
  );

  useEffect(() => {
    const updatedOptions = data?.map((item) => {
      return {
        label: item.exchange.exchange_name,
        value: item.exchange.exchange_name,
      };
    });
    setOptions(updatedOptions);
  }, [data]);

  const handleSortClick = (field) => {
    setSort((sortState) => ({
      field,
      direction:
        sortState.field === field && sortState.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const sortedData = useMemo(() => {
    console.log(sort);
    if (sort.field) {
      return [...selectedExchange.assets].sort((a, b) => {
        if (a[sort.field] === b[sort.field]) {
          return 0;
        }
        const asc = a[sort.field] > b[sort.field] ? 1 : -1;
        return sort.direction === "asc" ? asc : -asc;
      });
    }
    return selectedExchange.assets;
  }, [selectedExchange, sort]);

  console.log("sortable", sortedData);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(sortedData?.length / rowsPerPage);

  const tableCellStyle = {
    whiteSpace: "normal",
    wordWrap: "break-word",
    maxWidth: "100px",
    border: "none",
    fontSize: "14px",
  };

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  const handleExchangeChange = (value) => {
    console.log(value);
    setPage(0);
    const newExchange = data.find(
      (item) => item.exchange.exchange_name === value.value
    );
    setSelectedExchange(newExchange);
  };

  console.log(sortedData);

  return (
    <Box mt={-5}>
      <Typography
        sx={{
          fontFamily: "Barlow, san-serif",
          fontWeight: 600,
          fontSize: 24,
          pl: 2,
          py: 2,
        }}
      >
        Portfolio Summary
      </Typography>
      <Box
        sx={{
          width: "100%",
          minHeight: "700px",
          background: "#242424",
          border: "none",
          borderRadius: "5px",
          px: 3,
          position: "relative",
        }}
      >
        <Box
          sx={{
            py: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontWeight: 600,
                fontSize: 22,
              }}
            >
              DETAILED PORTFOLIO
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontFamily: "Barlow, san-serif",
                color: "#859498",
              }}
            >
              All your tokens aggregated or by exchange
            </Typography>
          </Box>
          <Select
            options={options}
            defaultValue={{
              value: data[0]?.exchange?.exchange_name,
              label:
                data[0]?.exchange?.exchange_name === undefined
                  ? "No Exchange"
                  : data[0]?.exchange?.exchange_name,
            }}
            styles={customStyles}
            isSearchable={false}
            onChange={handleExchangeChange}
            placeholder="Exchange"
          />
        </Box>
        <Box
          sx={{
            display: width < 600 ? "block" : "",
            overflowX: width < 600 ? "auto" : "",
          }}
        >
          <table style={{ borderCollapse: "collapse", minWidth: "100%" }}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.field}>
                    {column.title === "CHANGE" ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontFamily: "Barlow, san-serif",
                            color: "#859498",
                          }}
                        >
                          CHANGE
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontFamily: "Barlow, san-serif",
                            color: "#859498",
                          }}
                        >
                          (DAY)
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontFamily: "Barlow, san-serif",
                            color: "#859498",
                          }}
                        >
                          {column.title}
                        </Typography>
                        {column.sortable && (
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              margin: "0px 0px 0px 5px",
                              padding: "0px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleSortClick(column.field)}
                          >
                            {sort.field === column.field ? (
                              sort.direction === "asc" ? (
                                <ArrowDownward
                                  sx={{
                                    fontSize: "15px !important",
                                    color: "white",
                                  }}
                                />
                              ) : (
                                <ArrowUpward
                                  sx={{
                                    fontSize: "15px !important",
                                    color: "white",
                                  }}
                                />
                              )
                            ) : (
                              <ArrowDownward
                                sx={{
                                  fontSize: "15px !important",
                                  color: "white",
                                }}
                              />
                            )}
                          </button>
                        )}
                      </Box>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  console.log(row, selectedExchange);
                  let allocation;
                  if (
                    selectedExchange?.portfolios?.balance &&
                    selectedExchange?.portfolios?.balance !== 0
                  ) {
                    allocation =
                      (row.usdt_price / selectedExchange.portfolios.balance) *
                      100;
                  } else {
                    allocation = 0; // or whatever default value you want
                  }
                  // const allocation =
                  //   (row.usdt_price / selectedExchange?.portfolios[0].balance) *
                  //   100;
                  console.log(allocation);
                  return (
                    <tr
                      key={index}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#323233" : "#2A2A2B",
                        height: "45px",
                      }}
                    >
                      {columns.map((column) => {
                        return (
                          <td key={column.field} style={tableCellStyle}>
                            {column.field === "coin_name" ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  pl: "15%",
                                  width: "200px",
                                }}
                              >
                                <Box>
                                  <ErrorBoundary>
                                    {(() => {
                                      try {
                                        return (
                                          <CryptoIcon
                                            // symbol={
                                            //   row[column.field] === "USDC" ||
                                            //   row[column.field] === "BUSD"
                                            //     ? ""
                                            //     : row[column.field]
                                            // }
                                            symbol={row[column.field]}
                                            size={32}
                                            color="auto"
                                          />
                                        );
                                      } catch (error) {
                                        console.error(
                                          "Error occurred while rendering CryptoIcon:",
                                          error
                                        );
                                        return null;
                                      }
                                    })()}
                                  </ErrorBoundary>
                                </Box>

                                <Box
                                  sx={{
                                    fontFamily: "Barlow,san-serif",
                                    color: "#D2D2D2",
                                    ml: 1,
                                  }}
                                >
                                  {row[column.field]}
                                </Box>
                              </Box>
                            ) : column.field === "usdt_price" ? (
                              <Box
                                sx={{
                                  textAlign: "center",
                                  fontFamily: "Barlow,san-serif",
                                  color:
                                    row[column.field] !== 0
                                      ? row[column.field] > 0
                                        ? "#20A95D"
                                        : "#EB5757"
                                      : "#D2D2D2",
                                }}
                              >
                                {parseFloat(row["usdt_price"]).toFixed(4)}
                              </Box>
                            ) : column.field === "change" ? (
                              <Box
                                sx={{
                                  textAlign: "center",
                                  fontFamily: "Barlow,san-serif",
                                  color:
                                    row[column.field] !== 0
                                      ? row[column.field] > 0
                                        ? "#20A95D"
                                        : "#EB5757"
                                      : "#D2D2D2",
                                }}
                              >
                                {row[column.field] > 0 &&
                                row[column.field] !== 0
                                  ? "+"
                                  : ""}
                                {row[column.field]}%
                              </Box>
                            ) : column.field === "crossWalletBalance" ? (
                              <Box
                                sx={{
                                  textAlign: "center",
                                  fontFamily: "Barlow,san-serif",
                                  color: "#D2D2D2",
                                }}
                              >
                                {parseFloat(allocation).toFixed(4)}%
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  textAlign: "center",
                                  fontFamily: "Barlow,san-serif",
                                  color: "#D2D2D2",
                                }}
                              >
                                {row[column.field]}
                              </Box>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
            <tfoot></tfoot>
          </table>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: width < 600 ? 50 : 10,
            left: 22,
          }}
        >
          <Typography
            sx={{
              marginBottom: "1rem",
              color: "white",
              fontFamily: "Barlow, san-serif",
            }}
          >
            Showing {page * rowsPerPage + 1} to{" "}
            {Math.min(
              (page + 1) * rowsPerPage,
              sortedData?.length ? sortedData?.length : 0
            )}{" "}
            of {sortedData?.length ? sortedData?.length : 0}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: totalPages > 5 ? 60 : 20,
            right: width > 600 ? 23.5 : "",
            left: width < 600 ? 20 : "",
          }}
        >
          <Stack spacing={0} direction="row">
            <Button
              onClick={() => handleChangePage(null, page - 1)}
              disabled={page === 0}
              sx={{
                backgroundColor: "#191A1A",
                color: "white",
                fontWeight: 500,
                fontFamily: "Barlow, san-serif",
                border: "1px solid #2A2C2D",
                mx: 0,
                textTransform: "none",
                minWidth: 20,
                height: 32,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 4,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 4,
              }}
            >
              Previous
            </Button>
            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={(event, value) => handleChangePage(event, value - 1)}
              hidePrevButton
              hideNextButton
              sx={{
                "& button": {
                  backgroundColor: "#191A1A",
                  color: "white",
                  borderRadius: 0,
                  textTransform: "none",
                  fontWeight: 500,
                  fontFamily: "Barlow, san-serif",
                  border: "1px solid #2A2C2D",
                  mx: 0,
                },
                "& .Mui-selected": {
                  backgroundColor: "#999999",
                  color: "white",
                },
              }}
            />
            <Button
              onClick={() => handleChangePage(null, page + 1)}
              disabled={page === totalPages - 1}
              sx={{
                backgroundColor: "#191A1A",
                color: "white",
                fontWeight: 500,
                fontFamily: "Barlow, san-serif",
                border: "1px solid #2A2C2D",
                mx: 0,
                textTransform: "none",
                minWidth: 20,
                height: 32,
                borderTopRightRadius: 4,
                borderTopLeftRadius: 0,
                borderBottomRightRadius: 4,
                borderBottomLeftRadius: 0,
              }}
            >
              Next
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default DataTable;
