import styled from "styled-components";
import { Tag } from "./Tag";
import { handleFormatDate } from "../../../../utilits";

export const Header = ({ data }) => {
  const handleCheckIsEndDateAgrement = () => {
    if (data?.dt_end_agrement === "0") {
      return false;
    }

    const now = new Date()?.getTime();
    const agrementDate = Number(data?.dt_end_agrement) * 1000;

    return now > agrementDate;
  };

  return (
    <StyledHeader className="flex flex-wrap items-center clickable">
      {handleCheckIsEndDateAgrement() ? (
        <Tag title={"Протерміновано"} color={"red"} />
      ) : data?.type_object === "street_base" ? null : data?.id_street_base !==
        "0" ? (
        <Tag title={"Перенесено з StreetBase"} color={"red"} />
      ) : data?.dt_end_agreement === "0" || !data?.dt_end_agreement ? (
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
      {data?.type_object === "street_base" ? (
        <Tag title="База StreetBase" color="green" />
      ) : null}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 15px;
  gap: 4px;
`;
