import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const CandleStick = () => {
  const [chartState] = useState({
    series: [
      {
        data: [
          {
            x: new Date(2023, 6, 11),
            y: [22.08, 23.82, 21.64, 12.12],
          },
          {
            x: new Date(2023, 6, 12),
            y: [22.12, 22.76, 22.0, 12.5],
          },
          {
            x: new Date(2023, 6, 13),
            y: [22.5, 22.68, 22.25, 15.38],
          },
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "candlestick",
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        type: "datetime",
      },
      yaxis: {
        labels: {
          show: false,
        },
        tooltip: {
          enabled: true,
        },
      },
      grid: {
        show: false,
      },
    },
  });

  for (let i = 0; i < 200; i++) {
    const date = new Date(2023, 6, 14 + i);
    const randomValues = Array.from({ length: 4 }, () => Math.random() * 10);
    const newDataPoint = {
      x: date,
      y: randomValues,
    };
    chartState.series[0].data.push(newDataPoint);
  }

  return (
    <div id="chart" style={{ width: "100%" }}>
      <style>
        {`
          .apexcharts-toolbar {
            display: none !important;
          }
          
          ::-webkit-scrollbar {
            width: 2px;
          }

          ::-webkit-scrollbar-track {
            background-color: transparent;
          }

          ::-webkit-scrollbar-thumb {
            background-color: grey;
            border-radius: 4px;
          }
        
        `}
      </style>
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="candlestick"
        height={250}
      />
    </div>
  );
};

export default CandleStick;
