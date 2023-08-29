import { styled } from "styled-components";
import { ReactComponent as ArrowIcon } from "../../../../assets/images/arrow-right-tarif.svg";

export const Arrow = () => (
  <StyledArrow className="flex items-center justify-center h-full arrow">
    <ArrowIcon />
  </StyledArrow>
);

const StyledArrow = styled.div`
  svg {
    transform: rotate(-45deg);
    opacity: 0.4;
    transition: all 0.3s;
  }
`;
