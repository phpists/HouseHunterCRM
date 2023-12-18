import styled from "styled-components";
import { Phone } from "./Phone/Phone";

export const PhonesMobile = ({ open, onToggleOpen, phone, date }) => {
  return (
    <StyledPhonesMobile>
      <Phone
        open={open}
        onToggleOpen={onToggleOpen}
        phone={phone}
        date={date}
      />
    </StyledPhonesMobile>
  );
};

const StyledPhonesMobile = styled.div`
  padding: 6px;
  border-radius: 9px;
  background: rgba(50, 50, 50, 0.8);
  @media (min-width: 600px) {
    display: none;
  }
`;
