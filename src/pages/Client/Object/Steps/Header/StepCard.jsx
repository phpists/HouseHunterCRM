import { styled } from "styled-components";
import { StepNumber } from "../../../../../components/StepNumber";

export const StepCard = ({ step, title, date, active, onClick }) => (
  <StyledStepCard
    className="flex items-center"
    active={active}
    onClick={onClick}
  >
    <StepNumber num={step} className="step" />
    <div>
      <div className="title">{title}</div>
      <div className="date">{date}</div>
    </div>
  </StyledStepCard>
);

const StyledStepCard = styled.div`
  padding: 7px;
  border-radius: 9px;
  transition: all 0.3s;
  cursor: pointer;
  width: 230px;
  flex-shrink: 0;
  margin-right: 10px;
  ${({ active }) => !active && "opacity: 0.4;"}
  .step {
    margin-right: 7px;
  }
  .title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  .date {
    color: var(--main-color);

    /* Aditional text */
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  &:hover {
    background: var(--card-bg-2);
    opacity: 1;
  }
`;
