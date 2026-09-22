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
    <div style={{ padding: "1rem" }}>
      <h1>Grades</h1>

      <form onSubmit={handleAddGrade} style={{ marginBottom: "1.5rem" }}>
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
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          style={{ marginRight: "0.5rem", width: "80px" }}
        />
        <input
          type="text"
          placeholder="Term (e.g. Term 1 2026)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Exam type (e.g. Midterm)"
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Add Grade</button>
      </form>

      <ul>
        {grades.map((g) => (
          <li key={g.id}>
            {getStudentName(g.studentId)} — {g.subject}: {g.score} ({g.examType}, {g.term})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Grades;