import { useState } from "react";
import { styled } from "styled-components";

export const Description = ({ value, onChange, edit, onCloseEdit }) => {
  const handleSave = (e, isCloseEdit) => {
    const newValue = e.target.value;
    if (value !== newValue) {
      onChange(newValue);
    }
    isCloseEdit && onCloseEdit();
  };

  return (
    <StyledDescription>
      {edit ? (
        <textarea
          defaultValue={value}
          onBlur={handleSave}
          placeholder="Введіть опис"
          autoFocus
          onKeyDown={(e) => e?.keyCode === 13 && handleSave(e, true)}
        ></textarea>
      ) : value?.length > 0 ? (
        value
      ) : (
        "Введіть опис"
      )}
    </StyledDescription>
  );
};

const StyledDescription = styled.div`
  color: var(--main-color);
  font-family: "Open Sans";
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
  textarea {
    height: 50px;
    width: 100%;
    resize: none;
  }
`;
