/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ users = 1, jobs, applications }) => {
  const chartRef = useRef(null); // Ref for the canvas
  const chartInstanceRef = useRef(null); // Ref for storing the chart instance

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance and store it in the ref
    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Users', 'Jobs', 'Applications'],
        datasets: [
          {
            label: 'Data',
            data: [users, jobs, applications],
            backgroundColor: ['#4CAF50', '#FFC107', '#2196F3'], // Customize colors if needed
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            enabled: false, // Disable tooltips if not needed
          },
        },
      },
      plugins: [
        {
          id: 'displayValues',
          afterDatasetsDraw: (chart) => {
            const { ctx } = chart;
            chart.data.datasets.forEach((dataset, i) => {
              const meta = chart.getDatasetMeta(i);
              meta.data.forEach((bar, index) => {
                const value = dataset.data[index];
                const label = chart.data.labels[index];
                const position = bar.tooltipPosition();
                ctx.fillStyle = '#000'; // Color of text
                ctx.textAlign = 'center';
                ctx.font = 'bold 12px Arial';

                // Display category and value
                ctx.fillText(`${label}: ${value}`, position.x, position.y - 10); // Adjust position
              });
            });
          },
        },
      ],
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [users, jobs, applications]); // Re-create the chart when data changes

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
