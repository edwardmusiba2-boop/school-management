import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

function TeacherDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    title: "",
    classes: "",
    status: "Active",
  });

  useEffect(() => {
    if (!id) return;

    const unsubscribe = onSnapshot(doc(db, "teachers", id), (snapshot) => {
      if (!snapshot.exists()) {
        setTeacher(null);
        return;
      }

      const data = snapshot.data();
      setTeacher({ id: snapshot.id, ...data });
      setForm({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        department: data.department || "Mathematics",
        title: data.title || "Class Teacher",
        classes: Array.isArray(data.classes) ? data.classes.join(", ") : data.classes || "Form 4A, Grade 7B",
        status: data.status || "Active",
      });
    });

    return () => unsubscribe();
  }, [id]);

  const classList = useMemo(() => {
    if (!teacher) return [];
    if (Array.isArray(teacher.classes) && teacher.classes.length) return teacher.classes;
    return ["Form 4A", "Grade 7B", "Science Lab"];
  }, [teacher]);

  async function handleSave(event) {
    event.preventDefault();
    if (!id) return;

    const normalizedClasses = form.classes
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    await updateDoc(doc(db, "teachers", id), {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      department: form.department,
      title: form.title,
      classes: normalizedClasses,
      status: form.status,
    });

    navigate("/teachers");
  }

  async function handleDelete() {
    if (!id) return;
    await deleteDoc(doc(db, "teachers", id));
    navigate("/teachers");
  }

  if (!teacher) {
    return (
      <div className="page">
        <div className="teacher-empty">
          <div>
            <h1>Teacher not found</h1>
            <button type="button" onClick={() => navigate("/teachers")}>Back to teachers</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page teacher-detail-page">
      <header className="page-header">
        <div>
          <p className="section-tag">Teacher profile</p>
          <h1>{teacher.fullName}</h1>
        </div>
        <div className="detail-actions">
          <button type="button" className="secondary-btn" onClick={() => navigate("/teachers")}>Back</button>
          <button type="button" className="primary-btn danger-btn" onClick={handleDelete}>Delete</button>
        </div>
      </header>

      <form className="teacher-detail-form" onSubmit={handleSave}>
        <div className="teacher-detail-grid">
          <label>
            <span>Full name</span>
            <input
              type="text"
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
            />
          </label>

          <label>
            <span>Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
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
            <span>Phone</span>
            <input
              type="text"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
            />
          </label>

          <label>
            <span>Department</span>
            <input
              type="text"
              value={form.department}
              onChange={(event) => setForm({ ...form, department: event.target.value })}
            />
          </label>

          <label>
            <span>Status</span>
            <input
              type="text"
              value={form.status}
              onChange={(event) => setForm({ ...form, status: event.target.value })}
            />
          </label>

          <label style={{ gridColumn: "1 / -1" }}>
            <span>Classes assigned</span>
            <input
              type="text"
              value={form.classes}
              onChange={(event) => setForm({ ...form, classes: event.target.value })}
            />
          </label>
        </div>

        <div className="teacher-summary-box">
          <div className="summary-card">
            <span>Classes</span>
            <strong>{classList.length}</strong>
          </div>
          <div className="summary-card">
            <span>Attendance</span>
            <strong>{teacher.attendanceRate || 96}%</strong>
          </div>
          <div className="summary-card">
            <span>Department</span>
            <strong>{teacher.department || "General"}</strong>
          </div>
        </div>

        <div className="subject-box">
          <h3>Assigned classes</h3>
          <div className="teacher-classes">
            {classList.map((item) => (
              <span key={item} className="teacher-badge">{item}</span>
            ))}
          </div>
        </div>

        <div className="student-form-actions">
          <button type="button" className="secondary-btn" onClick={() => navigate("/teachers")}>Cancel</button>
          <button type="submit" className="primary-btn">Save changes</button>
        </div>
      </form>
    </div>
  );
}

export default TeacherDetail;
