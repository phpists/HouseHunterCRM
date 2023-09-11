import { styled } from "styled-components";
import { Divider } from "../Divider";
import { Price } from "./Price/Price";
import { TagsFilter } from "../../../components/TagsFilter/TagsFilter";
import { SelectTags } from "../../../components/SelectTags/SelectTags";

export const Content = () => {
  return (
    <StyledContent>
      <SelectTags label="Категорія" />
      <Divider />
      <SelectTags label="Локація" />
      <Divider />
      <TagsFilter label="Вулиця" />
      <Divider />
      <Price />
    </StyledContent>
  );
};

const StyledContent = styled.div`
  padding: 8px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
`;
