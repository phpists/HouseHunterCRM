import { styled } from "styled-components";
import { Divider } from "../../Divider";
import { TagsFilter } from "../../../../components/TagsFilter/TagsFilter";
import { TitleDivider } from "../TitleDivider";

export const Search = ({ title, data, onChangeField, errors }) => {
  return (
    <StyledSearch>
      <TitleDivider title={title} />
      <TagsFilter
        label="Пошук"
        search
        tags={
          Array.isArray(data?.search_key_like_json)
            ? data?.search_key_like_json
            : []
        }
        onChange={(val) => onChangeField("search_key_like_json", val)}
        error={!!errors?.find((e) => e === "search_key_like_json")}
      />
      <Divider />
      <TagsFilter
        label="Пошук 2"
        search
        tags={
          Array.isArray(data?.search_key_like2_json)
            ? data?.search_key_like2_json
            : []
        }
        onChange={(val) => onChangeField("search_key_like2_json", val)}
        error={!!errors?.find((e) => e === "search_key_like2_json")}
      />
      <Divider />
      <TagsFilter
        label="Пошук виключення"
        search
        tags={
          Array.isArray(data?.search_key_notlike_json)
            ? data?.search_key_notlike_json
            : []
        }
        onChange={(val) => onChangeField("search_key_notlike_json", val)}
        error={!!errors?.find((e) => e === "search_key_notlike_json")}
      />
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  padding: 8px;
  border-radius: 14px;
  background: var(--bg-10);
  margin-bottom: 15px;
`;
