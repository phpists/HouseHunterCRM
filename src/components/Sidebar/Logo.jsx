import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

export const Logo = () => (
  <Link to={"/"} className="mb-2">
    <img src={logo} alt="logo" />
  </Link>
);
