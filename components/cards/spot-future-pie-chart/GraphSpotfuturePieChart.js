import React, { useEffect, useState } from "react";

const GraphSpotfuturePieChart = ({ data }) => {
  const [dataWithWorth, setDataWithWorth] = useState([]);
  const colors = ["#36D2B6", "#1EB1D2", "#4E38D2", "#90BAD2", "#2474D2"];

  useEffect(() => {
    const computedData = data.map((obj) => ({
      ...obj,
      worth: obj.amount * obj.value,
    }));

    const sortedData = computedData.sort((a, b) => b.worth - a.worth);

    const topFour = sortedData.slice(0, 4);
    const remainingData = sortedData.slice(4);

    const remainingWorth = remainingData.reduce(
      (sum, obj) => sum + obj.worth,
      0
    );

    setDataWithWorth([...topFour, { name: "Others", worth: remainingWorth }]);
  }, [data]);

  const totalWorth = dataWithWorth.reduce((sum, obj) => sum + obj.worth, 0);

  let accumulatedWorth = 0;

  return (
    <svg
      viewBox="-2 0 40 40"
      style={{
        height: "230px",
        width: "230px",
        position: "relative",
      }}
    >
      {dataWithWorth.map((item, index) => {
        const worth = item.worth;
        const percentage = worth / totalWorth;
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
        const labelX =
          18 +
          14.5 * Math.cos(((start + percentage * 180 - 90) * Math.PI) / 180);
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
              x2={labelX}
              y2={labelY}
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
              {item.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default GraphSpotfuturePieChart;
