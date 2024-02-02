import styled from "styled-components";
import bg from "../../assets/images/add-client-bg.svg";
import { Title } from "./Title";
import { Input } from "./Input";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { Subtitle } from "./Subtitle";
import { ReactComponent as Close } from "../../assets/images/close.svg";
import { motion, useAnimationControls } from "framer-motion";
import {
  useLazyCreateClientQuery,
  useLazyGetClientsCountQuery,
  useLazyGetNewClientsCountQuery,
} from "../../store/clients/clients.api";
import {
  emailValidation,
  handleRemovePhoneMask,
  handleResponse,
} from "../../utilits";
import cogoToast from "cogo-toast";
import { useActions } from "../../hooks/actions";
import { useGetPhonesCodesQuery } from "../../store/auth/auth.api";

export const AddClient = ({ onClose, onAdded }) => {
  const [createClient] = useLazyCreateClientQuery();
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const [success, setSuccess] = useState(false);
  const controls = useAnimationControls();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [getClientCount] = useLazyGetClientsCountQuery();
  const { saveClientsCount, saveNewClientsCount } = useActions();
  const [getNewClientsCount] = useLazyGetNewClientsCountQuery();
  const [phoneCode, setPhoneCode] = useState("1");

  const handleGetClientsCount = () => {
    getClientCount().then((resp) => saveClientsCount(resp?.data?.count ?? 0));
    getNewClientsCount().then((resp) => saveNewClientsCount(resp?.data?.count));
  };

  const handleChangePhoneCode = (code) => {
    setPhone("");
    setPhoneCode(code);
  };
  const handleChangeEmail = (val) => {
    setEmail(val);
    setErrors({ email: emailValidation(val) });
  };

  const handleClose = () => {
    controls.start({ opacity: 0, zIndex: -20 });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, zIndex: 102 });
  }, []);

  const handleClickOnOverlay = (e) =>
    e.target.classList.contains("overlay") && handleClose();

  const handleSubmit = () => {
    setLoading(true);
    createClient({
      first_name: name,
      last_name: lastName,
      email,
      phones_json: JSON.stringify([
        {
          phone: handleRemovePhoneMask(phone),
          id_phone_code: phoneCode,
          viber: false,
          telegram: false,
        },
      ]),
    }).then((resp) => {
      setLoading(false);
      handleResponse(resp, () => {
        // setSuccess(true);
        handleClose();
        cogoToast.success("Клієнта успішно додано", {
          hideAfter: 3,
          position: "top-right",
        });
        handleGetClientsCount();
        onAdded && onAdded();
      });
    });
  };

  return (
    <StyledAddClient
      className="flex items-center justify-center overlay"
      bg={bg}
      onClick={handleClickOnOverlay}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      animate={controls}
    >
      <div
        className={`modal ${
          success && "flex flex-col items-center justify-center"
        }`}
      >
        <Close className="close-btn" onClick={handleClose} />
        <Title title="Додати нового клієнта" />
        {success ? null : ( //   <Subtitle />
          <div className="form">
            <Input label="Ім’я" value={name} onChange={(val) => setName(val)} />
            <Input
              label="Прізвище"
              value={lastName}
              onChange={(val) => setLastName(val)}
            />
            {/* <Input
              label="Email"
              value={email}
              onChange={handleChangeEmail}
              error={errors?.email}
            /> */}
            <Input
              label="Перевірка номера телефона"
              phone
              value={phone}
              onChange={(val) => setPhone(val)}
              phonesCodes={phonesCodes}
              phoneCode={phoneCode}
              onChangePhoneCode={handleChangePhoneCode}
            />
            <Button
              onClick={handleSubmit}
              disabled={
                name?.length === 0 ||
                phone?.includes("_") ||
                phone?.length === 0 ||
                // email?.length === 0 ||
                // errors?.email ||
                loading
              }
              loading={loading}
            />
          </div>
        )}
      </div>
    </StyledAddClient>
  );
};

const StyledAddClient = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(44, 44, 44, 0.4);
  backdrop-filter: blur(5px);
  z-index: 102;
  .form {
    margin-top: 15px;
  }
  .modal {
    border-radius: 10px;
    background: #2b2b2b;
    padding: 40px;
    min-height: 308px;
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
`;
