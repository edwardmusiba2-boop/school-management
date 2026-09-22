// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

function Dashboard() {
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    grades: 0,
    attendance: 0,
  });

  useEffect(() => {
    const collections = ["students", "teachers", "classes", "grades", "attendance"];
    const unsubscribes = collections.map((name) =>
      onSnapshot(collection(db, name), (snapshot) => {
        setCounts((prev) => ({ ...prev, [name]: snapshot.size }));
      })
    );

    // Unsubscribe from all listeners on unmount
    return () => unsubscribes.forEach((unsub) => unsub());
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Dashboard</h1>
      <ul>
        <li>Students: {counts.students}</li>
        <li>Teachers: {counts.teachers}</li>
        <li>Classes: {counts.classes}</li>
        <li>Grades recorded: {counts.grades}</li>
        <li>Attendance records: {counts.attendance}</li>
      </ul>
    </div>
  );
}

export default Dashboard;