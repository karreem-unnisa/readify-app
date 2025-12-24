import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth <= 900);

  const { isLogged } = useContext(AuthContext);

  useEffect(() => {
    const resize = () => setMobile(window.innerWidth <= 900);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <header style={header}>
      <nav style={nav}>

        <Link to="/" style={brand}>Readify</Link>

        {!mobile && (
          <div style={linksRow}>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/articles">Library</NavItem>

            {isLogged && <NavItem to="/dashboard">My Articles</NavItem>}
            {isLogged && <NavItem to="/profile">Profile</NavItem>}

            {!isLogged && <NavItem to="/login">Login</NavItem>}
            {!isLogged && <NavItem to="/register">Register</NavItem>}
          </div>
        )}
        {mobile && (
          <div style={hamburger} onClick={() => setOpen(!open)}>☰</div>
        )}

      </nav>
      {mobile && open && (
        <div style={mobileMenu}>

          <NavMobile setOpen={setOpen} to="/">Home</NavMobile>

          <NavMobile setOpen={setOpen} to="/articles">Library</NavMobile>

          {isLogged && (
            <>
              <NavMobile setOpen={setOpen} to="/dashboard">My Articles</NavMobile>
              <NavMobile setOpen={setOpen} to="/profile">Profile</NavMobile>
            </>
          )}

          {!isLogged && (
            <>
              <NavMobile setOpen={setOpen} to="/login">Login</NavMobile>
              <NavMobile setOpen={setOpen} to="/register">Register</NavMobile>
            </>
          )}

        </div>
      )}

    </header>
  );
}

function NavItem({ to, children }) {
  return (
    <Link to={to} style={navLink}>
      {children}
    </Link>
  );
}

function NavMobile({ to, setOpen, children }) {
  return (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      style={mobileLink}
    >
      {children}
    </Link>
  );
}

export default Navbar;


const header = {
  width: "100%",
  background: "rgba(0,0,0,0.55)",
  backdropFilter: "blur(12px)",
  position: "sticky",
  top: 0,
  zIndex: 2000
};

const nav = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "16px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const brand = {
  fontSize: "28px",
  fontWeight: 700,
  color: "white",
  textDecoration: "none"
};

const linksRow = {
  display: "flex",
  gap: "32px"
};

const navLink = {
  color: "white",
  fontSize: "18px",
  textDecoration: "none"
};

const hamburger = {
  fontSize: "28px",
  cursor: "pointer",
  color: "white"
};

const mobileMenu = {
  background: "rgba(0,0,0,0.8)",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  padding: "20px",
  textAlign: "center"
};

const mobileLink = {
  color: "white",
  textDecoration: "none",
  fontSize: "22px"
};
