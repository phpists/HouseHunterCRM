import { styled } from "styled-components";
import logo from "../../assets/images/logo.svg";

export const Logo = ({ success }) => (
  <StyledLogo success={success}>
    <img src={logo} alt="" />
  </StyledLogo>
);

const StyledLogo = styled.div`
  position: absolute;
  top: 26px;
  left: ${({ success }) => (success ? "50%" : "22px")};
  ${({ success }) => success && "transform: translateX(-50%);"}
  z-index: 100;
  transition: all 0.3s;
`;
