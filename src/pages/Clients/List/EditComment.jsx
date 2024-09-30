import styled from "styled-components";
import { Modal } from "../../../components/Modal/Modal";
import { useEffect, useRef, useState } from "react";
import { handleResponse, showAlert } from "../../../utilits";
import { useLazyEditClientCommentQuery } from "../../../store/clients/clients.api";

export const EditComment = ({ onClose, client, onChange }) => {
  const [value, setValue] = useState(client?.comment ?? "");
  const [editComment] = useLazyEditClientCommentQuery();
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
    setValue(client?.comment);
    handleResizeTextarea();
  }, [client?.comment]);

  const handleSave = () => {
    editComment({
      id_client: client?.id,
      comment: value,
    }).then((resp) =>
      handleResponse(
        resp,
        () => {
          showAlert("success", "Зміни успішно збережено");
          onChange(value, client?.id);
          onClose();
        },
        () => setValue(client?.comment)
      )
    );
  };

  return (
    <StyledEditComment>
      <Modal onClose={onClose} title="Редагування коментаря">
        <div className="edit-comment-content hide-scroll">
          <div className="label">Коментар</div>
          <textarea
            value={value}
            onChange={textAreaAdjust}
            placeholder="Введіть значення"
            ref={textareaRef}
            autoFocus
          />
          <button onClick={handleSave}>Зберегти</button>
        </div>
      </Modal>
    </StyledEditComment>
  );
};

const StyledEditComment = styled.div`
  .label {
    font-family: Overpass, sans-serif;
    font-size: 14px;
    font-weight: var(--font-weight-200);
    line-height: 17px;
    letter-spacing: 0em;
    margin-bottom: 4px;
    color: var(--main-color);
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
    color: #fff;
  }
`;
