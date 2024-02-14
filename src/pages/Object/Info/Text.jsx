import { styled } from "styled-components";
import { ProfileField } from "../../../components/ProfileField";
import { useEffect, useRef } from "react";

export const Text = ({ data, onChangeField, errors }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (
      !!errors?.find((e) => e === "updated") &&
      errors.find((e) => e === "title")
    ) {
      const wrapper = document.querySelector(".object-main-wrapper");
      if (wrapper) {
        wrapper.scrollTo({
          top: textRef.current.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [errors]);

  return (
    <StyledText className="hide-scroll" ref={textRef}>
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
        className="title desciption"
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
  .desciption {
    .value {
      white-space: unset !important;
      height: 160px;
      overflow: auto;
      text-overflow: unset;
      width: 100%;
      word-wrap: break-word;
    }
    textarea {
      height: 160px !important;
    }
  }
  @media (max-width: 1300px) {
    height: max-content;
  }
  @media (max-width: 800px) {
    padding: 10px;
  }
`;
