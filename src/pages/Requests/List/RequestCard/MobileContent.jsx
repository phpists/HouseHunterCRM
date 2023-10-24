import styled from "styled-components";
import { Client } from "./Client/Client";
import { Date } from "./Date/Date";
import { Info } from "./Info/Info";
import { Comment } from "./Comment";
import { Objects } from "./Objects/Objects";
import { Actions } from "./Actions/Actions";

export const MobileContent = ({ data, id, onDelete, onFavorite }) => (
  <StyledMobileContent className="flex ">
    <div>
      <Client
        firstName={data?.usr_first_name}
        lastName={data?.usr_last_name}
        idClient={data?.id_client}
        phones={data?.user_phones}
        avatar={data?.usr_img?.length > 0 ? data?.usr_img[0] : null}
      />
      <div className="mobile-content-wrapper">
        <Date category={data?.rubric_name} location={data?.location_name} />
        <Info
          priceMax={data?.price_max}
          roomMin={data?.room_min}
          roomMax={data?.room_min}
          areaMin={data?.area_total_min}
          storeyMin={data?.address_storey}
          storeyMax={data?.storey_count}
        />
        <Comment />
        <Objects />
      </div>
    </div>
    <Actions
      id={id}
      clientId={data?.id_client}
      onDelete={onDelete}
      favorite={data?.favorite}
      onFavorite={onFavorite}
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
