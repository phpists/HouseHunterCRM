import styled from "styled-components";
import { SelectTags } from "../../../../../components/SelectTags/SelectTags";
import { Divider } from "../Divider";
import { Field } from "../../../../../components/Field";
import { Avatar } from "./Avatar";

export const Search = () => (
  <StyledSearch>
    <SelectTags label="По потоку" notMultiSelect tagValue initValue="Оренда" />
    <Divider />
    <Field label="По ключу" placeholder="Почніть писати" />
    <Divider />
    <SelectTags label="По номеру телефона" />
    <Divider />
    <SelectTags label="По агентах" Component={<Avatar />} search />
  </StyledSearch>
);

const StyledSearch = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
`;
