import { styled } from "styled-components";
import { Dropdown } from "./Dropdown";

export const Period = () => {
  return (
    <StyledPeriod className="flex items-center justify-between">
      <div className="flex flex-col items-start">
        <div className="title">Оберіть</div>
        <div className="subtitle">За який період</div>
      </div>
      <Dropdown />
    </StyledPeriod>
  );
};

const StyledPeriod = styled.button`
  margin-bottom: 6.5px;
  padding: 7px 11px 6px;
  border-radius: 9px;
  transition: all 0.3s;
  width: 100%;
  .title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  .subtitle {
    color: var(--main-color);
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
  }
`;
