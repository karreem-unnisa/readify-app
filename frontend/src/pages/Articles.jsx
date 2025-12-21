// src/pages/Articles.jsx
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";

function Articles() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await axiosClient.get("/articles");
      setArticles(res.data);
    }
    load();
  }, []);

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
          marginBottom: 30,
          fontWeight: 700
        }}
      >
        Reading Library
      </h1>

      <div
        style={{
          display: "grid",
          gap: 22,
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))"
        }}
      >

        {articles.map(a => (
          <Link
            key={a._id}
            to={`/reader/${a._id}`}
            style={{
              padding: 22,
              background: "rgba(255,255,255,0.45)",
              borderRadius: 14,
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
              textDecoration: "none",
              fontSize: 20,
              fontWeight: 600,
              color: "black"
            }}
          >
            {a.title}
          </Link>
        ))}

      </div>

    </div>
  );
}

export default Articles;
