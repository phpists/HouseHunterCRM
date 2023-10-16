import styled from "styled-components";
import { Field } from "../Field";
import { Divider } from "./Divider";

export const PersonalData = () => {
  return (
    <StyledPersonalData>
      <div className="input-group">
        <Field placeholder="Почніть писати" value="Віталій" label="Ім’я" full />
        <Field
          placeholder="Почніть писати"
          value="Дуда"
          label="Призвище"
          full
        />
      </div>
      <Divider />
      <Field
        label="Телефон"
        full
        phone
        value="+380977076258"
        placeholder="+38 (___) ___-__- __"
      />
      <Divider />
      <Field
        value="vitaliy111@gmail.com"
        placeholder="Почніть писати"
        label="Пошта"
        full
      />
      <Divider />
      <Field
        value="test"
        placeholder="Почніть писати"
        label="Пароль"
        full
        hide
      />
    </StyledPersonalData>
  );
};

const StyledPersonalData = styled.div`
  margin-bottom: 15px;
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  text-align: left;
  .input-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
`;
