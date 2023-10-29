import styled from "styled-components";
import { Modal } from "../Modal/Modal";
import { Object } from "../Object/Object";

export const ObjectModal = ({ onClose, selectedObject }) => (
  <StyledObjectModal>
    <Modal title="Детальніше" onClose={onClose}>
      <div className="object-modal-content">
        <Object className="object-wrapper" selectedObject={selectedObject} />
      </div>
    </Modal>
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
