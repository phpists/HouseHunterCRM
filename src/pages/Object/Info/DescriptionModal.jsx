import styled from "styled-components";
import { Modal } from "../../../components/Modal/Modal";
import { useState } from "react";
import { ProfileField } from "../../../components/ProfileField";
import { Button } from "../../../components/Modal/Button";

export const DescriptionModal = ({ onClose, initValue }) => {
  const [value, setValue] = useState(initValue);

  return (
    <StyledDescriptionModal>
      <Modal onClose={onClose} title="Опис">
        <ProfileField
          value={value}
          placeholder="Введіть опис"
          onChange={(val) => setValue(val)}
          textarea
          className="title desciption"
          label="Опис"
        />
        <div className="footer">
          <Button title="Відмінити" cancel onClick={() => onClose()} />
          <Button
            title="Зберегти"
            onClick={() => onClose(value)}
            className="submit-btn"
          />
        </div>
      </Modal>
    </StyledDescriptionModal>
  );
};

const StyledDescriptionModal = styled.div`
  .modal {
    max-width: 900px;
    .desciption {
      .value {
        max-height: 200px !important;
        height: 50vh !important;
      }
    }
  }
  .footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 20px;
    width: max-content;
    margin-left: auto;
    .submit-btn {
      color: #fff !important;
    }
  }
`;
