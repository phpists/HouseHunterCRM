import styled from "styled-components";
import { Type } from "./Type/Type";
import { Divider } from "./Divider";
import { Phones } from "./Phones/Phones";
import { useState } from "react";
import { Agent } from "./Agent/Agent";
import { Field } from "../../../../components/Field";
import { Status } from "./Status/Status";
import { MoreButton } from "./MoreButton";

export const CallCard = ({ selected, onSelect }) => {
  const [open, setOpen] = useState();

  const handleClick = (e) =>
    e.target.classList.contains("clickable") && onSelect();

  return (
    <StyledCallCard
      className="flex items-start clickable"
      onClick={handleClick}
      selected={selected}
    >
      <Type />
      <Divider />
      <Phones open={open} onToggleOpen={() => setOpen(!open)} />
      <Divider />
      <Agent />
      <Divider />
      <Field
        placeholder="Почніть писати"
        label="Коментар"
        className="comment"
        full
      />
      <Divider />
      <Status />
      <MoreButton />
    </StyledCallCard>
  );
};

const StyledCallCard = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: #3d3d3d;
  border: 1px solid rgba(255, 255, 255, 0);
  transition: all 0.3s;
  .comment {
    width: 204px;
    height: 60px;
    background: #444;
  }
  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.4);
  }

  ${({ selected }) =>
    selected &&
    `
      border: 1px solid rgba(255, 255, 255, 1) !important;
  `}
`;
