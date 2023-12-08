import styled from "styled-components";
import { Option } from "./Option";

export const Dropdown = ({ onSelect, users, levels, colors, value }) => (
  <StyledDropdown>
    {users?.map(({ full_name, structure_level, id_user }, i) => (
      <Option
        key={i}
        name={full_name ?? ""}
        role={levels[structure_level - 1] ?? "-"}
        roleColor={colors[structure_level - 1] ?? "#D0A6FA"}
        roleBg={`${colors[structure_level - 1] ?? "#D0A6FA"}40`}
        onClick={() => onSelect(id_user)}
        active={value === id_user}
      />
    ))}
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #565656;
  border-radius: 0 0 9px 9px;
  overflow: hidden;
  z-index: 100;
`;
