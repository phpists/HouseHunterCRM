import styled from "styled-components";
import { Contact } from "./Contact/Contact";
import { Divider } from "./Divider";

export const Contacts = () => {
  return (
    <StyledContacts className="hide-scroll clickable">
      <Contact type="owner" />
      <Divider />
      <Contact type="rieltor" />
    </StyledContacts>
  );
};

const StyledContacts = styled.div`
  height: 200px;
  width: 200px;
  overflow: auto;
  @media (min-width: 1700px) {
    width: 14svw;
    max-width: 350px;
  }
  @media (min-width: 1900px) {
    width: 20svw;
  }
`;
