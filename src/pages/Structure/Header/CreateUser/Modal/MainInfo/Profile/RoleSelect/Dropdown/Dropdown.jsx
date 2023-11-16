import styled from "styled-components";
import { Role } from "./Role";

export const Dropdown = ({ roles, onChangeActiveRole }) => (
  <StyledDropdown>
    {roles.map((role, i) => (
      <Role
        key={i}
        onClick={() => onChangeActiveRole(role.level)}
        title={role.title}
      />
    ))}
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  padding: 6px;
  border-radius: 0px 0px 6px 6px;
  background: #4e4e4e;
  z-index: 22;
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
  grid-auto-rows: max-content;
`;
