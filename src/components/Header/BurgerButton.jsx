import styled from "styled-components";
import { ReactComponent as MenuIcon } from "../../assets/images/menu.svg";

export const BurgerButton = ({ onOpenSidebar }) => (
  <StyledBurgerButton
    className="flex items-center justify-center"
    onClick={onOpenSidebar}
  >
    <MenuIcon />
  </StyledBurgerButton>
);

const StyledBurgerButton = styled.button`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #4f4f4f;

  @media (min-width: 1200px) {
    display: none;
  }
`;
