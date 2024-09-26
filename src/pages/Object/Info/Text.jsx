import { styled } from "styled-components";
import { ProfileField } from "../../../components/ProfileField";
import { useEffect, useRef, useState } from "react";
import { Tags } from "./Tags";
import { useParams } from "react-router-dom";
import { DescriptionModal } from "./DescriptionModal";

export const Text = ({ data, onChangeField, errors, objectData }) => {
  const textRef = useRef(null);
  const { clientId, id } = useParams();
  const [descrModal, setDescrModal] = useState(false);

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

  const handleOpenTags = (isOpen) => {
    const tags = document.querySelector(".selectTagsWrapper .open");
    if (tags) {
      textRef.current.scrollTo({
        top: isOpen ? tags?.offsetTop - textRef.current.offsetTop - 10 : 0,
        behavior: "smooth",
      });
    } else if (!isOpen) {
      textRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleCloseDescModal = (val) => {
    setDescrModal(false);
    if (val) {
      onChangeField("description", val);
    }
  };

  return (
    <StyledText className="hide-scroll object-text-wrapper" ref={textRef}>
      {descrModal && (
        <DescriptionModal
          onClose={handleCloseDescModal}
          initValue={data?.description}
        />
      )}
      <ProfileField
        value={data?.title}
        placeholder="Введіть заголовок"
        onChange={(val) =>
          val.length > 70 ? null : onChangeField("title", val)
        }
        big
        className="title"
        error={!!errors.find((e) => e === "title")}
        showCount
        maxLength={70}
      />
      <ProfileField
        value={data?.description}
        placeholder="Введіть опис"
        onChange={(val) =>
          val.length > 9000 ? null : onChangeField("description", val)
        }
        textarea
        className="title desciption"
        contentHeight
        label="Опис"
        error={!!errors.find((e) => e === "description")}
        onClickOnIconEdit={() => setDescrModal(true)}
        showCount
        maxLength={9000}
      />
      <ProfileField
        value={data?.comment}
        placeholder="Введіть коментар"
        onChange={(val) => onChangeField("comment", val)}
        label="Коментар"
        className="title comment"
        textarea
      />
      {id && <Tags data={objectData} onToggleOpen={handleOpenTags} />}
    </StyledText>
  );
};

const StyledText = styled.div`
  padding: 15px;
  border-radius: 10px;
  background: var(--card-bg);
  margin-bottom: 10px;
  height: calc(100svh - 350px);
  overflow: auto;
  .title {
    margin-bottom: 10px;
    .value {
      font-weight: var(--font-weight-light);
    }
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
  .desciption {
    border: 1px solid var(--bg-10);
    .value {
      white-space: unset !important;
      height: 85px;
      overflow: auto;
      text-overflow: unset;
      width: 100%;
      word-wrap: break-word;
    }
    textarea {
      height: 85px !important;
    }
  }
  .comment {
    border: 1px solid var(--bg-10);
    .value {
      white-space: unset !important;
      height: 35px;
      overflow: auto;
      text-overflow: unset;
      width: 100%;
      word-wrap: break-word;
    }
    textarea {
      height: 35px !important;
    }
  }
  @media (max-width: 1300px) {
    height: max-content;
  }
  @media (max-width: 800px) {
    padding: 10px;
  }
`;
