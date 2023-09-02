import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Popover,
} from "@mui/material";

const PersonelData = () => {
  const [customerId, setCustomerId] = useState("12345");
  const [customerEmail, setCustomerEmail] = useState("user123@gmail.com");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [width, setWidth] = useState(globalThis?.innerWidth);

  const anchorEl = useRef(null);

  const handleUpdateEmail = () => {
    if (newEmail && currentEmail === customerEmail) {
      setCustomerEmail(newEmail);
      setCurrentEmail("");
      setNewEmail("");
      setPopoverOpen(false);
    } else {
      console.log("wrong email");
    }
  };

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card
      sx={{
        minHeight: width < 600 ? 150 : 330,
        minWidth: "100%",
        background: "#262626",
        border: "1.2px solid #3F4341",
        borderRadius: "4.8px",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 18,
            fontWeight: 600,
            mt: -1,
          }}
        >
          PERSONAL DATA
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: "29px" }}
        >
          <Typography
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: 14,
              fontWeight: 500,
              mt: -1,
              display: "flex",
              gap: 0.5,
              whiteSpace: "nowrap",
            }}
          >
            CUSTOMER ID :
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "#ACB2B7",
              }}
            >
              {customerId}
            </Typography>
          </Typography>
          <Typography
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: 14,
              fontWeight: 500,
              mt: -1,
              display: "flex",
              gap: 0.5,
              whiteSpace: "nowrap",
            }}
          >
            CUSTOMER EMAIL :
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "#ACB2B7",
                width: 200,
                overflow: "hidden",
                textWrap: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {customerEmail}
            </Typography>
          </Typography>
        </Box>
        <Button
          sx={{
            background: "linear-gradient(to right,#790F87,#794AE3)",
            cursor: "pointer",
            border: "none",
            px: 1,
            marginLeft: "auto",
            textTransform: "none",
            height: 28,
            mt: "13px",
            "&:hover": {
              border: "1px solid white",
            },
          }}
          ref={anchorEl}
          onClick={() => setPopoverOpen(true)}
        >
          <Typography
            color={"white"}
            fontSize={13}
            fontFamily={"Barlow, san-serif"}
            fontWeight={500}
          >
            Change email
          </Typography>
        </Button>

        <Popover
          open={popoverOpen}
          anchorEl={anchorEl.current}
          onClose={() => setPopoverOpen(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          sx={{ mt: 0.5 }}
        >
          <Box
            sx={{
              background: "#606060",
              minWidth: 250,
              minHeight: 100,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              py: 0.2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                px: 1,
                gap: 1,
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    fontFamily: "Barlow, san-serif",
                    color: "#FFFFFF",
                    fontSize: "13px",
                  }}
                >
                  Current Email
                </label>
                <input
                  type="text"
                  name="input1"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  style={{
                    width: "100%",
                    background: "#8F8F8F",
                    border: "none",
                    outline: "none",
                    borderRadius: "4px",
                    fontFamily: "Barlow, san-serif",
                    color: "#FFFFFF",
                    height: "25px",
                    paddingLeft: "5px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    fontFamily: "Barlow, san-serif",
                    color: "#FFFFFF",
                    fontSize: "13px",
                  }}
                >
                  New Email
                </label>
                <input
                  type="text"
                  name="input2"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  style={{
                    width: "100%",
                    background: "#8F8F8F",
                    border: "none",
                    outline: "none",
                    borderRadius: "4px",
                    fontFamily: "Barlow, san-serif",
                    color: "#FFFFFF",
                    height: "25px",
                    paddingLeft: "5px",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleUpdateEmail}
                sx={{
                  background: "linear-gradient(to right,#790F87,#794AE3)",
                  color: "#FFFFFF",
                  borderRadius: "4px",
                  height: 22,
                  width: 30,
                  fontFamily: "Barlow, san-serif",
                  textTransform: "none",
                  fontSize: 13,
                  mb: 0.5,
                }}
              >
                Change
              </Button>
            </Box>
          </Box>
        </Popover>
      </CardContent>
    </Card>
  );
};

export default PersonelData;
