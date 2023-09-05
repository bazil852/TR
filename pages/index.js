import * as React from "react";
import { useRouter } from "next/router";
import { useParallax } from "react-scroll-parallax";
import Header from "../components/layout/Header";
import { Box, Button, Typography } from "@mui/material";
import Section1_Laptop from "../components/cards/welcome-page/Section1_Laptop";
import SubscriptionPrices from "../components/cards/subscription/SubscriptionPrices";
import FrequentlyQuestions from "../components/cards/welcome-page/FrequentlyQuestions";
import Section2 from "../components/cards/welcome-page/Section2";
import Section3 from "../components/cards/welcome-page/Section3";
import Section4 from "../components/cards/welcome-page/Section4";

export default function Home() {
  const router = useRouter();
  const parallax = useParallax({
    easing: "cubicBezier(.19,1,.22,1)",
    translateX: [50, -50],
  });

  return (
    <Box>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
          height: "100vh",
        }}
        className="sliding-boxes"
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            ml: 4,
            mt: 15,
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
                backgroundImage: "linear-gradient(to right,#790F87,#794AE3)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                paddingRight: "18px",
              }}
            >
              Automated
            </i>
            Trading, Backtesting and Portfolio Management
          </Typography>
          <Typography
            sx={{
              fontFamily: "Barlow, san-serif",
              fontSize: 20,
              fontWeight: 500,
              color: "#ACB2B7",
            }}
          >
            Investors and Traders face many challenges, some of the biggest are
            dealing with emotions and follow a strict set of rules. Automated
            trading systems are not affected by emotions and do not deviate from
            the pre-defined rules. This will help you to trade more consistently
            and to be more profitable.
          </Typography>
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
            onClick={() => router.push("login")}
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
        <Box
          sx={{ width: "50%", display: "flex", position: "relative", mt: 5 }}
          className="slide-right "
        >
          <Box className="mobile"></Box>
          <Section1_Laptop />
        </Box>
      </Box>

      <Box mb={"80px"} ref={parallax.ref}>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 50,
            fontWeight: 800,
            color: "white",
            display: "inline-block",
            lineHeight: 1.3,
            textAlign: "center",
            px: 30,
          }}
        >
          <i
            style={{
              fontFamily: "Barlow, san-serif",
              fontSize: 50,
              fontWeight: 800,
              backgroundImage: "linear-gradient(to right,#790F87,#794AE3)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              paddingRight: "18px",
            }}
          >
            Strategy building
          </i>
          with precise indicators and{" "}
          <i
            style={{
              fontFamily: "Barlow, san-serif",
              fontSize: 50,
              fontWeight: 800,
              backgroundImage: "linear-gradient(to right,#790F87,#794AE3)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              paddingRight: "18px",
            }}
          >
            Backtesting
          </i>
          in
          <i
            style={{
              fontFamily: "Barlow, san-serif",
              fontSize: 50,
              fontWeight: 800,
              backgroundImage: "linear-gradient(to right,#790F87,#794AE3)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              paddingRight: "18px",
            }}
          >
            3 steps
          </i>
        </Typography>
      </Box>

      <Section2 />
      <Section3 />
      <Section4 />

      <Box mb={10}>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 55,
            fontWeight: 800,
            color: "white",
            display: "inline-block",
            lineHeight: 1.3,
            mr: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Pricing Plans for
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
            Everyone
          </i>
        </Typography>
        <Box mx={20} mt={8}>
          <SubscriptionPrices />
        </Box>
      </Box>

      <Box mb={12}>
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
          Frequently Asked Questions
        </Typography>
        <FrequentlyQuestions />
      </Box>

      <Box mb={10}>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 20,
            fontWeight: 500,
            color: "white",
            display: "inline-block",
            lineHeight: 1.3,
            textAlign: "center",
            px: 20,
          }}
        >
          Automate your cryptocurrency strategy with a plan that works for you.
          Our pricing options allow you to get the most out of your portfolio,
          whether you’re looking to test the waters or are an experienced
          trader. And of course, crypto accepted.
        </Typography>
      </Box>
      <Box
        sx={{
          mb: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 25,
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 16,
            fontWeight: 500,
            color: "white",
            display: "inline-block",
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          The above material and content should not be considered to be a
          recommendation to invest in a strategy or any individual digital
          asset. Investing in digital assets or cryptocurrency (collectively
          “digital assets”) is highly speculative and volatile, and digital
          assets are only suitable for investors who are willing to bear the
          risk of loss and experience sharp drawdowns.  
        </Typography>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 16,
            fontWeight: 500,
            color: "white",
            display: "inline-block",
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          The articles and client support materials available are educational
          only and not investment or tax advice.
        </Typography>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 16,
            fontWeight: 500,
            color: "white",
            display: "inline-block",
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          Past performance does not guarantee future results and the likelihood
          of investment outcomes are hypothetical in nature.  Any past
          performance in the above material of digital assets do not represent
          the performance of any Shrimpy.io customer and does not reflect the
          deduction of the any Shrimpy.io fees or fees charged by exchanges used
          to process transactions.   
        </Typography>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 16,
            fontWeight: 500,
            color: "white",
            display: "inline-block",
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          Investments in digital assets are: Not FDIC or SIPC Insured • Not Bank
          Guaranteed • May Lose Value  
        </Typography>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 16,
            fontWeight: 500,
            color: "white",
            display: "inline-block",
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          Before investing, consider your investment objectives and Shrimpy.io’s
          fees and expenses.
        </Typography>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 16,
            fontWeight: 500,
            color: "white",
            display: "inline-block",
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          Prior to making any investment decision in any crypto asset, each
          Shrimpy user must undertake their own independent examination and
          investigation of the potential investment, including the merits and
          risks involved in an investment in crypto assets, and must base its
          investment decision, including a determination of whether a crypto
          asset would be a suitable investment for the investor, on such
          examination and investigation and must not rely on the Company or
          information the user may obtain via their use of the Shrimpy
          website/application in making an investment decision. Prospective
          investors must not construe the contents of this website/application
          as legal, tax, investment, or other advice. Each prospective investor
          is urged to consult with its own advisors with respect to legal, tax,
          regulatory, financial, accounting, and similar consequences of
          investing in any crypto asset, the suitability of the investment for
          such investor and other relevant matters concerning an investment in
          any crypto asset or product that includes cryptocurrencies.  The use
          and development of exit strategies/plans by users of the Shrimpy app
          are not the responsibility of Shrimpy, its affiliates, or
          partners.  Users are responsible for the creation and execution of
          their own exit strategies/plans and if they have questions regarding
          investments in crypto assets, they should consult with a financial
          professional.  Shrimpy and its partners are not financial advisors and
          do not own or guarantee the success or failure of ANY exit
          strategy/plan displayed or developed on the Shrimpy app.
        </Typography>
        <Typography
          sx={{
            fontFamily: "Barlow, san-serif",
            fontSize: 16,
            fontWeight: 500,
            color: "white",
            display: "inline-block",
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          Candle Riders is not registered as an Investment Adviser
        </Typography>
      </Box>
    </Box>
  );
}
