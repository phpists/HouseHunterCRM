import styled from "styled-components";
import { ReactComponent as Close } from "../../assets/images/close.svg";
import DateRangePicker from "./DateRangePicker";
import { useRef } from "react";

const Modal = ({ onClose, onSubmit, initial }) => {
  const latestValueRef = useRef(initial);

  const handleDateChange = (newYear) => {
    latestValueRef.current = newYear;
  };

  const handleClose = () => {
    onSubmit(latestValueRef.current);
    onClose();
  };

  return (
    <StyledModal>
      <div className="card">
        <Close className="close-btn" onClick={onClose} />
        <DateRangePicker
          initial={initial}
          onClose={handleClose}
          onChange={handleDateChange}
        />
      </div>
    </StyledModal>
  );
};

const StyledModal = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100svw;
  height: 100svh;
  padding: 15px;
  background: rgba(44, 44, 44, 0.6);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  .card {
    padding: 15px;
    border-radius: 10px;
    background: var(--modal-bg);
    min-width: 300px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 9px;
    cursor: pointer;
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
`;

export default Modal;
