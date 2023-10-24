import { styled } from "styled-components";
import { Title } from "../Title";
import { Description } from "../Description";
import { Input } from "../Input";
import { Button } from "../../../components/Button";
import { useState } from "react";
import { emailValidation, handleResponse } from "../../../utilits";
import { useLazyForgotPasswordQuery } from "../../../store/auth/auth.api";
import cogoToast from "cogo-toast";

export const ForgotPassword = ({ onClose }) => {
  const [forgotPassword] = useLazyForgotPasswordQuery();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleChangeEmail = (val) => {
    setEmail(val);
    setErrors({ email: emailValidation(val) });
  };

  const handleSubmit = () => {
    forgotPassword({ email }).then((resp) => {
      handleResponse(resp, () => {
        cogoToast.success(
          "Для зміни паролю перейдіть за посиланням у листі, який відправлено Вам на електронну пошту!",
          {
            hideAfter: 3,
            position: "top-right",
          }
        );
        onClose();
      });
    });
  };

  return (
    <StyledforgotPassword className="flex flex-col items-center">
      <Title title="Забули пароль?" className="mb-1 text-center" />
      <Description
        description={
          <>
            Введіть адресу електронної пошти, яку ви вказали <br />
            під час реєстрації, щоб відновити свій пароль
          </>
        }
        className="mb-10"
      />
      <Input
        placeholder="Email"
        className="input"
        value={email}
        onChange={handleChangeEmail}
        error={errors?.email}
      />
      <div className="flex items-center justify-center">
        <Button title="Назад" onClick={onClose} outline="true" />
        <Button
          title="Відправити"
          onClick={handleSubmit}
          className="ml-3.5"
          disabled={email?.length === 0 || errors?.email}
        />
      </div>
    </StyledforgotPassword>
  );
};

const StyledforgotPassword = styled.div`
  .input {
    width: 270px;
    margin-bottom: 41px;
  }
`;
