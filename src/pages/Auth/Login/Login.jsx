import { styled } from "styled-components";
import { Title } from "../Title";
import { Description } from "../Description";
import { Input } from "../Input";
import { ForgotPassword } from "./ForgotPassword";
import arrowIcon from "../../../assets/images/arrow.svg";
import { Button } from "../../../components/Button";
import { useState } from "react";
import { emailValidation } from "../../../utilits";
import {
  useLazyLoginQuery,
  useLazyLogoutQuery,
} from "../../../store/auth/auth.api";
import cogoToast from "cogo-toast";

export const Login = ({ onForgotPassword, onSuccess }) => {
  const [login] = useLazyLoginQuery();
  const [logout] = useLazyLogoutQuery();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChangeEmail = (val) => {
    setEmail(val);
    setErrors({ email: emailValidation(val) });
  };

  const handleSubmit = () => {
    // logout();
    login({
      email,
      password,
      mod: "account",
      action: "login",
    }).then((resp) => {
      if (resp?.data?.error === 0) {
        localStorage.setItem("token", resp?.data.token);
        onSuccess();
      } else if (resp?.data?.error) {
        cogoToast.error(resp?.data?.messege ?? "Помилка", {
          hideAfter: 3,
          position: "top-right",
        });
      }
    });
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
        onChange={(val) => setPassword(val)}
      />
      <ForgotPassword onForgotPassword={onForgotPassword} />
      <Button
        title="Увійти"
        icon={arrowIcon}
        onClick={handleSubmit}
        disabled={
          email?.length === 0 || errors?.email || password?.length === 0
        }
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
