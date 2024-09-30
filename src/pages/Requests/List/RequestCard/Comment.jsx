import styled from "styled-components";
import { ProfileField } from "../../../../components/ProfileField";
import { useEffect, useState } from "react";
import { useLazyEditRequestCommentQuery } from "../../../../store/requests/requests.api";
import { handleResponse, showAlert } from "../../../../utilits";

export const Comment = ({ comment = "", id, onOpenEdit }) => {
  const [value, setValue] = useState("");
  const [editComment] = useLazyEditRequestCommentQuery();

  useEffect(() => {
    setValue(comment);
  }, [comment]);

  const handleSave = () => {
    if (value !== comment) {
      editComment({
        request_group: id,
        comment: value,
      }).then((resp) =>
        handleResponse(
          resp,
          () => {
            showAlert("success", "Зміни успішно збережено");
          },
          () => setValue(comment)
        )
      );
    }
  };

  return (
    <StyledComment>
      <ProfileField
        label="Коментар"
        placeholder="Пусто"
        value={value}
        onChange={(val) => setValue(val)}
        textarea
        onSave={handleSave}
        onBlur={handleSave}
        className="field"
        readOnly
        onClick={onOpenEdit}
      />
    </StyledComment>
  );
};

const StyledComment = styled.div`
  width: 280px;
  .field {
    border-radius: 9px;
    background: var(--element-inside-bg);
    padding: 10px 20px 10px 10px;
    height: 100%;
    &:hover {
      background: rgba(255, 255, 255, 0.3) !important;
    }
    &.active {
      background: #fff !important;
    }
  }
  .value {
    height: 83px !important;
    overflow: auto;
    word-break: break-all;
  }
  @media (max-width: 1399.9px) {
    width: 100%;
  }
  @media (min-width: 1400px) {
    width: 15svw;
    max-width: 140px;
  }
  @media (min-width: 1250px) {
    width: 15svw;
    max-width: 170px;
  }
  @media (min-width: 1450px) {
    width: 15svw;
    max-width: 170px;
  }
  @media (min-width: 1500px) {
    max-width: 200px;
  }
  @media (min-width: 1750px) {
    width: 25svw;
    max-width: 400px;
  }
  @media (min-width: 1900px) {
    width: 30svw;
    max-width: 550px;
  }
`;
