import styled from "styled-components";
import { Contact } from "./Contact/Contact";
import { Divider } from "./Divider";
import { useLazyGetPhoneObjectQuery } from "../../../store/objects/objects.api";
import { useEffect, useState } from "react";
import { ShowButton } from "./Contact/Phone/ShowButton";
import { handleFormatDate, handleResponse } from "../../../utilits";

export const Contacts = ({
  className,
  data,
  showContactId,
  onShowContact,
  onOpenPhonesModal,
  showClientObjectsCount,
  ad,
}) => {
  const [getClient] = useLazyGetPhoneObjectQuery();
  const [error, setError] = useState(false);
  const [clientData, setClientData] = useState(undefined);

  const handleShowClient = () => {
    getClient(data?.id).then((resp) =>
      handleResponse(
        resp,
        () => {
          setClientData(resp?.data);
          onShowContact && onShowContact();
        },
        () => setError(true)
      )
    );
  };

  useEffect(() => {
    if (showContactId !== data?.id) {
      setClientData(undefined);
    }
  }, [showContactId]);

  return (
    <StyledContacts className={`hide-scroll clickable ${className}`}>
      {ad && data?.author_phone?.length > 0 ? (
        <Contact
          type="rieltor"
          name={data?.author_name ?? "-"}
          phones={[{ phone: data?.author_phone }]}
          typeText="Реклама"
          error={error}
          onShow={handleShowClient}
          className="mb-4"
        />
      ) : null}
      {data?.client_data?.owner?.name && data?.client_data?.owner?.phone ? (
        <Contact
          type="rieltor"
          name={data?.client_data?.owner?.name}
          phones={data?.client_data?.owner?.phone}
          typeText="Агент"
          error={error}
          onShow={handleShowClient}
          className="mb-4"
        />
      ) : null}
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
      {data?.client_data?.name ? (
        <Contact
          type="owner"
          name={data?.client_data?.name}
          phones={data?.client_data?.phones}
          typeText={
            data?.clients_inf?.contact?.party_agency ?? data?.clients_inf?.type
          }
          subtitle={
            !showClientObjectsCount
              ? null
              : Number(data?.Count_object) === 0
              ? null
              : data?.type_object === "street_base"
              ? `${data?.Count_object ?? 0} об'єктів на ${handleFormatDate(
                  Number(data?.count_object_date) * 1000
                )}`
              : null
          }
          onClickOnSubtitle={onOpenPhonesModal}
          error={error}
          onShow={handleShowClient}
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
          subtitle={
            !showClientObjectsCount
              ? null
              : Number(data?.Count_object) === 0
              ? null
              : data?.type_object === "street_base"
              ? `${data?.Count_object ?? 0} об'єктів на ${handleFormatDate(
                  Number(data?.count_object_date) * 1000
                )}`
              : null
          }
          onClickOnSubtitle={onOpenPhonesModal}
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
  max-height: 200px;
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
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    .mb-4 {
      margin: 0;
    }
  }
`;
