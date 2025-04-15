import React from "react";

const colors = ["text-primary", "text-danger", "text-warning", "text-success", "text-secondary"];
let colorIndex = 0; // Global counter to track color rotation

function RecentActivityItem({ item }) {

  // Assign the next color in sequence
  const color = colors[colorIndex];

  // Increment and reset the index if it exceeds the array length
  colorIndex = (colorIndex + 1) % colors.length;

  return (
    <div className="activity-item d-flex">
      <div className="activity-label">
      🧐 {new Date(item.timestamp).toISOString().split("T")[1].slice(0, 8)}
      </div>
      <i
        className={`bi bi-circle-fill activity-badge ${color} align-self-start`}
      ></i>

      <div className="activity-content">{item.object_detected} detected</div>
    </div>
  );
}

export default RecentActivityItem;
{
  /* {item.highlight === '' ? (
                <div className="activity-content">{item.content}</div>  
            ) : (
                <div className = "activity-content">
                    {item.content.substring(0, item.content.indexOf(item.highlight))}
                    <a href="#" className="fw-bold text-dark">
                        {item.highlight}
                    </a>
                    {item.content.slice(
                        item.content.indexOf(item.highlight) + item.highlight.length, -1
                    )}
                </div>
            )} */
}
