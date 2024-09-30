import { styled } from "styled-components";
import { showAlert } from "../../../../../utilits";

export const Id = ({ id }) => {
  const handleCopy = () => {
    const link = document.createElement("input");
    link.value = id;
    document.body.appendChild(link);
    link.select();
    document.execCommand("copy");
    document.body.removeChild(link);
    showAlert("success", "Успішно скопійовано");
  };

  return (
    <StyledId onClick={handleCopy} className="clickable">
      ID
    </StyledId>
  );
};

const StyledId = styled.div`
  padding: 1px 6px 2px;
  border-radius: 5px;
  background: rgba(88, 175, 255, 0.3);
  color: #58afff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.22px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex-shrink: 0;
  width: max-content;
  margin-left: 5px;
  cursor: pointer;
`;
