import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Popover,
  Typography,
} from "@mui/material";

const Security = () => {
  const [customerPass, setCustomerPass] = useState("pass");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [width, setWidth] = useState(globalThis?.innerWidth);

  const anchorEl = useRef(null);

  const handleUpdatePassword = () => {
    if (newPass && currentPass === customerPass) {
      setCustomerPass(newPass);
      setCurrentPass("");
      setNewPass("");
      setPopoverOpen(false);
    } else {
      console.log("wrong password");
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
          SECURITY
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1, mt: "29px" }}
        >
          <Typography
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: 14,
              fontWeight: 500,
              mt: -1,
            }}
          >
            PASSWORD
          </Typography>
          <Button
            sx={{
              background: "linear-gradient(to right,#790F87,#794AE3)",
              cursor: "pointer",
              border: "none",
              px: 1,
              textTransform: "none",
              height: 28,
              width: 120,
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
              Change password
            </Typography>
          </Button>
        </Box>
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
                  Current Password
                </label>
                <input
                  type="text"
                  name="input1"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
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
                  New Password
                </label>
                <input
                  type="text"
                  name="input2"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
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
                onClick={handleUpdatePassword}
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

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}>
          <Typography
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: 14,
              fontWeight: 500,
              mt: -1,
            }}
          >
            2FA
          </Typography>
          <Button
            sx={{
              background: "linear-gradient(to right,#790F87,#794AE3)",
              cursor: "pointer",
              border: "none",
              px: 1,
              textTransform: "none",
              height: 28,
              width: 120,
              "&:hover": {
                border: "1px solid white",
              },
            }}
          >
            <Typography
              color={"white"}
              fontSize={13}
              fontFamily={"Barlow, san-serif"}
              fontWeight={500}
            >
              Enable 2FA
            </Typography>
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}>
          <Typography
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: 14,
              fontWeight: 500,
              mt: -1,
            }}
          >
            IP-ADDRESS CHECK
          </Typography>
          <Button
            sx={{
              background: "linear-gradient(to right,#790F87,#794AE3)",
              cursor: "pointer",
              border: "none",
              px: 1,
              textTransform: "none",
              height: 28,
              width: 160,
              "&:hover": {
                border: "1px solid white",
              },
            }}
          >
            <Typography
              color={"white"}
              fontSize={13}
              fontFamily={"Barlow, san-serif"}
              fontWeight={500}
            >
              Enable IP-address check
            </Typography>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
export default Security;
