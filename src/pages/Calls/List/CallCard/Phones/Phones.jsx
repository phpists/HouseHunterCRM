import styled from "styled-components";
import { Phone } from "./Phone/Phone";
import { PhoneCalls } from "./PhoneCalls";
import { ReactComponent as Arrow } from "../../../../../assets/images/call-arrow.svg";

export const Phones = ({ open, onToggleOpen }) => {
  return (
    <StyledPhones onClick={onToggleOpen} open={open}>
      <Phone open={open} />
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
    ${({ open }) =>
      open &&
      `
        g {
            opacity: 1;
        }
    `}
  }
  &:hover {
    g {
      opacity: 1;
    }
  }
`;
