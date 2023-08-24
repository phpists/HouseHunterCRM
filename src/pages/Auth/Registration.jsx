import { styled } from "styled-components";
import { Description } from "./Description";
import { Title } from "./Title";
import { Input } from "./Input";
import { Button } from "./Button";
import arrowIcon from "../../assets/images/arrow.svg";

export const Registration = ({ onSuccess }) => {
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
      <Input placeholder="Ім’я" className="input" />
      <Input placeholder="Телефон" className="input" phone />
      <Input placeholder="Email" className="input" />
      <Input placeholder="Пароль" className="input password-input" password />
      <Button title="Зареєструватись" icon={arrowIcon} onClick={onSuccess} />
    </StyledRegistration>
  );
};

const StyledRegistration = styled.div`
  .input {
    width: 270px;
    margin-bottom: 15px;
  }
  .password-input {
    margin-bottom: 47px;
  }
`;
