import styled from "styled-components";
import { Step } from "./Step";
import { Info } from "./Info";
import { Phones } from "../../../../../components/Phones/Phones";

export const Client = ({ firstName, lastName, idClient, phones, avatar }) => {
  return (
    <StyledClient className="clickable">
      <Info
        firstName={firstName}
        lastName={lastName}
        idClient={idClient}
        avatar={avatar}
      />
      <Phones
        classNameContent="phones-wrapper"
        phones={phones?.map(({ phone, viber, telegram }) => ({
          phone,
          viber,
          telegram,
        }))}
      />
    </StyledClient>
  );
};

const StyledClient = styled.div`
  @media (max-width: 1399.9px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: start;
    .phones-wrapper {
      width: calc(100svw - 180px);
    }
  }
  @media (min-width: 700px) {
    .phones-wrapper {
      width: 200px;
    }
  }
  @media (min-width: 1400px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 200px;
    .phones-wrapper {
      width: 130px;
    }
  }
  @media (min-width: 1500px) {
    width: 250px;
    .phones-wrapper {
      width: 220px;
    }
  }

  @media (min-width: 1600px) {
    width: max-content;
    /* .phones-wrapper {
      width: max-content;
    } */
  }
`;
