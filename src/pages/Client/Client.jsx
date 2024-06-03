import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Profile } from "./Profile/Profile";
import { Objects } from "./Objects/Objects";
import { useState } from "react";
import { ObjectCard } from "./Object/Object";
import { ProfileMobile } from "./ProfileMobile/ProfileMobile";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyGetClientQuery } from "../../store/clients/clients.api";
import { useEffect } from "react";

const Client = () => {
  const { id } = useParams();
  const [getClient, { data: clientData }] = useLazyGetClientQuery(id);
  const [selectedObject, setSelectedObject] = useState(null);
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);

  const handleGetClient = () => getClient(id);

  useEffect(() => {
    handleGetClient().then((resp) => {
      if (!resp?.data) {
        navigate("/clients");
      }
    });
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    setIsDeleted(clientData?.data?.deleted === "1");
  }, [clientData?.data]);

  if (!clientData?.data) {
    return null;
  }

  const handleChangeIsDeleted = (val) => {
    setIsDeleted(val);
    setIsRefetch(true);
    handleGetClient();
  };

  return (
    <StyledClient isEmpty={!selectedObject} className="hide-scroll">
      <Header
        favorite={clientData?.data?.favorite_client}
        isDeleted={isDeleted}
        onToggleIsDeleted={handleChangeIsDeleted}
        deleteReason={clientData?.data?.reasone_remove}
      />
      <ProfileMobile
        data={clientData?.data}
        onRefreshClientData={handleGetClient}
        isDeleted={isDeleted}
      />
      <div className="client-content hide-scroll">
        <Profile
          className="item-desktop"
          data={clientData?.data}
          onRefreshClientData={handleGetClient}
          isDeleted={isDeleted}
        />
        <Objects
          selected={selectedObject}
          onSelect={(value) => setSelectedObject(value)}
          isRefetch={isRefetch}
          onToggleIsRefetch={(val) => setIsRefetch(val)}
          isDeleted={isDeleted}
        />
        {selectedObject?.id ? (
          <ObjectCard
            className="item-desktop"
            selectedObject={selectedObject}
          />
        ) : null}
      </div>
    </StyledClient>
  );
};

const StyledClient = styled.div`
  background: var(--dark-card-bg);
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
    margin-left: -15px;
    padding: 20px 20px;
    overflow: auto;
    height: calc(100vh - 115px);
    .client-content {
      overflow-x: hidden;
      height: max-content;
    }
  }
`;

export default Client;
