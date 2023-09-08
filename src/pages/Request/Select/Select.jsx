import { styled } from "styled-components";
import { Arrow } from "./Arrow";
import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { Tag } from "./Tag";

export const Select = ({ label, placeholder, notMultiSelect }) => {
  const [open, setOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleTaggleOpen = () => {
    open && setIsEmpty(false);
    setOpen(!open);
  };

  return (
    <StyledSelect
      className={`flex items-center justify-between ${isEmpty && "empty"} ${
        open && "active"
      }`}
      onClick={() => !isEmpty && setIsEmpty(true)}
    >
      <div>
        <div className="flex items-center">
          <div className="value">
            {placeholder ? placeholder : isEmpty ? "Оберіть" : "Оренда квартир"}
          </div>
          {!isEmpty && !notMultiSelect && <Tag />}
        </div>
        <div className="label">{label}</div>
      </div>
      <Arrow active={open} onClick={handleTaggleOpen} />
      <Dropdown open={open} notMultiSelect={notMultiSelect} />
    </StyledSelect>
  );
};

const StyledSelect = styled.div`
  padding: 6px 10px;
  border-radius: 9px;
  transition: all 0.3s;
  position: relative;
  .value {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
    transition: all 0.3s;
  }
  .label {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }

  &.empty {
    .value {
      opacity: 0.6;
    }
  }

  svg {
    opacity: 0;
  }

  &:hover,
  &.active {
    background: rgba(255, 255, 255, 0.05);
    .value {
      opacity: 1;
    }
    svg {
      opacity: 1;
    }
  }
  &.active {
    border-radius: 9px 9px 0px 0px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  }
`;
