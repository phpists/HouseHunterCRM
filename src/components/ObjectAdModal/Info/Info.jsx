import styled from "styled-components";
import { Title } from "./Title";
import { ProfileField } from "../../ProfileField";
import { RealestateForm } from "./RealestateForm";
import { useEffect, useRef } from "react";
import { RieltorForm } from "./RieltorForm";

export const Info = ({
  data,
  onChange,
  loading,
  onChangeCitiesCount,
  activeTab,
  onChangeStreetsCount,
}) => {
  const infoRef = useRef(null);

  useEffect(() => {
    if (activeTab) {
      infoRef.current.scrollTo({ top: 0 });
    }
  }, [activeTab]);

  return (
    <StyledInfo ref={infoRef}>
      <Title />
      <ProfileField
        value={data?.title}
        placeholder="Введіть заголовок"
        onChange={(val) =>
          loading || val.length > 70 ? null : onChange("title", val)
        }
        big
        className="title"
        initOpen
        alwaysOpen
        label="Опис"
        readOnly
        maxLength={70}
        showCount
        error={data?.title?.length > 0 && data?.title?.length < 16}
        errorMessage="Мінімальна кількість символів - 16"
      />
      <ProfileField
        value={data?.description}
        placeholder="Введіть опис"
        onChange={(val) =>
          loading || val.length > 9000 ? null : onChange("description", val)
        }
        textarea
        className="title desciption"
        label="Опис"
        initOpen
        alwaysOpen
        readOnly
        maxLength={9000}
        showCount
        errorMessage="Мінімальна кількість символів - 100"
        error={data?.description?.length > 0 && data?.description?.length < 100}
      />
      {activeTab === 1 ? (
        <>
          {" "}
          <RealestateForm
            data={data}
            onChange={onChange}
            onChangeCitiesCount={onChangeCitiesCount}
            onChangeStreetsCount={onChangeStreetsCount}
          />
        </>
      ) : activeTab === 3 ? (
        <RieltorForm data={data} onChange={onChange} />
      ) : (
        <>
          {activeTab === 0 && (
            <div className="flex items-center gap-5">
              <ProfileField
                value={data?.author_name}
                placeholder="Введіть ім'я"
                onChange={(val) =>
                  loading ? null : onChange("author_name", val)
                }
                big
                className="title"
                initOpen
                alwaysOpen
                label="Опис"
                readOnly
              />
              <ProfileField
                value={data?.author_phone}
                phonePlaceholder="Введіть телефон"
                label="Телефон"
                onChange={(val) =>
                  loading ? null : onChange("author_phone", val)
                }
                big
                className="title"
                initOpen
                alwaysOpen
                readOnly
                type="number"
                phone
                mask="0000000000"
              />
            </div>
          )}
        </>
      )}
    </StyledInfo>
  );
};

const StyledInfo = styled.div`
  width: 100%;
  max-height: 350px;
  overflow: auto;
  padding-right: 8px;
  .title {
    margin-bottom: 15px;
  }
  .desciption {
    height: 180px;
    .value {
      height: 130px !important;
      white-space: normal;
    }
  }
  @media (max-width: 800px) {
    max-height: max-content;
  }
`;
