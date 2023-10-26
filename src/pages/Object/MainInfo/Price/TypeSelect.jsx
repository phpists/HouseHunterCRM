import { useState } from "react";
import { styled } from "styled-components";

export const TypeSelect = ({ value, onChange }) => {
  const options = [
    { title: "За об’єкт", value: 4 },
    { title: "За м²", value: 1 },
  ];

  return (
    <StyledTypeSelect>
      {options.map((opt, i) => (
        <div
          key={i}
          className={`flex items-end justify-center ${
            value === opt.value && "active"
          }`}
          onClick={() => onChange(opt.value)}
        >
          {opt.title}
        </div>
      ))}
    </StyledTypeSelect>
  );
};

const StyledTypeSelect = styled.div`
  border-radius: 6px;
  background: rgba(44, 44, 44, 0.5);
  padding: 2px;
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 3px;
  div {
    border-radius: 5px;
    padding: 1px 4px;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
    letter-spacing: 0.28px;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0);
    &.active {
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
`;
