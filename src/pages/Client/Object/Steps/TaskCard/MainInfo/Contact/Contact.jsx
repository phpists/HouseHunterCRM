import { styled } from "styled-components";
import { Name } from "./Name";
import { useState } from "react";
import { Phone } from "./Phone";

export const Contact = () => {
  const [type, setType] = useState("agentMe");

  const handleToggleType = () => {
    setType(
      type === "agentMe" ? "agent" : type === "agent" ? "owner" : "agentMe"
    );
  };
  return (
    <StyledContact>
      <Name name="Василь В." type={type} onClick={handleToggleType} />
      <Phone />
    </StyledContact>
  );
};

const StyledContact = styled.div``;
