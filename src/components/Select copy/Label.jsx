import { styled } from "styled-components";

export const Label = ({ label }) => (
  <StyledLabel>
    <span className="label">{label}</span>
    <span className="label label-hover">Змінити</span>
  </StyledLabel>
);

const StyledLabel = styled.div`
  position: relative;
  .label {
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  .label-hover {
    position: absolute;
    left: 0;
    opacity: 0;
    top: 2px;
    transform: translateX(10px);
    transition: all 0.3s;
  }
`;
