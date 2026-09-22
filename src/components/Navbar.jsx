// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Dashboard</Link>
      <Link to="/students">Students</Link>
      <Link to="/teachers">Teachers</Link>
      <Link to="/classes">Classes</Link>
      <Link to="/grades">Grades</Link>
      <Link to="/attendance">Attendance</Link>
    </nav>
  );
}

export default Navbar;