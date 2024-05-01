import { styled } from "styled-components";
import { addZero } from "../utilits";

export const StepNumber = ({ num = 1, className }) => (
  <StyledStepNumber className={`flex items-center justify-center ${className}`}>
    <span>{addZero(num)}</span>
  </StyledStepNumber>
);

const StyledStepNumber = styled.div`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  background: var(--card-bg-2);
  border: 1.4px solid #fff;
  border-radius: 100%;
  color: var(--main-color);
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 118%; /* 16.52px */
  letter-spacing: -0.49px;
  span {
    height: 12px;
  }
`;
