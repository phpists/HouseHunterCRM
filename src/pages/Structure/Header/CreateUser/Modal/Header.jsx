import styled from "styled-components";
import { ReactComponent as Close } from "../../../../../assets/images/close.svg";

export const Header = ({ onClose }) => (
  <StyledHeader className="flex items-center justify-between">
    <span>Створення працівника</span>
    <Close onClick={onClose} />
  </StyledHeader>
);

const StyledHeader = styled.div`
  padding: 18px 20px;
  background: var(--card-bg);
  margin-bottom: 20px;
  color: var(--main-color);
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  svg {
    cursor: pointer;
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
`;
