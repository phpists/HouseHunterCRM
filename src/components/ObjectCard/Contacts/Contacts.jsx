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
      {data?.clients_inf?.contact?.owner &&
      data?.clients_inf?.contact?.owner?.phone ? (
        <Contact
          type="rieltor"
          name={data?.clients_inf?.contact?.owner?.name}
          phones={
            data?.clients_inf?.contact?.owner?.phone
              ? data?.clients_inf?.contact?.owner?.phone
              : data?.clients_inf?.contact?.owner?.phones
          }
          typeText="Агент"
          error={error}
          onShow={handleShowClient}
          className="mb-4"
        />
      ) : null}
      {data?.clients_inf ? (
        <Contact
          type="owner"
          name={
            data?.clients_inf?.contact?.name ??
            data?.clients_inf?.contact?.name_client
          }
          phones={
            data?.clients_inf?.contact?.phones
              ? data?.clients_inf?.contact?.phones
              : clientData?.contact?.phone
              ? clientData?.contact?.phone
              : clientData?.contact?.phones
          }
          typeText={
            data?.clients_inf?.contact?.party_agency ?? data?.clients_inf?.type
          }
          error={error}
          onShow={handleShowClient}
        />
      ) : null}
    </StyledContacts>
  );
};

const StyledContacts = styled.div`
  height: max-content;
  width: 230px;
  overflow: auto;
  .show-client {
    padding: 5px 10px 6px;
  }
  @media (min-width: 1400px) {
    height: 200px;
  }
  @media (min-width: 1700px) {
    width: 14svw;
    max-width: 230px;
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
    .show-client {
      width: max-content;
    }
  }
`;
