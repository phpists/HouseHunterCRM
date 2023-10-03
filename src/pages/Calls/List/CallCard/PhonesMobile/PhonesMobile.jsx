import styled from "styled-components";
import { Phone } from "./Phone/Phone";

export const PhonesMobile = ({ open, onToggleOpen }) => {
  return (
    <StyledPhonesMobile>
      <Phone open={open} onToggleOpen={onToggleOpen} />
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
