import { useEffect, useState } from "react";
function DashboardCard({ icon, title, value, color,onClick }) {
    const [displayValue, setDisplayValue] = useState(0);
useEffect(() => {
  if (typeof value !== "number") {
    setDisplayValue(value);
    return;
  }

  let current = 0;

  const step = Math.max(1, Math.ceil(value / 30));

  const timer = setInterval(() => {
    current += step;

    if (current >= value) {
      current = value;
      clearInterval(timer);
    }

    setDisplayValue(current);
  }, 20);

  return () => clearInterval(timer);
}, [value]);
  return (
    <div
      className="dashboard-card"
      style={{
        borderTop: `5px solid ${color}`,
      }}
      onClick={onClick}
    >
      <div className="dashboard-icon">
        {icon}
      </div>

      <div className="dashboard-title">
        {title}
      </div>

      <div className="dashboard-value">
        {displayValue}
      </div>
    </div>
  );
}

export default DashboardCard;