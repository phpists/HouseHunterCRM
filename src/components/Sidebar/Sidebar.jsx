import styled from "styled-components";
import { Logo } from "./Logo";
import { CompanyLogo } from "../CompanyLogo";
import { NavBar } from "./Navbar";
import { useAppSelect } from "../../hooks/redux";

export const Sidebar = ({ sidebarOpen, onClose, accessData }) => {
  const { user } = useAppSelect((state) => state.auth);
  const { companyPhoto } = useAppSelect((state) => state.billing);

  return (
    <StyledSidebar
      className="flex flex-col justify-between items-center"
      sidebaropen={sidebarOpen?.toString()}
    >
      <Logo onClose={onClose} />
      <NavBar accessData={accessData} />
      {user?.struct_level === 1 ? (
        <CompanyLogo value={companyPhoto} />
      ) : (
        <div />
      )}
    </StyledSidebar>
  );
};

const StyledSidebar = styled.div`
  grid-row: 1/3;
  grid-column: 1/2;
  background: var(--element-bg);
  backdrop-filter: blur(23px);
  padding: 26px 0 13px;
  height: 100svh;
  overflow: auto;
  transition: all 0.3s;
  @supports (-webkit-touch-callout: none) {
    background: var(--main-bg);
  }
  @media (max-width: 1200px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    transform: translateX(
      ${({ sidebaropen }) => (sidebaropen === "true" ? 0 : "-100%")}
    );
  }
`;
