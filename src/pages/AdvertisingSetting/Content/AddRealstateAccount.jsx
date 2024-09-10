import { useState } from "react";
import { Modal } from "../../../components/Modal/Modal";
import { useLazyConnectRealestateAccountQuery } from "../../../store/auth/auth.api";
import styled from "styled-components";
import { Field } from "../../../components/Field";
import { ProfileField } from "../../../components/ProfileField";
import { emailValidation, handleResponse } from "../../../utilits";

export const AddRealstateAccount = ({ onClose, onSuccess }) => {
  const [data, setData] = useState({
    email: "",
    pass: "",
  });
  const [addAccount] = useLazyConnectRealestateAccountQuery();
  const [loading, setLoading] = useState(false);

  const handleChangeField = (field, value) =>
    setData({ ...data, [field]: value });

  const handleSubmit = () => {
    setLoading(true);
    addAccount(data).then((resp) => {
      setLoading(false);
      handleResponse(resp, () => {
        onSuccess();
        onClose();
      });
    });
  };

  return (
    <Modal onClose={onClose} title={"Додати акаунт"}>
      <StyledAddRealstateAccount>
        <ProfileField
          label="Email"
          value={data?.email}
          onChange={(val) => handleChangeField("email", val)}
          alwaysOpen
          initOpen
          className="field"
          error={emailValidation(data?.email)}
        />
        <ProfileField
          label="Пароль"
          value={data?.pass}
          onChange={(val) => handleChangeField("pass", val)}
          alwaysOpen
          initOpen
          className="field"
          type="password"
        />
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={
            data?.email?.length === 0 ||
            data.pass?.length === 0 ||
            emailValidation(data?.email) ||
            loading
          }
        >
          Додати
        </button>
      </StyledAddRealstateAccount>
    </Modal>
  );
};

const StyledAddRealstateAccount = styled.div`
  .submit-btn {
    margin-top: 15px;
    border-radius: 8px;
    background: var(--blue);
    display: flex;
    height: 38px;
    padding: 9px 18px 11px 18px;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-align: center;
    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    width: 100%;
    transition: all 0.3s;
    &:hover {
      background: #5d63ff;
    }
  }
  .field {
    margin-bottom: 10px;
  }
`;
