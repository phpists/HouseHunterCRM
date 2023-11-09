import styled from "styled-components";
import { Avatar } from "./Avatar";
import { Name } from "./Name";
import { Subtitle } from "./Subtitle";
import { Rent } from "./Rent";

export const Client = ({ data, id }) => (
  <StyledClient className="flex items-center justify-between">
    <div className="flex items-center">
      <Avatar />
      <div>
        <Name name={`${data[id]?.usr_first_name} ${data[id]?.usr_last_name}`} />
        <Subtitle subtitle={`ID: ${data?.General_field_group?.id_client}`} />
      </div>
    </div>
    <div>
      <Rent category={data[id]?.rubric_name} />
      <Subtitle subtitle="Категорія" />
    </div>
  </StyledClient>
);

const StyledClient = styled.div`
  height: 40px;
  margin-bottom: 10px;
`;
