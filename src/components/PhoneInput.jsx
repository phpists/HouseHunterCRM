import ReactInputMask from "react-input-mask";
import { CodeSelect } from "./Select copy/CodeSelect";

export const PhoneInput = ({
  phoneCode,
  phonesCodes,
  onChangePhoneCode,
  value,
  onChange,
  inputClassName,
  onBlur,
  onKeyDown,
}) => (
  <div className="flex items-center relative">
    <CodeSelect
      value={phoneCode}
      className="code-select-wrapper"
      options={phonesCodes}
      onChange={onChangePhoneCode}
    />
    <ReactInputMask
      className={inputClassName}
      mask={phonesCodes
        ?.find(({ id }) => id === phoneCode)
        ?.format?.split(" ")
        .join("")}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  </div>
);
