import { useState } from "react";
import { styled } from "styled-components";

export const SymbolSelect = ({ value, onChange = () => null }) => {
  const options = ["₴", "$", "€"];
  return (
    <StyledSymbolSelect>
      {options.map((opt, i) => (
        <div
          key={i}
          className={`flex items-end justify-center ${
            value === 1 + i && "active"
          }`}
          onClick={() => onChange(1 + i)}
        >
          {opt}
        </div>
      ))}
    </StyledSymbolSelect>
  );
};

const StyledSymbolSelect = styled.div`
  border-radius: 6px;
  background: var(--bg-5);
  padding: 2px;
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 3px;
  margin-right: 20px;
  div {
    border-radius: 5px;
    height: 20px;
    width: 20px;
    background: var(--card-bg-2);
    color: var(--second-color);
    text-align: center;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.28px;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0);
    &.active {
      color: var(--green-light-2);
      border: 1px solid var(--bg-20);
    }
  }
  @media (max-width: 800px) {
    margin-right: 10px;
  }
`;
