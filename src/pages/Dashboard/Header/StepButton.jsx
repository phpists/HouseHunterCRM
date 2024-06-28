import styled from "styled-components";
import { Steps } from "../Steps/Steps";
import arrowIcon from "../../../assets/images/steps-arrow.svg";
import { useState } from "react";

export const StepButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <StyledStepButton open={open}>
      <div
        className="flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div className="step-button-title"> Пам’ятка для початку роботи</div>
        <img src={arrowIcon} alt="" className="step-button-arrow" />
      </div>
      {open && <Steps className="steps-btn" />}
    </StyledStepButton>
  );
};

const StyledStepButton = styled.button`
  padding: 20px;
  background: var(--blue-banner);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  position: relative;
  .step-button-arrow {
    margin-right: 8px;
    transition: all 0.3s;
    transform: rotate(${({ open }) => (open ? 180 : 0)}deg);
  }
  .step-button-title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 18px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: normal;
    letter-spacing: 0.36px;
  }
  .steps-btn {
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--blue-banner);
    padding: 0 20px 20px;
    text-align: left;
    z-index: 30;
  }
  .steps-title {
    display: none;
  }
`;
