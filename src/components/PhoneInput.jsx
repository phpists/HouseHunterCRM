import { CodeSelect } from "./Select copy/CodeSelect";
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
  mask,
  placeholder,
}) => {
  const inputRef = useRef(null);

  const handlePaste = (e) => {
    let paste =
      e.clipboardData.getData("text/plain") ||
      window.clipboardData.getData("text");

    if (e.target.selectionEnd === 14) {
      const { code } = phonesCodes?.find((c) => c.id === phoneCode);
      onChange(paste?.replace(code, "")?.replace(/\s/g, ""));
    } else if (value?.length > 0) {
      onChange(e.target.value);
    } else if (paste?.length > 1) {
      const { code } = phonesCodes?.find((c) => c.id === phoneCode);
      onChange(paste?.replace(code, "")?.replace(/\s/g, ""));
    } else {
      onChange(e.target.value?.replace(/\s/g, ""));
    }
  };

  const handleFocus = (e) => {
    onFocus && onFocus();
  };

  const handleGetMask = () =>
    phonesCodes
      ?.find(({ id }) => id === phoneCode)
      ?.format?.split(" ")
      .join("")
      ?.replaceAll("9", "0");

  const handleGetMaskSymbolsNumber = () =>
    phonesCodes ? handleGetMask()?.replaceAll("0", "")?.length : 0;

  return (
    <div className="flex items-center relative">
      {mask ? null : (
        <CodeSelect
          value={phoneCode}
          className="code-select-wrapper"
          options={phonesCodes}
          onChange={onChangePhoneCode}
          onFocus={onFocus}
        />
      )}
      <IMaskInput
        className={inputClassName}
        mask={
          mask ??
          handleGetMask()?.slice(
            0,
            Number(phonesCodes?.find(({ id }) => id === phoneCode)?.num_count) +
              handleGetMaskSymbolsNumber()
          )
        }
        value={value}
        unmask={true} // true|false|'typed'
        inputRef={inputRef} // access to nested input
        onAccept={(value, mask) => onChange(value)}
        autoFocus
        onFocus={handleFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onPaste={handlePaste}
        placeholder={placeholder}
      />
    </div>
  );
};
