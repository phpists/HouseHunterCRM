import styled from "styled-components";
import { SelectTags } from "../../SelectTags/SelectTags";
import { ProfileField } from "../../ProfileField";

export const Tags = ({ className }) => {
  return (
    <StyledTags className={`flex flex-col hide-scroll clickable ${className}`}>
      <SelectTags label="Теги" showTags />
      <ProfileField
        label="Коментар"
        value="Оренда 1- кімнатної квартири кухня студія"
        className="comment"
        contentHeight
        textarea
      />
    </StyledTags>
  );
};

const StyledTags = styled.div`
  padding: 8px;
  border-radius: 9px;
  background: rgba(50, 50, 50, 0.8);
  width: 200px;
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
  @media (min-width: 1400px) {
    width: 195px;
  }
  @media (min-width: 1600px) {
    width: 200px;
  }
  @media (min-width: 1700px) {
    width: 18svw;
  }
  @media (max-width: 1399.9px) {
    width: calc((100% - 210px - 40px) / 2);
    height: 250px;
    margin-right: 18px;
  }
`;
