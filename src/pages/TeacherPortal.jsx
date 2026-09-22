function TeacherPortal() {
  const teacher = {
    name: "Samuel Otieno",
    title: "Mathematics Teacher",
    department: "Sciences",
    email: "samuel@schoolflow.com",
    classes: ["Form 4A", "Form 3B", "Grade 8C"],
    students: 86,
    attendance: 97,
    lessons: 14,
    report: {
      form4a: 91,
      form3b: 88,
      grade8c: 84,
    },
  };

  return (
    <div className="page portal-page">
      <header className="page-header portal-header">
        <div>
          <p className="section-tag">Teacher portal</p>
          <h1>Welcome, {teacher.name}</h1>
        </div>
        <span className="page-badge">My classes</span>
      </header>

      <section className="student-layout portal-layout">
        <div className="student-profile portal-card">
          <div className="student-profile-header">
            <div className="student-avatar">S</div>
            <div>
              <h2>{teacher.name}</h2>
              <p>{teacher.title}</p>
            </div>
          </div>

          <div className="student-stats">
            <div>
              <span>Students</span>
              <strong>{teacher.students}</strong>
            </div>
            <div>
              <span>Attendance</span>
              <strong>{teacher.attendance}%</strong>
            </div>
            <div>
              <span>Lessons</span>
              <strong>{teacher.lessons}</strong>
            </div>
          </div>

          <div className="student-details-grid">
            <div className="detail-card">
              <span>Email</span>
              <strong>{teacher.email}</strong>
            </div>
            <div className="detail-card">
              <span>Department</span>
              <strong>{teacher.department}</strong>
            </div>
            <div className="detail-card">
              <span>Classes</span>
              <strong>{teacher.classes.length}</strong>
            </div>
            <div className="detail-card">
              <span>Status</span>
              <strong>Active</strong>
            </div>
          </div>

          <div className="student-subjects">
            <h3>Assigned classes</h3>
            <div className="teacher-classes">
              {teacher.classes.map((item) => (
                <span key={item} className="teacher-badge">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="panel portal-card">
          <div className="panel-header">
            <h2>My class report</h2>
            <span className="pill success">Strong</span>
          </div>

          <div className="score-list">
            <div className="score-item">
              <div className="score-labels"><span>Form 4A</span><strong>{teacher.report.form4a}%</strong></div>
              <div className="score-track"><span style={{ width: `${teacher.report.form4a}%` }} /></div>
            </div>
            <div className="score-item">
              <div className="score-labels"><span>Form 3B</span><strong>{teacher.report.form3b}%</strong></div>
              <div className="score-track"><span style={{ width: `${teacher.report.form3b}%` }} /></div>
            </div>
            <div className="score-item">
              <div className="score-labels"><span>Grade 8C</span><strong>{teacher.report.grade8c}%</strong></div>
              <div className="score-track"><span style={{ width: `${teacher.report.grade8c}%` }} /></div>
            </div>
          </div>

          <div className="portal-note">
            <strong>Teacher note:</strong>
            <p>Your classes are performing well this week. Focus on reinforcing revision for Grade 8C before the upcoming assessment.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TeacherPortal;
