import { styled } from "styled-components";
import { Divider } from "./Divider";
import { Phones } from "../../../components/Phones/Phones";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLazyGetClientQuery } from "../../../store/clients/clients.api";

export const Contacts = () => {
  const { clientId } = useParams();
  const [getClient, { data }] = useLazyGetClientQuery();
  const handleGetClient = () => getClient(clientId);

  useEffect(() => {
    handleGetClient();
  }, [clientId]);

  return (
    <StyledContacts className="hide-scroll">
      <div className="title">Контакти клієнта</div>
      <div className="flex items-center contacts-wrapper">
        <div className="client-info">
          <div
            className="name"
            title={`${data?.data?.first_name} ${data?.data?.last_name}`}
          >
            {data?.data?.first_name} {data?.data?.last_name}
          </div>
          <div className="label">Клієнт</div>
        </div>
        <Divider />
        <div className="flex items-center">
          <Phones
            top
            classNameContent="clientPhones"
            phones={data?.data?.phone?.map(
              ({ code, phone, viber, telegram }) => ({
                phone: `${code}${phone}`,
                viber,
                telegram,
              })
            )}
          />
        </div>
      </div>
    </StyledContacts>
  );
};

const StyledContacts = styled.div`
  padding: 10px 15px;
  border-radius: 10px;
  background: var(--card-bg);
  .title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 23.6px */
    letter-spacing: 0.4px;
    opacity: 0.4;
    margin-bottom: 15px;
  }
  .name {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
    max-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .label {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  .socmedias {
    display: grid;
    grid-template-columns: max-content;
    gap: 3px;
    margin-right: 10px;
  }
  .clientPhones {
    width: 170px;
  }
  @media (max-width: 1300px) {
    .contacts-wrapper {
      justify-content: space-between;
    }
    .name {
      max-width: 150px;
    }
  }
  @media (max-width: 800px) {
    .contacts-wrapper {
      flex-direction: column;
      align-items: start;
      gap: 10px;
    }
    padding: 10px;

    .title {
      color: var(--main-color);
      font-family: Overpass;
      font-size: 18px;
    }
  }
  @media (min-width: 1400px) {
    .name {
      max-width: 80px;
    }
  }
`;
