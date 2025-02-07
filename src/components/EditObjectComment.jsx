import styled from "styled-components";
import { Modal } from "./Modal/Modal";
import { useEffect, useRef, useState } from "react";
import { handleResponse, showAlert } from "../utilits";
import { useLazyEditObjectCommentQuery } from "../store/objects/objects.api";

export const EditObjectComment = ({ onClose, object, onChange }) => {
  const [value, setValue] = useState(object?.comment ?? "");
  const [editComment] = useLazyEditObjectCommentQuery();
  const textareaRef = useRef(null);

  const handleResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleResizeTextarea();
  }, [textareaRef.current]);

  const textAreaAdjust = (e) => {
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(object?.comment);
    handleResizeTextarea();
  }, [object?.comment]);

  const commentFormatDate = () => {
    const data = new FormData();
    data.append("action", "add_coment_to_object");
    data.append("mod", "objects");
    data.append("id_object", object?.id);
    data.append("comment", value);

    return data;
  };

  const handleSave = () => {
    editComment(commentFormatDate()).then((resp) =>
      handleResponse(
        resp,
        () => {
          showAlert("success", "Зміни успішно збережено");

          onChange(object?.id, value);
          onClose();
        },
        () => setValue(object?.comment)
      )
    );
  };

  return (
    <StyleEditObjectComment>
      <Modal
        onClose={onClose}
        title={object?.isEdit ? "Редагування коментаря" : "Перегляд коментаря"}
      >
        <div className="edit-comment-content hide-scroll">
          <div className="label">Коментар</div>
          <textarea
            value={value}
            onChange={textAreaAdjust}
            placeholder={object?.isEdit ? "Введіть значення" : "Пусто"}
            ref={textareaRef}
            autoFocus
            readOnly={!object?.isEdit}
          />
          {object?.isEdit ? (
            <button onClick={handleSave}>Зберегти</button>
          ) : null}
        </div>
      </Modal>
    </StyleEditObjectComment>
  );
};

const StyleEditObjectComment = styled.div`
  .label {
    font-family: Overpass, sans-serif;
    font-size: 14px;
    font-weight: var(--font-weight-200);
    line-height: 17px;
    letter-spacing: 0em;
    margin-bottom: 4px;
    color: var(--main-color);
  }
  .edit-comment-content {
    max-height: 60vh;
    overflow: auto;
  }
  textarea {
    resize: none;
    height: 80px;
    width: 100%;
    background: var(--second-bg-edit-textarea);
    margin-bottom: 15px;
    padding: 10px 10px 14px 10px;
    border-radius: 6px;
    color: var(--main-color);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    overflow: auto;
    &::placeholder {
      color: var(--main-color);
      font-family: Overpass;
      font-size: 14px;
      font-style: normal;
      font-weight: var(--font-weight-200);
      line-height: 118%; /* 17.7px */
      letter-spacing: 0.3px;
    }
  }
  button {
    width: 100%;
    height: 38px;
    padding: 9px 18px 11px 18px;
    border-radius: 8px;
    background: #5d63ffb2;
    font-family: Overpass, sans-serif;
    font-size: 15px;
    font-weight: var(--font-weight-200);
    line-height: 18px;
    letter-spacing: 0.02em;
    text-align: center;
    color: #FFF;

  }
`;
