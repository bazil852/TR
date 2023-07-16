import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const GraphOfConsolidatedPOrtfolio = ({ data }) => {
  const [dataWithWorth, setDataWithWorth] = useState([0]);
  const [width, setWidth] = useState(globalThis?.innerWidth);
  const colors = ["#36F097", "#3DFFDC", "#1ED6FF", "#2688FC", "#5A3FFE"];
  const totalRadius = width < 960 && width > 900 ? 16 : 18;
  const minRadius = 8;
  const MINIMUM_WORTH = 100;
  const minimumValueRadius = 12;

  useEffect(() => {
    const hasAllElementsZeroOrUndefined = data?.every(
      (obj) => obj.usdt_price === 0 || obj.usdt_price === undefined
    );

    if (hasAllElementsZeroOrUndefined) {
      setDataWithWorth([]);
    } else {
      const computedData = data?.map((obj) => ({
        ...obj,
        worth: Math.max(Number(obj.usdt_price), MINIMUM_WORTH),
      }));

      const sortedData = computedData.sort((a, b) => b.worth - a.worth);

      const topFour = sortedData.slice(0, 4);
      const remainingData = sortedData.slice(4);

      const remainingWorth = remainingData.reduce(
        (sum, obj) => sum + obj.worth,
        0
      );

      if (remainingData.length > 0) {
        setDataWithWorth([
          ...topFour,
          { asset: "Others", worth: remainingWorth },
        ]);
      } else {
        setDataWithWorth([...topFour]);
      }
    }

    console.log("data", data);
  }, [data]);

  useEffect(() => {
    const handleResize = () => setWidth(globalThis?.innerWidth);
    globalThis?.addEventListener("resize", handleResize);
    return () => globalThis?.removeEventListener("resize", handleResize);
  }, []);

  const totalWorth = dataWithWorth.reduce((sum, obj) => sum + obj.worth, 0);

  const radiusScale = d3
    .scaleSqrt()
    .domain([0, totalWorth])
    .range([minRadius, totalRadius]);

  let accumulatedPercentage = 0;

  const noDataToShow = dataWithWorth.length === 0;

  return (
    <>
      {noDataToShow ? (
        <text
          style={{
            height: "230px",
            fontSize: "16px",
            fontFamily: "Barlow, sans-serif",
            fontWeight: "600",
            color: "#ACB2B7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No data to show
        </text>
      ) : (
        <svg
          viewBox="-6 -8 50 50"
          style={{
            height: "230px",
            width: "230px",
            position: "relative",
            overflow: "visible",
            float: "left",
            marginLeft:
              width < 900 && width > 700
                ? "100px"
                : width < 700 && width > 600
                ? "50px"
                : width < 600 && width > 450
                ? "25%"
                : width < 450 && width > 400
                ? "20%"
                : width < 400 && width > 350
                ? "15%"
                : width < 350
                ? "10%"
                : width > 1099 && width < 1500
                ? "50px"
                : width > 1500
                ? "50px"
                : "",
          }}
        >
          {dataWithWorth.map((item, index) => {
            const percentage = item.worth / totalWorth;
            let radius = radiusScale(item.worth);
            if (item.asset === "Others" && radius < minimumValueRadius) {
              radius = minimumValueRadius;
            }
            const start = accumulatedPercentage * 360;
            const end = start + percentage * 360;

            const largeArcFlag = percentage > 0.5 ? 1 : 0;
            const startX =
              18 + radius * Math.cos(((start - 90) * Math.PI) / 180);
            const startY =
              18 + radius * Math.sin(((start - 90) * Math.PI) / 180);
            const endX = 18 + radius * Math.cos(((end - 90) * Math.PI) / 180);
            const endY = 18 + radius * Math.sin(((end - 90) * Math.PI) / 180);

            const centerX =
              18 +
              radius *
                Math.cos(((start + percentage * 180 - 90) * Math.PI) / 180);
            const centerY =
              18 +
              radius *
                Math.sin(((start + percentage * 180 - 90) * Math.PI) / 180);
            const midX =
              18 +
              (radius + 2) *
                Math.cos(((start + percentage * 180 - 90) * Math.PI) / 180);
            const midY =
              18 +
              (radius + 8) *
                Math.sin(((start + percentage * 180 - 90) * Math.PI) / 180);
            const labelX =
              18 +
              (radius + 6) *
                Math.cos(((start + percentage * 180 - 90) * Math.PI) / 180);
            const labelY =
              17 +
              (radius + 9) *
                Math.sin(((start + percentage * 180 - 85) * Math.PI) / 180) +
              1;
            const alignmentBaseline =
              start + percentage * 180 > 180
                ? "text-before-edge"
                : "text-after-edge";

            accumulatedPercentage += percentage;

            return (
              <g key={index}>
                <path
                  d={`
                  M 18 18 
                  L ${startX} ${startY} 
                  A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} 
                  z
                `}
                  fill={colors[index % colors.length]}
                  style={{
                    stroke: "none",
                    filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2))",
                  }}
                />
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={midX}
                  y2={midY}
                  stroke="#A8A8A8"
                  strokeWidth="0.2"
                />
                <path
                  d={`
                  M ${midX} ${midY}
                  H ${labelX}
                `}
                  stroke="#A8A8A8"
                  strokeWidth="0.2"
                />
                <text
                  x={labelX}
                  y={labelY}
                  fill="#A8A8A8"
                  style={{ fontSize: "2.6px" }}
                  textAnchor={labelX > 18 ? "start" : "end"}
                  alignmentBaseline={alignmentBaseline}
                >
                  {item.asset}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </>
  );
};

export default GraphOfConsolidatedPOrtfolio;
