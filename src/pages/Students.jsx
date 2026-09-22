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
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [className, setClassName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [subjects, setSubjects] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "students"), (snapshot) => {
      const studentList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
      if (!selectedStudentId && studentList.length > 0) {
        setSelectedStudentId(studentList[0].id);
      }
    });

    return () => unsubscribe();
  }, [selectedStudentId]);

  const selectedStudent = students.find((student) => student.id === selectedStudentId) || students[0];

  async function handleAddStudent(e) {
    e.preventDefault();
    if (!fullName || !admissionNumber) return;

    const normalizedSubjects = subjects
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    await addDoc(collection(db, "students"), {
      fullName,
      admissionNumber,
      className,
      regNo,
      email,
      guardianName,
      guardianPhone,
      subjects: normalizedSubjects,
      attendanceRate: 92,
      averageScore: 88,
      createdAt: serverTimestamp(),
    });

    setFullName("");
    setAdmissionNumber("");
    setClassName("");
    setRegNo("");
    setEmail("");
    setGuardianName("");
    setGuardianPhone("");
    setSubjects("");
  }

  function getSubjectList(student) {
    if (Array.isArray(student.subjects) && student.subjects.length) return student.subjects;
    return ["Mathematics", "English", "Science"];
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
        <input
          type="text"
          placeholder="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Reg. number"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
        />
        <input
          type="email"
          placeholder="Student email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Guardian name"
          value={guardianName}
          onChange={(e) => setGuardianName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Guardian phone"
          value={guardianPhone}
          onChange={(e) => setGuardianPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subjects (comma separated)"
          value={subjects}
          onChange={(e) => setSubjects(e.target.value)}
        />
        <button type="submit">Add Student</button>
      </form>

      <div className="student-layout">
        <div className="record-panel">
          <ul className="record-list">
            {students.map((student) => (
              <li
                key={student.id}
                className={selectedStudent?.id === student.id ? "record-item active" : "record-item"}
                onClick={() => setSelectedStudentId(student.id)}
              >
                <div>
                  <strong>{student.fullName}</strong>
                  <span>{student.className || "Class not set"}</span>
                </div>
                <span className="status-tag active">{student.admissionNumber || "No ID"}</span>
              </li>
            ))}
          </ul>
        </div>

        {selectedStudent && (
          <aside className="student-profile">
            <div className="student-profile-header">
              <div className="student-avatar">{selectedStudent.fullName?.charAt(0) || "S"}</div>
              <div>
                <h2>{selectedStudent.fullName}</h2>
                <p>{selectedStudent.className || "Class not assigned"}</p>
              </div>
            </div>

            <div className="student-stats">
              <div>
                <span>Reg No</span>
                <strong>{selectedStudent.regNo || selectedStudent.admissionNumber || "N/A"}</strong>
              </div>
              <div>
                <span>Attendance</span>
                <strong>{selectedStudent.attendanceRate || 92}%</strong>
              </div>
              <div>
                <span>Average</span>
                <strong>{selectedStudent.averageScore || 88}%</strong>
              </div>
            </div>

            <div className="student-details-grid">
              <div className="detail-card">
                <span>Student email</span>
                <strong>{selectedStudent.email || "student@example.com"}</strong>
              </div>
              <div className="detail-card">
                <span>Guardian</span>
                <strong>{selectedStudent.guardianName || "Parent/Guardian"}</strong>
              </div>
              <div className="detail-card">
                <span>Contact</span>
                <strong>{selectedStudent.guardianPhone || "+254 700 000000"}</strong>
              </div>
              <div className="detail-card">
                <span>Admission</span>
                <strong>{selectedStudent.admissionNumber || "N/A"}</strong>
              </div>
            </div>

            <div className="student-subjects">
              <h3>Subjects</h3>
              <div className="subject-pills">
                {getSubjectList(selectedStudent).map((subject) => (
                  <span key={subject} className="subject-pill">{subject}</span>
                ))}
              </div>
            </div>

            <div className="student-summary">
              <h3>Academic summary</h3>
              <ul>
                <li>Performance trend is stable this term.</li>
                <li>Participation in class discussions is above average.</li>
                <li>Needs additional support in practical science labs.</li>
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default Students;