import styled from "styled-components";
import { Tag } from "./Tag";
import { handleFormatDate } from "../../../../utilits";

export const Header = ({ data }) => {
  if (data?.dt_end_agreement === "0" || !data?.dt_end_agreement) {
    return null;
  }
  return (
    <StyledHeader className="flex flex-wrap items-center clickable">
      <Tag
        title={`здано до  ${handleFormatDate(
          Number(data?.dt_end_agreement) * 1000,
          true
        )}`}
        color="orange"
      />
      {/* <Tag title="Потребує модерації" color="red" />
      <Tag title="База xbase" color="green" /> */}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 15px;
  gap: 4px;
`;
