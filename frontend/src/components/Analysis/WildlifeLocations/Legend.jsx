import { useEffect } from "react";
import L from "leaflet"; // Ensure Leaflet is imported
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet"; // Import useMap to get the map instance

const Legend = ({ getColor }) => { // Receive getColor as a prop
  const map = useMap(); // Get map instance
  
  useEffect(() => {
    if (!map) return; // Ensure map is available

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "legend");
      const grades = [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09];
      let labels = ["<strong>Density</strong>"];

      for (let i = 0; i < grades.length; i++) {
        labels.push(
          `<i style="background:${getColor(grades[i])}; width:20px; height:10px; display:inline-block;"></i> ${grades[i]}`
        );
      }

      div.innerHTML = labels.join("<br>");
      return div;
    };

    legend.addTo(map); // Add to the Leaflet map

    return () => {
      legend.remove(); // Cleanup on unmount
    };
  }, [map, getColor]); // Include getColor in dependencies

  return null;
};

export default Legend;
