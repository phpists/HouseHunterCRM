import { styled } from "styled-components";
import { ProfileField } from "../../../components/ProfileField";

export const Text = ({ data, onChangeField, errors }) => {
  return (
    <StyledText className="hide-scroll">
      <ProfileField
        value={data?.title}
        placeholder="Введіть заголовок"
        onChange={(val) => onChangeField("title", val)}
        big
        className="title"
        error={!!errors.find((e) => e === "title")}
      />
      <ProfileField
        value={data?.description}
        placeholder="Введіть опис"
        onChange={(val) => onChangeField("description", val)}
        textarea
        className="title"
        contentHeight
        label="Опис"
        error={!!errors.find((e) => e === "description")}
      />
      <ProfileField
        value={data?.comment}
        placeholder="Введіть коментар"
        onChange={(val) => onChangeField("comment", val)}
        label="Коментар"
        className="title"
      />
    </StyledText>
  );
};

const StyledText = styled.div`
  padding: 15px;
  border-radius: 10px;
  background: #3d3d3d;
  margin-bottom: 10px;
  height: calc(100svh - 344px);
  overflow: auto;
  .title {
    margin-bottom: 10px;
    .value {
      font-weight: 300;
    }
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
  @media (max-width: 1300px) {
    height: max-content;
  }
  @media (max-width: 800px) {
    padding: 10px;
  }
`;
