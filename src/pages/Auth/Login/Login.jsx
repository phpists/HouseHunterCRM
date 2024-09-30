import { styled } from "styled-components";
import { Title } from "../Title";
import { Description } from "../Description";
import { Input } from "../Input";
import { ForgotPassword, InfoText } from "../InfoText";
import arrowIcon from "../../../assets/images/arrow.svg";
import { Button } from "../../../components/Button";
import { useState } from "react";
import { emailValidation, handleResponse } from "../../../utilits";
import {
  useLazyLoginQuery,
  useLazyLogoutQuery,
} from "../../../store/auth/auth.api";

export const Login = ({ onForgotPassword, onSuccess, onRegister }) => {
  const [login] = useLazyLoginQuery();
  const [logout] = useLazyLogoutQuery();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChangeEmail = (val) => {
    setEmail(val);
    // setErrors({ email: emailValidation(val) });
  };

  const handleSubmit = () => {
    if (email?.length === 0 || password?.length === 0) {
      setErrors({
        email: emailValidation(email) || email?.length === 0,
        password: password?.length === 0,
      });
    } else {
      login({
        email,
        password,
        mod: "account",
        action: "login",
      }).then((resp) => {
        handleResponse(resp, () => {
          localStorage.setItem("token", resp?.data.token);
          onSuccess();
        });
      });
    }
  };

  return (
    <StyledLogin className="flex flex-col items-center">
      <Title title="З поверненням!" className="mb-1 text-center	" />
      <Description
        description={
          <>
            Швидше подивися, що нового сталося, <br /> доки тебе не було!
          </>
        }
        className="mb-10 text-center"
      />
      <Input
        placeholder="Email"
        className="input email-input"
        value={email}
        onChange={handleChangeEmail}
        error={errors?.email}
      />
      <Input
        placeholder="Пароль"
        className="input password-input"
        password
        value={password}
        onChange={(val) => {
          setPassword(val);
          setErrors({ ...errors, password: false });
        }}
        error={errors?.password}
      />
      {/* <InfoText onClick={onForgotPassword} /> */}
      <Button title="Увійти" icon={arrowIcon} onClick={handleSubmit} />
      <InfoText
        text="Зареєструватись"
        onClick={onRegister}
        className="info-text"
      />
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  .input {
    width: 270px;
  }
  .email-input {
    margin-bottom: 15px;
  }
  .password-input {
    margin-bottom: 9px;
  }
`;
