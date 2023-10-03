import styled from "styled-components";
import { Type } from "./Type/Type";
import { Divider } from "./Divider";
import { Phones } from "./Phones/Phones";
import { Agent } from "./Agent/Agent";
import { Field } from "../../../../components/Field";
import { Status } from "./Status/Status";
import { MoreButton } from "./MoreButton/MoreButton";

export const DesktopContent = ({
  open,
  onToggleOpen,
  openMore,
  onOpenMore,
}) => (
  <StyledDesktopContent className="flex items-start clickable">
    <Type />
    <Divider />
    <Phones open={open} onToggleOpen={onToggleOpen} />
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
    <MoreButton openMore={openMore} onOpenMore={onOpenMore} />
  </StyledDesktopContent>
);

const StyledDesktopContent = styled.div`
  .comment {
    width: 204px;
    height: 60px;
    background: #444;
  }
  @media (max-width: 1600px) {
    display: none;
  }
`;
