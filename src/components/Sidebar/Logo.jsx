import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import styled from "styled-components";

export const Logo = ({ onClose }) => (
  <StyledLogo to={"/"} className="mb-2" onClick={onClose}>
    <img src={logo} alt="logo" />
  </StyledLogo>
);

const StyledLogo = styled(Link)`
  img {
    width: 80%;
    margin: 0 auto;
    max-width: 80px;
  }
`;
