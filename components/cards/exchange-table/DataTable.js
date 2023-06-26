import { Box, Typography } from "@mui/material";
import { useState, useMemo } from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#27292A",
    borderRadius: "7px",
    borderColor: "transparent",
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
const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const DataTable = ({ data, columns, rowsPerPage = 15 }) => {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({ field: null, direction: null });

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
      return [...data].sort((a, b) => {
        if (a[sort.field] === b[sort.field]) {
          return 0;
        }
        const asc = a[sort.field] > b[sort.field] ? 1 : -1;
        return sort.direction === "asc" ? asc : -asc;
      });
    }
    return data;
  }, [data, sort]);

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
  const firstTableCellStyle = {
    whiteSpace: "normal",
    wordWrap: "break-word",
    maxWidth: "100px",
    border: "none",
    borderTopLeftRadius: "15px",
    fontSize: "15px",
  };

  return (
    <Box mt={-5}>
      <Typography
        sx={{
          fontFamily: "Barlow, san-serif",
          fontWeight: 500,
          fontSize: 24,
          pl: 2,
          py: 2,
        }}
      >
        Portfolio Summary
      </Typography>
      <Box
        sx={{
          width: "49vw",
          minHeight: "700px",
          background: "#383B3B",
          border: "none",
          borderRadius: "8px",
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
                fontWeight: 500,
                fontSize: 22,
              }}
            >
              DETAILED PORTFOLIO
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontFamily: "Inter, san-serif",
                color: "#859498",
              }}
            >
              All your tokens aggregated or by exchange
            </Typography>
          </Box>
          <Select
            options={options}
            defaultValue={{ value: "allExchange", label: "All Exchange" }}
            styles={customStyles}
            isSearchable={false}
          />
        </Box>
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
                          fontFamily: "Inter, san-serif",
                          color: "#859498",
                        }}
                      >
                        CHANGE
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontFamily: "Inter, san-serif",
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
                          fontFamily: "Inter, san-serif",
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
              .map((row, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#323233" : "#2A2A2B",
                    height: "45px",
                  }}
                >
                  {columns.map((column) => {
                    return (
                      <td
                        key={column.field}
                        style={
                          column.field === "token"
                            ? firstTableCellStyle
                            : tableCellStyle
                        }
                      >
                        {column.field === "token" ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              sx={{
                                textAlign: "center",
                                fontFamily: "Barlow,san-serif",
                                color: "#D2D2D2",
                              }}
                            >
                              {row[column.field]}
                            </Box>
                          </Box>
                        ) : column.field === "balance" ? (
                          <Box
                            sx={{
                              textAlign: "center",
                              fontFamily: "Barlow,san-serif",
                              color:
                                row[column.field] !== 0
                                  ? row[column.field] > 0
                                    ? "#20A95D"
                                    : "#EB5757"
                                  : "white",
                            }}
                          >
                            {row[column.field]}
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
              ))}
          </tbody>
          <tfoot></tfoot>
        </table>
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            right: 20,
          }}
        >
          <Box
            sx={{
              marginTop: "2rem",
              borderRadius: "3px",
            }}
          >
            <button
              onClick={() => handleChangePage(null, page - 1)}
              disabled={page === 0}
              style={{
                background: "#191A1A",
                cursor: "pointer",
                border: "0.7px solid #27292A",
                padding: "8px 10px",
                color: "#5C636A",
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: "4px",
                fontFamily: "Inter, san-serif",
              }}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i).map((p) => (
              <button
                key={p}
                onClick={() => handleChangePage(null, p)}
                style={{
                  fontWeight: "normal",
                  backgroundColor: page === p ? "#999999" : "#191A1A",
                  border: page === p ? "none" : "0.7px solid #27292A",
                  padding: "8px 10px",
                  cursor: "pointer",
                  color: "white",
                  fontFamily: "Inter, san-serif",
                }}
              >
                {p + 1}
              </button>
            ))}
            <button
              onClick={() => handleChangePage(null, page + 1)}
              disabled={page === totalPages - 1}
              style={{
                background: "#191A1A",
                border: "0.7px solid #27292A",
                cursor: "pointer",
                padding: "8px 10px",
                color: "#5C636A",
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
                fontFamily: "Inter, san-serif",
              }}
            >
              Next
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DataTable;
