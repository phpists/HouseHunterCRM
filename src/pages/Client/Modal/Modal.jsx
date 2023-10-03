import styled from "styled-components";
import { Header } from "./Header";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export const Modal = ({ title, children, onClose }) => {
  const controls = useAnimationControls();

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
  }, []);

  return (
    <StyledModal
      initial={{ opacity: 0, translateX: "100%" }}
      transition={{ duration: 0.4 }}
      animate={controls}
    >
      <Header title={title} onClose={handleClose} />
      <div className="modal-content hide-scroll">{children}</div>
    </StyledModal>
  );
};

const StyledModal = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 413px;
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(44, 44, 44, 0.8);
  backdrop-filter: blur(12.5px);
  z-index: 50;
  .modal-content {
    padding: 20px;
    height: calc(100svh - 224px);
    overflow: auto;
  }
  @media (max-width: 500px) {
    width: 100%;
    border-left: none;
    .modal-content {
      display: flex;
      justify-content: center;
    }
  }
`;
