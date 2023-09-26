import styled from "styled-components";
import { Checkbox } from "./Checkbox";
import { useState } from "react";
import { ReactComponent as Arrow } from "../../../../assets/images/welcome-step-arrow.svg";

export const StepCard = ({ title, subtitle }) => {
  const [checked, setCheked] = useState(false);

  return (
    <StyledStepCard checked={checked} onClick={() => setCheked(!checked)}>
      <div className="flex items-center w-full">
        <Checkbox value={checked} />
        <div className="title">{title}</div>
        <Arrow className="arrow" />
      </div>
      {subtitle && <div className="subtitle">{subtitle}</div>}
    </StyledStepCard>
  );
};

const StyledStepCard = styled.div`
  width: 100%;
  cursor: pointer;
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 100;
    line-height: normal;
    letter-spacing: 0.28px;
    width: 100%;
  }
  .subtitle {
    margin-top: 7px;
    color: rgba(255, 255, 255, 0.6);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 100;
    line-height: normal;
    letter-spacing: 0.28px;
    padding: 0 26px;
  }
  .arrow {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    flex-shrink: 0;
    path {
      transition: all 0.3s;
      fill-opacity: ${({ checked }) => (checked ? 0.2 : 1)};
    }
  }
`;
