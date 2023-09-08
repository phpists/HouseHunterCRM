import { useState } from "react";
import { styled } from "styled-components";

export const SymbolSelect = () => {
  const options = ["₴", "$", "€"];
  const [active, setActive] = useState(0);
  return (
    <StyledSymbolSelect>
      {options.map((opt, i) => (
        <div
          key={i}
          className={`flex items-end justify-center ${
            active === i && "active"
          }`}
          onClick={() => setActive(i)}
        >
          {opt}
        </div>
      ))}
    </StyledSymbolSelect>
  );
};

const StyledSymbolSelect = styled.div`
  border-radius: 6px;
  background: rgba(44, 44, 44, 0.5);
  padding: 2px;
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 3px;
  margin-right: 20px;
  div {
    border-radius: 5px;
    height: 20px;
    width: 20px;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.28px;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0);
    &.active {
      color: #50f835;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
`;
