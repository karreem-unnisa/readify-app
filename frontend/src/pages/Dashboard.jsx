// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { addArticle, getUserArticles, deleteArticle } from "../api/articleApi";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [url, setUrl] = useState("");
  const [articles, setArticles] = useState([]);

  const navigate = useNavigate();

  const load = async () => {
    const res = await getUserArticles();
    setArticles(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    await addArticle(url);
    setUrl("");
    load();
  };

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "60px 20px"
      }}
    >

      <h1
        style={{
          fontSize: "38px",
          marginBottom: "30px",
          fontWeight: 700
        }}
      >
        My Articles
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 40
        }}
      >
        <input
          placeholder="Paste article link…"
          value={url}
          onChange={e => setUrl(e.target.value)}
          style={{
            flex: 1,
            fontSize: 18,
            padding: "14px 18px",
            borderRadius: 8,
            border: "1px solid #bbb"
          }}
        />

        <button
          type="submit"
          style={{
            background: "black",
            color: "white",
            padding: "14px 24px",
            fontSize: 16,
            border: "none",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Add
        </button>
      </form>

      <div
        style={{
          display: "grid",
          gap: 22,
          gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))"
        }}
      >
        {articles.map(a => (
          <div
            key={a._id}
            style={{
              padding: 22,
              background: "rgba(255,255,255,0.4)",
              borderRadius: 14,
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/reader/${a._id}`)}
          >
            <p style={{ fontSize: 20, fontWeight: 600 }}>{a.title}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteArticle(a._id).then(load);
              }}
              style={{
                padding: "6px 12px",
                background: "crimson",
                color: "white",
                border: "none",
                borderRadius: 6,
                fontSize: 14,
                marginTop: 14
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;
