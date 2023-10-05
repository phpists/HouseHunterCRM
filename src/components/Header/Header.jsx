import { styled } from "styled-components";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";
import { Billing } from "./Billing/Billing";
import { Profile } from "./Profile/Profile";
import { BurgerButton } from "./BurgerButton";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export const Header = ({ onOpenSidebar }) => {
  const { pathname } = useLocation();
  const isTextHide = pathname === "/";
  const [openBilling, setOpenBilling] = useState(false);
  const [hoverBilling, setHoverBilling] = useState(false);

  return (
    <StyledHeader
      isTextHide={isTextHide}
      openBilling={openBilling || hoverBilling}
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
          <Billing
            open={openBilling}
            onToggleOpen={(val) => setOpenBilling(val)}
            onToggleHover={(val) => setHoverBilling(val)}
          />
          <Profile />
        </div>
      </div>
      <div className="header-text-footer">
        <Title />
        <Subtitle />
      </div>
    </StyledHeader>
  );
};
const StyledHeader = styled.div`
  padding: 20px 40px;

  .header-text-footer {
    display: none;
    margin-top: 20px;
  }

  @media (max-width: 1400px) {
    .header-text {
      ${({ isTextHide }) => isTextHide && "display: none;"}
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
    .header-text-footer {
      display: ${({ isTextHide }) => (isTextHide ? "none" : "block")};
    }
    ${({ openBilling }) =>
      openBilling &&
      `
        .profile-header-block {
            display: none;
        }
    `}
  }
`;
