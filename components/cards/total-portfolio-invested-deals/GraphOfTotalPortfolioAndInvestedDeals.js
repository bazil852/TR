import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";

const GraphOfTotalPortfolioAndInvestedDeals = ({ graph }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const labels = graph.map((_, index) => `Label ${index + 1}`);

      const newChartInstance = new Chart(chartContainer.current, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              data: graph,
              backgroundColor: "transparent",
              borderColor: "#42458B",
              borderWidth: 1,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1,
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        },
      });

      return () => {
        newChartInstance.destroy();
      };
    }
  }, [graph]);

  return (
    <div
      style={{
        height: "90px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas ref={chartContainer} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default GraphOfTotalPortfolioAndInvestedDeals;
