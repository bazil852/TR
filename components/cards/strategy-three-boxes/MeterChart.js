import React, { useEffect, useRef, useState } from "react";

const MeterChart = () => {
  const [maxRange, setMaxRange] = useState(1500);
  const [guageValue, setGuageValue] = useState(1000);

  const radiusPercentage = 0.48;
  const maxValue = maxRange;
  const minorStep = 25;
  const majorStep = 250;
  const majorTickColor = "#A8A8A8";
  const minorTickColor = "#747474";
  const majorTickWidthPercentage = 0.011;
  const minorTickWidthPercentage = 0.005;
  const majorTickLengthPercentage = 0.045;
  const minorTickLengthPercentage = 0.025;
  const gapPercentage = 0.06;
  const labelOffsetPercentage = 0.17;
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
    const labelRadius = radius - labelOffsetPercentage * svgSize.width;

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
      if (isMajorTick) {
        const labelText = i * minorStep;
        const labelX = svgSize.width / 2 + labelRadius * Math.cos(angle);
        const labelY = svgSize.height / 2 + labelRadius * Math.sin(angle);
        ticks.push(
          <text
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            key={`label${i}`}
            fill="#747474"
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
    { offset: "0%", color: "#3D5959" },
    { offset: "20%", color: "#60BFBF" },
    { offset: "40%", color: "#60BFBF" },
    { offset: "60%", color: "#60BFBF" },
    { offset: "80%", color: "#6FEBEB" },
    { offset: "100%", color: "#74FAFA" },
  ];

  const gradient = (
    <linearGradient id="gradient">
      {gradientSteps.map((step, index) => (
        <stop key={index} offset={step.offset} stopColor={step.color} />
      ))}
    </linearGradient>
  );

  const clampedValue = guageValue;
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
      fill="#5AFFE1"
    />
  );

  const circleRadius = svgSize.width * 0.038;
  const circle = (
    <circle
      cx={svgSize.width / 2}
      cy={svgSize.height / 2}
      r={circleRadius}
      fill="white"
    />
  );

  const valueTextX = svgSize.width / 2;
  const valueTextY = svgSize.height * radiusPercentage + 5;

  const smallNeedleLength = radiusPercentage * svgSize.width * 0.18;
  const smallNeedleBaseWidth = svgSize.width * 0.027;
  const smallPointerAngle = pointerAngle + Math.PI;
  const smallNeedleTipX =
    svgSize.width / 2 + smallNeedleLength * Math.cos(smallPointerAngle);
  const smallNeedleTipY =
    svgSize.height / 2 + smallNeedleLength * Math.sin(smallPointerAngle);
  const smallNeedleBaseX1 =
    svgSize.width / 2 +
    smallNeedleBaseWidth * Math.cos(smallPointerAngle - Math.PI / 2);
  const smallNeedleBaseY1 =
    svgSize.height / 2 +
    smallNeedleBaseWidth * Math.sin(smallPointerAngle - Math.PI / 2);
  const smallNeedleBaseX2 =
    svgSize.width / 2 +
    smallNeedleBaseWidth * Math.cos(smallPointerAngle + Math.PI / 2);
  const smallNeedleBaseY2 =
    svgSize.height / 2 +
    smallNeedleBaseWidth * Math.sin(smallPointerAngle + Math.PI / 2);

  const smallNeedle = (
    <path
      d={`M ${smallNeedleBaseX1} ${smallNeedleBaseY1} L ${smallNeedleTipX} ${smallNeedleTipY} L ${smallNeedleBaseX2} ${smallNeedleBaseY2} Z`}
      fill="#5AFFE1"
    />
  );

  return (
    <div
      style={{
        width: "14rem",
        height: "15rem",
        position: "relative",
      }}
    >
      <svg
        ref={svgRef}
        style={{
          width: "100%",
          height: "100%",
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
              strokeWidth={`${0.05 * svgSize.width}`}
            />
            {needle}
            {smallNeedle}
            {circle}
            <text
              x={valueTextX}
              y={valueTextY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              style={{
                fontSize: "40px",
                fontWeight: "900",
                fontFamily: "Barlow,san-serif",
                color: "#FFFFFF",
                opacity: 0.1,
              }}
            >
              USDT
            </text>
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
          bottom: 0,
          left: 65,
        }}
      >
        <p
          style={{
            fontFamily: "Barlow,san-serif",
            fontWeight: 400,
            fontSize: 14,
            marginBottom: "-17px",
          }}
        >
          Available: {maxRange}
        </p>
        <p
          style={{
            fontFamily: "Barlow,san-serif",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Used: {guageValue}
        </p>
      </div>
    </div>
  );
};

export default MeterChart;
