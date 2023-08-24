import { styled } from "styled-components";
import { Title } from "../Title";
import { Description } from "../Description";
import { Input } from "../Input";
import { Button } from "../Button";

export const ForgotPassword = ({ onClose }) => (
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
    <Input placeholder="Email" className="input" />
    <div className="flex items-center justify-center">
      <Button title="Назад" onClick={onClose} outline="true" />
      <Button title="Відправити" onClick={onClose} className="ml-3.5" />
    </div>
  </StyledforgotPassword>
);

const StyledforgotPassword = styled.div`
  .input {
    width: 270px;
    margin-bottom: 41px;
  }
`;
