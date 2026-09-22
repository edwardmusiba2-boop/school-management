// src/pages/Students.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

function Students() {
  const [students, setStudents] = useState([]);
  const [fullName, setFullName] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "students"), (snapshot) => {
      const studentList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
    });

    return () => unsubscribe();
  }, []);

  async function handleAddStudent(e) {
    e.preventDefault();
    if (!fullName || !admissionNumber) return;

    await addDoc(collection(db, "students"), {
      fullName,
      admissionNumber,
      createdAt: serverTimestamp(),
    });

    setFullName("");
    setAdmissionNumber("");
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="section-tag">Records</p>
          <h1>Students</h1>
        </div>
        <span className="page-badge">Live roster</span>
      </header>

      <form className="entry-form" onSubmit={handleAddStudent}>
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Admission number"
          value={admissionNumber}
          onChange={(e) => setAdmissionNumber(e.target.value)}
        />
        <button type="submit">Add Student</button>
      </form>

      <div className="record-panel">
        <ul className="record-list">
          {students.map((student) => (
            <li key={student.id} className="record-item">
              <div>
                <strong>{student.fullName}</strong>
                <span>Admission: {student.admissionNumber}</span>
              </div>
              <span className="status-tag active">Active</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Students;