import styled from "styled-components";
import { ProfileField } from "../../../../components/ProfileField";
import { useEffect, useState } from "react";
import { useLazyEditRequestCommentQuery } from "../../../../store/requests/requests.api";
import { handleResponse } from "../../../../utilits";
import cogoToast from "cogo-toast";

export const Comment = ({ comment = "", id }) => {
  const [edit, setEdit] = useState(false);
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
            cogoToast.success("Зміни успішно збережено", {
              hideAfter: 3,
              position: "top-right",
            });
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
      />
    </StyledComment>
  );
};

const StyledComment = styled.div`
  width: 200px;
  .field {
    border-radius: 9px;
    background: #363636;
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
  }
  @media (max-width: 1399.9px) {
    width: 100%;
  }
  @media (min-width: 1400px) {
    width: 15svw;
    max-width: 500px;
  }
  @media (min-width: 1750px) {
    width: 25svw;
    max-width: 700px;
  }
  @media (min-width: 1900px) {
    width: 30svw;
    max-width: 550px;
  }
`;
