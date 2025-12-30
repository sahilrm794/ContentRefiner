import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ background: "#111", padding: "10px" }}>
      <Link to="/" style={{ color: "white", fontSize: "18px" }}>
        Blog Automation
      </Link>
    </div>
  );
}
