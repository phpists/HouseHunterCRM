import { styled } from "styled-components";
import { addZero } from "../../../utilits";

export const Counter = ({ current, total }) => (
  <StyledCounter className="flex items-center">
    {addZero(current)}/{addZero(total)}
  </StyledCounter>
);

const StyledCounter = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 7;
  border-radius: 5.465px;
  border: 1.093px solid rgba(255, 255, 255, 0.15);
  background: rgba(44, 44, 44, 0.5);
  backdrop-filter: blur(5.465116500854492px);
  padding: 1px 6px 2px;
  color: #fff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.22px;
`;
