import { useState } from "react";
import { Modal } from "../../../components/Modal/Modal";
import {
  useGetPhonesCodesQuery,
  useLazyConnectRealestateAccountQuery,
  useLazyConnectRieltorAccountQuery,
} from "../../../store/auth/auth.api";
import styled from "styled-components";
import { Field } from "../../../components/Field";
import { ProfileField } from "../../../components/ProfileField";
import { emailValidation, handleResponse } from "../../../utilits";

export const AddRieltorAccount = ({ onClose, onSuccess }) => {
  const [data, setData] = useState({
    login: "",
    pass: "",
  });
  const [addAccount] = useLazyConnectRieltorAccountQuery();
  const [loading, setLoading] = useState(false);
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const [phoneCode, setPhoneCode] = useState("1");

  const handleChangeField = (field, value) =>
    setData({ ...data, [field]: value });

  const handleSubmit = () => {
    setLoading(true);
    addAccount({
      ...data,
      login: `${phonesCodes?.find((p) => p.id === phoneCode)?.code ?? ""}${
        data.login
      }`,
    }).then((resp) => {
      setLoading(false);
      handleResponse(resp, () => {
        onSuccess();
        onClose();
      });
    });
  };

  console.log(data?.login);

  return (
    <Modal onClose={onClose} title={"Додати акаунт"}>
      <StyledAddRieltorAccount>
        <ProfileField
          label="Телефон"
          value={data?.login}
          onChange={(val) => handleChangeField("login", val)}
          alwaysOpen
          initOpen
          className="field"
          noAutoFill
          phone
          phonesCodes={phonesCodes}
          phoneCode={phoneCode}
          onChangePhoneCode={(val) => setPhoneCode(val)}
        />
        <ProfileField
          label="Пароль"
          value={data?.pass}
          onChange={(val) => handleChangeField("pass", val)}
          alwaysOpen
          initOpen
          className="field"
          type="password"
          noAutoFill
        />
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={
            data?.login?.length === 0 || data.pass?.length === 0 || loading
          }
        >
          Додати
        </button>
      </StyledAddRieltorAccount>
    </Modal>
  );
};

const StyledAddRieltorAccount = styled.div`
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
