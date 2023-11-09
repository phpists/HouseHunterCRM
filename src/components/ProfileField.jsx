import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { ReactComponent as CheckboxIcon } from "../assets/images/checkbox.svg";
import { handleRemovePhoneMask } from "../utilits";
import { PhoneInput } from "./PhoneInput";

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
}) => {
  const [active, setActive] = useState(false);
  const textareaRef = useRef(null);

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

  return (
    <StyledProfileField
      onClick={() => !active && !readOnly && setActive(true)}
      active={active}
      password={password}
      className={`${className} ${active && "active"} ${error && "error-field"}`}
      grey={grey}
      big={big}
      error={error}
    >
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
            />
          ) : textarea ? (
            <textarea
              className="value hide-scroll"
              defaultValue={value}
              ref={textareaRef}
              onChange={textAreaAdjust}
              placeholder={placeholder}
            />
          ) : (
            <input
              className="value hide-scroll"
              value={value}
              placeholder={placeholder}
              onChange={(e) => (onChange ? onChange(e.target.value) : null)}
              type={type ?? "text"}
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
            : placeholder}
        </div>
      )}
      {!big && (
        <>
          <div className="label">{active ? "Змінити" : label}</div>
          <div className="label label-hover">
            {readOnly ? label : "Змінити"}
          </div>
        </>
      )}
    </StyledProfileField>
  );
};

const StyledProfileField = styled.div`
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
    width: 100%;
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
`;
