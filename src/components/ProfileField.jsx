import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { ReactComponent as CheckboxIcon } from "../assets/images/checkbox.svg";
import { ReactComponent as ClearButton } from "../assets/images/delete-access.svg";
import {
  handleFormatDate,
  handleFormatInputDate,
  handleRemovePhoneMask,
  removePhoneMask,
} from "../utilits";
import { PhoneInput } from "./PhoneInput";
import { Calendar } from "./Calendar/Calendar";
import ReactInputMask from "react-input-mask";
import { ReactComponent as EditIcon } from "../assets/images/edit-company.svg";

export const ProfileField = ({
  value,
  placeholder,
  label,
  password,
  className,
  textarea,
  grey,
  big,
  contentHeight,
  onChange,
  onSave,
  phone,
  phonesCodes,
  phoneCode,
  onChangePhoneCode,
  readOnly,
  type,
  error,
  onlyCalendar,
  onBlur,
  onClick,
  onFocus,
  reset,
  initOpen,
  onClickOnIconEdit,
  alwaysOpen,
  noAutoFill,
}) => {
  const fieldRef = useRef();
  const [active, setActive] = useState(initOpen);
  const [open, setOpen] = useState(initOpen);
  const textareaRef = useRef(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dateInput, setDateInput] = useState(value);

  const textAreaAdjust = (e) => {
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
    onChange && onChange(e.target.value);
  };

  const handleToggleActive = () => {
    if (!alwaysOpen) {
      setActive(!active);
      setOpen(!open);
      active && onSave && onSave();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaRef.current]);

  const handleChangePhoneCode = (cod) => {
    onChangePhoneCode(cod);
    // onChange("");
  };

  const handleChangeValue = (val) => {
    onChange(val);
  };

  useEffect(() => {
    if (type === "date") {
      setDateInput(handleFormatInputDate(value));
    }
  }, [value]);

  const handleClose = () => {
    if (!alwaysOpen) {
      setActive(false);
      setOpen(false);
    }
  };

  const handlePressKey = (e) => {
    const keyCode = e?.keyCode;
    if (keyCode === 13) {
      handleClose();
      onSave && onSave();
      onBlur && onBlur();
    } else if (keyCode === 34) {
      e.target.blur();
      setActive(false);
      setOpen(false);
      setCalendarOpen(false);
      onBlur && onBlur();
    }
  };

  return (
    <StyledProfileField
      active={active?.toString()}
      password={password}
      className={`${className} ${active && "active"} ${error && "error-field"}`}
      grey={grey}
      big={big}
      error={error?.toString()}
      ref={fieldRef}
      onClick={(e) => {
        onClick && onClick();
        if (onClickOnIconEdit && e.target.classList.contains("edit-icon")) {
          setActive(false);
          setOpen(false);
        } else if (!active && !readOnly) {
          setActive(true);
          setOpen(true);
          onFocus && onFocus();
        }
      }}
    >
      {type === "date" && active && open && (calendarOpen || onlyCalendar) && (
        <div className="calendar_wrapper">
          <Calendar
            value={value}
            onChange={handleChangeValue}
            onClose={() => {
              if (onlyCalendar) {
                setActive(false);
                setOpen(false);
              }
            }}
          />
        </div>
      )}
      {/* {type === "date" && !onlyCalendar && (
        <CalendarIcon
          onClick={() => setCalendarOpen(!calendarOpen)}
          className={`check-icon calendar-icon ${calendarOpen && "active"}`}
        />
      )} */}
      {!readOnly && reset && (
        <ClearButton
          onClick={() => {
            onChange(undefined);
            handleToggleActive();
          }}
          className="check-icon clear"
        />
      )}
      {!readOnly && !alwaysOpen && (
        <CheckboxIcon onClick={handleToggleActive} className="check-icon" />
      )}
      <div className="flex items-center justify-between">
        {active ? (
          <>
            {phone ? (
              <PhoneInput
                phoneCode={phoneCode}
                phonesCodes={phonesCodes}
                onChangePhoneCode={handleChangePhoneCode}
                value={value}
                onChange={onChange}
                inputClassName="value"
                onKeyDown={handlePressKey}
                onFocus={onFocus}
              />
            ) : textarea ? (
              <textarea
                className="value"
                value={value}
                ref={textareaRef}
                onChange={textAreaAdjust}
                placeholder={placeholder}
                autoFocus
                onBlur={() => {
                  onBlur && onBlur();
                }}
              />
            ) : (type === "date" && calendarOpen) || onlyCalendar ? (
              <span
                className="value hide-scroll"
                onClick={() => {
                  !active && !readOnly && setActive(true);
                  setOpen(!open);
                }}
              >
                {handleFormatDate(value, true)}
              </span>
            ) : type === "date" ? (
              <ReactInputMask
                mask={"99.99.9999"}
                className="value"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e?.keyCode === 13) {
                    setOpen(false);
                    setActive(false);
                    onSave && onSave();
                  }
                }}
                onBlur={() => {
                  onBlur && onBlur();
                }}
              />
            ) : (
              <input
                className="value hide-scroll"
                value={
                  type === "date" && !calendarOpen
                    ? handleFormatDate(value, true)
                    : type === "number" && Number(value) === 0
                    ? ""
                    : value
                }
                autocomplete={noAutoFill ? "new-password" : undefined}
                placeholder={placeholder}
                onChange={(e) =>
                  type === "number"
                    ? Number(e.target.value) >= 0
                      ? onChange(e.target.value)
                      : null
                    : onChange && type !== "date"
                    ? onChange(e.target.value)
                    : null
                }
                type={type ?? "text"}
                autoFocus
                onKeyDown={handlePressKey}
                onWheel={(e) => {
                  e.target.blur();
                  setActive(false);
                  setOpen(false);
                  setCalendarOpen(false);
                  onBlur && onBlur();
                }}
                onBlur={() => {
                  onBlur && onBlur();
                }}
              />
            )}
          </>
        ) : (
          <div className="value hide-scroll" title={value ?? ""}>
            {phone && value?.length > 0
              ? `${
                  phonesCodes?.find(({ id }) => id === phoneCode)?.code
                    ? phonesCodes?.find(({ id }) => id === phoneCode)?.code
                    : phonesCodes?.find(({ code }) => code === phoneCode)
                        ?.code ?? ""
                }${removePhoneMask(value)}`
              : type === "number" && Number(value) === 0
              ? placeholder
              : value?.length > 0
              ? value?.split("\r\n")?.map((v) => <div>{v}</div>)
              : type === "date"
              ? handleFormatDate(value, true)
              : placeholder}
          </div>
        )}
        {readOnly || open ? null : (
          <div
            className="edit-btn flex items-center justify-center"
            onClick={() => {
              onClickOnIconEdit && onClickOnIconEdit();
              handleToggleActive();
            }}
          >
            <EditIcon className="edit-icon" />
          </div>
        )}
      </div>
      {!big && (
        <>
          <div className="label labelItem">{label}</div>
          <div className="label label-hover">{label}</div>
        </>
      )}
      {open && active && !alwaysOpen && (
        <div
          className="modal-overlay"
          onClick={() => {
            setActive(false);
            setOpen(false);
            setCalendarOpen(false);
            onBlur && onBlur();
          }}
        ></div>
      )}
    </StyledProfileField>
  );
};

