// src/pages/Classes.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [classTeacherId, setClassTeacherId] = useState("");

  // Listen to classes collection
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "classes"), (snapshot) => {
      const classList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classList);
    });
    return () => unsubscribe();
  }, []);

  // Listen to teachers collection, so we can populate the dropdown
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

  async function handleAddClass(e) {
    e.preventDefault();
    if (!name || !level) return;

    await addDoc(collection(db, "classes"), {
      name,
      level,
      classTeacherId: classTeacherId || null,
      createdAt: serverTimestamp(),
    });

    setName("");
    setLevel("");
    setClassTeacherId("");
  }

  // Helper: look up a teacher's name from their ID
  function getTeacherName(teacherId) {
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher ? teacher.fullName : "Unassigned";
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Classes</h1>

      <form onSubmit={handleAddClass} style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Class name (e.g. Form 1A)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Level (e.g. Form 1)"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <select
          value={classTeacherId}
          onChange={(e) => setClassTeacherId(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        >
          <option value="">-- Select class teacher --</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.fullName}
            </option>
          ))}
        </select>
        <button type="submit">Add Class</button>
      </form>

      <ul>
        {classes.map((cls) => (
          <li key={cls.id}>
            {cls.name} ({cls.level}) — Class Teacher: {getTeacherName(cls.classTeacherId)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Classes;