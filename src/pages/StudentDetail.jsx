import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    admissionNumber: "",
    className: "",
    regNo: "",
    email: "",
    guardianName: "",
    guardianPhone: "",
    subjects: "",
  });

  useEffect(() => {
    if (!id) return;

    const unsubscribe = onSnapshot(doc(db, "students", id), (snapshot) => {
      if (!snapshot.exists()) {
        setStudent(null);
        return;
      }

      const data = snapshot.data();
      setStudent({ id: snapshot.id, ...data });
      setForm({
        fullName: data.fullName || "",
        admissionNumber: data.admissionNumber || "",
        className: data.className || "",
        regNo: data.regNo || "",
        email: data.email || "",
        guardianName: data.guardianName || "",
        guardianPhone: data.guardianPhone || "",
        subjects: Array.isArray(data.subjects) ? data.subjects.join(", ") : "",
      });
    });

    return () => unsubscribe();
  }, [id]);

  const subjectList = useMemo(() => {
    if (!student) return [];
    if (Array.isArray(student.subjects) && student.subjects.length) return student.subjects;
    return ["Mathematics", "English", "Science", "History"];
  }, [student]);

  async function handleSave(event) {
    event.preventDefault();
    if (!id) return;

    const normalizedSubjects = form.subjects
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    await updateDoc(doc(db, "students", id), {
      fullName: form.fullName,
      admissionNumber: form.admissionNumber,
      className: form.className,
      regNo: form.regNo,
      email: form.email,
      guardianName: form.guardianName,
      guardianPhone: form.guardianPhone,
      subjects: normalizedSubjects,
    });

    navigate("/students");
  }

  async function handleDelete() {
    if (!id) return;
    await deleteDoc(doc(db, "students", id));
    navigate("/students");
  }

  if (!student) {
    return (
      <div className="page">
        <div className="student-detail-empty">
          <h1>Student not found</h1>
          <button type="button" onClick={() => navigate("/students")}>Back to students</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page student-detail-page">
      <header className="page-header detail-header">
        <div>
          <p className="section-tag">Student profile</p>
          <h1>{student.fullName}</h1>
        </div>
        <div className="detail-actions">
          <button type="button" className="secondary-btn" onClick={() => navigate("/students")}>Back</button>
          <button type="button" className="primary-btn danger-btn" onClick={handleDelete}>Delete</button>
        </div>
      </header>

      <form className="student-detail-form" onSubmit={handleSave}>
        <div className="detail-grid">
          <label>
            <span>Full name</span>
            <input
              type="text"
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
            />
          </label>

          <label>
            <span>Admission number</span>
            <input
              type="text"
              value={form.admissionNumber}
              onChange={(event) => setForm({ ...form, admissionNumber: event.target.value })}
            />
          </label>

          <label>
            <span>Class</span>
            <input
              type="text"
              value={form.className}
              onChange={(event) => setForm({ ...form, className: event.target.value })}
            />
          </label>

          <label>
            <span>Registration number</span>
            <input
              type="text"
              value={form.regNo}
              onChange={(event) => setForm({ ...form, regNo: event.target.value })}
            />
          </label>

          <label>
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>

          <label>
            <span>Guardian name</span>
            <input
              type="text"
              value={form.guardianName}
              onChange={(event) => setForm({ ...form, guardianName: event.target.value })}
            />
          </label>

          <label>
            <span>Guardian phone</span>
            <input
              type="text"
              value={form.guardianPhone}
              onChange={(event) => setForm({ ...form, guardianPhone: event.target.value })}
            />
          </label>

          <label>
            <span>Subjects</span>
            <input
              type="text"
              value={form.subjects}
              onChange={(event) => setForm({ ...form, subjects: event.target.value })}
            />
          </label>
        </div>

        <div className="student-summary-box">
          <div className="summary-card">
            <span>Attendance</span>
            <strong>{student.attendanceRate || 92}%</strong>
          </div>
          <div className="summary-card">
            <span>Average score</span>
            <strong>{student.averageScore || 88}%</strong>
          </div>
          <div className="summary-card">
            <span>Class</span>
            <strong>{student.className || "Not set"}</strong>
          </div>
        </div>

        <div className="subject-box">
          <h3>Subjects</h3>
          <div className="subject-pills">
            {subjectList.map((subject) => (
              <span key={subject} className="subject-pill">{subject}</span>
            ))}
          </div>
        </div>

        <div className="student-form-actions">
          <button type="button" className="secondary-btn" onClick={() => navigate("/students")}>Cancel</button>
          <button type="submit" className="primary-btn">Save changes</button>
        </div>
      </form>
    </div>
  );
}

export default StudentDetail;
