import styled from "styled-components";
import { Contact } from "./Contact/Contact";
import { Divider } from "./Divider";

export const Contacts = ({ className, data }) => {
  return (
    <StyledContacts className={`hide-scroll clickable ${className}`}>
      {/* <Contact type="owner" />
      <Divider /> */}
      {data?.cl_phones?.length > 0 ? (
        <>
          <Contact type="owner" name={data?.cl_name} phones={data?.cl_phones} />
          <Divider />
        </>
      ) : null}
      <Contact
        type="rieltor"
        phones={data?.phones}
        name={`${data?.first_name} ${data?.last_name}`}
      />
    </StyledContacts>
  );
};

const StyledContacts = styled.div`
  height: max-content;
  width: 200px;
  overflow: auto;
  @media (min-width: 1400px) {
    height: 200px;
  }
  @media (min-width: 1700px) {
    width: 14svw;
    max-width: 350px;
  }
  @media (min-width: 1900px) {
    width: 20svw;
  }
  @media (max-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    width: 100%;
    .divider-contacts {
      display: none;
    }
  }
`;
