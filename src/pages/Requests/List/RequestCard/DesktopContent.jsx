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
  onChangeComment,
  onRestore,
  onChangeNewCount,
}) => (
  <StyledDesktopContent className="clickable">
    <Client data={data} />
    <Date
      category={data?.rubric_name}
      location={data?.id_location}
      date={data?.General_field_group?.dt_deadline}
      dateCreate={data?.General_field_group?.dt_add}
    />
    <Info
      currency={data?.price_currency}
      priceMax={data?.price_max}
      roomMin={data?.room_min}
      roomMax={data?.room_max}
      areaMin={data?.area_total_min}
      storeyMin={data?.address_storey_min}
      storeyMax={data?.address_storey_max}
      isStopShowing={data?.General_field_group?.stop_showing !== "0"}
    />
    <Comment
      comment={data?.General_field_group?.comment_group}
      id={data?.id_group}
      onOpenEdit={onChangeComment}
    />
    <Objects
      data={data}
      idGroup={data?.id_group}
      onOpenChat={onOpenChat}
      onChangeNewCount={onChangeNewCount}
    />
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
      isDeleted={data?.General_field_group?.deleted === "1"}
      onRestore={onRestore}
      userId={data?.General_field_group?.id_user}
    />
  </StyledDesktopContent>
);

const StyledDesktopContent = styled.div`
  display: none;
  grid-template-columns: max-content max-content 1fr max-content max-content max-content;
  gap: 8px;
  justify-content: inherit;
  @media (min-width: 1400px) {
    display: grid;
  }
`;
