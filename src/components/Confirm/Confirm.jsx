import styled from "styled-components";
import bg from "../../assets/images/add-client-bg.svg";
import { Title } from "./Title";
import { Button } from "./Button";
import { useEffect } from "react";
import { ReactComponent as Close } from "../../assets/images/close.svg";
import { motion, useAnimationControls } from "framer-motion";

export const Confirm = ({ onClose, onSubmit, title }) => {
  const controls = useAnimationControls();

  const handleClose = () => {
    controls.start({ opacity: 0, zIndex: -20 });
    setTimeout(onClose, 500);
  };

  const handleSubmit = () => {
    onSubmit();
    handleClose();
  };

  useEffect(() => {
    controls.start({ opacity: 1, zIndex: 102 });
  }, []);

  const handleClickOnOverlay = (e) =>
    e.target.classList.contains("overlay") && handleClose();

  return (
    <StyledConfirm
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
        <div className="buttons">
          <Button title="Ні" cancel onClick={handleClose} />
          <Button title="Так" onClick={handleSubmit} />
        </div>
      </div>
    </StyledConfirm>
  );
};

const StyledConfirm = styled(motion.div)`
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
    background: #2b2b2b;
    padding: 40px;
    width: 280px;
    z-index: 2;
    transition: all 0.3s;
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
