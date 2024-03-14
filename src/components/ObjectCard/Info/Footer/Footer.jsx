import styled from "styled-components";
import { Tag } from "./Tag";
import { handleFormatDate } from "../../../../utilits";
import { useGetSourcesQuery } from "../../../../store/objects/objects.api";

export const Footer = ({ createDate, dateEdit, id, idSource, nameSource }) => {
  const { data } = useGetSourcesQuery();

  return (
    <StyledFooter className="flex flex-wrap items-center clickable">
      {id && nameSource === "0" ? (
        <Tag title="ID" copyValue={id} isCopy />
      ) : null}
      {idSource !== "0" ? (
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
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  gap: 4px;
`;
