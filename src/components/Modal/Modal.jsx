import styled from "styled-components";
import bg from "../../assets/images/add-client-bg.svg";
import { Title } from "./Title";
import { Button } from "./Button";
import { useEffect } from "react";
import { ReactComponent as Close } from "../../assets/images/close.svg";
import { motion, useAnimationControls } from "framer-motion";

export const Modal = ({ onClose, title, notCloseOverlay, children }) => {
  const controls = useAnimationControls();

  const handleClose = () => {
    controls.start({ opacity: 0, zIndex: -20 });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, zIndex: 102 });
  }, []);

  const handleClickOnOverlay = (e) =>
    !notCloseOverlay && e.target.classList.contains("overlay") && handleClose();

  return (
    <StyledModal
      className="flex items-center justify-center overlay"
      bg={bg}
      onClick={handleClickOnOverlay}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      animate={controls}
    >
      <div className={`modal`}>
        <Close className="close-btn" onClick={handleClose} />
        <Title title={title} />
        {children}
      </div>
    </StyledModal>
  );
};

const StyledModal = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(44, 44, 44, 0.4);
  backdrop-filter: blur(5px);
  z-index: 1202 !important;
  .form {
    margin-top: 15px;
  }
  .modal {
    border-radius: 10px;
    background: var(--modal-bg);
    padding: 40px;
    max-width: 380px;
    width: 90%;
    z-index: 2;
    transition: all 0.3s;
    position: relative;
    max-height: 90vh;
    overflow: auto;
    a {
      font-weight: 700;
    }
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
  &::before {
    content: "";
    position: absolute;
    display: block;
    top: 50%;
    transform: translateY(-50%);
    width: 600px;
    height: 600px;
    background: url(${({ bg }) => bg}) center/cover no-repeat;
    opacity: 0.7;
  }

  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 20px;
  }
`;
