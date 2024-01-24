import { useState } from "react";
import { styled } from "styled-components";

export const Description = ({ value, onChange, edit }) => {
  const handleSave = (e) => {
    const newValue = e.target.value;
    if (value !== newValue && newValue?.length > 0) {
      onChange(newValue);
    }
  };

  return (
    <StyledDescription>
      {edit ? (
        <textarea
          defaultValue={value}
          onBlur={handleSave}
          placeholder="Введіть значення"
        ></textarea>
      ) : value?.length > 0 ? (
        value
      ) : (
        "-"
      )}
    </StyledDescription>
  );
};

const StyledDescription = styled.div`
  color: #fff;
  font-family: "Open Sans";
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
  textarea {
    height: 50px;
    width: 100%;
    resize: none;
  }
`;
