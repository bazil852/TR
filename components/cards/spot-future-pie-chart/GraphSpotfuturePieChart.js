import React, { useEffect, useState } from "react";

const GraphSpotfuturePieChart = ({ data }) => {
  const [dataWithWorth, setDataWithWorth] = useState([]);
  const colors = ["#36D2B6", "#1EB1D2", "#4E38D2", "#90BAD2", "#2474D2"];
  const minPercentage = 0.05;

  useEffect(() => {
    const hasAllElementsZeroOrUndefined = data?.every(
      (obj) => Number(obj.usdt_price) === 0 || isNaN(Number(obj.usdt_price))
    );

    if (hasAllElementsZeroOrUndefined) {
      setDataWithWorth([]);
    } else {
      const computedData = data?.map((obj) => ({
        ...obj,
        worth: Number(obj.usdt_price) || 0,
      }));

      const sortedData = computedData.sort((a, b) => b.worth - a.worth);

      const topFour = sortedData.slice(0, 4);
      const remainingData = sortedData.slice(4);

      const remainingWorth = remainingData.reduce(
        (sum, obj) => sum + obj.worth,
        0
      );

      setDataWithWorth([
        ...topFour,
        { asset: "Others", worth: remainingWorth },
      ]);
    }
  }, [data]);

  if (dataWithWorth.length === 0) {
    return (
      <div
        style={{
          height: "160px",
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
      </div>
    );
  }

  const totalWorth = dataWithWorth.reduce((sum, obj) => sum + obj.worth, 0);

  const adjustedData = dataWithWorth.map((item) => {
    const worth = item.worth;
    let percentage = worth / totalWorth;

    if (percentage < minPercentage) {
      percentage = minPercentage;
    }

    return {
      ...item,
      percentage,
    };
  });

  const maxItem = adjustedData.reduce((max, item) =>
    item.percentage > max.percentage ? item : max
  );

  const totalPercentage = adjustedData.reduce(
    (sum, item) => sum + item.percentage,
    0
  );
  maxItem.percentage -= totalPercentage - 1;

  let accumulatedWorth = 0;

  return (
    <svg
      viewBox="-7 -2 50 50"
      style={{
        height: "230px",
        width: "230px",
        position: "relative",
        overflow: "visible",
      }}
    >
      {adjustedData.map((item, index) => {
        const percentage = item.percentage;
        const start = accumulatedWorth * 360;
        const end = start + percentage * 360;

        const largeArcFlag = percentage > 0.5 ? 1 : 0;
        const startX = 18 + 14 * Math.cos(((start - 90) * Math.PI) / 180);
        const startY = 18 + 14 * Math.sin(((start - 90) * Math.PI) / 180);
        const endX = 18 + 14 * Math.cos(((end - 90) * Math.PI) / 180);
        const endY = 18 + 14 * Math.sin(((end - 90) * Math.PI) / 180);

        const centerX =
          18 + 14 * Math.cos(((start + percentage * 180 - 90) * Math.PI) / 180);
        const centerY =
          18 + 14 * Math.sin(((start + percentage * 180 - 90) * Math.PI) / 180);
        const midX =
          18 + 16 * Math.cos(((start + percentage * 180 - 90) * Math.PI) / 180);
        const midY =
          18 + 16 * Math.sin(((start + percentage * 180 - 90) * Math.PI) / 180);
        const labelX =
          18 + 17 * Math.cos(((start + percentage * 180 - 90) * Math.PI) / 180);
        const labelY =
          18 + 17 * Math.sin(((start + percentage * 180 - 90) * Math.PI) / 180);

        accumulatedWorth += percentage;

        return (
          <g key={index}>
            <path
              d={`
                M 18 18 
                L ${startX} ${startY} 
                A 14 14 0 ${largeArcFlag} 1 ${endX} ${endY} 
                z
              `}
              fill={colors[index]}
              stroke="#000000"
              strokeWidth="0.3"
            />
            <line
              x1={centerX}
              y1={centerY}
              x2={midX}
              y2={midY}
              stroke="#A8A8A8"
              strokeWidth="0.2"
            />
            <line
              x1={midX}
              y1={midY}
              x2={labelX}
              y2={midY}
              stroke="#A8A8A8"
              strokeWidth="0.2"
            />
            <text
              x={labelX}
              y={labelY}
              fill="#A8A8A8"
              style={{ fontSize: "2.6px" }}
              textAnchor={labelX > 18 ? "start" : "end"}
              alignmentBaseline="middle"
            >
              {item.asset}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default GraphSpotfuturePieChart;
