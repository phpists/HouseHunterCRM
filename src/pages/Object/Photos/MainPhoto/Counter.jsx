import { styled } from "styled-components";
import { addZero } from "../../../../utilits";

export const Counter = ({ photosCount }) => (
  <StyledCounter>01/{addZero(photosCount)}</StyledCounter>
);

const StyledCounter = styled.div`
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(44, 44, 44, 0.5);
  backdrop-filter: blur(5px);
  color: #fff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.22px;
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 1px 6px 2px;
`;
