import styled from "styled-components";
import { Modal } from "../Modal/Modal";

export const DeleteInfo = ({ onClose, text }) => {
  return (
    <StyledDeleteInfo>
      <Modal onClose={onClose} title="Причина видалення">
        <div className="text">{text}</div>
      </Modal>
    </StyledDeleteInfo>
  );
};

const StyledDeleteInfo = styled.div``;
