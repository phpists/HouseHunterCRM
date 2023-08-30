import { styled } from "styled-components";
import { TaskCard } from "../../TaskCard/TaskCard";
import { Divider } from "../../../Divider";

export const Dropdown = ({ onSelect }) => (
  <StyledDropdown className="hide-scroll" onClick={onSelect}>
    <Divider />
    <TaskCard />
    <Divider />
    <TaskCard />
    <Divider />
    <TaskCard />
    <Divider />
    <TaskCard />
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  background: #4b4b4b;
  border-radius: 0 0 9px 9px;
  z-index: 4;
  overflow-x: hidden;
  height: 200px;
  overflow-y: auto;
`;
