import styled from "styled-components";
import { Modal } from "./Modal/Modal";
import { useEffect, useRef, useState } from "react";
import { ProfileField } from "./ProfileField";
import { useLazyAddUserFilterQuery } from "../store/auth/auth.api";
import { handleResponse, showAlert } from "../utilits";

export const SaveFilterModal = ({ onClose, filters, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [saveFilter] = useLazyAddUserFilterQuery();

  const handleSave = () => {
    setLoading(true);

    saveFilter({ name, data: JSON.stringify(filters) }).then((resp) => {
      setLoading(false);
      handleResponse(resp, () => {
        onSuccess();
        onClose();
        showAlert("success", "Успішно додано");
      });
    });
  };

  return (
    <StyledSaveFilterModal>
      <Modal onClose={onClose} title="Збереження пошуку">
        <div className="edit-comment-content hide-scroll">
          <ProfileField
            label="Назва"
            value={name}
            onChange={(val) => setName(val)}
            alwaysOpen
            initOpen
          />
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={loading || name?.length === 0}
          >
            Зберегти
          </button>
        </div>
      </Modal>
    </StyledSaveFilterModal>
  );
};

const StyledSaveFilterModal = styled.div`
  .save-btn {
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
    margin-top: 10px;
  }
`;
