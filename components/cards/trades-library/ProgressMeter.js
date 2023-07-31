import React, { useRef, useState } from "react";

const ProgressMeter = ({ TotalValue, Value, Type }) => {
  const [maxRange, setMaxRange] = useState(TotalValue);
  const [guageValue, setGuageValue] = useState(Value);

  const percent = (guageValue * 100) / maxRange;
  const temp = percent === 100 ? percent - 2 : percent;

  const percent2 = percent === 0 ? percent + 0 : percent + 1;
  console.log(percent2);
  const radiusPercentage = 0.48;
  const maxValue = maxRange;
  const svgRef = useRef(null);
  const [svgSize, setSvgSize] = useState({ width: 80, height: 80 });

  const gradientSteps = [
    { offset: "0%", color: "#313827" },
    { offset: "20%", color: "#32504B" },
    { offset: "40%", color: "#347166" },
    { offset: "60%", color: "#368375" },
    { offset: "80%", color: "#379B89" },
    { offset: "100%", color: "#38AB96" },
  ];

  const gradient = (
    <linearGradient id="gradient5">
      {gradientSteps.map((step, index) => (
        <stop key={index} offset={step.offset} stopColor={step.color} />
      ))}
    </linearGradient>
  );
  const valueTextX = svgSize.width / 2;
  const valueTextY = svgSize.height * radiusPercentage + 5;
  const startAngle = Math.PI - 44 * (Math.PI / 180);
  const endAngle = 2 * Math.PI + 44 * (Math.PI / 180);

  return (
    <div
      style={{
        height: "7rem",
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
        {svgSize.width && (
          <>
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
              stroke="#303030"
              strokeWidth={`${0.1 * svgSize.width}`}
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
        {svgSize.width && (
          <>
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
              stroke="#3DFFCC"
              strokeWidth={`${0.082 * svgSize.width}`}
              strokeDasharray={`180 180`}
              strokeDashoffset={`${180 - (percent2 / 100) * 180}`}
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
              stroke="url(#gradient5)"
              strokeWidth={`${0.09 * svgSize.width}`}
              strokeDasharray={`180 180`}
              strokeDashoffset={`${180 - (temp / 100) * 180}`}
            />
            <text
              x={valueTextX}
              y={valueTextY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              style={{
                fontSize: "14px",
                fontWeight: "500",
                fontFamily: "Barlow,san-serif",
                color: "#FFFFFF",
              }}
            >
              {percent}%
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
          lineHeight: 2,
          top: 40,
          left: 28,
        }}
      >
        <p
          style={{
            fontFamily: "Barlow,san-serif",
            fontWeight: 400,
            fontSize: 10,
            marginBottom: "-17px",
            color: "#A3A3A3",
          }}
        >
          {Type === "Orders"
            ? `${guageValue} of ${maxValue}`
            : `${guageValue} of`}
        </p>
        <p
          style={{
            fontFamily: "Barlow,san-serif",
            fontWeight: 400,
            fontSize: 10,
            color: "#A3A3A3",
          }}
        >
          {Type === "Value" ? maxValue : "Orders"}
        </p>
      </div>
    </div>
  );
};

export default ProgressMeter;
