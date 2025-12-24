import { Link } from "react-router-dom";
import heroImg from "./home.jpg";
function Home() {

  const logged = localStorage.getItem("token");

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "60px 80px"
      }}
    >

      <div>
        <h1 style={{
          color: "black",
          fontSize: "46px",
          lineHeight: "1.1",
          marginBottom: "20px",
          fontWeight: "600"
        }}>
          Read smarter.<br />
          Study faster.
        </h1>

        <p style={{
          color: "black",
          fontSize: "19px",
          maxWidth: "460px",
          lineHeight: "1.6",
          marginBottom: "30px"
        }}>
          Save highlights, add notes,
          export documents and read across devices.
        </p>

        <Link
          to={logged ? "/dashboard" : "/login"}
          style={{ textDecoration: "none" }}
        >
          <button
            style={{
              padding: "14px 28px",
              borderRadius: "8px",
              fontSize: "18px",
              background: "black",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Get Started
          </button>
        </Link>
      </div>

  
      <div style={{ textAlign: "right" }}>
        <img
         src={heroImg}
          style={{
            width: "100%",
            maxWidth: "520px",
            borderRadius: "16px"
          }}
        />
      </div>

    </div>
  );
}

export default Home;
