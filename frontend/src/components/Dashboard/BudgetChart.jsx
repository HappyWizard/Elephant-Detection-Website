import React, { useState, useEffect } from "react";
import * as echarts from "echarts";

function BudgetChart() {
  useEffect(() => {
    echarts.init(document.querySelector('#budgetChart')).setOption({
      legend: {
        data: ["Allocated Work", "Actual Work Done"],
      },
      radar: {
        shape: 'circle',
        indicator: [
          {
            name: "Eugene",
            max: 6000,
          },
          {
            name: "Eiman",
            max: 6000,
          },
          {
            name: "Jarvis",
            max: 6000,
          },
          {
            name: "Hong Tat",
            max: 6000,
          },
          {
            name: "Seif",
            max: 6000,
          },
          {
            name: "Daniel",
            max: 6000,
          },
        ],
      },
      series: [
        {
          name: "Work Assigned vs Work Done",
          type: "radar",
          data: [
            {
              value: [4000, 4100, 4000, 3700, 2000, 3000],
              name: "Allocated Work",
            },
            {
              value: [5300, 4200, 3900, 4200, 500, 3000],
              name: "Actual Work Done",
            },
          ],
        },
      ],
    });
  }, []);
  return (
    <div
      id="budgetChart"
      style={{ minHeight: "400px" }}
      className="echart"
    ></div>
  );
}

export default BudgetChart;

// this one is using e charts
