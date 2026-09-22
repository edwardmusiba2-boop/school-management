// src/pages/Attendance.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

function Attendance() {
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("present");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "attendance"), (snapshot) => {
      setRecords(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "students"), (snapshot) => {
      setStudents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  async function handleAddRecord(e) {
    e.preventDefault();
    if (!studentId || !date) return;

    await addDoc(collection(db, "attendance"), {
      studentId,
      date,
      status,
      recordedAt: serverTimestamp(),
    });

    setStudentId("");
    setDate("");
    setStatus("present");
  }

  function getStudentName(id) {
    const student = students.find((s) => s.id === id);
    return student ? student.fullName : "Unknown";
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="section-tag">Operations</p>
          <h1>Attendance</h1>
        </div>
        <span className="page-badge">Daily check-in</span>
      </header>

      <form className="entry-form" onSubmit={handleAddRecord}>
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
          <option value="">-- Select student --</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.fullName}</option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
        <button type="submit">Record Attendance</button>
      </form>

      <div className="record-panel">
        <ul className="record-list">
          {records.map((r) => (
            <li key={r.id} className="record-item">
              <div>
                <strong>{getStudentName(r.studentId)}</strong>
                <span>{r.date}</span>
              </div>
              <span className={`status-tag ${r.status === "absent" ? "warning" : "active"}`}>
                {r.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Attendance;