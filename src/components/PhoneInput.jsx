import ReactInputMask from "react-input-mask";
import { CodeSelect } from "./Select copy/CodeSelect";
import { handleRemovePhoneMask, removePhoneMask } from "../utilits";
import { useRef } from "react";
import { IMaskInput } from "react-imask";

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
      onChange(handleRemovePhoneMask(e.target.value)?.replace(/\s/g, ""));
    }
  };

  const handleGetValueStartIndex = (e) => {
    const inputValue = e?.target.value;
    let valueStart = 0;
    inputValue.split("").forEach((str, i) => {
      if (!isNaN(str)) {
        valueStart = 1 + i;
      }
    });

    return valueStart;
  };
  //   const handleSetRangeInTheStart = (e) => {
  //     if (e?.target?.setSelectionRange) {
  //       const valueStart = handleGetValueStartIndex(e);
  //       e?.target?.setSelectionRange(valueStart, valueStart);
  //     }
  //   };

  const handleFocus = (e) => {
    onFocus && onFocus();
    //   handleSetRangeInTheStart(e);
    //   if (e.target.scrollLeft) {
    //     e.target.scrollLeft = 0;
    //   }
  };

  //   const handleSetRange = (e) => {
  //     const start = e.target.selectionStart;
  //     const valueStart = handleGetValueStartIndex(e);

  //     if (start > valueStart) {
  //       handleSetRangeInTheStart(e);
  //     }
  //   };

  return (
    <div className="flex items-center relative">
      <CodeSelect
        value={phoneCode}
        className="code-select-wrapper"
        options={phonesCodes}
        onChange={onChangePhoneCode}
        onFocus={onFocus}
      />
      <IMaskInput
        className={inputClassName}
        mask={phonesCodes
          ?.find(({ id }) => id === phoneCode)
          ?.format?.split(" ")
          .join("")
          ?.replaceAll("9", "0")}
        value={value}
        unmask={true} // true|false|'typed'
        inputRef={inputRef} // access to nested input
        onAccept={(value, mask) => onChange(value)}
        autoFocus
        onFocus={handleFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
