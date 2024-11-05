import styled from "styled-components";
import { Modal } from "../../components/Modal/Modal";

export const ObjectInfo = ({ onClose, object }) => {
  return (
    <StyledObjectInfo>
      <Modal onClose={onClose} title={object?.title}>
        <div className="text">{object.description}</div>
      </Modal>
    </StyledObjectInfo>
  );
};

const StyledObjectInfo = styled.div`
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
