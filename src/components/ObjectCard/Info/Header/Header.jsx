import styled from "styled-components";
import { Tag } from "./Tag";
import { handleFormatDate } from "../../../../utilits";

export const Header = ({ data }) => {
  const handleCheckIsEndDateAgrement = () => {
    if (data?.dt_end_agreement === "0") {
      return false;
    }

    const now = new Date();

    now.setHours(0);
    const agrementDate = new Date(Number(data?.dt_end_agreement) * 1000);
    agrementDate.setHours(0);

    return now?.getTime() > agrementDate?.getTime();
  };

  return (
    <StyledHeader className="flex flex-wrap items-center clickable">
      {data?.type_object === "street_base" ? (
        <Tag title="База StreetBase" color="green" />
      ) : null}
      {data?.type_object === "street_base"
        ? null
        : data?.id_street_base !== "0" && (
            <Tag title={"Перенесено з StreetBase"} color={"red"} />
          )}
      {data?.dt_end_agreement === "0" &&
        data?.type_object === "Company" &&
        data?.id_street_base === "0" && (
          <Tag
            title={data?.obj_is_actual === "1" ? "Актуально" : "Не актуально"}
            color={data?.obj_is_actual === "1" ? "green" : "red"}
          />
        )}

      {data?.dt_end_agreement !== "0" && (
        <Tag
          title={`здано до  ${handleFormatDate(
            Number(data?.dt_end_agreement) * 1000,
            true
          )}`}
          color="orange"
        />
      )}
      {handleCheckIsEndDateAgrement() && (
        <Tag title={"Протерміновано"} color={"red"} />
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 15px;
  gap: 4px;
`;
