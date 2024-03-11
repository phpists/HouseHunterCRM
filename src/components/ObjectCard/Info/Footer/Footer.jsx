import styled from "styled-components";
import { Tag } from "./Tag";
import { handleFormatDate } from "../../../../utilits";

export const Footer = ({ createDate, dateEdit, id, streetBaseId }) => {
  return (
    <StyledFooter className="flex flex-wrap items-center clickable">
      {id ? <Tag title="ID" value={id} isCopy /> : null}
      {streetBaseId ? (
        <Tag title="ID xbase" value={streetBaseId} isCopy />
      ) : null}
      <Tag
        title={`Додано/Оновлено  ${handleFormatDate(
          Number(createDate) * 1000,
          true
        )}${
          dateEdit === "0"
            ? ""
            : ` / ${handleFormatDate(Number(dateEdit) * 1000, true)}`
        }`}
      />
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  gap: 4px;
`;
