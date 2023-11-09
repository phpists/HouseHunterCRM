import { useState } from "react";
import { styled } from "styled-components";
import { Value } from "./Value";
import { Label } from "./Label";
import { ReactComponent as Arrow } from "../../assets/images/arrow-down.svg";
import { Dropdown } from "./Dropdown/Dropdown";
import { SelectIcon } from "./SelectIcon";

export const Select = ({
  label,
  labelActive,
  value,
  Icon,
  hideArrowDefault,
  className,
  onChange,
  options,
  error,
}) => {
  const [open, setOpen] = useState(false);

  const handleChange = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <StyledSelect
      open={open}
      hideArrowDefault={hideArrowDefault}
      className={`${className} ${error && "error-field"}`}
      error={error}
    >
      <div
        className="flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center">
          {Icon && <SelectIcon Icon={Icon} />}
          <div>
            <Value value={options?.find((opt) => opt.value === value)?.title} />
            <Label label={open ? labelActive : label} />
          </div>
        </div>
        <Arrow className="arrow" />
      </div>
      <Dropdown open={open} onChange={handleChange} options={options} />
    </StyledSelect>
  );
};

const StyledSelect = styled.div`
  padding: 8px 22px 9px 11px;
  border-radius: 6px;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  color: #fff;
  ${({ error }) => error && "border: 1px solid red;"}
  .arrow {
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
    ${({ open }) =>
      !open &&
      `
    .label {
      opacity: 0;
    }
    .label-hover {
      opacity: 1;
      transform: translateX(0px);
    }
  `}
  }
  svg {
    transition: all 0.3s;
  }
  ${({ open }) =>
    open &&
    `
    background: #FFF !important;
    border-radius: 6px 6px 0 0;
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
