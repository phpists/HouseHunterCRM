import styled from "styled-components";
import { CloseButton } from "./CloseButton";
import { Platforms } from "./Platforms/Platforms";

export const AdListModal = ({ onClose, data }) => {
  return (
    <StyledObjectAdModal>
      <div className="modal-wrapper">
        <CloseButton onClick={onClose} />
        <div className="content">
          <Platforms data={data} />
        </div>
      </div>
    </StyledObjectAdModal>
  );
};

const StyledObjectAdModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: #2c2c2c66;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  .modal-wrapper {
    background: var(--modal-bg);
    padding: 40px;
    border-radius: 10px;
    width: 96svw;
    max-width: 400px;
    position: relative;
    max-height: 80vh;
    overflow: auto;
  }
  .content {
  }
  @media (max-width: 800px) {
    .header-modal-ad {
      flex-direction: column;
      gap: 10px;
    }
  }
`;
