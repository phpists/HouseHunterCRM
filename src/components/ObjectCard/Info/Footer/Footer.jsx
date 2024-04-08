import styled from "styled-components";
import { Tag } from "./Tag";
import { handleFormatDate } from "../../../../utilits";
import { useGetSourcesQuery } from "../../../../store/objects/objects.api";

export const Footer = ({
  createDate,
  dateEdit,
  id,
  idSource,
  nameSource,
  typeObject,
  dateDelete,
}) => {
  const { data } = useGetSourcesQuery();

  return (
    <StyledFooter className="flex flex-wrap items-center clickable">
      {id ? (
        <Tag
          title={`ID ${typeObject === "street_base" ? "StreetBase" : ""}`}
          copyValue={id}
          isCopy
        />
      ) : null}
      {idSource !== "0" && typeObject !== "company" ? (
        <Tag
          title={`ID ${data?.[nameSource] ?? ""}`}
          copyValue={idSource}
          isCopy
        />
      ) : null}
      <Tag
        title={`Додано/Оновлено  ${handleFormatDate(
          Number(createDate) * 1000
        )}${
          dateEdit === "0"
            ? ""
            : ` / ${handleFormatDate(Number(dateEdit) * 1000)}`
        }`}
      />

      {dateDelete !== "0" ? (
        <Tag
          title={`Остаточне видалення - ${handleFormatDate(
            Number(dateDelete) * 1000,
            true
          )}`}
          red
        />
      ) : null}
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  gap: 4px;
`;
