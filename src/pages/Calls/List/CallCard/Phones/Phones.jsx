import styled from "styled-components";
import { Phone } from "./Phone/Phone";
import { PhoneCalls } from "./PhoneCalls";
import { ReactComponent as Arrow } from "../../../../../assets/images/call-arrow.svg";

export const Phones = ({ open, onToggleOpen, phone, date, callsData }) => {
  return (
    <StyledPhones onClick={onToggleOpen} open={open}>
      <Phone open={open} phone={phone} date={date} callsData={callsData} />
      <PhoneCalls />
      <Arrow className="arrow-card" />
    </StyledPhones>
  );
};

const StyledPhones = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 10px;
  cursor: pointer;
  .arrow-card {
    margin-top: 18px;
    transition: all 0.3s;
    transform: rotate(${({ open }) => (open ? 180 : 0)}deg);
    display: none;
    ${({ open }) =>
      open &&
      `
        g {
            opacity: 1;
        }
    `}
    @media(min-width: 1400px) {
      display: block;
    }
  }
  &:hover {
    g {
      opacity: 1;
    }
  }
  @media (max-width: 1399.9px) {
    width: 100%;
    grid-template-columns: 1fr max-content;
  }
  @media (max-width: 600px) {
    display: none;
  }
`;
