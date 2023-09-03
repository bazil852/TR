import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
} from "@mui/material";

const columns = [
  "Invoice Code",
  "Type of Invoices",
  "Date",
  "Amount",
  "Currency",
  "Download",
];

const generateData = () => {
  return Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    "Invoice Code": `Invoice 0003`,
    "Type of Invoices": `Debit`,
    Date: `2023-01-01`,
    Amount: "50",
    Currency: "EUR",
    Download: "Download Symbol",
  }));
};

const Invoices = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(3);
  const data = generateData();

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const slicedData = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Box
      sx={{
        height: 330,
        minWidth: "100%",
        background: "#262626",
        border: "1.2px solid #3F4341",
        borderRadius: "4.8px",
        mt: "20px",
        px: 3,
        py: 1,
        position: "relative",
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontFamily: "Barlow, sans-serif",
          fontSize: 20,
          mb: 1,
        }}
      >
        Invoices
      </Typography>
      <TableContainer
        sx={{
          pb: 1,
          overflowX: "auto",
          " ::-webkit-scrollbar": {
            height: 3,
          },
          "::-webkit-scrollbar-track": {
            background: "none",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: 600,
                    fontFamily: "Barlow, sans-serif",
                    fontSize: 17,
                    borderBottom: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              overflowX: "auto",
            }}
          >
            {slicedData.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column, index) => (
                  <TableCell key={index}>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontFamily: "Barlow, sans-serif",
                        fontSize: 15,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row[column]}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ position: "absolute", bottom: 10, right: 22 }}>
        <Stack spacing={0} direction="row">
          <Button
            onClick={() => handleChangePage(null, page - 1)}
            disabled={page === 0}
            sx={{
              backgroundColor: "#191A1A",
              color: "white",
              fontWeight: 500,
              fontFamily: "Barlow, sans-serif",
              border: "1px solid #2A2C2D",
              mx: 0,
              textTransform: "none",
              minWidth: 65,
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
            count={Math.ceil(data.length / rowsPerPage)}
            page={page + 1}
            onChange={(_, value) => handleChangePage(_, value - 1)}
            hidePrevButton
            hideNextButton
            sx={{
              "& button": {
                backgroundColor: "#191A1A",
                color: "white",
                borderRadius: 0,
                textTransform: "none",
                fontWeight: 500,
                fontFamily: "Barlow, sans-serif",
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
            disabled={page === Math.ceil(data.length / rowsPerPage) - 1}
            sx={{
              backgroundColor: "#191A1A",
              color: "white",
              fontWeight: 500,
              fontFamily: "Barlow, sans-serif",
              border: "1px solid #2A2C2D",
              mx: 0,
              textTransform: "none",
              minWidth: 40,
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
  );
};

export default Invoices;
