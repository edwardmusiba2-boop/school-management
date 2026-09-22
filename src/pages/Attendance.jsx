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

    setDate("");
    setStatus("present");
  }

  function getStudentName(id) {
    const student = students.find((s) => s.id === id);
    return student ? student.fullName : "Unknown";
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Attendance</h1>

      <form onSubmit={handleAddRecord} style={{ marginBottom: "1.5rem" }}>
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        >
          <option value="">-- Select student --</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.fullName}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
        <button type="submit">Record Attendance</button>
      </form>

      <ul>
        {records.map((r) => (
          <li key={r.id}>
            {getStudentName(r.studentId)} — {r.date}: {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Attendance;