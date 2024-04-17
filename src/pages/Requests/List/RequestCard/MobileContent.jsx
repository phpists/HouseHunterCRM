import styled from "styled-components";
import { Client } from "./Client/Client";
import { Date } from "./Date/Date";
import { Info } from "./Info/Info";
import { Comment } from "./Comment";
import { Objects } from "./Objects/Objects";
import { Actions } from "./Actions/Actions";

export const MobileContent = ({
  data,
  id,
  onDelete,
  onFavorite,
  isDelete,
  isEdit,
  onOpenChat,
  onChangeComment,
  onRestore,
  onDeleteFinally,
  onChangeNewCount = { onChangeNewCount },
}) => (
  <StyledMobileContent className="flex clickable">
    <div className="w-full">
      <Client data={data} />
      <div className="mobile-content-wrapper">
        <Date
          category={data?.rubric_name}
          location={data?.id_location}
          date={data?.General_field_group?.dt_deadline}
          dateCreate={data?.General_field_group?.dt_add}
        />
        <Info
          priceMax={data?.price_max}
          currency={data?.price_currency}
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
      </div>
    </div>
    <Actions
      id={id}
      clientId={data?.General_field_group?.id_client}
      onDelete={onDelete}
      favorite={data?.General_field_group?.favorite}
      onFavorite={onFavorite}
      idGroup={data?.id_group}
      isDelete={isDelete}
      isEdit={isEdit}
      isAccess={data?.General_field_group?.acsses_change}
      isDeleted={data?.General_field_group?.deleted === "1"}
      onRestore={onRestore}
      userId={data?.General_field_group?.id_user}
      onDeleteFinally={onDeleteFinally}
    />
  </StyledMobileContent>
);

const StyledMobileContent = styled.div`
  .mobile-content-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  @media (min-width: 1400px) {
    display: none;
  }
  @media (max-width: 700px) {
    .mobile-content-wrapper {
      grid-template-columns: 1fr;
      width: calc(100% + 34px);
    }
  }
`;
