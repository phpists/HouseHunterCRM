import { useRef, useState } from "react";
import { styled } from "styled-components";

export const Dropdown = ({ options, value, onChange }) => {
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    onChange(value);
    dropdownRef.current && dropdownRef.current.blur();
  };

  return (
    <StyledDropdown ref={dropdownRef}>
      <div className="current-value">
        {options.find((opt) => opt.value === value)?.title ?? "Пусто"}
      </div>
      <div className="options">
        {options.map((opt, i) => (
          <div key={i} onClick={() => handleSelect(opt.value)}>
            {opt.title}
          </div>
        ))}
      </div>
    </StyledDropdown>
  );
};

const StyledDropdown = styled.button`
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(44, 44, 44, 0.5);
  position: relative;
  width: 105px;
  div {
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    text-transform: uppercase;
    padding: 4px 5px;
    transition: all 0.3s;
  }
  .options {
    position: absolute;
    bottom: 0;
    border-radius: 7px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(44, 44, 44, 0.5);
    backdrop-filter: blur(3.5px);
    opacity: 0;
    visibility: hidden;
    width: 100%;
    max-height: 100px;
    overflow: auto;
    div {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      &:hover {
        color: #fff;
      }
      &:last-child {
        border: none;
      }
    }
  }
`;
