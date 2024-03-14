import { styled } from "styled-components";
import { Dropdown } from "./Dropdown";
import { useState } from "react";

export const Period = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledPeriod
      className="flex items-center justify-between"
      onClick={(e) => setOpen(!open)}
      onBlur={() => setOpen(false)}
      open={open}
    >
      <div className="flex flex-col items-start">
        <div className="title">Оберіть</div>
        <div className="subtitle">За який період</div>
      </div>
      <Dropdown options={options} value={value} onChange={onChange} />
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
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  .subtitle {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  ${({ open }) =>
    open &&
    `
     .current-value {
      opacity: 0;
    }
    .options {
      opacity: 1;
      visibility: visible;
    }
 `}
`;
