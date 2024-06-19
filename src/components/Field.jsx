import { useState } from "react";
import { styled } from "styled-components";
import { ReactComponent as EditIcon } from "../assets/images/edit-company.svg";
import { ReactComponent as CheckIcon } from "../assets/images/check.svg";
import ReactInputMask from "react-input-mask";
import { PhoneInput } from "./PhoneInput";
import { handleFormatDate } from "../utilits";

export const Field = ({
  value,
  label,
  className,
  hide,
  textarea,
  full,
  phone,
  placeholder,
  viewOnly,
  phonesCodes,
  phoneCode,
  onChangePhoneCode,
  noResetValueOnCodeChange,
  error,
  mobile,
  onChange = () => null,
  onSubmit,
  type,
  onFocus,
  onBlur,
  onClick,
}) => {
  const [edit, setEdit] = useState(false);

  const handleChangePhoneCode = (cod) => {
    onChangePhoneCode(cod);
    !noResetValueOnCodeChange && onChange("");
  };

  const handleToggleEdit = () => {
    if (edit && onSubmit) {
      onSubmit();
    }
    setEdit(!edit);
  };

  const handlePressEnter = (e) => {
    if (e?.keyCode === 13) {
      setEdit(false);
      onSubmit && onSubmit();
      onBlur && onBlur();
    }
  };

  return (
    <StyleField
      className={`flex items-center justify-between ${className} ${
        edit && "edit"
      }`}
      edit={edit}
      hide={hide}
      full={full}
      error={error}
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          !edit && !viewOnly && setEdit(true);
        }
      }}
    >
      <div className="field-content">
        {edit ? (
          <>
            {phone ? (
              <PhoneInput
                phoneCode={phoneCode}
                phonesCodes={phonesCodes}
                onChangePhoneCode={handleChangePhoneCode}
                value={value}
                onChange={onChange}
                inputClassName="value"
                onKeyDown={handlePressEnter}
              />
            ) : textarea ? (
              <textarea
                type="text"
                className="value"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                autoFocus
                onKeyDown={handlePressEnter}
              />
            ) : type === "date" ? (
              <ReactInputMask
                mask={"99.99.9999"}
                className="value"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                autoFocus
                onKeyDown={handlePressEnter}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            ) : (
              <input
                className="value"
                value={
                  type === "date"
                    ? handleFormatDate(value, true)
                    : type === "number" && Number(value) === 0
                    ? ""
                    : value
                }
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
                type={type === "date" ? "text" : type ?? "text"}
                autoFocus
                onKeyDown={handlePressEnter}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            )}
          </>
        ) : (
          <div className="value">
            {value?.length > 0 && phone
              ? `${
                  phonesCodes?.find((p) => p.id === phoneCode)?.code ?? ""
                }${value}`
              : type === "date"
              ? value
                ? value
                : "Введіть дату"
              : value?.length > 0
              ? value
              : placeholder}
          </div>
        )}
        <div className="label labelItem">{label}</div>
      </div>
      {viewOnly ? null : (
        <div
          className="edit-btn flex items-center justify-center"
          onClick={handleToggleEdit}
        >
          {edit ? <CheckIcon /> : <EditIcon className="edit-icon" />}
        </div>
      )}
      {edit && (
        <div
          className="modal-overlay"
          onClick={() => {
            setEdit(false);
            onSubmit && onSubmit();
          }}
        ></div>
      )}
    </StyleField>
  );
};

const StyleField = styled.div`
  width: 100%;
  padding: 7px 10px 6px;
  border-radius: 9px;
  transition: all 0.3s;
  flex-shrink: 0;
  position: relative;
  ${({ error }) => error && " border: 1px solid red !important;"}
  .field-content {
    width: 80%;
  }
  .value {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    width: 70%;
    ${({ hide }) => hide && "filter: blur(3px);"}
    text-overflow: ellipsis;
    overflow: hidden;
    ${({ full }) => (full ? "width: max-content;" : "white-space: nowrap;")}
    &::placeholder {
      color: var(--main-color);
      font-family: Overpass;
      font-size: 14px;
      font-style: normal;
      font-weight: 200;
      line-height: 118%; /* 17.7px */
      letter-spacing: 0.3px;
    }
  }
  input,
  textarea {
    position: relative;
    z-index: 100;
  }
  .label {
    color: var(--subtitle-color);
    font-family: Open Sans;
    font-size: 10px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
  }
  .edit-btn {
    opacity: 0.4;
    border-radius: 8px;
    width: 32px;
    transition: all 0.3s;
    height: 32px;
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
      /* fill: #fff !important; */
    }
  }
  &:hover {
    background: var(--card-bg-2);
    .value {
      filter: blur(0px);
      white-space: normal;
      width: 100%;
    }
    .edit-btn {
      opacity: 0.4;
      transform: translateX(0px);
    }
  }
  textarea {
    resize: none;
  }
  ${({ edit }) =>
    edit &&
    `
        border-radius: 9px;
        border: 1px solid rgba(255, 255, 255, 0.20);
        background:  var(--card-bg-2);
        .value {
            filter: blur(0px);
        }
  `}
  .calendar_wrapper {
    position: absolute;
    top: 100%;
    background: var(--bg-41);
    max-width: 320px;
    left: 0;
    z-index: 1000;
  }
`;
