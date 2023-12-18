import styled from "styled-components";
import { Avatar } from "./Avatar";
import { PhoneText } from "./PhoneText";
import { LastDate } from "./LastDate";
import { Dropdown } from "./Dropdown";

export const Phone = ({ open, phone, date }) => (
  <div>
    <StyledPhone className="flex items-center" open={open}>
      <Avatar />
      <PhoneText phone={phone} />
      <LastDate date={date} />
    </StyledPhone>
    {open && <Dropdown />}
  </div>
);

const StyledPhone = styled.div`
  padding: 10px 31px 13px 15px;
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
    border-bottom: 1px solid rgba(255, 255, 255, 0.40);

  `}
  @media (min-width: 1600px) {
    width: 100%;
  }
`;
