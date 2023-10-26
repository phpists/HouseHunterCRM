import styled from "styled-components";
import { Tag } from "./Tag";
import { handleFormatDate } from "../../../../utilits";

export const Footer = ({ createDate }) => {
  return (
    <StyledFooter className="flex flex-wrap items-center clickable">
      {/* <Tag title="ID 47291" />
      <Tag title="ID xbase 47291" /> */}
      <Tag
        title={`Додано ${handleFormatDate(Number(createDate) * 1000, true)}`}
      />
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  gap: 4px;
`;
