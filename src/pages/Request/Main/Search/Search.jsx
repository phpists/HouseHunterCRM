import { styled } from "styled-components";
import { Divider } from "../../Divider";
import { TagsFilter } from "../../../../components/TagsFilter/TagsFilter";

export const Search = () => {
  return (
    <StyledSearch>
      <TagsFilter label="Пошук 1" search />
      <Divider />
      <TagsFilter label="Пошук 2" search />
      <Divider />
      <TagsFilter label="Пошук Пошук виключення" search />
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  padding: 8px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
`;
