import { useRef, useState } from "react";
import { styled } from "styled-components";

export const Dropdown = () => {
  const opt = [
    "За 1 годину",
    "За 2 години",
    "За 3 години",
    "За 6 годин",
    "За 12 годин",
    "За 1 добу",
    "За 1 тиждень",
    "За весь час",
  ];
  const [active, setActive] = useState(opt[0]);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    setActive(value);
    dropdownRef.current && dropdownRef.current.blur();
  };

  return (
    <StyledDropdown ref={dropdownRef}>
      <div className="current-value">{active}</div>
      <div className="options">
        {opt.map((opt, i) => (
          <div key={i} onClick={() => handleSelect(opt)}>
            {opt}
          </div>
        ))}
      </div>
    </StyledDropdown>
  );
};

const StyledDropdown = styled.button`
  border-radius: 7px;
  border: 1px solid var(--card-bg-2);
  background: var(--bg-5);
  position: relative;
  width: 105px;
  div {
    color: var(--second-color);
    text-align: center;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
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
    border: 1px solid var(--card-bg-2);
    background: var(--bg-5);
    backdrop-filter: blur(3.5px);
    opacity: 0;
    visibility: hidden;
    width: 100%;
    div {
      border-bottom: 1px solid var(--card-bg-2);
      &:hover {
        color: var(--main-color);
      }
      &:last-child {
        border: none;
      }
    }
  }

  &:focus {
    .current-value {
      opacity: 0;
    }
    .options {
      opacity: 1;
      visibility: visible;
    }
  }
`;
