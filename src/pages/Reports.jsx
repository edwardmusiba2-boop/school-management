const attendanceSummary = [
  { label: "Present", value: 86, color: "green" },
  { label: "Late", value: 9, color: "amber" },
  { label: "Absent", value: 5, color: "red" },
];

const performanceSummary = [
  { subject: "Mathematics", score: 92 },
  { subject: "Science", score: 88 },
  { subject: "English", score: 95 },
  { subject: "History", score: 81 },
  { subject: "Art", score: 90 },
];

const topStudents = [
  { name: "Amina K", grade: "A" },
  { name: "Daniel N", grade: "A" },
  { name: "Faith M", grade: "B+" },
  { name: "Sam O", grade: "B" },
];

function Reports() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="section-tag">Insights</p>
          <h1>Reports & analytics</h1>
        </div>
        <span className="page-badge">Updated today</span>
      </header>

      <section className="report-grid">
        <div className="panel report-panel">
          <div className="panel-header">
            <h2>Attendance overview</h2>
            <span className="pill success">86% present</span>
          </div>

          <div className="attendance-chart">
            {attendanceSummary.map((item) => (
              <div key={item.label} className="attendance-row">
                <div className="attendance-meta">
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                </div>
                <div className="attendance-track">
                  <span className={`attendance-fill ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel report-panel">
          <div className="panel-header">
            <h2>Academic snapshot</h2>
            <span className="pill info">Term 1</span>
          </div>

          <div className="score-list">
            {performanceSummary.map((item) => (
              <div key={item.subject} className="score-item">
                <div className="score-labels">
                  <span>{item.subject}</span>
                  <strong>{item.score}%</strong>
                </div>
                <div className="score-track">
                  <span style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-grid lower-grid">
        <div className="panel">
          <div className="panel-header">
            <h2>Top students</h2>
            <span className="pill accent">Leaderboard</span>
          </div>

          <ul className="leaderboard">
            {topStudents.map((student, index) => (
              <li key={student.name}>
                <span className="leader-rank">#{index + 1}</span>
                <div>
                  <strong>{student.name}</strong>
                  <small>Outstanding performance</small>
                </div>
                <span className="grade-badge">{student.grade}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Quick actions</h2>
            <span className="pill neutral">Admin</span>
          </div>

          <div className="quick-actions">
            <button type="button">Export report</button>
            <button type="button">Schedule meeting</button>
            <button type="button">Send notice</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Reports;
