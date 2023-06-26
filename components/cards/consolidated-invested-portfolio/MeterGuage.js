import React, { useEffect, useRef, useState } from "react";

const MeterGuage = ({ value }) => {
  const radiusPercentage = 0.45;
  const maxValue = 100;
  const minorStep = 5;
  const majorStep = 20;
  const majorTickColor = "#A8A8A8";
  const minorTickColor = "#747474";
  const majorTickWidthPercentage = 0.011;
  const minorTickWidthPercentage = 0.007;
  const majorTickLengthPercentage = 0.045;
  const minorTickLengthPercentage = 0.025;
  const gapPercentage = 0.04;
  const svgRef = useRef(null);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (svgRef.current) {
        setSvgSize({
          width: svgRef.current.clientWidth,
          height: svgRef.current.clientHeight,
        });
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const generateTicks = () => {
    const ticks = [];
    const range = maxValue;
    const totalTicks = range / minorStep;
    const angleStep = (endAngle - startAngle) / totalTicks;
    const radius = radiusPercentage * svgSize.width;
    const majorTickWidth = majorTickWidthPercentage * svgSize.width;
    const minorTickWidth = minorTickWidthPercentage * svgSize.width;
    const majorTickLength = majorTickLengthPercentage * svgSize.width;
    const minorTickLength = minorTickLengthPercentage * svgSize.width;
    const radiusWithGap = radius - gapPercentage * svgSize.width;

    for (let i = 0; i <= totalTicks; i++) {
      const angle = startAngle + i * angleStep;
      const isMajorTick = i % (majorStep / minorStep) === 0;
      const tickLength = isMajorTick ? majorTickLength : minorTickLength;
      const tickColor = isMajorTick ? majorTickColor : minorTickColor;
      const tickWidth = isMajorTick ? majorTickWidth : minorTickWidth;
      const x1 = svgSize.width / 2 + radiusWithGap * Math.cos(angle);
      const y1 = svgSize.height / 2 + radiusWithGap * Math.sin(angle);
      const x2 =
        svgSize.width / 2 + (radiusWithGap - tickLength) * Math.cos(angle);
      const y2 =
        svgSize.height / 2 + (radiusWithGap - tickLength) * Math.sin(angle);
      ticks.push(
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={tickColor}
          strokeWidth={tickWidth}
          key={i}
        />
      );
    }

    return ticks;
  };

  const startAngle = Math.PI;
  const endAngle = 2 * Math.PI;

  const gradientSteps = [
    { offset: "0%", color: "#1882FE" },
    { offset: "20%", color: "#1D93F6" },
    { offset: "40%", color: "#26B5E5" },
    { offset: "60%", color: "#26B5E5" },
    { offset: "80%", color: "#30D8D3" },
    { offset: "100%", color: "#35E8CB" },
  ];

  const gradient = (
    <linearGradient id="gradient">
      {gradientSteps.map((step, index) => (
        <stop key={index} offset={step.offset} stopColor={step.color} />
      ))}
    </linearGradient>
  );
  if (value < 0 || value > 100) {
    value = 0;
  }

  const clampedValue = value;
  const pointerAngle =
    startAngle + (clampedValue / maxValue) * (endAngle - startAngle);

  const pointerBaseRadius = radiusPercentage * svgSize.width * 0.7;

  const pointerWidth = 0.04 * svgSize.width;
  const pointerHeight = 0.05 * svgSize.width;

  const pointerBaseX =
    svgSize.width / 2 +
    (pointerBaseRadius - pointerHeight / 2) * Math.cos(pointerAngle);
  const pointerBaseY =
    svgSize.height / 2 +
    (pointerBaseRadius - pointerHeight / 2) * Math.sin(pointerAngle);

  const pointer = (
    <g
      transform={`translate(${pointerBaseX}, ${pointerBaseY}) 
                     rotate(${((pointerAngle - Math.PI / 2) * 180) / Math.PI})`}
    >
      <polygon
        points={`0,${pointerHeight} ${pointerWidth / 2},0 ${
          -pointerWidth / 2
        },0`}
        fill="#36F097"
      />
    </g>
  );
  const valueTextX = svgSize.width / 2;
  const valueTextY = svgSize.height * radiusPercentage + -5;

  return (
    <div
      style={{
        width: "13rem",
        height: "15rem",
        position: "relative",
        paddingTop: "30px",
      }}
    >
      <svg
        ref={svgRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <defs>{gradient}</defs>
        {svgSize.width && (
          <>
            {generateTicks()}
            <path
              d={`M ${svgSize.width / 2 - radiusPercentage * svgSize.width} ${
                svgSize.height / 2
              } A ${radiusPercentage * svgSize.width} ${
                radiusPercentage * svgSize.width
              } 0 0 1 ${svgSize.width / 2 + radiusPercentage * svgSize.width} ${
                svgSize.height / 2
              }`}
              fill="transparent"
              stroke="url(#gradient)"
              strokeWidth={`${0.03 * svgSize.width}`}
            />
            {pointer}
            <text
              x={valueTextX}
              y={valueTextY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              style={{
                fontSize: "2.2rem",
                fontFamily: "LCD",
              }}
            >
              {value}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};
export default MeterGuage;
