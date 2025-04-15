import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Legend from "./Legend"; // Import Legend component
import CardFilter from "../../Dashboard/CardFilter";

const countryGeojsonMap = {
  USA: "/data/us-states.geojson",
  China: "/data/china-states.geojson",
  Malaysia: "/data/malaysia-states.geojson",
  Russia: "/data/russia-states.geojson",
  World: "/data/world-countries.geojson",
};
// Define map center and zoom levels for each country
const countryView = {
  USA: { center: [37.8, -96], zoom: 4 },
  China: { center: [35.0, 104.0], zoom: 4.5 },
  Malaysia: { center: [4.0, 109.5], zoom: 6 },
  Russia: { center: [61.524, 105.3188], zoom: 3 },
  World: { center: [40.0, 0.0], zoom: 2 },
};

// Component to update map view when the country changes
const MapViewUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const LocationDensityMap = () => {
  const [selectedCountry, setSelectedCountry] = useState("World");
  const [geoData, setGeoData] = useState(null);
  const [densityData, setDensityData] = useState({});
  const mapRef = useRef(null); // Store reference to the map
  const [filter, setFilter] = useState("Today");

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };
  // Fetch GeoJSON and Density Data
  useEffect(() => {
    setGeoData(null); // 🔹 Reset data before fetching new country

    fetch(countryGeojsonMap[selectedCountry])
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${selectedCountry}`);
        return res.json();
      })
      .then((data) => setGeoData(data))
      .catch((error) => console.error("GeoJSON Fetch Error:", error));

    fetch("http://localhost:5000/api/detection/get-location-density-data")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch density data");
        return res.json();
      })
      .then((data) => setDensityData(data))
      .catch((error) => console.error("Density Data Fetch Error:", error));
  }, [selectedCountry]); // 🔹 Trigger effect when country changes

  // Define color scale based on density value
  const getColorScale = {
    USA: (density) =>
      density > 0.08
        ? "#054682"
        : density > 0.07
        ? "#076bb8"
        : density > 0.06
        ? "#0484c9"
        : density > 0.05
        ? "#0990d9"
        : density > 0.04
        ? "#11a2f0"
        : density > 0.03
        ? "#38b9f5"
        : density > 0.02
        ? "#72dee8"
        : "#84f5c8",

    China: (density) =>
      density > 0.08
        ? "#b80211"
        : density > 0.07
        ? "#c92104"
        : density > 0.06
        ? "#fa2d0a"
        : density > 0.05
        ? "#fc5538"
        : density > 0.04
        ? "#f57b56"
        : density > 0.03
        ? "#f79172"
        : density > 0.02
        ? "#fcdccc"
        : "#fcdccc",
    Malaysia: (density) =>
      density > 0.08
        ? "#212f52"
        : density > 0.06
        ? "#5d259c"
        : density > 0.04
        ? "#6c2eb3"
        : density > 0.02
        ? "#8e39bd"
        : "#de50de",
    Russia: (density) =>
      density > 0.08
        ? "#911e07"
        : density > 0.07
        ? "#bd3c22"
        : density > 0.06
        ? "#f06d30"
        : density > 0.05
        ? "#f07d30"
        : density > 0.04
        ? "#f09030"
        : density > 0.03
        ? "#f5ac40"
        : density > 0.02
        ? "#f7d257"
        : "#fce597",
    World: (density) =>
      density > 0.08
        ? "#146903"
        : density > 0.07
        ? "#0a801c"
        : density > 0.06
        ? "#119925"
        : density > 0.05
        ? "#37ba29"
        : density > 0.04
        ? "#78d134"
        : density > 0.03
        ? "#9bdb12"
        : density > 0.02
        ? "#b3db12"
        : "#c7db12",
  };

  const getCountryColor = getColorScale[selectedCountry];

  // Style each state dynamically
  const geoStyle = (feature) => {
    const region = feature.properties.name; // Get region name
    const density = densityData[region] || 0; // Get density value
    return {
      fillColor: getCountryColor(density),
      weight: 1,
      color: "white",
      fillOpacity: 0.8,
    };
  };

  // Click event handler
  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => alert(`Clicked on ${feature.properties.name}`),
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: "white",
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle({ weight: 1, color: "white" });
      },
    });
  };

  return (
    <div className="card">
      <CardFilter filterChange={handleFilterChange} />

      <div className="card-body pb-0">
        <h5 className="card-title">
          Elephant Density Color Mapping <span>/{filter}</span>
        </h5>

        <div className="pt-2 pb-5 px-3 bg-gray-100">
          {/* Dropdown */}
          <div className="flex justify-center mb-4">
            <select
              className="px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 bg-white text-gray-700"
              onChange={(e) => setSelectedCountry(e.target.value)}
              value={selectedCountry}
            >
              <option value="USA">USA</option>
              <option value="China">China</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Russia">Russia</option>
              <option value="World">World</option>
            </select>
          </div>

          {/* Map */}
          <MapContainer
            center={countryView[selectedCountry].center}
            zoom={countryView[selectedCountry].zoom}
            style={{ height: "600px", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
            <MapViewUpdater
              center={countryView[selectedCountry].center}
              zoom={countryView[selectedCountry].zoom}
            />
            {geoData && <GeoJSON data={geoData} style={geoStyle} />}
            <Legend getColor={getCountryColor} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default LocationDensityMap;
