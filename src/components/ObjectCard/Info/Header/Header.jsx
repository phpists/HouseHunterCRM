import styled from "styled-components";
import { Tag } from "./Tag";
import { handleFormatDate } from "../../../../utilits";

export const Header = ({ data }) => {
  return (
    <StyledHeader className="flex flex-wrap items-center clickable">
      {data?.dt_end_agreement === "0" || !data?.dt_end_agreement ? (
        <Tag
          title={data?.obj_is_actual === "1" ? "Актуально" : "Не актуально"}
          color={data?.obj_is_actual === "1" ? "green" : "red"}
        />
      ) : (
        <Tag
          title={`здано до  ${handleFormatDate(
            Number(data?.dt_end_agreement) * 1000,
            true
          )}`}
          color="orange"
        />
      )}
      {/* <Tag title="Потребує модерації" color="red" />
      <Tag title="База xbase" color="green" /> */}
      {data?.type_object === "street_base" ? (
        <Tag title="База xbase" color="green" />
      ) : null}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 15px;
  gap: 4px;
`;
