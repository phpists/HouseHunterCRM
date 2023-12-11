import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "../../../../assets/images/structure-arrow-card.svg";

export const Arrow = ({ onClick }) => (
  <StyledArrow onClick={onClick} className="nextLevel">
    <ArrowIcon />
  </StyledArrow>
);

const StyledArrow = styled.div`
  display: flex;
  align-items: center;
  svg,
  g {
    transition: all 0.3s;
  }
  &:hover {
    svg g {
      opacity: 1;
    }
    svg {
      transform: rotate(50deg);
    }
  }
  @media (max-width: 1399.9px) {
    position: absolute;
    top: 11px;
    right: 11px;
  }
  @media (max-width: 850px) {
    display: none;
  }
`;
