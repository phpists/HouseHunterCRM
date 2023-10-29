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
  tagValue,
  initValue,
  options,
  value,
  onChange,
  viewOnly,
  tags,
}) => {
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState("");

  const handleChangeValue = (val) => {
    onChange(val);
    setSearch("");
    notMultiSelect && setOpen(false);
  };

  const handleToggleOpen = () => {
    setOpen(!open);
    setSearch("");
  };

  return (
    <StyledSelectTags
      className={`flex items-center justify-between ${!value && "empty"} ${
        open && "open"
      } ${isActive && "active"}`}
      showTags={showTags}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div>
        {!value && showTags && tags?.length === 0 && (
          <div className="value">Пусто</div>
        )}
        {!value && showTags ? (
          <div className="flex flex-wrap tags select-none">
            {tags?.slice(0, isActive ? tags.length : 3)?.map((tag, i) => (
              <Tag
                key={i}
                title={tag?.title}
                isFirst={i === 0}
                viewOnly={viewOnly}
              />
            ))}
            {!isActive && tags.length - 3 > 0 && (
              <TagCount count={tags.length - 3} />
            )}
          </div>
        ) : (
          <div className="flex flex-wrap items-center">
            {!open ? (
              <div className={`value ${tagValue && "value-tag"}`}>
                {initValue
                  ? initValue
                  : !value
                  ? "Оберіть"
                  : options?.find((opt) => opt.value === value)?.title}
              </div>
            ) : (
              <input
                className="value"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  initValue
                    ? initValue
                    : placeholder
                    ? placeholder
                    : !value
                    ? "Пошук"
                    : options?.find((opt) => opt.value === value)?.title
                }
              />
            )}
            {!value && !notMultiSelect && (
              <TagCount count={1} className="ml-2.5" />
            )}
          </div>
        )}
        <div className="label">{label}</div>
      </div>
      {(!value && showTags) || viewOnly ? null : (
        <Arrow active={open} onClick={handleToggleOpen} />
      )}
      <Dropdown
        open={open}
        notMultiSelect={notMultiSelect}
        Component={Component}
        options={options}
        onChange={handleChangeValue}
        activeValue={value}
        search={search}
      />
    </StyledSelectTags>
  );
};

const StyledSelectTags = styled.div`
  padding: 6px 10px;
  border-radius: 9px;
  transition: all 0.3s;
  position: relative;
  justify-content: space-between;
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
