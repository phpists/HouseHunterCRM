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
}) => (
  <StyledMobileContent className="flex ">
    <div className="w-full">
      <Client
        firstName={data?.usr_first_name}
        lastName={data?.usr_last_name}
        idClient={data?.General_field_group?.id_client}
        phones={data?.General_field_group?.user_phones}
        avatar={
          data?.General_field_group?.usr_img?.length > 0
            ? data?.usr_img[0]
            : null
        }
      />
      <div className="mobile-content-wrapper">
        <Date
          category={data?.rubric_name}
          location={data?.location_name}
          date={data?.General_field_group?.dt_deadline}
        />
        <Info
          priceMax={data?.price_max}
          roomMin={data?.room_min}
          roomMax={data?.room_min}
          areaMin={data?.area_total_min}
          storeyMin={data?.address_storey_min}
          storeyMax={data?.address_storey_max}
        />
        <Comment comment={data?.comment} />
        <Objects data={data} idGroup={data?.id_group} onOpenChat={onOpenChat} />
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
