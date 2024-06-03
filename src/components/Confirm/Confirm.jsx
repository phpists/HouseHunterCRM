import styled from "styled-components";
import bg from "../../assets/images/add-client-bg.svg";
import { Title } from "./Title";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { ReactComponent as Close } from "../../assets/images/close.svg";
import { motion, useAnimationControls } from "framer-motion";
import { Field } from "../Field";
import { useLazyCheckUserQuery } from "../../store/auth/auth.api";
import { useAppSelect } from "../../hooks/redux";
import cogoToast from "cogo-toast";
import { handleResponse } from "../../utilits";

export const Confirm = ({
  onClose,
  onSubmit,
  title,
  passwordCheck,
  confirmText,
  onChangeConfirmText,
}) => {
  const controls = useAnimationControls();
  const [password, setPassword] = useState("");
  const [checkUser] = useLazyCheckUserQuery();
  const { user } = useAppSelect((state) => state.auth);

  const handleClose = () => {
    controls.start({ opacity: 0, zIndex: -20 });
    setTimeout(onClose, 500);
    setPassword("");
  };

  const handleSubmit = () => {
    if (passwordCheck) {
      if (password?.length === 0) {
        cogoToast.error("Введіть пароль для підтвердження", {
          hideAfter: 3,
          position: "top-right",
        });
      } else {
        checkUser({
          password,
          email: user?.email,
        }).then((resp) =>
          handleResponse(resp, () => {
            if (resp?.data?.error === 0) {
              onSubmit();
              handleClose();
            }
          })
        );
      }
    } else {
      onSubmit();
      handleClose();
    }
  };

  useEffect(() => {
    controls.start({ opacity: 1, zIndex: 102 });
    onChangeConfirmText && onChangeConfirmText("");
    console.log(typeof confirmText);
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
      isPassword={password?.length > 0}
    >
      <div className={`modal`}>
        <Close className="close-btn" onClick={handleClose} />
        <Title title={title} />
        {passwordCheck ? (
          <div className="checkPassword">
            <Field
              label="Пароль"
              placeholder="Введіть пароль для підтвердження"
              value={password}
              onChange={(val) => setPassword(val)}
              className="passwordValue"
            />
          </div>
        ) : null}
        {typeof confirmText === "string" ? (
          <div className="checkPassword">
            <Field
              label="Причина видалення"
              placeholder="Введіть причину видалення"
              value={confirmText}
              onChange={onChangeConfirmText}
              className="input-value"
            />
          </div>
        ) : null}
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
    background: var(--modal-bg);
    padding: 40px;
    max-width: 380px;
    width: 90%;
    z-index: 2;
    transition: all 0.3s;
    position: relative;
    .passwordValue {
      margin: 10px 0;
      .value {
        width: 250px;
        ${({ isPassword }) => isPassword && "filter: blur(5px);"}
      }
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
