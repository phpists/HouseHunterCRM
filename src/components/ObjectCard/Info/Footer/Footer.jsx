import styled from "styled-components";
import { Tag } from "./Tag";

export const Footer = () => {
  return (
    <StyledFooter className="flex flex-wrap items-center clickable">
      <Tag title="ID 47291" />
      <Tag title="ID xbase 47291" />
      <Tag title="додано/Оновлено  09.09.2022/ 09.09.2022" />
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  gap: 4px;
`;
