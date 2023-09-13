import React from "react";
import { useInView } from "react-intersection-observer";
import Section2_Tablet from "./Section2_Tablet";
import { Box, Button, List, ListItem, Typography } from "@mui/material";

const Section2 = () => {
  const [refSection2, inViewSection2] = useInView({
    triggerOnce: true,
    threshold: 1,
  });

  return (
    <Box mb={10}>
      <Typography
        sx={{
          fontFamily: "Barlow, san-serif",
          fontSize: 55,
          fontWeight: 800,
          color: "white",
          display: "inline-block",
          lineHeight: 1.3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <i
          style={{
            fontFamily: "Barlow, san-serif",
            fontSize: 55,
            fontWeight: 800,
            backgroundImage: "linear-gradient(to right,#790F87,#794AE3)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            paddingRight: "18px",
          }}
        >
          Step 1
        </i>
        Create your strategy
      </Typography>
      <div ref={refSection2}>
        {inViewSection2 && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                height: "100vh",
                mt: 5,
              }}
              className="sliding-boxes"
            >
              <Box
                sx={{
                  width: "30%",
                  display: "flex",
                  flexDirection: "column",
                  ml: 4,
                  gap: 5,
                }}
                className="slide-left"
              >
                <Typography
                  sx={{
                    fontFamily: "Barlow, san-serif",
                    fontSize: 65,
                    fontWeight: 800,
                    color: "white",
                    display: "inline-block",
                    lineHeight: 1.3,
                  }}
                >
                  <i
                    style={{
                      fontFamily: "Barlow, san-serif",
                      fontSize: 65,
                      fontWeight: 800,
                      backgroundImage:
                        "linear-gradient(to right,#790F87,#794AE3)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      paddingRight: "18px",
                    }}
                  >
                    Advanced
                  </i>
                  Dollar Cost Average
                </Typography>

                <List
                  sx={{
                    listStyleType: "disc",
                    pl: 2,
                    "& .MuiListItem-root": {
                      display: "list-item",
                    },
                  }}
                >
                  <ListItem>
                    <Typography
                      sx={{
                        fontFamily: "Barlow, san-serif",
                        fontSize: 20,
                        fontWeight: 500,
                        color: "#ACB2B7",
                      }}
                    >
                      DCA by Signal Buy as price drops but only when the correct
                      indicators will provide you a new buy signal.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      sx={{
                        fontFamily: "Barlow, san-serif",
                        fontSize: 20,
                        fontWeight: 500,
                        color: "#ACB2B7",
                      }}
                    >
                      Increase the amount of each DCA order as price goes down
                      to decrease your Average cost.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      sx={{
                        fontFamily: "Barlow, san-serif",
                        fontSize: 20,
                        fontWeight: 500,
                        color: "#ACB2B7",
                      }}
                    >
                      Decide how many DCA orders you want to do.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      sx={{
                        fontFamily: "Barlow, san-serif",
                        fontSize: 20,
                        fontWeight: 500,
                        color: "#ACB2B7",
                      }}
                    >
                      Choose the minimum % distance between orders
                    </Typography>
                  </ListItem>
                </List>
              </Box>
              <Box
                sx={{
                  width: "70%",
                  display: "flex",
                  position: "relative",
                  mt: 5,
                }}
                className="slide-right"
              >
                <Section2_Tablet />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: -13,
                mr: 2.5,
              }}
            >
              <Button
                sx={{
                  background: "linear-gradient(to right,#790F87,#794AE3)",
                  cursor: "pointer",
                  border: "none",
                  px: 1,
                  textTransform: "none",
                  height: 40,
                  width: 150,
                  "&:hover": {
                    border: "1px solid white",
                  },
                }}
              >
                <Typography
                  color={"white"}
                  fontSize={20}
                  fontFamily={"Barlow, san-serif"}
                  fontWeight={600}
                >
                  Get Started
                </Typography>
              </Button>
            </Box>
          </>
        )}
      </div>
    </Box>
  );
};

export default Section2;
