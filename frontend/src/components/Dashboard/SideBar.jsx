import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./sideBar.css";

const SideBar = () => {
  const [expandedMenus, setExpandedMenus] = useState(() => {
    // Load saved expanded menus from localStorage
    const savedState = localStorage.getItem("expandedMenus");
    return savedState ? JSON.parse(savedState) : {};
  });

  useEffect(() => {
    // Save expandedMenus to localStorage whenever it changes
    localStorage.setItem("expandedMenus", JSON.stringify(expandedMenus));
  }, [expandedMenus]);

  const toggleMenu = (menuId) => {
    setExpandedMenus((prevState) => {
      // If the clicked menu is already open, close it; otherwise, open it and close others
      return prevState[menuId]
        ? {} // If it's already open, close everything
        : { [menuId]: true }; // Open only the clicked menu
    });
  };

  const location = useLocation();

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a
            className={`nav-link ${
              location.pathname === "/" ? "active" : "collapsed"
            }`}
            href="/"
            onClick={() => toggleMenu("dashboard")}
          >
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>

        <li className="nav-item">
          <a
            className={`nav-link ${
              expandedMenus["detections"] ? "" : "collapsed"
            }`}
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
            href="#"
            onClick={() => toggleMenu("detections")}
          >
            <i className="bi bi-clipboard-data"></i>
            <span>Detections</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="components-nav"
            className={`nav-content collapse ${
              expandedMenus["detections"] ? "show" : ""
            }`}
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a
                className={
                  location.pathname === "/visual_detections" ? "active" : ""
                }
                href="/visual_detections"
              >
                <i className="bi bi-circle"></i>
                <span>Visual Detections</span>
              </a>
            </li>

            <li>
              <a
                className={
                  location.pathname === "/audio_detections" ? "active" : ""
                }
                href="/audio_detections"
              >
                <i className="bi bi-circle"></i>
                <span>Audio Detections</span>
              </a>
            </li>

            <li>
              <a
                className={location.pathname === "/live_stream" ? "active" : ""}
                href="/live_stream"
              >
                <i className="bi bi-circle"></i>
                <span>Live Streaming</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className={`nav-link ${
              expandedMenus["systemStatus"] ? "" : "collapsed"
            }`}
            data-bs-target="#forms-nav"
            data-bs-toggle="collapse"
            href="#"
            onClick={() => toggleMenu("systemStatus")}
          >
            <i className="bi bi-journal-text"></i>
            <span>System Status</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="forms-nav"
            className={`nav-content collapse ${
              expandedMenus["systemStatus"] ? "show" : ""
            }`}
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a
                className={
                  location.pathname === "/microcontroller_status" ? "active" : ""
                }
                href="/microcontroller_status"
              >
                <i className="bi bi-circle"></i>
                <span>Microcontroller Status</span>
              </a>
            </li>

            <li>
              <a
                className={
                  location.pathname === "/transmission_status" ? "active" : ""
                }
                href="/transmission_status"
              >
                <i className="bi bi-circle"></i>
                <span>Transmission Status</span>
              </a>
            </li>

            <li>
              <a
                className={
                  location.pathname === "/solar_battery_status" ? "active" : ""
                }
                href="/solar_battery_status"
              >
                <i className="bi bi-circle"></i>
                <span>Solar Battery Status</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-heading">Advanced Options</li>

        <li className="nav-item">
          <a
            className={`nav-link ${
              expandedMenus["analysis"] ? "" : "collapsed"
            }`}
            data-bs-target="#charts-nav"
            data-bs-toggle="collapse"
            href="#"
            onClick={() => toggleMenu("analysis")}
          >
            <i className="bi bi-graph-up"></i>
            <span>Analysis</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="charts-nav"
            className={`nav-content collapse ${
              expandedMenus["analysis"] ? "show" : ""
            }`}
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a
                className={
                  location.pathname === "/wildlife_locations" ? "active" : ""
                }
                href="/wildlife_locations"
              >
                <i className="bi bi-circle"></i>
                <span>Wildlife Locations</span>
              </a>
            </li>

            <li>
              <a
                className={
                  location.pathname === "/solar_simulation" ? "active" : ""
                }
                href="/solar_simulation"
              >
                <i className="bi bi-circle"></i>
                <span>Solar Energy Simulation</span>
              </a>
            </li>

            <li>
              <a
                className={
                  location.pathname === "/detection_report" ? "active" : ""
                }
                href="/detection_report"
              >
                <i className="bi bi-circle"></i>
                <span>Detection Report</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
