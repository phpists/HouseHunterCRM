import styled from "styled-components";
import { Client } from "./Client/Client";
import { Date } from "./Date/Date";
import { Info } from "./Info/Info";
import { Comment } from "./Comment";
import { Objects } from "./Objects/Objects";
import { Actions } from "./Actions/Actions";

export const DesktopContent = ({ data, id, onDelete, onFavorite }) => (
  <StyledDesktopContent>
    <Client
      firstName={data?.usr_first_name}
      lastName={data?.usr_last_name}
      idClient={data?.id_client}
      phones={data?.user_phones}
      avatar={data?.usr_img?.length > 0 ? data?.usr_img[0] : null}
    />
    <Date
      category={data?.rubric_name}
      location={data?.location_name}
      date={data?.dt_deadline}
    />
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
    <Actions
      id={id}
      clientId={data?.id_user}
      onDelete={onDelete}
      favorite={data?.favorite}
      onFavorite={onFavorite}
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
