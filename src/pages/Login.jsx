import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Smart school operations",
    subtitle: "Track learning, staff, and daily campus activity in one place.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Growing brighter futures",
    subtitle: "Keep every classroom, teacher, and student connected to success.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Efficient campus management",
    subtitle: "From reports to attendance, a smoother school day begins here.",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
  },
];

function Login() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  function handleLogin(event) {
    event.preventDefault();

    const normalizedIdentifier = identifier.trim().toLowerCase();

    if (normalizedIdentifier.includes("student")) {
      navigate("/student-portal");
      return;
    }

    if (normalizedIdentifier.includes("teacher")) {
      navigate("/teacher-portal");
      return;
    }

    navigate("/dashboard");
  }

  const currentSlide = slides[activeSlide];

  return (
    <div className="login-page">
      <div className="login-visual">
        <div
          className="login-slide"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.5), rgba(79, 70, 229, 0.35)), url(${currentSlide.image})`,
          }}
        >
          <div className="slide-overlay">
            <span className="school-chip">SchoolFlow</span>
            <h1>{currentSlide.title}</h1>
            <p>{currentSlide.subtitle}</p>
            <div className="slide-dots" aria-label="Image slider">
              {slides.map((slide, index) => (
                <span
                  key={slide.title}
                  className={index === activeSlide ? "dot active" : "dot"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="login-panel">
        <div className="login-box">
          <p className="section-tag">Welcome back</p>
          <h2>Sign in to your school portal</h2>

          <form onSubmit={handleLogin} className="login-form">
            <label>
              <span>Email or username</span>
              <input
                type="text"
                placeholder="Enter your email or username"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button type="button" className="link-btn">Forgot password?</button>
            </div>

            <button type="submit" className="login-btn">Sign in</button>
          </form>

          <div className="demo-box">
            <span>Demo credentials</span>
            <p>student@schoolflow.com → Student portal</p>
            <p>teacher@schoolflow.com → Teacher portal</p>
            <p>admin@schoolflow.com → Admin dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
