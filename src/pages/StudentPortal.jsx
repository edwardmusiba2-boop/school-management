function StudentPortal() {
  const student = {
    name: "Amina Kibet",
    regNo: "STD-2048",
    className: "Form 4A",
    email: "amina@student.schoolflow.com",
    guardian: "Mary Kibet",
    subjects: ["Mathematics", "Biology", "English", "History"],
    attendance: 94,
    averageScore: 89,
    report: {
      term: "Term 1",
      mathematics: 90,
      biology: 87,
      english: 92,
      history: 85,
    },
  };

  return (
    <div className="page portal-page">
      <header className="page-header portal-header">
        <div>
          <p className="section-tag">Student portal</p>
          <h1>Welcome back, {student.name}</h1>
        </div>
        <span className="page-badge">My profile</span>
      </header>

      <section className="student-layout portal-layout">
        <div className="student-profile portal-card">
          <div className="student-profile-header">
            <div className="student-avatar">A</div>
            <div>
              <h2>{student.name}</h2>
              <p>{student.className}</p>
            </div>
          </div>

          <div className="student-stats">
            <div>
              <span>Reg No</span>
              <strong>{student.regNo}</strong>
            </div>
            <div>
              <span>Attendance</span>
              <strong>{student.attendance}%</strong>
            </div>
            <div>
              <span>Average</span>
              <strong>{student.averageScore}%</strong>
            </div>
          </div>

          <div className="student-details-grid">
            <div className="detail-card">
              <span>Email</span>
              <strong>{student.email}</strong>
            </div>
            <div className="detail-card">
              <span>Guardian</span>
              <strong>{student.guardian}</strong>
            </div>
            <div className="detail-card">
              <span>Class</span>
              <strong>{student.className}</strong>
            </div>
            <div className="detail-card">
              <span>Term</span>
              <strong>{student.report.term}</strong>
            </div>
          </div>

          <div className="student-subjects">
            <h3>Subjects</h3>
            <div className="subject-pills">
              {student.subjects.map((subject) => (
                <span key={subject} className="subject-pill">{subject}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="panel portal-card">
          <div className="panel-header">
            <h2>My report</h2>
            <span className="pill success">On track</span>
          </div>

          <div className="score-list">
            <div className="score-item">
              <div className="score-labels"><span>Mathematics</span><strong>{student.report.mathematics}%</strong></div>
              <div className="score-track"><span style={{ width: `${student.report.mathematics}%` }} /></div>
            </div>
            <div className="score-item">
              <div className="score-labels"><span>Biology</span><strong>{student.report.biology}%</strong></div>
              <div className="score-track"><span style={{ width: `${student.report.biology}%` }} /></div>
            </div>
            <div className="score-item">
              <div className="score-labels"><span>English</span><strong>{student.report.english}%</strong></div>
              <div className="score-track"><span style={{ width: `${student.report.english}%` }} /></div>
            </div>
            <div className="score-item">
              <div className="score-labels"><span>History</span><strong>{student.report.history}%</strong></div>
              <div className="score-track"><span style={{ width: `${student.report.history}%` }} /></div>
            </div>
          </div>

          <div className="portal-note">
            <strong>Academic note:</strong>
            <p>Your performance is stable this term. You are performing above the class average in English and Mathematics.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StudentPortal;
