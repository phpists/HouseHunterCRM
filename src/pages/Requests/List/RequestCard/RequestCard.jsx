import styled from "styled-components";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";
import { useEffect, useState } from "react";
import { useAppSelect } from "../../../../hooks/redux";
import { useLazyGetClientQuery } from "../../../../store/clients/clients.api";

export const RequestCard = ({
  selected,
  onSelect,
  data,
  id,
  onDelete,
  onFavorite,
  isEdit,
  isDelete,
  onOpenChat,
  onChangeComment,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const [getClient, { data: clientData }] = useLazyGetClientQuery();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1400);

  const handleClick = (e) => {
    if (
      e.target.classList.contains("clickable") ||
      e.target.classList.contains("closedPrice")
    ) {
      onSelect();
    }
  };

  const handleResize = () => {
    const currentWidth = window.innerWidth;

    if (isMobile && currentWidth >= 1400) {
      setIsMobile(false);
    } else if (!isMobile && currentWidth < 1400) {
      setIsMobile(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  useEffect(() => {
    const ownerId = data?.General_field_group?.id_user;
    if (ownerId === user?.id) {
      const clientId = data?.General_field_group?.id_client;
      getClient(clientId);
    }
  }, [data?.General_field_group?.id_client]);

  return (
    <StyledRequestCard
      selected={selected}
      onClick={handleClick}
      className="clickable"
    >
      {isMobile ? (
        <MobileContent
          data={data}
          id={id}
          onDelete={onDelete}
          onFavorite={onFavorite}
          isEdit={isEdit}
          isDelete={isDelete}
          onOpenChat={onOpenChat}
          clientData={clientData?.data}
          onChangeComment={onChangeComment}
        />
      ) : (
        <DesktopContent
          data={data}
          id={id}
          onDelete={onDelete}
          onFavorite={onFavorite}
          isEdit={isEdit}
          isDelete={isDelete}
          onOpenChat={onOpenChat}
          clientData={clientData?.data}
          onChangeComment={onChangeComment}
        />
      )}
    </StyledRequestCard>
  );
};

const StyledRequestCard = styled.div`
  border-radius: 10px;
  background: #3d3d3d;
  padding: 10px;
  justify-content: space-between;
  border: 1px solid transparent;
  ${({ selected }) => selected && "border: 1px solid #fff;"}
  cursor: pointer;
  .value {
    white-space: unset;
  }
`;
