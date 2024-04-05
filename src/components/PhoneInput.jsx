import ReactInputMask from "react-input-mask";
import { CodeSelect } from "./Select copy/CodeSelect";
import { removePhoneMask } from "../utilits";
import { useRef } from "react";

export const PhoneInput = ({
  phoneCode,
  phonesCodes,
  onChangePhoneCode,
  value,
  onChange,
  inputClassName,
  onBlur,
  onKeyDown,
  onFocus,
}) => {
  const inputRef = useRef(null);

  const handlePaste = (e) => {
    let paste =
      e.clipboardData.getData("text/plain") ||
      window.clipboardData.getData("text");

    if (paste?.length > 1) {
      const { code } = phonesCodes?.find((c) => c.id === phoneCode);
      onChange(paste?.replace(code, "")?.replace(/\s/g, ""));
    } else {
      onChange(e.target.value?.replace(/\s/g, ""));
    }
  };

  const handleChange = (e) => {
    if (e.nativeEvent.inputType === "insertFromPaste") {
    } else {
      onChange(e.target.value);
    }
  };

  const handleSetRangeInTheStart = (e) => {
    if (e?.target?.setSelectionRange) {
      e?.target?.setSelectionRange(0, 0);
    }
  };

  const handleFocus = (e) => {
    onFocus && onFocus();
    handleSetRangeInTheStart(e);
    if (e.target.scrollLeft) {
      e.target.scrollLeft = 0;
    }
  };

  return (
    <div className="flex items-center relative">
      <CodeSelect
        value={phoneCode}
        className="code-select-wrapper"
        options={phonesCodes}
        onChange={onChangePhoneCode}
        onFocus={onFocus}
      />
      <ReactInputMask
        className={inputClassName}
        mask={phonesCodes
          ?.find(({ id }) => id === phoneCode)
          ?.format?.split(" ")
          .join("")}
        value={value}
        onChange={handleChange}
        autoFocus
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        alwaysShowMask
        onPaste={handlePaste}
        onFocus={handleFocus}
        ref={inputRef}
        onClick={handleSetRangeInTheStart}
      />
    </div>
  );
};
