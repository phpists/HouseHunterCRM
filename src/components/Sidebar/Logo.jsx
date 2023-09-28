import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

export const Logo = ({ onClose }) => (
  <Link to={"/"} className="mb-2" onClick={onClose}>
    <img src={logo} alt="logo" />
  </Link>
);
