import styled from "styled-components";
import { Step } from "./Step";
import { Info } from "./Info";
import { Phones } from "../../../../../components/Phones/Phones";
import { Card } from "./Card/Card";
import { useGetPhonesCodesQuery } from "../../../../../store/auth/auth.api";
import { handleAddPhoneMask } from "../../../../../utilits";

export const Client = ({ data }) => {
  const { data: phonesData } = useGetPhonesCodesQuery();

  return (
    <StyledClient className="clickable">
      {data?.General_field_group?.contacts?.owner &&
      data?.General_field_group?.contacts?.owner?.phones ? (
        <Card
          name={data?.General_field_group?.contacts?.owner?.name ?? ""}
          role="Агент"
          id={data?.General_field_group?.id_user}
          // avatar={avatar}
          phones={data?.General_field_group?.contacts?.owner?.phones?.map(
            ({ phone, viber, telegram, id_phone_code }) => ({
              phone: `${
                phonesData?.find(({ id }) => id === id_phone_code)?.code ?? ""
              }${phone}`,
              maskedPhone: handleAddPhoneMask(phone),
              viber,
              telegram,
            })
          )}
        />
      ) : null}
      {data?.General_field_group?.contacts?.client &&
      data?.General_field_group?.contacts?.client?.phones ? (
        <Card
          name={data?.General_field_group?.contacts?.client?.name ?? ""}
          role="Клієнт"
          id={data?.General_field_group?.id_client}
          // avatar={avatar}
          phones={data?.General_field_group?.contacts?.client?.phones?.map(
            ({ phone, viber, telegram, id_phone_code, code }) => ({
              phone: `${
                code ??
                phonesData?.find(({ id }) => id === id_phone_code)?.code ??
                ""
              }${phone}`,
              maskedPhone: handleAddPhoneMask(phone),
              viber,
              telegram,
            })
          )}
          link={`/client/${data?.General_field_group?.id_client}`}
        />
      ) : null}
      {/* <Info
        firstName={firstName}
        lastName={lastName}
        idClient={idClient}
        avatar={avatar}
        dateCreate={dateCreate}
      />
      <Phones
        classNameContent="phones-wrapper"
        phones={phones?.map(({ phone, viber, telegram }) => ({
          phone,
          viber,
          telegram,
        }))}
      /> */}
    </StyledClient>
  );
};

const StyledClient = styled.div`
  width: 244px;
  flex-shrink: 0;
  @media (max-width: 1399.9px) {
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    margin-bottom: 10px;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: start;
    .phones-wrapper {
      width: calc(100svw - 240px);
    }
  }
  @media (min-width: 700px) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    .phones-wrapper {
      width: 150px;
    }
  }
  @media (min-width: 1400px) {
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
    display: block;
    width: 244px;
    .phones-wrapper {
      width: 100px;
    }
  }
  @media (min-width: 1500px) {
    width: 250px;
    .phones-wrapper {
      width: 150px;
    }
  }

  @media (min-width: 1600px) {
    width: max-content;
    .phones-wrapper {
      width: 180px;
    }
  }
`;
