import styled from "styled-components";
import { ToggleOption } from "./ToggleOption";
import { Divider } from "./Divider";
import { SeachInput } from "./SeachInput";
import { List } from "./List/List";

export const SelectItemsDropdown = ({ onSetCallsStatus, status, onSend }) => {
  return (
    <StyledSelectItemsDropdown>
      <ToggleOption
        onSetCallsStatus={onSetCallsStatus}
        status={status}
        onSend={onSend}
      />
      {/* <Divider />
      <SeachInput />
      <List /> */}
    </StyledSelectItemsDropdown>
  );
};

const StyledSelectItemsDropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  background: var(--bg-10);
  border-radius: 0px 0px 9px 9px;
  overflow: hidden;
  backdrop-filter: blur(18.5px);
  border-top: var(--second-color-border);
  z-index: 100;
  text-align: left;
`;
