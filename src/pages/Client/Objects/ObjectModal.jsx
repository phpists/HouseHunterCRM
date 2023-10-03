import styled from "styled-components";
import { Modal } from "../Modal/Modal";
import { Object } from "../Object/Object";

export const ObjectModal = ({ onClose }) => (
  <StyledObjectModal>
    <Modal title="Детальніше" onClose={onClose}>
      <div className="object-modal-content">
        <Object className="object-wrapper" />
      </div>
    </Modal>
  </StyledObjectModal>
);

const StyledObjectModal = styled.div`
  .object-wrapper {
    padding: 0;
    margin: 0;
    height: max-content;
    border-radius: 0;
  }
`;
