import { useState } from "react";
import { styled } from "styled-components";

export const SymbolSelect = ({ active, onChange }) => {
  const options = ["₴", "$", "€"];
  //   const [active, setActive] = useState(0);
  return (
    <StyledSymbolSelect className="ml-2.5">
      {options.map((opt, i) => (
        <div
          key={i}
          className={`flex items-baseline justify-center ${
            active === opt && "active"
          }`}
          onClick={() => onChange(options[i])}
        >
          {opt}
        </div>
      ))}
    </StyledSymbolSelect>
  );
};

const StyledSymbolSelect = styled.div`
  border-radius: 7px;
  background: rgba(44, 44, 44, 0.5);
  padding: 2px;
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 3px;
  div {
    border-radius: 5px;
    height: 18px;
    width: 18px;
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
    color: #fff;
    text-align: center;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 1.4; /* 16.52px */
    letter-spacing: 0.28px;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0);
    &.active {
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
`;
