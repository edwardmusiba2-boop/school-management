// src/pages/Teachers.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

function Teachers() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "teachers"), (snapshot) => {
      const teacherList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeachers(teacherList);
    });

    return () => unsubscribe();
  }, []);

  async function handleAddTeacher(e) {
    e.preventDefault();
    if (!fullName || !email) return;

    await addDoc(collection(db, "teachers"), {
      fullName,
      email,
      phone,
      createdAt: serverTimestamp(),
    });

    setFullName("");
    setEmail("");
    setPhone("");
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="section-tag">Staff</p>
          <h1>Teachers</h1>
        </div>
        <span className="page-badge">Faculty board</span>
      </header>

      <form className="entry-form" onSubmit={handleAddTeacher}>
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Add Teacher</button>
      </form>

      <div className="record-panel">
        <ul className="record-list">
          {teachers.map((teacher) => (
            <li
              key={teacher.id}
              className="record-item"
              onClick={() => navigate(`/teachers/${teacher.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div>
                <strong>{teacher.fullName}</strong>
                <span>{teacher.email}</span>
              </div>
              <span className="status-tag active">{teacher.phone || "No phone"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Teachers;