import styled from "styled-components";
import { PhoneText } from "./PhoneText";
import { LastDate } from "./LastDate";
import { Dropdown } from "./Dropdown";
import { Count } from "./Count";

export const Phone = ({ open, onToggleOpen }) => (
  <div>
    <StyledPhone
      className="flex items-center justify-between"
      open={open}
      onClick={onToggleOpen}
    >
      <PhoneText />
      <LastDate />
      <Count />
    </StyledPhone>
    {open && <Dropdown />}
  </div>
);

const StyledPhone = styled.div`
  padding: 6px;
  border-radius: 9px;
  background: rgba(50, 50, 50, 0.8);
  transition: all 0.3s;
  border-bottom: 1px solid rgba(255, 255, 255, 0);
  position: relative;
  height: 60px;
  ${({ open }) =>
    open &&
    `
    border-radius: 9px 9px 0px 0px;
    border-bottom: 1px solid  rgba(255, 255, 255, 0.1);

  `}
  @media (min-width: 1600px) {
    width: 100%;
  }
`;
