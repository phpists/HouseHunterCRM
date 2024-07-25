import styled from "styled-components";
import { Title } from "./Title";
import { ProfileField } from "../../ProfileField";

export const Info = ({ data, onChange, loading }) => (
  <StyledInfo>
    <Title />
    <ProfileField
      value={data?.title}
      placeholder="Введіть заголовок"
      //   onChange={(val) => (loading ? null : onChange("title", val))}
      onChange={() => null}
      big
      className="title"
      initOpen
      alwaysOpen
      label="Опис"
      readOnly
    />
    <ProfileField
      value={data?.description}
      placeholder="Введіть опис"
      //   onChange={(val) => (loading ? null : onChange("description", val))}
      onChange={() => null}
      textarea
      className="title desciption"
      label="Опис"
      initOpen
      alwaysOpen
      readOnly
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
