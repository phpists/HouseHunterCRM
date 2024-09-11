import styled from "styled-components";
import { Title } from "./Title";
import { ProfileField } from "../../ProfileField";
import { RealestateForm } from "./RealestateForm";

export const Info = ({
  data,
  onChange,
  loading,
  onChangeCitiesCount,
  activeTab,
}) => (
  <StyledInfo>
    {activeTab === 1 ? (
      <>
        {" "}
        <Title />
        <RealestateForm
          data={data}
          onChange={onChange}
          onChangeCitiesCount={onChangeCitiesCount}
        />
      </>
    ) : activeTab === 0 ? (
      <>
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
      </>
    ) : null}
  </StyledInfo>
);

const StyledInfo = styled.div`
  width: 100%;
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
