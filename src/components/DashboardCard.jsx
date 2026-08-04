function DashboardCard({ icon, title, value, color }) {
  return (
    <div
      className="dashboard-card"
      style={{
        borderTop: `5px solid ${color}`,
      }}
    >
      <div className="dashboard-icon">
        {icon}
      </div>

      <div className="dashboard-title">
        {title}
      </div>

      <div className="dashboard-value">
        {value}
      </div>
    </div>
  );
}

export default DashboardCard;