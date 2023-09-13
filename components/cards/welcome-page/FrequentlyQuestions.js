import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FrequentlyQuestions = () => {
  const faqData = [
    {
      question: "Is Candle Riderz safe?",
      answer: "dummy",
    },
    {
      question: "Can I Automate trades on multiple accounts?",
      answer: "dummy",
    },
    {
      question: "What makes Candle Riderz unique?",
      answer: "dummy",
    },
    {
      question: "Do I need to deposit funds to Candle Riderz?",
      answer: "dummy",
    },
  ];

  return (
    <Box px={20} mt={5}>
      {faqData.map((item, index) => (
        <Accordion
          key={index}
          sx={{
            background: "transparent",
            borderBottom: "1px solid white",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: 40 }} />}
            aria-controls={`faq-panel-${index}-content`}
            id={`faq-panel-${index}-header`}
          >
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontWeight: 600,
                fontSize: 30,
                color: "#ACB2B7",
              }}
            >
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                fontFamily: "Barlow, san-serif",
                fontWeight: 500,
                fontSize: 25,
                color: "#ACB2B7",
              }}
            >
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FrequentlyQuestions;
