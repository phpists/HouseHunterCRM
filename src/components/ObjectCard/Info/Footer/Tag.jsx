import styled from "styled-components";
import { showAlert } from "../../../../utilits";

export const Tag = ({ title, isCopy, copyValue }) => {
  const handleCopy = () => {
    const link = document.createElement("input");
    link.value = copyValue;
    document.body.appendChild(link);
    link.select();
    document.execCommand("copy");
    document.body.removeChild(link);
    showAlert("success", "Успішно скопійовано");
  };

  return (
    <StyledTag
      className={isCopy ? "" : "clickable"}
      onClick={isCopy ? handleCopy : undefined}
    >
      {title}
    </StyledTag>
  );
};

const StyledTag = styled.div`
  padding: 1px 4px 2px 4px;
  border-radius: 5px;
  background: var(--bg-10);
  color: var(--white-color);
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 1.3;
  letter-spacing: 0.22px;
  text-transform: capitalize;
  min-height: 18px;
  word-break: break-all;
`;
