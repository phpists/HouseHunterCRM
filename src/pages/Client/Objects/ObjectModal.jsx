import styled from "styled-components";
import { Modal } from "../Modal/Modal";
import { ObjectCard } from "../Object/Object";

export const ObjectModal = ({ onClose, selectedObject }) => (
  <StyledObjectModal>
    <Modal title="Детальніше" onClose={onClose}>
      <div className="object-modal-content">
        <ObjectCard
          className="object-wrapper"
          selectedObject={selectedObject}
        />
      </div>
    </Modal>
    <div className="modal-overlay" onClick={onClose}></div>
  </StyledObjectModal>
);

const StyledObjectModal = styled.div`
  display: none;
  .object-wrapper {
    padding: 0;
    margin: 0;
    height: max-content;
    border-radius: 0;
  }

  @media (max-width: 1400px) {
    display: block;
  }
`;
