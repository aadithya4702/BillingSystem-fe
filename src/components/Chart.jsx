import React from "react";
import ReactApexChart from "react-apexcharts"; // Importing the chart component
import ApexCharts from "apexcharts"; // Optional, not required for the chart component itself

const ApexChart = () => {
  // State for chart options and data series
  const [state, setState] = React.useState({
    series: [44, 55, 67, 83],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                return 249; // Custom total value (you can also compute the sum of series)
              },
            },
          },
        },
      },
      labels: ["Apples", "Oranges", "Bananas", "Berries"], // Labels for each section of the radial bar
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options} // Pass chart options to the chart
          series={state.series} // Pass the data series
          type="radialBar" // Define the type of chart as radialBar
          height={250} // Set the chart height
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
