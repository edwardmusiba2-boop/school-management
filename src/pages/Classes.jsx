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

  function getTeacherName(teacherId) {
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher ? teacher.fullName : "Unassigned";
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="section-tag">Academic</p>
          <h1>Classes</h1>
        </div>
        <span className="page-badge">Timetable</span>
      </header>

      <form className="entry-form" onSubmit={handleAddClass}>
        <input
          type="text"
          placeholder="Class name (e.g. Form 1A)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Level (e.g. Form 1)"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <select value={classTeacherId} onChange={(e) => setClassTeacherId(e.target.value)}>
          <option value="">-- Select class teacher --</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.fullName}
            </option>
          ))}
        </select>
        <button type="submit">Add Class</button>
      </form>

      <div className="record-panel">
        <ul className="record-list">
          {classes.map((cls) => (
            <li key={cls.id} className="record-item">
              <div>
                <strong>{cls.name}</strong>
                <span>{cls.level}</span>
              </div>
              <span className="status-tag neutral">{getTeacherName(cls.classTeacherId)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Classes;