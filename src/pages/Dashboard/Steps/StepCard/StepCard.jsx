import styled from "styled-components";
// import { Checkbox } from "./Checkbox";
import { useState } from "react";
import { ReactComponent as Arrow } from "../../../../assets/images/welcome-step-arrow.svg";
import { NavLink } from "react-router-dom";

export const StepCard = ({ title, subtitle, link }) => {
  const [checked, setCheked] = useState(false);

  return (
    <StyledStepCard
      checked={checked}
      onClick={() => setCheked(!checked)}
      to={link}
    >
      <div className="flex items-center w-full">
        {/* <Checkbox value={checked} /> */}
        <div className="title">{title}</div>
        <Arrow className="arrow" />
      </div>
      {subtitle && <div className="subtitle">{subtitle}</div>}
    </StyledStepCard>
  );
};

const StyledStepCard = styled(NavLink)`
  width: 100%;
  cursor: pointer;
  .title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: normal;
    letter-spacing: 0.28px;
    width: 100%;
  }
  .subtitle {
    margin-top: 7px;
    color: var(--white-color);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: normal;
    letter-spacing: 0.28px;
    padding: 0 26px 0 0;
  }
  .arrow {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    flex-shrink: 0;
    transition: all 0.3s;
    path {
      transition: all 0.3s;
      fill-opacity: ${({ checked }) => (checked ? 0.2 : 1)};
    }
  }
  &:hover {
    .arrow {
      transform: rotate(45deg);
    }
  }
`;
