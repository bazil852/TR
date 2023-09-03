import React, { useEffect, useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useSelector } from "react-redux";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "1px 15px",
          borderRadius: "5px",
          fontWeight: 500,
          color: "white",
          fontFamily: "Barlow, sans-serif",
          fontSize: "14px",
        }}
      >
        <p> {label}</p>
        {payload[0]?.dataKey === "drawdown" && (
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginTop: "-10px",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                height: "10px",
                width: "10px",
                background: "#36F097",
              }}
            />
            Drawdown: {payload[0]?.value}%
          </p>
        )}
        {payload[0]?.dataKey === "deviation" && (
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginTop: "-10px",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                height: "10px",
                width: "10px",
                background: "#268AFF",
              }}
            />
            Deviation: {payload[0]?.value}%
          </p>
        )}
        {payload[1]?.dataKey === "deviation" && (
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginTop: "-10px",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                height: "10px",
                width: "10px",
                background: "#268AFF",
              }}
            />
            Deviation: {payload[1]?.value}%
          </p>
        )}
      </div>
    );
  }
  return null;
};

const Graph1_Bar = ({ data }) => {
  const [width, setWidth] = useState(0);
  const [barsVisibility, setBarsVisibility] = useState({
    drawdown: { visible: true },
    deviation: { visible: true },
  });
  const ref = useRef(null);
  const isDrawerOpen = useSelector((state) => state.dashboardWidth.value);

  const chartData = data[0].drawdown.map((drawdown, index) => ({
    index: (index + 1).toString().padStart(2),
    drawdown: drawdown,
    deviation: data[1].deviation[index] || null,
  }));

  const handleBarToggle = (key) => {
    setBarsVisibility((prev) => ({
      ...prev,
      [key]: { ...prev[key], visible: !prev[key].visible },
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalBars = chartData.length;
  const barGap = 10;
  const minBarWidth = 50;
  let calculatedBarWidth = (width - barGap * (totalBars - 1)) / totalBars;
  calculatedBarWidth = Math.max(calculatedBarWidth, minBarWidth);
  const chartWidth = (calculatedBarWidth + barGap) * totalBars - barGap - 15;
  const shouldShowScroll = chartWidth > width;

  return (
    <Box
      ref={ref}
      sx={{
        transition: "max-width 0.3s ease-in-out",
        maxWidth:
          isDrawerOpen && width > 1130
            ? "75vw"
            : isDrawerOpen && width < 1131 && width > 999
            ? "65vw"
            : "90vw",
        height: 330,
        py: 3,
        pl: 2,
        position: "relative",
        overflowX: shouldShowScroll ? "auto" : "hidden",
        overflowY: "hidden",
        "&::-webkit-scrollbar": {
          height: "3px",
        },
        "&::-webkit-scrollbar-track": {
          background: "none",
          mx: 2,
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: width < 350 ? 5 : 10,
          bottom: 8,
          zIndex: 10,
          left: 0,
          right: 0,
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
          onClick={() => handleBarToggle("drawdown")}
        >
          <Box
            sx={{
              height: 14,
              width: 20,
              borderRadius: 0.5,
              background: "#36F097",
            }}
          />
          <Typography
            sx={{
              cursor: "pointer",
              color: "#A8A8A8",
              fontFamily: "Barlow, san-serif",
              opacity: 0.6,
              textDecoration: barsVisibility.drawdown.visible
                ? "none"
                : "line-through",
            }}
          >
            Drawdown
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
          onClick={() => handleBarToggle("deviation")}
        >
          <Box
            sx={{
              height: 14,
              width: 20,
              borderRadius: 0.5,
              background: "#268AFF",
            }}
          />
          <Typography
            sx={{
              cursor: "pointer",
              color: "#A8A8A8",
              fontFamily: "Barlow, san-serif",
              opacity: 0.6,
              textDecoration: barsVisibility.deviation.visible
                ? "none"
                : "line-through",
            }}
          >
            Deviation
          </Typography>
        </Box>
      </Box>
      <BarChart
        width={chartWidth}
        height={300}
        data={chartData}
        barCategoryGap={barGap}
        style={{
          fontFamily: "Barlow, sans-serif",
        }}
        margin={{
          top: 5,
          right: -22,
          bottom: 30,
          left: 5,
        }}
      >
        <CartesianGrid
          stroke="#A8A8A8"
          strokeDasharray="2 2"
          opacity={0.3}
          vertical={false}
        />
        <XAxis dataKey="index" />
        <YAxis yAxisId="right" orientation="right" axisLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Bar
          yAxisId="right"
          dataKey="drawdown"
          fill="#36F097"
          hide={!barsVisibility.drawdown.visible}
        />
        <Bar
          yAxisId="right"
          dataKey="deviation"
          fill="#268AFF"
          hide={!barsVisibility.deviation.visible}
        />
      </BarChart>
    </Box>
  );
};

export default Graph1_Bar;
