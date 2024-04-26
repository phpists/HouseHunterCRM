import styled from "styled-components";
import { Avatar } from "./Avatar";
import { Name } from "./Name";
import { Subtitle } from "./Subtitle";
import { Rent } from "./Rent";
import { Id } from "./Id";
import { handleFormatDate } from "../../../../../utilits";

export const Client = ({ data, id }) => (
  <StyledClient className="flex items-center justify-between">
    <div className="flex items-center clientName">
      <Avatar />
      <div>
        <div className="flex items-center mb-1">
          <Name name={data?.cl_fullname ?? ""} id={data?.client_hash} />
          <Id id={id} />
        </div>
        <Subtitle
          subtitle={`Cтворено: ${handleFormatDate(
            Number(data?.dt_add) * 1000,
            true
          )} `}
        />
      </div>
    </div>
    <div className="category">
      <Rent category={data?.rubric_name} />
      <Subtitle subtitle="Категорія" />
    </div>
  </StyledClient>
);

const StyledClient = styled.div`
  height: 40px;
  margin-bottom: 10px;
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 10px;
    height: max-content;
    .clientName,
    .category {
      width: 100%;
    }
  }
`;
