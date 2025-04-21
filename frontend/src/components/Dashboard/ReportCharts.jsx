
import React, { useState, useEffect} from "react";
import Chart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const ReportCharts = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allDetections, setAllDetections] = useState([]);
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: "area",
        stacked: false,
        toolbar: { show: false },
      },
      markers: {
        size: 4,
      },
      colors: [
        "#4154f1", "#2eca6a", "#ff771d", "#ff4757", "#1e90ff", 
        "#00a86b", "#9932cc", "#ff4500", "#daa520", "#8b0000",
        "#6f42f5", "#0b2652", "#1bc6cf", "#09de82", "#a60603",
      ],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "datetime",
        labels: {
          formatter: function(value) {
            return new Date(value).toLocaleTimeString("en-US", {
              timeZone: "UTC",
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            });
          }
        }
      },
      tooltip: {
        x: {
          formatter: function(value) {
            return new Date(value).toLocaleTimeString("en-US", {
              timeZone: "UTC",
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true
            });
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right"
      }
    },
  });
  const toMalaysiaDateStr = (date) => {
    // Interpret incorrectly-labeled UTC as local time
    const adjusted = new Date(date.getTime() - 8 * 60 * 60 * 1000);
    return adjusted.toLocaleDateString("en-CA"); // e.g., "2025-04-21"
  };
  
  // Process data for the selected date
  const processData = (data, date) => {
    const selectedDateStr = toMalaysiaDateStr(date);

    const filteredData = data.filter(item =>
      toMalaysiaDateStr(new Date(item.timestamp)) === selectedDateStr
    );
    // Group by object type and time
    const seriesMap = {};
    filteredData.forEach(detection => {
      const type = detection.object_detected;
      if (!seriesMap[type]) {
        seriesMap[type] = {
          name: type.charAt(0).toUpperCase() + type.slice(1),
          data: []
        };
      }
      seriesMap[type].data.push({
        x: new Date(detection.timestamp).getTime(),
        y: detection.object_detected_count || 1
      });
    });
    // Convert to array and sort by time
    const series = Object.values(seriesMap).map(s => ({
      ...s,
      data: s.data.sort((a, b) => a.x - b.x)
    }));
    return { series };
  };
  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://elephant-detection-website-production.onrender.com/api/detection/get-detection-data?date=${selectedDate}`
        );
        const data = await response.json();
        setAllDetections(data);
        
        const { series } = processData(data, selectedDate);
        updateChart(series);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  // Handle date change
  useEffect(() => {
    if (allDetections.length > 0) {
      const { series } = processData(allDetections, selectedDate);
      updateChart(series);
    }
  }, [selectedDate, allDetections]);
  // WebSocket for real-time updates
  useEffect(() => {
    const ws = new WebSocket("wss://elephant-detection-website-production.onrender.com");
    // const ws = new WebSocket(`ws://192.168.180.88:5001`);
    ws.onmessage = (event) => {
      const newDetection = JSON.parse(event.data);
      setAllDetections(prev => [newDetection, ...prev.slice(0, 1000)]);
      
      // Check if new detection is for the selected date
      const detectionDate = toMalaysiaDateStr(new Date(newDetection.timestamp));
      const selectedDateStr = toMalaysiaDateStr(selectedDate);

      if (detectionDate === selectedDateStr) {
        const { series } = processData([newDetection, ...allDetections], selectedDate);
        updateChart(series);
      }
    };
    return () => ws.close();
  }, [allDetections, selectedDate]);
  
  const updateChart = (series) => {
    setChartData(prev => ({
      ...prev,
      series,
    }));
  };
  return (
    <div>
      <div className="mb-3">
        <label className="form-label me-2">Select Date:</label> 
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="form-control"
          maxDate={new Date()}
        />
      </div>
      
      <Chart
        options={chartData.options}
        series={chartData.series}
        type={chartData.options.chart.type}
        height={chartData.options.chart.height}
      />
    </div>
  );
};
export default ReportCharts;
