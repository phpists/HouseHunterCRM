import { useState } from "react";
import { styled } from "styled-components";

export const TypeSelect = ({ value, onChange, options, error }) => {
  return (
    <StyledTypeSelect error={error}>
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
  background: var(--bg-5);
  padding: 2px;
  display: flex;
  gap: 3px;
  width: max-content;
  ${({ error }) => error && "border: 1px solid red;"}
  div {
    border-radius: 5px;
    padding: 1px 4px;
    background: var(--card-bg-2);
    color: var(--second-color);
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
      color: var(--green-light-2);
      border: 1px solid var(--bg-20);
    }
  }
`;
