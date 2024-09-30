import { styled } from "styled-components";
import { showAlert } from "../utilits";

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
    <StyledId onClick={handleCopy} className="flex items-center justify-center">
      ID
    </StyledId>
  );
};

const StyledId = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 8px;
  padding: 1px 6px 2px;
  border-radius: 5px;
  background: rgba(88, 175, 255, 0.3);
  color: #58afff;
  font-family: Open Sans;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.22px;
  max-width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex-shrink: 0;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    border: 1px solid #58afff;
  }
`;
