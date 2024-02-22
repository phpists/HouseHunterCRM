import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { ReactComponent as CheckboxIcon } from "../assets/images/checkbox.svg";
import {
  handleFormatDate,
  handleFormatInputDate,
  handleRemovePhoneMask,
  onClickOutside,
} from "../utilits";
import { PhoneInput } from "./PhoneInput";
import { Calendar } from "./Calendar/Calendar";
import { ReactComponent as CalendarIcon } from "../assets/images/calendar.svg";
import ReactInputMask from "react-input-mask";

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
}) => {
  const fieldRef = useRef();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const textareaRef = useRef(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dateInput, setDateInput] = useState(value);

  const textAreaAdjust = (e) => {
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
    onChange && onChange(e.target.value);
  };

  const handleToggleActive = () => {
    setActive(!active);
    active && onSave && onSave();
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaRef.current]);

  const handleChangePhoneCode = (cod) => {
    onChangePhoneCode(cod);
    onChange("");
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
    setActive(false);
    setOpen(false);
  };

  const handlePressKey = (e) => {
    if (e?.keyCode === 13) {
      handleClose();
      onSave && onSave();
    }
  };

  return (
    <StyledProfileField
      active={active}
      password={password}
      className={`${className} ${active && "active"} ${error && "error-field"}`}
      grey={grey}
      big={big}
      error={error}
      ref={fieldRef}
      onClick={() => {
        if (!active && !readOnly) {
          setActive(true);
          setOpen(true);
        }
      }}
    >
      {type === "date" && active && open && (calendarOpen || onlyCalendar) && (
        <div className="calendar_wrapper">
          <Calendar value={value} onChange={handleChangeValue} />
        </div>
      )}
      {/* {type === "date" && !onlyCalendar && (
        <CalendarIcon
          onClick={() => setCalendarOpen(!calendarOpen)}
          className={`check-icon calendar-icon ${calendarOpen && "active"}`}
        />
      )} */}
      {!readOnly && (
        <CheckboxIcon onClick={handleToggleActive} className="check-icon" />
      )}
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
              //   onBlur={() => {
              //     setActive(false);
              //     setOpen(false);
              //     setCalendarOpen(false);
              //   }}
            />
          ) : textarea ? (
            <textarea
              className="value hide-scroll"
              defaultValue={value}
              ref={textareaRef}
              onChange={textAreaAdjust}
              placeholder={placeholder}
              autoFocus
              onKeyDown={handlePressKey}
              //   onBlur={() => {
              //     setActive(false);
              //     setOpen(false);
              //     setCalendarOpen(false);
              //   }}
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
            />
          ) : (
            <input
              className="value hide-scroll"
              value={
                type === "date" && !calendarOpen
                  ? handleFormatDate(value, true)
                  : value
              }
              placeholder={placeholder}
              onChange={(e) =>
                onChange && type !== "date" ? onChange(e.target.value) : null
              }
              type={type ?? "text"}
              autoFocus
              onKeyDown={handlePressKey}
              //   onBlur={() => {
              //     setActive(false);
              //     setOpen(false);
              //     setCalendarOpen(false);
              //   }}
            />
          )}
        </>
      ) : (
        <div className="value hide-scroll">
          {phone && value?.length > 0
            ? `${
                phonesCodes?.find(({ id }) => id === phoneCode)?.code
                  ? phonesCodes?.find(({ id }) => id === phoneCode)?.code
                  : phonesCodes?.find(({ code }) => code === phoneCode)?.code ??
                    ""
              }${handleRemovePhoneMask(value)}`
            : value?.length > 0
            ? value
            : type === "date"
            ? handleFormatDate(value, true)
            : placeholder}
        </div>
      )}
      {!big && (
        <>
          <div className="label">{label}</div>
          <div className="label label-hover">
            {readOnly ? label : "Змінити"}
          </div>
        </>
      )}
      {open && active && (
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
      rgba(255, 255, 255, 0.05) 50%
    )
    right;
  background-size: 210%;
  transition: 0.5s ease-out;
  display: block;
  width: 100%;
  text-align: left;
  ${({ error }) => error && "border: 1px solid red;"}

  .value {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
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
        color: rgba(255, 255, 255, 0.40);
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
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
    margin-top: 2px;
    text-transform: capitalize;
  }

  textarea {
    resize: none;
    width: 100%;
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
  ${({ active, grey }) =>
    active &&
    `
    background:  ${grey ? "rgba(255, 255, 255, 0.05)" : "#FFF"} !important;
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
            fill: #FFF;
        }
    `
    }
  `}
  .code-select-wrapper {
    color: #2c2c2c;
    padding: 0;
    .arrow path {
      fill: #2c2c2c;
    }
  }

  .calendar_wrapper {
    position: absolute;
    top: 100%;
    background: #414141;
    max-width: 320px;
    left: 0;
    z-index: 1000;
  }
`;
