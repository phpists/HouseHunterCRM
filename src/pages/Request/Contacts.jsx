import { styled } from "styled-components";
import { Divider } from "./Base/Divider";
import { Phones } from "../../components/Phones/Phones";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLazyGetClientQuery } from "../../store/clients/clients.api";

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
        <div className="flex items-center name-wrapper">
          <div className="client-info">
            <div className="name">
              {data?.data?.first_name} {data?.data?.last_name}
            </div>
            <div className="label">Клієнт</div>
          </div>
          <div className="contacts-divider"></div>
        </div>
        <div className="flex items-center">
          <Phones
            top
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
  background: #3d3d3d;
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 23.6px */
    letter-spacing: 0.4px;
    opacity: 0.4;
    margin-bottom: 15px;
  }
  .name {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100px;
  }
  .label {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100px;
  }
  .socmedias {
    display: grid;
    grid-template-columns: max-content;
    gap: 3px;
    margin-right: 10px;
  }
  .contacts-divider {
    width: 1px;
    height: 49px;
    opacity: 0.1;
    background: #fff;
    margin: 0 20px;
  }
  @media (max-width: 1300px) {
    .contacts-wrapper {
      flex-direction: column;
      align-items: start;
    }
    .name-wrapper {
      flex-direction: column;
      width: 100%;
      align-items: start;
    }
    .contacts-divider {
      margin: 10px 0;
      height: 1px;
      width: 100%;
    }
  }
  @media (max-width: 800px) {
    padding: 10px;
    .title {
      color: #fff;
      font-family: Overpass;
      font-size: 18px;
    }

    .name,
    .title {
      max-width: 80px !important;
    }
  }
`;
