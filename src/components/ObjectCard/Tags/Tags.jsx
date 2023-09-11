import styled from "styled-components";
import { SelectTags } from "../../SelectTags/SelectTags";
import { ProfileField } from "../../ProfileField";

export const Tags = () => {
  return (
    <StyledTags className="flex flex-col hide-scroll">
      <SelectTags label="Теги" showTags />
      <ProfileField
        label="Коментар"
        value="Оренда 1- кімнатної квартири кухня студія"
        className="comment"
      />
    </StyledTags>
  );
};

const StyledTags = styled.div`
  padding: 8px;
  border-radius: 9px;
  background: rgba(50, 50, 50, 0.8);
  width: 240px;
  margin-right: 10px;
  height: 200px;
  overflow: auto;
  .comment {
    margin-top: 8px;
    .value {
      font-size: 12px;
    }
    .label {
      font-size: 11px;
    }
  }
`;
