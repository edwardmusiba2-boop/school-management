// src/pages/Grades.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

function Grades() {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState("");
  const [term, setTerm] = useState("");
  const [examType, setExamType] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "grades"), (snapshot) => {
      setGrades(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "students"), (snapshot) => {
      setStudents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  async function handleAddGrade(e) {
    e.preventDefault();
    if (!studentId || !subject || !score) return;

    await addDoc(collection(db, "grades"), {
      studentId,
      subject,
      score: Number(score),
      term,
      examType,
      recordedAt: serverTimestamp(),
    });

    setStudentId("");
    setSubject("");
    setScore("");
    setTerm("");
    setExamType("");
  }

  function getStudentName(id) {
    const student = students.find((s) => s.id === id);
    return student ? student.fullName : "Unknown";
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="section-tag">Results</p>
          <h1>Grades</h1>
        </div>
        <span className="page-badge">Performance log</span>
      </header>

      <form className="entry-form" onSubmit={handleAddGrade}>
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
          <option value="">-- Select student --</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.fullName}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          style={{ maxWidth: "90px" }}
        />
        <input
          type="text"
          placeholder="Term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Exam type"
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
        />
        <button type="submit">Add Grade</button>
      </form>

      <div className="record-panel">
        <ul className="record-list">
          {grades.map((g) => (
            <li key={g.id} className="record-item">
              <div>
                <strong>{getStudentName(g.studentId)}</strong>
                <span>{g.subject}: {g.score} ({g.examType}, {g.term})</span>
              </div>
              <span className="status-tag active">{g.score >= 70 ? "Strong" : "Needs support"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Grades;