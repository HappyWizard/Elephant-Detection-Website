
import React, { useState, useEffect} from "react";
import Chart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./LoadingSpinner.css"; // Import the CSS for spinner and overlay

const ReportCharts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allDetections, setAllDetections] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // 🌓 Add dark mode state

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: "area",
        stacked: false,
        toolbar: { show: false },
        background: "transparent", // works for both themes
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
      theme: { mode: "light" }, // 🔆 initial mode
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
          },
          style: { colors: "#333" }, // default label color
        }
      },
      tooltip: {
        theme: "light",
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
        horizontalAlign: "right",
        labels: { colors: "#333" },
      }
    },
  });
  const toMalaysiaDateStr = (date) => {
    // Interpret incorrectly-labeled UTC as local time
    // const adjusted = new Date(date.getTime() - 8 * 60 * 60 * 1000);
    const adjusted = new Date(date.getTime());
    return adjusted.toLocaleDateString("en-CA"); // e.g., "2025-04-21"
  };
  
  // Process data for the selected date
  const processData = (data, date) => {
    const selectedDateStr = toMalaysiaDateStr(selectedDate);

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
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://elephant-detection-website-production.onrender.com/api/detection/get-all-detection-data`
        );
        const data = await response.json();
        setAllDetections(data);
        
        const { series } = processData(data, selectedDate);
        updateChart(series);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
    }
    };
    fetchData();
  }, []);

  // Handle date change
  useEffect(() => {
    if (allDetections.length > 0) {
      setIsLoading(true);
      const { series } = processData(allDetections, selectedDate);
      updateChart(series);
      setTimeout(() => setIsLoading(false), 500); // small delay for smoother UX
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

  // 🌓 Toggle function
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    setChartData((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        theme: { mode: !darkMode ? "dark" : "light" },
        tooltip: { theme: !darkMode ? "dark" : "light" },
        xaxis: {
          ...prev.options.xaxis,
          labels: {
            ...prev.options.xaxis.labels,
            style: { colors: !darkMode ? "#eee" : "#333" },
          },
        },
        legend: {
          ...prev.options.legend,
          labels: { colors: !darkMode ? "#eee" : "#333" },
        },
      },
    }));
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <label className="form-label me-2">Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="form-control"
              maxDate={new Date()}
              disabled={isLoading}
            />
          </div>
          <button
            className="btn btn-secondary"
            onClick={toggleDarkMode}
            disabled={isLoading}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>             
      </div>

      {/* Chart container with dim effect */}
      <div
        style={{
          opacity: isLoading ? 0.4 : 1,
          pointerEvents: isLoading ? "none" : "auto",
          transition: "opacity 0.3s ease",
        }}
      >
        <Chart
          options={chartData.options}
          series={chartData.series}
          type={chartData.options.chart?.type || "line"}
          height={chartData.options.chart?.height || 350}
        />
      </div>

      {/* Spinner Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <div className="loading-text">Loading data...</div>
        </div>
      )}
    </div>
  );
};
export default ReportCharts;
