// src/pages/Teachers.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

function Teachers() {
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
    <div style={{ padding: "1rem" }}>
      <h1>Teachers</h1>

      <form onSubmit={handleAddTeacher} style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Add Teacher</button>
      </form>

      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.fullName} — {teacher.email} — {teacher.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teachers;