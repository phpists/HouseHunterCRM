import styled from "styled-components";
import { Client } from "./Client/Client";
import { Date } from "./Date/Date";
import { Info } from "./Info/Info";
import { Comment } from "./Comment";
import { Objects } from "./Objects/Objects";
import { Actions } from "./Actions/Actions";

export const DesktopContent = ({
  data,
  id,
  onDelete,
  onFavorite,
  isEdit,
  isDelete,
  onOpenChat,
  clientData,
  onChangeComment,
}) => (
  <StyledDesktopContent>
    <Client
      firstName={clientData?.first_name ?? data?.usr_first_name}
      lastName={clientData?.last_name ?? data?.usr_last_name}
      idClient={data?.General_field_group?.id_client}
      phones={clientData?.phone ?? data?.General_field_group?.user_phones}
      avatar={
        clientData?.last_name
          ? null
          : data?.usr_img?.length > 0
          ? data?.usr_img[0]
          : null
      }
    />
    <Date
      category={data?.rubric_name}
      location={data?.id_location}
      date={data?.General_field_group?.dt_deadline}
    />
    <Info
      priceMax={data?.price_max}
      roomMin={data?.room_min}
      roomMax={data?.room_max}
      areaMin={data?.area_total_min}
      storeyMin={data?.address_storey_min}
      storeyMax={data?.address_storey_max}
    />
    <Comment
      comment={data?.General_field_group?.comment_group}
      id={data?.id_group}
      onOpenEdit={onChangeComment}
    />
    <Objects data={data} idGroup={data?.id_group} onOpenChat={onOpenChat} />
    <Actions
      id={id}
      clientId={data?.General_field_group?.id_client}
      onDelete={onDelete}
      favorite={data?.General_field_group?.favorite}
      onFavorite={onFavorite}
      idGroup={data?.id_group}
      isEdit={isEdit}
      isDelete={isDelete}
      isAccess={data?.General_field_group?.acsses_change}
    />
  </StyledDesktopContent>
);

const StyledDesktopContent = styled.div`
  display: none;
  grid-template-columns: repeat(6, max-content);
  gap: 14px;
  justify-content: inherit;
  @media (min-width: 1400px) {
    display: grid;
  }
`;
