import { useState } from "react";
import { registerUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(name, email, password);

      setStatus("Registered successfully!");
      setTimeout(() => navigate("/login"), 800);

    } catch (err) {
      setStatus(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={wrapper}>

      <div style={card}>

        <h1 style={title}>Create Account</h1>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>

          <input
            style={input}
            placeholder="Full name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            style={input}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            style={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button type="submit" style={button}>
            Create Account
          </button>
        </form>

        <p style={msg}>{status}</p>

        <p style={switchText}>
          Already have an account?{" "}
          <Link to="/login" style={switchLink}>
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;


/* ------------ STYLES ---------------- */

const wrapper = {
  minHeight: "90vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  color: "black"
};

const card = {
  width: "100%",
  maxWidth: "420px",
  background: "rgba(255,255,255,0.08)",
  padding: "40px",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "12px",
  color: "black"
};

const title = {
  textAlign: "center",
  marginBottom: "32px",
  fontSize: "30px",
  fontWeight: 600
};

const input = {
  width: "100%",
  padding: "14px",
  fontSize: "17px",
  color: "black",
  background: "rgba(255,255,255,0.1)",
  borderRadius: "8px",
  border: "1px solid black",
  outline: "none",
  marginBottom: "14px"
};

const button = {
  width: "100%",
  padding: "14px",
  fontSize: "18px",
  background: "#1cbfff",
  color: "white",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  marginTop: "6px"
};

const msg = {
  marginTop: "10px",
  fontSize: "14px",
  color: "#78ffb0",
  textAlign: "center"
};

const switchText = {
  marginTop: "26px",
  textAlign: "center",
  fontSize: "16px",
  color: "black"
};

const switchLink = {
  color: "#4abaff",
  textDecoration: "underline",
  cursor: "pointer"
};
