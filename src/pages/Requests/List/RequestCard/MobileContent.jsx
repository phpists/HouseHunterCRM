import styled from "styled-components";
import { Client } from "./Client/Client";
import { Date } from "./Date/Date";
import { Info } from "./Info/Info";
import { Comment } from "./Comment";
import { Objects } from "./Objects/Objects";
import { Actions } from "./Actions/Actions";

export const MobileContent = ({ data, id, onDelete, onFavorite }) => (
  <StyledMobileContent className="flex ">
    <div className="w-full">
      <Client
        firstName={data[id]?.usr_first_name}
        lastName={data[id]?.usr_last_name}
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
          category={data[id]?.rubric_name}
          location={data[id]?.location_name}
          date={data?.General_field_group?.dt_deadline}
        />
        <Info
          priceMax={data[id]?.price_max}
          roomMin={data[id]?.room_min}
          roomMax={data[id]?.room_min}
          areaMin={data[id]?.area_total_min}
          storeyMin={data[id]?.address_storey}
          storeyMax={data[id]?.storey_count}
        />
        <Comment comment={data[id]?.comment} />
        <Objects />
      </div>
    </div>
    <Actions
      id={id}
      clientId={data?.General_field_group?.id_client}
      onDelete={onDelete}
      favorite={data?.General_field_group?.favorite}
      onFavorite={onFavorite}
      idGroup={data[id]?.id_group}
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
