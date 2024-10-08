import styled from "styled-components";
import { ToggleOption } from "./ToggleOption";
import { Divider } from "./Divider";
import { SeachInput } from "./SeachInput";
import { List } from "./List/List";

export const Dropdown = ({ status, onSetStatus }) => {
  return (
    <StyledDropdown>
      <ToggleOption status={status} onSetStatus={onSetStatus} />
      {/* <Divider />
      <SeachInput />
      <List /> */}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: absolute;
  top: calc(100% + 28px);
  width: 100%;
  right: -20px;
  overflow: hidden;
  border-radius: 9px;
  border: 1px solid var(--bg-10);
  background: #4b4b4b;
  border-radius: 9px;
  width: 254px;
  z-index: 20;
  padding: 6px;
  @media (max-width: 600px) {
    right: 0;
    top: 20px;
  }
`;
