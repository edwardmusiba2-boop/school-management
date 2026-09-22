// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/students", label: "Students" },
  { to: "/teachers", label: "Teachers" },
  { to: "/classes", label: "Classes" },
  { to: "/grades", label: "Grades" },
  { to: "/attendance", label: "Attendance" },
  { to: "/reports", label: "Reports" },
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand-wrap">
          <div className="brand-mark">S</div>
          <div>
            <div className="brand-name">SchoolFlow</div>
            <small>Campus control</small>
          </div>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;