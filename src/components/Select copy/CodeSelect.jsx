import { useState } from "react";
import { styled } from "styled-components";
import { Value } from "./Value";
import { ReactComponent as Arrow } from "../../assets/images/arrow-down.svg";
import { Dropdown } from "./Dropdown/Dropdown";

export const CodeSelect = ({ value, onChange, options, className }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <StyledSelect open={open} className={`${className}`}>
      <div
        className="flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center">
          <Value
            value={
              options?.find(({ id }) => id === value)?.code
                ? options?.find(({ id }) => id === value)?.code
                : options?.find(({ code }) => code === value)?.code ?? ""
            }
          />
        </div>
        <Arrow className="arrow" />
      </div>
      <Dropdown
        open={open}
        value={value}
        options={options}
        onChange={handleChange}
      />
    </StyledSelect>
  );
};

const StyledSelect = styled.div`
  padding: 8px 10px;
  border-radius: 6px 0 0 6px;
  transition: all 0.3s;
  cursor: pointer;
  color: rgb(255, 255, 255);
  margin-right: 4px;
  .arrow {
    margin-left: 5px;
    ${({ hideArrowDefault }) => hideArrowDefault && "opacity: 0;"}
  }
  .arrow path {
    fill: #fff;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    .arrow {
      opacity: 1;
    }
    .select-icon {
      background: rgba(255, 255, 255, 0.1);
    }
  }
  svg {
    transition: all 0.3s;
  }
  ${({ open }) =>
    open &&
    `
    background: #FFF !important;
    border-radius: 6px 0 0 0;
    color: #2C2C2C;
    .arrow path {
        fill: #2C2C2C;
    }
    .arrow {
        transform: rotate(180deg);
        opacity: 1;
    }
    .select-icon {
        background: rgba(44, 44, 44, 0.85) !important;
    }
  `}
`;
