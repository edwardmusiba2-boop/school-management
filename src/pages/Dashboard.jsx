// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

function Dashboard() {
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    grades: 0,
    attendance: 0,
  });

  useEffect(() => {
    const collections = ["students", "teachers", "classes", "grades", "attendance"];
    const unsubscribes = collections.map((name) =>
      onSnapshot(collection(db, name), (snapshot) => {
        setCounts((prev) => ({ ...prev, [name]: snapshot.size }));
      })
    );

    return () => unsubscribes.forEach((unsub) => unsub());
  }, []);

  const metrics = [
    { label: "Students", value: counts.students, delta: "+12%", tone: "blue" },
    { label: "Teachers", value: counts.teachers, delta: "+3 this term", tone: "violet" },
    { label: "Classes", value: counts.classes, delta: "7 active", tone: "green" },
    { label: "Attendance", value: `${Math.min(98, 88 + (counts.attendance % 10))}%`, delta: "On track", tone: "amber" },
  ];

  const academicTrend = [
    { subject: "Math", value: 92 },
    { subject: "Science", value: 86 },
    { subject: "English", value: 94 },
    { subject: "History", value: 78 },
  ];

  const focusItems = [
    "Review student progress reports before Friday.",
    "Confirm class timetable adjustments for Form 3A.",
    "Follow up with absent learners and family contacts.",
  ];

  const upcomingEvents = [
    { title: "Parents Meeting", time: "Tue, 10:00 AM" },
    { title: "Science Fair", time: "Thu, 1:30 PM" },
    { title: "Inter-House Sports", time: "Sat, 8:00 AM" },
  ];

  return (
    <div className="page dashboard-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="section-tag">School management dashboard</span>
          <h1>Welcome back, Principal.</h1>
          <p>
            Keep student performance, teacher activity, and daily operations running
            smoothly from one bright and organized control center.
          </p>
          <div className="hero-actions">
            <Link to="/students" className="primary-btn">Add student</Link>
            <Link to="/attendance" className="secondary-btn">Mark attendance</Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="mini-card glass-card">
            <span className="mini-label">Today</span>
            <strong>94%</strong>
            <p>Average class participation</p>
          </div>
          <div className="mini-card floating-card">
            <span className="mini-label">Leads</span>
            <strong>{counts.grades}</strong>
            <p>grade entries logged</p>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className={`metric-card ${metric.tone}`}>
            <div className="metric-row">
              <span>{metric.label}</span>
              <span className="metric-delta">{metric.delta}</span>
            </div>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <h2>Academic performance</h2>
            <span className="pill success">+6.4%</span>
          </div>

          <div className="bar-chart">
            {academicTrend.map((item) => (
              <div key={item.subject} className="bar-row">
                <span>{item.subject}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${item.value}%` }} />
                </div>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Today’s focus</h2>
            <span className="pill neutral">3 tasks</span>
          </div>
          <ul className="check-list">
            {focusItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="dashboard-grid lower-grid">
        <div className="panel">
          <div className="panel-header">
            <h2>School highlights</h2>
            <span className="pill info">Live</span>
          </div>
          <div className="highlight-grid">
            <div>
              <span>Enrollment</span>
              <strong>{counts.students}</strong>
            </div>
            <div>
              <span>Faculty</span>
              <strong>{counts.teachers}</strong>
            </div>
            <div>
              <span>Classrooms</span>
              <strong>{counts.classes}</strong>
            </div>
            <div>
              <span>Events</span>
              <strong>12</strong>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Upcoming events</h2>
            <span className="pill accent">Calendar</span>
          </div>
          <ul className="event-list">
            {upcomingEvents.map((event) => (
              <li key={event.title}>
                <div>
                  <strong>{event.title}</strong>
                  <span>{event.time}</span>
                </div>
                <button type="button" className="tiny-btn">View</button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;