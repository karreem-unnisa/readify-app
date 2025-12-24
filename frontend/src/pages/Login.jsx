import { useState, useContext } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const navigate = useNavigate();
  const { setIsLogged } = useContext(AuthContext);

  const submit = async (e)=>{
    e.preventDefault();

    try {
      const res = await axiosClient.post("/auth/login",{email,password});

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("userId",res.data.user.id);

      setIsLogged(true);
      navigate("/articles");

    } catch(err){
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return(
    <div style={wrapper}>

      <h2 style={heading}>Login</h2>

      <form onSubmit={submit} style={{ width:"100%" }}>

        <input
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          style={input}
        />

        <div style={{ position:"relative" }}>

          <input
            type={showPw ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            style={input}
          />

          <span
            onClick={() => setShowPw(!showPw)}
            style={toggleText}
          >
            {showPw ? "Hide" : "Show"}
          </span>

        </div>

        <button type="submit" style={btn}>
          Login
        </button>

      </form>

      <p style={bottomText}>Don't have an account? {" "}
        <Link to="/register" style={{ color: "#4abaff", textDecoration: "none", cursor: "pointer" }}>Create Account</Link>
      </p>

    </div>
  );
}

export default Login;



const wrapper = {
  width: "430px",
  margin:"60px auto",
  padding:"40px",
  borderRadius:"10px",
  background:"white",
  boxShadow:"0 0 20px rgba(0,0,0,0.06)"
};

const heading = {
  textAlign:"center",
  marginBottom:"30px",
  fontSize:"30px"
};

const input = {
  width:"100%",
  padding:"12px",
  border:"1px solid #999",
  marginBottom:"12px",
  borderRadius:"6px",
  fontSize:"16px"
};

const toggleText = {
  position:"absolute",
  top:"50%",
  right:"12px",
  transform:"translateY(-50%)",
  cursor:"pointer",
  fontSize:"14px",
  color:"#555",
  userSelect:"none"
};

const btn = {
  width:"100%",
  padding:"14px",
  background:"black",
  borderRadius:"6px",
  color:"white",
  fontSize:"18px",
  border:"none",
  cursor:"pointer"
};

const bottomText = {
  textAlign:"center",
  marginTop:"15px"
};
