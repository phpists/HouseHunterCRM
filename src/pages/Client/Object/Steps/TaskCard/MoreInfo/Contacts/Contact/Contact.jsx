import { styled } from "styled-components";
import { Name } from "./Name";
import { useState } from "react";
import { AddButton } from "./AddButton";
import { RemoveBtn } from "./RemoveBtn";

export const Contact = ({ isFirst, onAdd, onRemove }) => {
  const [isHover, setIsHover] = useState(false);
  const [type, setType] = useState("agentMe");

  const handleToggleType = () => {
    setType(
      type === "agentMe" ? "agent" : type === "agent" ? "owner" : "agentMe"
    );
  };

  return (
    <StyledContact
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex items-center justify-between"
    >
      <Name
        name="Василь В."
        type={type}
        isHover={isHover}
        onClick={handleToggleType}
      />
      {isFirst ? (
        <AddButton onClick={onAdd} />
      ) : (
        <RemoveBtn onClick={onRemove} />
      )}
    </StyledContact>
  );
};

const StyledContact = styled.div`
  padding: 7px 7px 7px 10px;
  border-radius: 9px;
  transition: all 0.3s;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
