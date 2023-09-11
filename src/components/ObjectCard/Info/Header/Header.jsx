import styled from "styled-components";
import { Tag } from "./Tag";

export const Header = () => {
  return (
    <StyledHeader className="flex flex-wrap items-center">
      <Tag title="здано до  09.09.2022" color="orange" />
      <Tag title="Потребує модерації" color="red" />
      <Tag title="База xbase" color="green" />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 15px;
  gap: 4px;
`;
