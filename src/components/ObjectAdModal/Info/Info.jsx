import styled from "styled-components";
import { Title } from "./Title";
import { ProfileField } from "../../ProfileField";

export const Info = ({ data, onChange, loading }) => (
  <StyledInfo>
    <Title />
    <ProfileField
      value={data?.title}
      placeholder="Введіть заголовок"
      onChange={(val) => (loading ? null : onChange("title", val))}
      big
      className="title"
      initOpen
      alwaysOpen
      label="Опис"
    />
    <ProfileField
      value={data?.description}
      placeholder="Введіть опис"
      onChange={(val) => (loading ? null : onChange("description", val))}
      textarea
      className="title desciption"
      label="Опис"
      initOpen
      alwaysOpen
    />
  </StyledInfo>
);

const StyledInfo = styled.div`
  .title {
    margin-bottom: 15px;
  }
  .desciption {
    height: 170px;
    .value {
      height: 130px !important;
    }
  }
`;
