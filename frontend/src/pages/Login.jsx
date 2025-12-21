import { useState, useContext } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
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
    <div style={{
      width: "430px",
      margin:"60px auto",
      padding:"40px",
      borderRadius:"10px",
      background:"white",
      boxShadow:"0 0 20px rgba(0,0,0,0.06)"
    }}>

      <h2 style={{textAlign:"center",marginBottom:"30px",fontSize:"30px"}}>
        Login
      </h2>

      <form onSubmit={submit}>

        <input
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          style={inputStyle}
        />

        <button type="submit" style={btn}>
          Login
        </button>

      </form>

      <p style={{textAlign:"center", marginTop:"15px"}}>
        <Link to="/register">Create Account</Link>
      </p>

    </div>
  );
}

const inputStyle = {
  width:"100%",
  padding:"12px",
  border:"1px solid #999",
  marginBottom:"12px",
  borderRadius:"6px",
  fontSize:"16px"
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

export default Login;
