import styled from "styled-components";
import { Modal } from "../../components/Modal/Modal";

export const PhonesModal = ({ onClose, object }) => {
  return (
    <StyledPhonesModal>
      <Modal onClose={onClose} title="Коментар">
        <div className="text">test</div>
      </Modal>
    </StyledPhonesModal>
  );
};

const StyledPhonesModal = styled.div`
  .modal {
    max-width: 700px;
  }
  .text {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%;
    letter-spacing: 0.3px;
    opacity: var(--opacity-ligh);
  }
`;
