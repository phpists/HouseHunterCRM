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
  placeholder,
}) => {
  const [open, setOpen] = useState(false);

  const handleChange = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <StyledSelect
      hideArrowDefault={hideArrowDefault}
      className={`${className} ${error && "error-field"} ${open && "active"}`}
      error={error}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {Icon && <SelectIcon Icon={Icon} />}
          <div>
            <Value
              value={options?.find((opt) => opt.value === value)?.title}
              placeholder={placeholder}
            />
            <Label label={open ? labelActive : label} />
          </div>
        </div>
        <button
          onClick={(e) => {
            setOpen(!open);
          }}
          onBlur={() => setOpen(false)}
        >
          <Arrow className="arrow" />
        </button>
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
  display: block;
  width: 100%;
  text-align: left;
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
  &.active {
    background: #fff !important;
    border-radius: 6px 6px 0 0 !important;
    color: #2c2c2c;
    .arrow path {
      fill: #2c2c2c;
    }
    .arrow {
      transform: rotate(180deg);
      opacity: 1;
    }
    .select-icon {
      background: rgba(44, 44, 44, 0.85) !important;
    }
    .selectDropdown {
      opacity: 1;
      visibility: visible;
    }
  }
`;
