import React, { useEffect, useRef } from "react";

const HorizontalStackedBarGraph = ({ chartData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const renderChart = async () => {
      const ApexCharts = (await import("apexcharts")).default;

      const chartOptions = {
        chart: {
          type: "bar",
          height: "100%",
          width: "100%",
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: 60,
            opacity: 0,
          },
        },
        dataLabels: {
          enabled: false,
        },
        series: chartData.series,
        xaxis: {
          position: "top",
          categories: chartData.categories,
          labels: {
            style: { colors: ["#A3A3A3"] },
            rotateAlways: true,
            rotate: 90,
          },
        },
        yaxis: { labels: { style: { colors: ["#A3A3A3"] } } },
        colors: ["#5A3FFF", "#3DFFDC"],
        legend: {
          position: "bottom",
          labels: {
            colors: ["#ffffff", "#ffffff"],
          },
        },
        tooltip: {
          enabled: false,
        },
      };

      if (chartRef.current) {
        const chart = new ApexCharts(chartRef.current, chartOptions);

        chart.render();

        const styleTag = document.createElement("style");
        styleTag.innerHTML =
          ".apexcharts-gridlines-horizontal, .apexcharts-grid-borders .apexcharts-gridline { display: none !important; }";
        document.head.appendChild(styleTag);

        return () => {
          chart.destroy();
        };
      }
    };

    if (typeof window !== "undefined") {
      renderChart();
    }
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ marginBottom: "1rem", minWidth: "100%", minHeight:"220px" }}
    ></div>
  );
};

export default HorizontalStackedBarGraph;
