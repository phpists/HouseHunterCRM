import { styled } from "styled-components";
import { Title } from "../Title";
import { Description } from "../Description";
import { Input } from "../Input";
import { ForgotPassword } from "./ForgotPassword";
import { Button } from "../Button";
import arrowIcon from "../../../assets/images/arrow.svg";

export const Login = ({ onForgotPassword, onSuccess }) => {
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
      <Input placeholder="Email" className="input email-input" />
      <Input placeholder="Пароль" className="input password-input" password />
      <ForgotPassword onForgotPassword={onForgotPassword} />
      <Button title="Увійти" icon={arrowIcon} onClick={onSuccess} />
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
