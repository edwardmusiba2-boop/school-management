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

  // Listen to the students collection in real time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "students"), (snapshot) => {
      const studentList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
    });

    // Clean up the listener when the component unmounts
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
    <div style={{ padding: "1rem" }}>
      <h1>Students</h1>

      <form onSubmit={handleAddStudent} style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Admission number"
          value={admissionNumber}
          onChange={(e) => setAdmissionNumber(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Add Student</button>
      </form>

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.fullName} — {student.admissionNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Students;