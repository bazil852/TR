import React, { useRef, useState } from "react";

const MeterChart = ({ Percentage, Dollars }) => {
  const [maxRange, setMaxRange] = useState(60);
  const [guageValue, setGuageValue] = useState(Percentage);

  const radiusPercentage = 0.48;
  const maxValue = maxRange;
  const minorStep = 10;
  const val = 10;
  const initaialValue = -30;
  const majorStep = 10;
  const labelOffsetPercentage = 0.17;
  const svgRef = useRef(null);
  const [svgSize, setSvgSize] = useState({ width: 200, height: 200 });

  const generateTicks = () => {
    const ticks = [];
    const range = maxValue;
    const totalTicks = range / minorStep;
    const angleStep = (endAngle - startAngle) / totalTicks;
    const radius = (radiusPercentage * svgSize.width) / 0.88;
    const labelRadius = radius - labelOffsetPercentage * svgSize.width;

    for (let i = 0; i <= totalTicks; i++) {
      const angle = startAngle + i * angleStep;
      const isMajorTick = i % (majorStep / minorStep) === 0;

      if (isMajorTick) {
        const labelText = i * val + initaialValue;

        const labelX = svgSize.width / 2 + labelRadius * Math.cos(angle);
        const labelY = svgSize.height / 2 + labelRadius * Math.sin(angle);
        ticks.push(
          <text
            x={labelX}
            y={labelY}
            textAnchor="middle"
            key={`label${i}`}
            fill="#A3B3AD"
            style={{
              fontSize: "12px",
              fontFamily: "Barlow,san-serif",
              fontWeight: 500,
            }}
          >
            {labelText}
          </text>
        );
      }
    }
    return ticks;
  };

  const startAngle = Math.PI - 44 * (Math.PI / 180);
  const endAngle = 2 * Math.PI + 44 * (Math.PI / 180);

  const gradientSteps = [
    { offset: "0%", color: "#282249" },
    { offset: "20%", color: "#4937B7" },
    { offset: "40%", color: "#5944FA" },
    { offset: "60%", color: "#388797" },
    { offset: "80%", color: "#2CB379" },
    { offset: "100%", color: "#36EE97" },
  ];

  const gradientSteps2 = [
    { offset2: "0%", color2: "#262147" },
    { offset2: "20%", color2: "#222A42" },
    { offset2: "40%", color2: "#1F303E" },
    { offset2: "60%", color2: "#1C3839" },
    { offset2: "80%", color2: "#183F34" },
    { offset2: "100%", color2: "#15472F" },
  ];

  const gradient = (
    <linearGradient id="gradient">
      {gradientSteps.map((step, index) => (
        <stop key={index} offset={step.offset} stopColor={step.color} />
      ))}
    </linearGradient>
  );

  const gradient2 = (
    <linearGradient id="gradient2">
      {gradientSteps2.map((step, index) => (
        <stop key={index} offset={step.offset2} stopColor={step.color2} />
      ))}
    </linearGradient>
  );

  const clampedValue = guageValue + 30;
  const pointerAngle =
    startAngle + (clampedValue / maxValue) * (endAngle - startAngle);

  const needleLength = radiusPercentage * svgSize.width * 0.5;
  const needleBaseWidth = svgSize.width * 0.025;
  const needleTipX = svgSize.width / 2 + needleLength * Math.cos(pointerAngle);
  const needleTipY = svgSize.height / 2 + needleLength * Math.sin(pointerAngle);
  const needleBaseX1 =
    svgSize.width / 2 + needleBaseWidth * Math.cos(pointerAngle - Math.PI / 2);
  const needleBaseY1 =
    svgSize.height / 2 + needleBaseWidth * Math.sin(pointerAngle - Math.PI / 2);
  const needleBaseX2 =
    svgSize.width / 2 + needleBaseWidth * Math.cos(pointerAngle + Math.PI / 2);
  const needleBaseY2 =
    svgSize.height / 2 + needleBaseWidth * Math.sin(pointerAngle + Math.PI / 2);

  const needle = (
    <path
      d={`M ${needleBaseX1} ${needleBaseY1} L ${needleTipX} ${needleTipY} L ${needleBaseX2} ${needleBaseY2} Z`}
      fill="#ADE1FF"
    />
  );

  const circleRadius = (svgSize.width / 1.2) * 0.038;
  const circle = (
    <circle
      cx={svgSize.width / 2}
      cy={svgSize.height / 2}
      r={circleRadius}
      stroke="white"
      strokeWidth="2"
    />
  );

  return (
    <div
      style={{
        height: "15rem",
        position: "relative",
      }}
    >
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          overflow: "visible",
        }}
      >
        <defs>{gradient2}</defs>
        {svgSize.width && (
          <>
            <path
              d={`
              M ${svgSize.width / 1.74 +
                radiusPercentage * svgSize.width * Math.cos(startAngle)} 
                ${svgSize.height / 2.29 +
                  radiusPercentage * svgSize.width * Math.sin(startAngle)} 
              A ${(radiusPercentage / 1.24) * svgSize.width} 
                ${(radiusPercentage / 1.24) * svgSize.width} 
                0 1 1 
                ${svgSize.width / 2.33 +
                  radiusPercentage * svgSize.width * Math.cos(endAngle)} 
                ${svgSize.height / 2.28 +
                  radiusPercentage * svgSize.width * Math.sin(endAngle)}`}
              fill="transparent"
              stroke="url(#gradient2)"
              strokeWidth={`${0.18 * svgSize.width}`}
            />
          </>
        )}
      </svg>
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          overflow: "visible",
        }}
      >
        <defs>{gradient}</defs>
        {svgSize.width && (
          <>
            {generateTicks()}
            <path
              d={`
              M ${svgSize.width / 2 +
                radiusPercentage * svgSize.width * Math.cos(startAngle)} 
                ${svgSize.height / 2 +
                  radiusPercentage * svgSize.width * Math.sin(startAngle)} 
              A ${radiusPercentage * svgSize.width} 
                ${radiusPercentage * svgSize.width} 
                0 1 1 
                ${svgSize.width / 2 +
                  radiusPercentage * svgSize.width * Math.cos(endAngle)} 
                ${svgSize.height / 2 +
                  radiusPercentage * svgSize.width * Math.sin(endAngle)}`}
              fill="transparent"
              stroke="url(#gradient)"
              strokeWidth={`${0.02 * svgSize.width}`}
            />
            {needle}

            {circle}
          </>
        )}
      </svg>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 30,
          left: 85,
        }}
      >
        <p
          style={{
            fontFamily: "Barlow,san-serif",
            fontWeight: 500,
            fontSize: 16,
            marginBottom: "-17px",
            color: "#36F096",
          }}
        >
          {guageValue}%
        </p>
        <p
          style={{
            fontFamily: "Barlow,san-serif",
            fontWeight: 500,
            fontSize: 16,
            color: "#36F096",
          }}
        >
          {Dollars}$
        </p>
      </div>
    </div>
  );
};

export default MeterChart;
