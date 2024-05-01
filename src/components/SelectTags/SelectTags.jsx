import { styled } from "styled-components";
import { Arrow } from "./Arrow";
import { useEffect, useRef, useState } from "react";
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
  error,
  className,
  closeOnScroll,
  emptyTitle,
  hideArrow,
  hide,
  onToggleOpen,
}) => {
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState("");
  const selectRef = useRef(null);
  const isClicked = useRef(false);

  const handleChangeValue = (val, title) => {
    onChange(val, title);
    setSearch("");
    if (notMultiSelect) {
      setOpen(false);
    }
  };

  const handleToggleOpen = () => {
    setOpen(!open);
    setSearch("");
  };

  useEffect(() => {
    if (onToggleOpen) {
      onToggleOpen(open);
    }
  }, [open]);

  return (
    <StyledSelectTags
      className={`flex items-center justify-between  ${!value && "empty"} ${
        open && "open"
      } ${isActive && "active"} ${error && "error-field"} ${className}`}
      showtags={showTags?.toString()}
      error={error?.toString()}
      onClick={(e) => {
        if (!e.target.classList.contains("notClickable") && !viewOnly) {
          setOpen(!open);
          setIsActive(!open);
        }
      }}
      hideArrow={hideArrow}
    >
      <div className="w-full">
        {!value && showTags && tags?.length === 0 && (
          <div className="value">{placeholder ?? "Пусто"}</div>
        )}
        {!value && showTags ? (
          <div className="flex flex-wrap tags select-none">
            {tags?.slice(0, isActive ? tags?.length : 5)?.map((tag, i) => (
              <Tag
                key={i}
                title={tag?.title}
                isFirst={
                  tag.value === "label_is_actual" ||
                  tag?.value === "label_not_actual"
                }
                viewOnly={viewOnly}
                onRemove={() => onChange(tag.value, tag.title)}
                type={tag.value === "label_is_actual"}
              />
            ))}
            {!isActive && tags?.length - 5 > 0 && (
              <TagCount count={tags?.length - 5} />
            )}
            {open && (
              <input
                className="value notClickable"
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
                autoFocus
              />
            )}
          </div>
        ) : (
          <div className="flex flex-wrap items-center">
            {!open ? (
              <div className={`value valueTitle ${tagValue && "value-tag"}`}>
                {initValue
                  ? initValue
                  : !value
                  ? "Оберіть"
                  : options?.find((opt) => opt.value === value)?.title}
              </div>
            ) : (
              <input
                className="value notClickable"
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
                autoFocus
              />
            )}
            {!value && !notMultiSelect && (
              <TagCount count={1} className="ml-2.5" />
            )}
          </div>
        )}
        <div className="label">{label}</div>
      </div>
      {(notMultiSelect && !value && showTags) || viewOnly ? null : (
        <Arrow active={open} innerRef={selectRef} className="main-arrow" />
      )}
      {hide ? (
        open ? (
          <Dropdown
            open={open}
            notMultiSelect={notMultiSelect}
            Component={Component}
            options={options}
            onChange={handleChangeValue}
            activeValue={value}
            search={search}
            tags={tags}
          />
        ) : null
      ) : (
        <Dropdown
          open={open}
          notMultiSelect={notMultiSelect}
          Component={Component}
          options={options}
          onChange={handleChangeValue}
          activeValue={value}
          search={search}
          tags={tags}
        />
      )}
      {open && (
        <div
          className="modal-overlay"
          onClick={() => {
            setOpen(false);
            setIsActive(false);
          }}
          onWheel={() => {
            setOpen(false);
            setIsActive(false);
          }}
        ></div>
      )}
    </StyledSelectTags>
  );
};

const StyledSelectTags = styled.button`
  padding: 6px 10px;
  border-radius: 9px;
  transition: all 0.1s;
  position: relative;
  justify-content: space-between;
  width: 100%;
  ${({ error }) => error === "true" && "border: 1px solid red;"}
  .value {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
    transition: all 0.3s;
    z-index: 10;
    text-align: left;
    width: 90%;
    &::placeholder {
      color: var(--main-color);
      font-family: Overpass;
      font-size: 14px;
      font-style: normal;
      font-weight: var(--font-weight-100);
      line-height: 118%; /* 17.7px */
      letter-spacing: 0.3px;
    }
  }
  .valueTitle {
    width: max-content;
  }
  input {
    position: relative;
    z-index: 10;
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
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
    text-transform: capitalize;
    text-align: left;
  }

  &.empty {
    .value {
      /* opacity: 0.6; */
    }
  }

  svg {
    opacity: 0;
  }

  &:hover,
  &.open {
    background: var(--card-bg-2);
    .value {
      opacity: 1;
    }
    svg {
      opacity: 1;
    }
  }
  &.open {
    border-radius: 9px 9px 0px 0px !important;
    border-bottom: var(--second-color-border);
    .tagsSelectDropdown {
      opacity: 1;
      visibility: visible;
    }
  }

  .tags {
    gap: 4px 0px;
    width: 100%;
    margin-bottom: 4px;
  }

  ${({ showtags, hideArrow }) =>
    showtags === "true" &&
    !hideArrow &&
    `
    background:  var(--card-bg-2);
    .value {
        opacity: 1;
    }
    .main-arrow {
        opacity: 1;
    }
  `}
`;
