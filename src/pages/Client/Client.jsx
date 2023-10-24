import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Profile } from "./Profile/Profile";
import { Objects } from "./Objects/Objects";
import { useState } from "react";
import { Object } from "./Object/Object";
import { ProfileMobile } from "./ProfileMobile/ProfileMobile";
import { useParams } from "react-router-dom";
import { useLazyGetClientQuery } from "../../store/clients/clients.api";
import { useEffect } from "react";

export const Client = () => {
  const { id } = useParams();
  const [getClient, { data: clientData }] = useLazyGetClientQuery(id);
  const [selectedObject, setSelectedObject] = useState(null);

  const handleGetClient = () => getClient(id);

  useEffect(() => {
    handleGetClient();
  }, [id]);

  return (
    <StyledClient isEmpty={!selectedObject}>
      <Header />
      <ProfileMobile data={clientData} onRefreshClientData={handleGetClient} />
      <div className="client-content hide-scroll">
        <Profile
          className="item-desktop"
          data={clientData}
          onRefreshClientData={handleGetClient}
        />
        <Objects
          selected={selectedObject}
          onSelect={(value) => setSelectedObject(value)}
        />
        {selectedObject ? (
          <Object className="item-desktop" id={selectedObject} />
        ) : null}
      </div>
    </StyledClient>
  );
};

const StyledClient = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 18px 20px 20px;
  position: relative;
  .client-content {
    display: grid;
    grid-template-columns: ${({ isEmpty }) =>
      isEmpty ? "max-content 1fr" : "max-content 1fr max-content"};
    gap: 20px;
  }
  @media (max-width: 1399.9px) {
    padding: 20px;
    .client-content {
      grid-template-columns: 1fr;
      height: calc(100svh - 250px);
      overflow: auto;
    }

    .item-desktop {
      display: none;
    }
  }

  @media (max-width: 700px) {
    width: 100svw;
    margin-left: -24px;
    padding: 20px 24px;
    .client-content {
      overflow-x: hidden;
    }
  }
`;
