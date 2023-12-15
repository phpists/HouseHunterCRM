import styled from "styled-components";
import { Logo } from "./Logo";
import { CompanyLogo } from "../CompanyLogo";
import { NavBar } from "./Navbar";

export const Sidebar = ({ sidebarOpen, onClose, accessData }) => {
  return (
    <StyledSidebar
      className="flex flex-col justify-between items-center"
      sidebarOpen={sidebarOpen}
    >
      <Logo onClose={onClose} />
      <NavBar accessData={accessData} />
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
  transition: all 0.3s;
  @media (max-width: 1200px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    transform: translateX(${({ sidebarOpen }) => (sidebarOpen ? 0 : "-100%")});
  }
`;
