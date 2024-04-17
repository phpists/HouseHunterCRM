import { styled } from "styled-components";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";
import { Billing } from "./Billing/Billing";
import { Profile } from "./Profile/Profile";
import { BurgerButton } from "./BurgerButton";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { ToggleFullScreen } from "./ToggleFullScreen";

export const Header = ({ onOpenSidebar }) => {
  const { pathname } = useLocation();
  const isTextHide = pathname === "/";
  const [openBilling, setOpenBilling] = useState(false);
  const [hoverBilling, setHoverBilling] = useState(false);

  return (
    <StyledHeader
      istexthide={isTextHide?.toString()}
      openbilling={(openBilling || hoverBilling).toString()}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BurgerButton onOpenSidebar={onOpenSidebar} />
          <div className="header-text">
            <Title />
            <Subtitle />
          </div>
        </div>
        <div className="flex items-center">
          <ToggleFullScreen />
          <Billing
            open={openBilling}
            onToggleOpen={(val) => setOpenBilling(val)}
            onToggleHover={(val) => setHoverBilling(val)}
          />
          <Profile />
        </div>
      </div>
    </StyledHeader>
  );
};
const StyledHeader = styled.div`
  padding: 20px 40px;
  @media (max-width: 1400px) {
    .header-text {
      ${({ istexthide }) => istexthide === "true" && "display: none;"}
      margin-left: 24px;
    }
  }
  @media (max-width: 1200px) {
    padding: 20px 24px;
  }
  @media (max-width: 800px) {
    .header-text {
      display: none;
    }
    ${({ openbilling }) =>
      openbilling === "true" &&
      `
        .profile-header-block {
            display: none;
        }
    `}
  }
`;
