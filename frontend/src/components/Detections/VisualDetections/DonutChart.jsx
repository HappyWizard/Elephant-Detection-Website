import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CardFilter from "../../Dashboard/CardFilter";
import React, { useState, useEffect } from "react";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const ws = new WebSocket("ws://localhost:5001"); // Adjust the backend URL if needed

const DonutChart = () => {
  const [data, setData] = useState({
    labels: ["Elephant", "Human Activities", "Others"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["#059eeb", "#036a9e", "#033b57"],
        hoverBackgroundColor: ["#FFC107", "#FFC107", "#FFC107"],
      },
    ],
  });
  const [filter, setFilter] = useState("Today");

  useEffect(() => {
    // Fetch initial data via HTTP request
    const fetchData = async () => {
      try {
        const response = await axios.get("https://elephant-detection-website-production.onrender.com/api/detection/get-detection-data");
        processDetectionData(response.data, false);
      } catch (error) {
        console.error("Error fetching detection data:", error);
      }
    };

    fetchData();

    // Listen for real-time updates via WebSocket
    ws.onmessage = (event) => {
      try {
        const newDetection = JSON.parse(event.data);
        processDetectionData([newDetection], true);
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const processDetectionData = (detectionData, isRealtime = false) => {
    setData((prevData) => {
      let elephantCount = prevData.datasets[0].data[0];
      let humanCount = prevData.datasets[0].data[1];
      let otherCount = prevData.datasets[0].data[2];

      detectionData.forEach((detection) => {
        if (detection.object_detected.toLowerCase() === "elephant") {
          elephantCount++;
        } else if (detection.object_detected.toLowerCase() === "person") {
          humanCount++;
        } else {
          otherCount++;
        }
      });

      return {
        labels: ["Elephant", "Human Activities", "Others"],
        datasets: [
          {
            data: [elephantCount, humanCount, otherCount],
            backgroundColor: ["#059eeb", "#036a9e", "#033b57"],
            hoverBackgroundColor: ["#FFC107", "#FFC107", "#FFC107"],
          },
        ],
      };
    });
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="card">
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body pb-0">
        <h5 className="card-title">
          Donut Chart <span>/{filter}</span>
        </h5>
        <div>
          <Doughnut data={data} options={{ maintainAspectRatio: false }} width={300} height={300} />
        </div>
        <h5>
          <br />
          Elephant populations detected in Kota Tinggi, Johor.
          <br />
          <br />
        </h5>
      </div>
    </div>
  );
};

export default DonutChart;




// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import CardFilter from "../../Dashboard/CardFilter";
// import React, { useState } from "react";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const DonutChart = () => {
//   const data = {
//     labels: ["Elephant", "Human Activities", "Others"],
//     datasets: [
//       {
//         data: [75, 20, 5],
//         backgroundColor: ["#059eeb", "#036a9e","#033b57"],
//         hoverBackgroundColor: ["#FFC107", "#FFC107", "#FFC107"],
//       },
//     ],
//   };
//   const [filter, setFilter] = useState("Today");

//   const handleFilterChange = (filter) => {
//     setFilter(filter);
//   };

//   return (
//     <div className="card">
//       <CardFilter filterChange={handleFilterChange} />

//       <div className="card-body pb-0">
//         <h5 className="card-title">
//           Donut Chart <span>/{filter}</span>
//         </h5>
//         <div>
//           <Doughnut data={data} options={{ maintainAspectRatio: false }} width={300} height={300}  />
//         </div>
//         <h5>
//           <br />
//           Elephant populations detected in Kota Tinggi, Johor.
//           <br />
          
//           <br />
//         </h5>
//       </div>
//     </div>
//   );
// };

// export default DonutChart;
