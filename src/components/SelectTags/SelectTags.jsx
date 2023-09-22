import { styled } from "styled-components";
import { Arrow } from "./Arrow";
import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { TagCount } from "./TagCount";
import { Tag } from "./Tag";

export const SelectTags = ({
  label,
  placeholder,
  notMultiSelect,
  showTags,
  Component,
  search,
  tagValue,
  initValue,
}) => {
  const [open, setOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const handleTaggleOpen = () => {
    open && setIsEmpty(false);
    setOpen(!open);
  };

  return (
    <StyledSelectTags
      className={`flex items-center justify-between ${isEmpty && "empty"} ${
        open && "open"
      } ${isActive && "active"}`}
      onClick={() => !isEmpty && setIsEmpty(true)}
      showTags={showTags}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div>
        {!isEmpty && showTags ? (
          <div className="flex flex-wrap tags select-none">
            <Tag title="Актуально з 09.09.2022" isFirst type={true} />
            <Tag title="без дітей" />
            <Tag title="без тварин" />
            <Tag title="без дітей" />
            <Tag title="без тварин" />
            <Tag title="без іноземців" isHide={!isActive} />
            <Tag title="без іноземців" isHide={!isActive} />
            {!isActive && <TagCount count={2} />}
          </div>
        ) : (
          <div className="flex flex-wrap items-center">
            {!search ? (
              <div className={`value ${tagValue && "value-tag"}`}>
                {initValue
                  ? initValue
                  : placeholder
                  ? placeholder
                  : isEmpty
                  ? "Оберіть"
                  : "Оренда квартир"}
              </div>
            ) : (
              <input
                className="value"
                placeholder={
                  initValue
                    ? initValue
                    : placeholder
                    ? placeholder
                    : isEmpty
                    ? "Оберіть"
                    : "Оренда квартир"
                }
              />
            )}
            {!isEmpty && !notMultiSelect && (
              <TagCount count={1} className="ml-2.5" />
            )}
          </div>
        )}
        <div className="label">{label}</div>
      </div>
      {!isEmpty && showTags ? null : (
        <Arrow active={open} onClick={handleTaggleOpen} />
      )}
      <Dropdown
        open={open}
        notMultiSelect={notMultiSelect}
        Component={Component}
      />
    </StyledSelectTags>
  );
};

const StyledSelectTags = styled.div`
  padding: 6px 10px;
  border-radius: 9px;
  transition: all 0.3s;
  position: relative;
  .value {
    color: #fff;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
    transition: all 0.3s;
    &::placeholder {
      color: #fff;
      font-family: Overpass;
      font-size: 14px;
      font-style: normal;
      font-weight: 100;
      line-height: 118%; /* 17.7px */
      letter-spacing: 0.3px;
    }
  }
  .value-tag {
    display: flex;
    padding: 1px 8px 2px 8px;
    height: 20px;
    color: #58afff;
    border-radius: 5px;
    background: rgba(88, 175, 255, 0.3);
    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 1.4;
    letter-spacing: 0.28px;
    text-transform: capitalize;
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
  &.open {
    background: rgba(255, 255, 255, 0.05);
    .value {
      opacity: 1;
    }
    svg {
      opacity: 1;
    }
  }
  &.open {
    border-radius: 9px 9px 0px 0px !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  }

  .tags {
    gap: 4px 0px;
    width: 100%;
    margin-bottom: 4px;
  }

  ${({ showTags }) =>
    showTags &&
    `
    background: rgba(255, 255, 255, 0.05);
    .value {
        opacity: 1;
    }
    svg {
        opacity: 1;
    }
  `}
`;
