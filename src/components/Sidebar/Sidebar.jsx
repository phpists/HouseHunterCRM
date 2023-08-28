import styled from "styled-components";
import { Logo } from "./Logo";
import { CompanyLogo } from "../CompanyLogo";
import { NavBar } from "./Navbar";

export const Sidebar = () => {
  return (
    <StyledSidebar className="flex flex-col justify-between items-center">
      <Logo />
      <NavBar />
      <CompanyLogo />
    </StyledSidebar>
  );
};

const StyledSidebar = styled.div`
  grid-row: 1/3;
  grid-column: 1/2;
  background: rgba(107, 107, 107, 0.3);
  backdrop-filter: blur(23px);
  padding: 26px 0 13px;
  height: 100svh;
  overflow: auto;
`;
