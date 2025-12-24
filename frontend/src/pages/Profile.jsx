import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function Profile() {

  const [user, setUser] = useState(null);

  const [showPwUI, setShowPwUI] = useState(false);
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [status, setStatus] = useState("");

  const [articles, setArticles] = useState(0);
  const [highlights, setHighlights] = useState(0);
  const [notes, setNotes] = useState(0);

  useEffect(() => {
    async function load() {

      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axiosClient.get("/auth/me");
      setUser(res.data);

      const artRes = await axiosClient.get("/articles");
      const articleData = artRes.data;
      setArticles(articleData.length);

      let hlCount = 0;
      let ntCount = 0;

      for (const a of articleData) {

        const h = await axiosClient.get(`/highlights/${a._id}`);
        hlCount += h.data.length;

        const n = await axiosClient.get(`/notes/${a._id}`);
        ntCount += n.data.length;
      }

      setHighlights(hlCount);
      setNotes(ntCount);
    }

    load();
  }, []);

  const updatePassword = async () => {
    try {
      await axiosClient.post("/auth/change-password", {
        oldPassword: oldPw,
        newPassword: newPw
      });

      setStatus("Password updated successfully!");
      setOldPw("");
      setNewPw("");
      setShowOld(false);
      setShowNew(false);

    } catch (e) {
      setStatus("Incorrect password");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!user) return <p style={{padding:"40px"}}>Loading...</p>;

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "60px",
        color: "black"
      }}
    >

      <div
        style={{
          width: "90%",
          maxWidth: "650px",
          background: "white",
          borderRadius: "18px",
          border: "1px solid rgba(0,0,0,0.1)",
          padding: "40px 36px",
          boxShadow: "0 0 25px rgba(0,0,0,0.10)"
        }}
      >

        <h1 style={{ marginBottom: "30px", fontSize:"30px" }}>
          My Profile
        </h1>

        <div style={{ fontSize: "18px", marginBottom:"20px" }}>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
        </div>

        <hr style={line}/>
        <h3 style={label}>Reading Stats</h3>

        <p><b>Total Articles Read:</b> {articles}</p>
        <p><b>Highlights Created:</b> {highlights}</p>
        <p><b>Notes Added:</b> {notes}</p>

        <hr style={line}/>

        {!showPwUI && (
          <button
            style={changeBtn}
            onClick={() => setShowPwUI(true)}
          >
            Change Password
          </button>
        )}

        {showPwUI && (
          <div style={{ marginTop:"20px" }}>


            <div style={{ position:"relative" }}>
              <input
                type={showOld ? "text" : "password"}
                placeholder="Old password"
                value={oldPw}
                onChange={(e) => setOldPw(e.target.value)}
                style={input}
              />

              <span
                onClick={() => setShowOld(!showOld)}
                style={showStyle}
              >
                {showOld ? "Hide" : "Show"}
              </span>
            </div>

            <div style={{ position:"relative" }}>
              <input
                type={showNew ? "text" : "password"}
                placeholder="New password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                style={input}
              />

              <span
                onClick={() => setShowNew(!showNew)}
                style={showStyle}
              >
                {showNew ? "Hide" : "Show"}
              </span>
            </div>

            <button
              style={updateBtn}
              onClick={updatePassword}
            >
              Update Password
            </button>

            <button
              style={cancelBtn}
              onClick={() => {
                setShowPwUI(false);
                setOldPw("");
                setNewPw("");
                setStatus("");
                setShowOld(false);
                setShowNew(false);
              }}
            >
              Cancel
            </button>

            <p style={{ color:"green", marginTop:"8px", fontSize:"15px" }}>
              {status}
            </p>

          </div>
        )}

        <button
          style={logoutBtn}
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;



const showStyle = {
  position:"absolute",
  top:"50%",
  right:"14px",
  transform:"translateY(-50%)",
  cursor:"pointer",
  fontSize:"14px",
  color:"#333",
  userSelect:"none"
};

const line = {
  borderColor: "rgba(0,0,0,0.2)",
  margin: "28px 0"
};

const label = {
  marginBottom: "14px",
  fontSize:"20px"
};

const input = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid rgba(0,0,0,0.25)",
  background: "rgba(255,255,255,0.9)",
  color: "black",
  fontSize: "16px",
  outline:"none"
};

const changeBtn = {
  width: "100%",
  padding: "14px",
  borderRadius: "8px",
  background: "dodgerblue",
  border: "none",
  fontSize: "17px",
  cursor:"pointer",
  color:"white"
};

const updateBtn = {
  width: "100%",
  padding: "14px",
  background: "#00c46a",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontSize: "17px",
  cursor: "pointer",
};

const cancelBtn = {
  width: "100%",
  padding: "12px",
  background: "#666",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  marginTop:"8px"
};

const logoutBtn = {
  width: "100%",
  padding: "14px",
  background: "#ff0033",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontSize: "17px",
  cursor: "pointer",
  marginTop: "34px"
};
