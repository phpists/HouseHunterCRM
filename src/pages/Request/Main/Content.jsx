import { styled } from "styled-components";
import { Select } from "../Select/Select";
import { Divider } from "../Divider";
import { TagsFilter } from "../TagsFilter/TagsFilter";
import { Price } from "./Price/Price";

export const Content = () => {
  return (
    <StyledContent>
      <Select label="Категорія" />
      <Divider />
      <Select label="Локація" />
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
