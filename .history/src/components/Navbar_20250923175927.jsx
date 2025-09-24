import Logo from "../assets/logo.svg";
import "./Navbar.css";
import { useUser } from "./useUser.js";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./useUser.js";

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <img src={Logo} alt="Logo" className="logo" />
      <ul className="nav-links">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/about")}>About</li>
        {user ? (
          <>
            <li onClick={() => navigate("/profile")}>Profile</li>
            <li onClick={() => navigate("/logout")}>Logout</li>
          </>
        ) : (
          <>
            <li onClick={() => navigate("/login")}>Login</li>
            <li onClick={() => navigate("/signup")}>Signup</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
