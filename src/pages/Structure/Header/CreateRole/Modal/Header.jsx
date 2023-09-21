import styled from "styled-components";
import { ReactComponent as Close } from "../../../../../assets/images/close.svg";

export const Header = ({ onClose }) => (
  <StyledHeader className="flex items-center justify-between">
    <span>Створення ролей</span>
    <Close onClick={onClose} />
  </StyledHeader>
);

const StyledHeader = styled.div`
  padding: 18px 20px;
  background: #3d3d3d;
  margin-bottom: 20px;
  svg {
    cursor: pointer;
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
`;
