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
          title={`ID ${typeObject === "street_base" ? "Системи" : ""}`}
          copyValue={id}
          isCopy
        />
      ) : null}
      {idSource !== "0" && typeObject !== "company" ? (
        <>
          <Tag title={`ID на ресурсі`} copyValue={idSource} isCopy />{" "}
          {data?.[nameSource]?.length > 0 ? (
            <Tag title={data?.[nameSource] ?? ""} />
          ) : null}
        </>
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
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  gap: 3px;
`;
