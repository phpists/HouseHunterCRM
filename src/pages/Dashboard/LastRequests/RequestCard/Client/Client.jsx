import styled from "styled-components";
import { Avatar } from "./Avatar";
import { Name } from "./Name";
import { Subtitle } from "./Subtitle";
import { Rent } from "./Rent";
import { Id } from "./Id";

export const Client = ({ data, id }) => (
  <StyledClient className="flex items-center justify-between">
    <div className="flex items-center">
      <Avatar />
      <div>
        <div className="flex items-center">
          <Name name={data?.cl_fullname ?? ""} id={data?.client_hash} />
          <Id id={id} />
        </div>
        <Subtitle subtitle="Cтворено" />
      </div>
    </div>
    <div>
      <Rent category={data?.rubric_name} />
      <Subtitle subtitle="Категорія" />
    </div>
  </StyledClient>
);

const StyledClient = styled.div`
  height: 40px;
  margin-bottom: 10px;
`;
