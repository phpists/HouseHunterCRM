import { useEffect, useState } from "react";
import styled from "styled-components";
import { ProfileField } from "../../ProfileField";
import { handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";
import { useLazyEditObjectCommentQuery } from "../../../store/objects/objects.api";

export const Comment = ({ id, comment }) => {
  const [value, setValue] = useState("");
  const [editComment] = useLazyEditObjectCommentQuery();

  useEffect(() => {
    setValue(typeof comment === "string" ? comment : "");
  }, [comment]);

  const commentFormatDate = () => {
    const data = new FormData();
    data.append("action", "add_coment_to_object");
    data.append("mod", "objects");
    data.append("id_object", id);
    data.append("comment", value);

    return data;
  };

  const handleSave = () => {
    if (value !== comment) {
      editComment(commentFormatDate()).then((resp) =>
        handleResponse(
          resp,
          () => {
            cogoToast.success("Зміни успішно збережено", {
              hideAfter: 3,
              position: "top-right",
            });
          },
          () => setValue(typeof comment === "string" ? comment : "")
        )
      );
    }
  };

  return (
    <StyledComment>
      <ProfileField
        label="Коментар"
        placeholder="Введіть коментар"
        value={value}
        onChange={(val) => setValue(val)}
        className="comment"
        contentHeight
        onSave={handleSave}
        onBlur={handleSave}
      />
    </StyledComment>
  );
};

const StyledComment = styled.div`
  margin-top: 8px;
  max-width: 200px;
  .value {
    font-size: 12px;
  }
  .label {
    font-size: 11px;
  }
`;
