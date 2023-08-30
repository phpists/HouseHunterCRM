import { useRef, useState } from "react";
import { styled } from "styled-components";

export const Comment = ({ label }) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const textAreaAdjust = (e) => {
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <StyledComment className={`flex flex-col ${isFocused && "active"}`}>
      <textarea
        type="text"
        placeholder="Почніть писати"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        contentEditable
        onKeyDown={textAreaAdjust}
        ref={textareaRef}
        className="hide-scroll"
      />
      <div className="label">{label ?? "Коментар"}</div>
    </StyledComment>
  );
};
const StyledComment = styled.div`
  padding: 7px 10px 6px;
  border-radius: 9px;
  transition: all 0.3s;
  textarea {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    resize: none;
    height: 18px;
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
      font-family: Overpass;
      font-size: 15px;
      font-style: normal;
      font-weight: 300;
      line-height: 118%; /* 17.7px */
      letter-spacing: 0.3px;
    }
  }
  .label {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  &:hover,
  &.active {
    background: rgba(255, 255, 255, 0.05);
    textarea {
      &::placeholder {
        color: #fff;
        font-family: Overpass;
        font-size: 15px;
        font-style: normal;
        font-weight: 300;
        line-height: 118%; /* 17.7px */
        letter-spacing: 0.3px;
        resize: none;
        height: auto;
      }
    }
  }
`;
