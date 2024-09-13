import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Value } from "./Value";
import { Label } from "./Label";
import { ReactComponent as Arrow } from "../../assets/images/arrow-down.svg";
import { Dropdown } from "./Dropdown/Dropdown";
import { SelectIcon } from "./SelectIcon";
import { ReactComponent as CheckboxIcon } from "../../assets/images/checkbox.svg";
import { ProfileField } from "../ProfileField";

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
  isSearch,
  onOpen,
  editValue,
  required,
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (val) => {
    onChange(val);
    setOpen(false);
  };

  useEffect(() => {
    !open && setSearch("");
    if (open && onOpen) {
      onOpen();
    }
  }, [open]);

  const handleSearch = (val) => {
    setSearch(val);
    editValue && onChange(val);
  };

  useEffect(() => {
    if (editValue) {
      setSearch(value);
    }
  }, [open, editValue]);

  const handleGetFilteredOptions = () =>
    options?.filter(({ title }) =>
      isSearch && search?.length > 0
        ? title?.toLowerCase().includes(search.toLowerCase())
        : true
    );

  const handlePressEnter = (e) => {
    if (e?.keyCode === 13 && editValue) {
      setOpen(false);
    }
  };

  const handleChangeField = (val) => {
    onChange(val);
    setSearch(val);
  };

  return (
    <>
      {handleGetFilteredOptions()?.length === 0 && editValue ? (
        <ProfileField
          label={label}
          value={value}
          onChange={handleChangeField}
          initOpen={open}
          placeholder="Введіть значення"
        />
      ) : (
        <StyledSelect
          hideArrowDefault={hideArrowDefault}
          className={`${className} ${error && "error-field"} ${
            open && "active selectOpened"
          } `}
          error={error?.toString()}
          onClick={(e) => {
            !open && setOpen(!open);
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {Icon && <SelectIcon Icon={Icon} />}
              <div>
                {open && isSearch ? (
                  <input
                    type="text"
                    placeholder="Пошук"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    autoFocus
                    onKeyDown={handlePressEnter}
                  />
                ) : (
                  <Value
                    value={
                      editValue
                        ? value
                        : options?.find((opt) => opt.value === value)?.title
                    }
                    placeholder={placeholder}
                  />
                )}
                {open ? null : <Label label={label} required={required} />}
              </div>
            </div>
            <button
              onClick={(e) => {
                setOpen(!open);
              }}
            >
              <Arrow className="arrow" />
            </button>
          </div>
          <Dropdown
            open={open}
            onChange={handleChange}
            options={handleGetFilteredOptions()}
            editValue={editValue}
          />
          {open && (
            <div
              className="modal-overlay"
              onClick={() => setOpen(false)}
              onWheel={(e) => {
                setOpen(false);
              }}
            ></div>
          )}
        </StyledSelect>
      )}
    </>
  );
};

const StyledSelect = styled.button`
  padding: 8px 22px 9px 11px;
  border-radius: 6px;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  color: var(--main-color);
  display: block;
  width: 100%;
  text-align: left;
  ${({ error }) => error === "true" && "border: 1px solid red;"}
  .arrow {
    ${({ hideArrowDefault }) => hideArrowDefault && "opacity: 0;"}
  }
  .arrow path {
    fill: #fff;
  }

  input {
    position: relative;
    z-index: 10;
  }
  &:hover {
    background: var(--bg-10);
    .arrow {
      opacity: 1;
    }
    .select-icon {
      background: var(--bg-10);
    }
  }
  svg {
    transition: all 0.3s;
  }
  &.active {
    background: #fff !important;
    border-radius: 6px 6px 0 0 !important;
    color: #2c2c2c;
    .arrow path {
      fill: var(--main-bg);
    }
    .arrow {
      transform: rotate(180deg);
      opacity: 1;
    }
    .select-icon {
      background: rgba(44, 44, 44, 0.85) !important;
    }
    .selectDropdown {
      visibility: visible;
      opacity: 1;
    }
  }
`;
