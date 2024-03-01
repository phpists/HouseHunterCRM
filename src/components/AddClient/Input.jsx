import ReactInputMask from "react-input-mask";
import styled from "styled-components";
import { CodeSelect } from "../Select copy/CodeSelect";
import { PhoneInput } from "../PhoneInput";

export const Input = ({
  label,
  className,
  phone,
  value,
  onChange,
  error,
  phonesCodes,
  phoneCode,
  onChangePhoneCode,
}) => (
  <StyledInput
    className={`${className} `}
    error={error?.toString()}
    phone={phone}
  >
    <div className="label">{label}</div>
    {phone ? (
      <PhoneInput
        phoneCode={phoneCode}
        phonesCodes={phonesCodes}
        onChangePhoneCode={onChangePhoneCode}
        value={value}
        onChange={onChange}
      />
    ) : (
      <input
        type="text"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </StyledInput>
);

const StyledInput = styled.div`
  margin-bottom: 15px;
  .label {
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 120%;
    margin-bottom: 4px;
    text-align: left;
  }
  input {
    border-radius: ${({ phone }) => (phone ? "0 6px 6px 0" : "6px")};
    background: #474747;
    padding: 10px;
    color: ${({ error }) =>
      error === "true" ? "#ff2e2e" : "rgba(255, 255, 255, 1)"};

    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 120%;
    width: 100%;
    transition: all 0.3s;
    height: 37px;
    ${({ error }) => error === "true" && "border: 1px solid #ff2e2e;"}
  }
  .code-select-wrapper {
    background: #474747;
    padding: 10px;
    height: 37px;
  }
`;
