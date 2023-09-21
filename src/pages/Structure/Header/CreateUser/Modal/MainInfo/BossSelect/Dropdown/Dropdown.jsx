import styled from "styled-components";
import { Option } from "./Option";

export const Dropdown = ({ onSelect }) => (
  <StyledDropdown>
    <Option
      name="Юрій Мицавка"
      role="Регіональний"
      roleColor="#D0A6FA"
      roleBg="rgba(208, 166, 250, 0.25)"
      onClick={onSelect}
    />
    <Option
      name="Юрій Мицавка"
      role="Регіональний"
      roleColor="#D0A6FA"
      roleBg="rgba(208, 166, 250, 0.25)"
      onClick={onSelect}
      last
    />
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
`;
