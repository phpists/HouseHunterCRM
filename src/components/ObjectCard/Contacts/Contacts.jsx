import styled from "styled-components";
import { Contact } from "./Contact/Contact";
import { Divider } from "./Divider";
import { useLazyGetPhoneObjectQuery } from "../../../store/objects/objects.api";
import { useState } from "react";
import { ShowButton } from "./Contact/Phone/ShowButton";
import { handleResponse } from "../../../utilits";

export const Contacts = ({ className, data }) => {
  const [getClient, { data: clientData }] = useLazyGetPhoneObjectQuery();
  const [error, setError] = useState(false);

  const handleShowClient = () => {
    getClient(data?.id).then((resp) =>
      handleResponse(
        resp,
        () => null,
        () => setError(true)
      )
    );
  };

  return (
    <StyledContacts className={`hide-scroll clickable ${className}`}>
      {/* <Contact type="owner" />
      <Divider /> */}
      {!clientData ? (
        <ShowButton
          title={
            error ? "Доступ заборонено" : "Показати контактні дані          "
          }
          className="show-client"
          onClick={handleShowClient}
          error={error}
        />
      ) : clientData ? (
        <>
          <Contact
            type="owner"
            name={clientData?.contact?.name}
            phones={clientData?.contact?.phone}
            typeText={clientData?.type}
          />
          <Divider />
        </>
      ) : null}
      {/* <Contact
        type="rieltor"
        phones={data?.phones}
        name={`${data?.first_name} ${data?.last_name}`}
      /> */}
    </StyledContacts>
  );
};

const StyledContacts = styled.div`
  height: max-content;
  width: 200px;
  overflow: auto;
  .show-client {
    margin-bottom: 10px;
    padding: 5px 10px 6px;
  }
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