const StyledProfileField = styled.button`
  padding: ${({ big }) => (big ? "8px 11px 8px" : "8px 11px 9px")};
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  background: rgba(255, 255, 255, 0);
  background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 50%,
      var(--card-bg-2) 50%
    )
    right;
  background-size: 210%;
  transition: 0.5s ease-out;
  display: block;
  width: 100%;
  text-align: left;
  ${({ error }) => error === "true" && "border: 1px solid red;"}

  .value {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
    position: relative;
    transition: all 0.3s;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 90%;
    white-space: nowrap;
    ${({ password }) => password && " filter: blur(5px);"}
    ${({ big }) =>
      big &&
      `
        color: var(--color-40);
        font-family: Overpass;
        font-size: 20px;
        font-style: normal;
        font-weight: 100 !important;
        line-height: 118%; /* 23.6px */
        letter-spacing: 0.4px;
    `};
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    &[type="number"] {
      -moz-appearance: textfield; /* Firefox */
    }
    &[type="date"]::-webkit-calendar-picker-indicator {
      display: none;
      -webkit-appearance: none;
    }
  }

  input,
  textarea {
    z-index: 10;
  }
  .calendar-icon {
    right: 30px !important;
    &.active {
      g {
        opacity: 1;
      }
    }
  }
  .label {
    color: var(--subtitle-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    margin-top: 2px;
    text-transform: capitalize;
  }

  textarea {
    resize: none;
    width: 100%;
    overflow: auto !important;
  }
  .label-hover {
    display: none;
  }

  .check-icon {
    z-index: 80;
  }
  &:hover {
    background-position: left;
    .label {
      display: none;
    }
    .label-hover {
      display: block;
    }
    .value {
      filter: blur(0px);
    }
    .edit-btn {
      opacity: 0.4;
      transform: translateX(0px);
    }
  }
  .check-icon {
    position: absolute;
    top: 7px;
    right: 7px;
    cursor: pointer;
    transition: all 0.3s;
    visibility: hidden;
    opacity: 0;
    g {
      transition: all 0.3s;
    }
    ${({ big }) =>
      big &&
      `
       top: 50%;
       transform: translateY(-50%);
    `}
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
  .clear {
    right: 27px;
    path {
      opacity: 0.4;
    }
    &:hover {
      path {
        opacity: 1;
      }
    }
    path {
      fill: var(--main-bg);
    }
  }
  ${({ active, grey }) =>
    active === "true" &&
    `
    background:  ${
      grey ? " var(--card-bg-2)" : "var(--active-input-bg)"
    } !important;
    .check-icon {
        opacity: 1;
        visibility: visible;
    }
    ${
      !grey
        ? `
        .value, .label {
            color: #2C2C2C;
            filter: blur(0px);
        }
    `
        : `
        path {
            fill: var(--main-bg);
        }
    `
    }
  `}
  .code-select-wrapper {
    color: #2c2c2c;
    padding: 0;
    .arrow path {
      fill: var(--main-bg);
    }
  }

  .calendar_wrapper {
    position: absolute;
    top: 100%;
    background: var(--bg-41);
    max-width: 320px;
    left: 0;
    z-index: 1000;
  }
  .edit-btn {
    position: absolute;
    top: 7px;
    right: 7px;
    opacity: 0.4;
    border-radius: 8px;
    width: 28px;
    transition: all 0.3s;
    height: 28px;
    cursor: pointer;
    margin-left: 10px;
    z-index: 10;
    flex-shrink: 0;
    ${({ edit }) => !edit && " opacity: 0; transform: translateX(-10px);"}
    &:hover {
      background: var(--bg-20) !important;
      opacity: 1 !important;
    }
  }
  svg {
    flex-shrink: 0;
  }
  .edit-icon {
    path {
      fill: var(--main-color) !important;
    }
  }
`;
