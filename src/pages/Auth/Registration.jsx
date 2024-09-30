import { styled } from "styled-components";
import { Description } from "./Description";
import { Title } from "./Title";
import { Input } from "./Input";
import arrowIcon from "../../assets/images/arrow.svg";
import { Button } from "../../components/Button";
import {
  useGetPhonesCodesQuery,
  useLazyRegisterQuery,
} from "../../store/auth/auth.api";
import { useState } from "react";
import {
  emailValidation,
  handleRemovePhoneMask,
  handleResponse,
} from "../../utilits";
import { InfoText } from "./InfoText";
import { Links } from "./Links";
import { AgreeCheckbox } from "./AgreeCheckbox";

export const Registration = ({ onSuccess, onLogin }) => {
  const [registrate] = useLazyRegisterQuery();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [phoneCode, setPhoneCode] = useState("1");
  const [agree, setAgree] = useState(false);
  const { data: phonesCodes } = useGetPhonesCodesQuery();

  const handleChangeEmail = (val) => {
    setEmail(val);
    setErrors({ email: emailValidation(val) });
  };

  const handleChangePhoneCode = (cod) => {
    setPhoneCode(cod);
    setPhone("");
  };

  const handleSubmit = () => {
    const referalId = localStorage.getItem("referalId");
    const data = {
      password,
      id_phone_code: phoneCode,
      phone: handleRemovePhoneMask(phone),
      name,
      mod: "account",
      action: "create",
      email,
      ref_id: referalId ?? undefined,
    };

    registrate(data).then((resp) => {
      handleResponse(resp, onSuccess);
    });
  };

  return (
    <StyledRegistration className="flex flex-col items-center">
      <Title title="Зареєструватись" className="mb-1" />
      <Description
        description={
          <>
            Заповніть невелику форму та подайте <br />
            заявку на модерацію, щоб почати <br />
            користуватися сервісом.
          </>
        }
        className="mb-10"
      />
      <Input
        placeholder="Ім’я"
        className="input"
        value={name}
        onChange={(val) => setName(val)}
      />
      <Input
        placeholder="Телефон"
        className="input"
        phone
        value={phone}
        onChange={(val) => setPhone(val)}
        phoneCode={phoneCode}
        onChangePhoneCode={handleChangePhoneCode}
        phonesCodes={phonesCodes}
      />
      <Input
        placeholder="Email"
        className="input"
        value={email}
        onChange={handleChangeEmail}
        error={errors.email}
      />
      <Input
        placeholder="Пароль"
        className="input password-input"
        password
        value={password}
        onChange={(val) => setPassword(val)}
      />
      <AgreeCheckbox value={agree} onChange={() => setAgree(!agree)} />
      <Button
        title="Зареєструватись"
        icon={arrowIcon}
        onClick={handleSubmit}
        disabled={
          name?.length === 0 ||
          phone?.includes("_") ||
          phone?.length === 0 ||
          email.length === 0 ||
          password.length === 0 ||
          errors.email ||
          !agree
        }
      />
      <Links />
      <InfoText text="Увійти" onClick={onLogin} className="info-text" />
    </StyledRegistration>
  );
};

const StyledRegistration = styled.div`
  overflow: auto;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: c;
  .input {
    width: 270px;
    margin-bottom: 15px;
  }
  .password-input {
    margin-bottom: 27px;
  }
`;
