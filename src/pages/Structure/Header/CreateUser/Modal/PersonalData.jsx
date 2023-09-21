import styled from "styled-components";
import { Field } from "../../../../../components/Field";
import { Divider } from "./Divider";

export const PersonalData = () => {
  return (
    <StyledPersonalData>
      <div className="input-group">
        <Field placeholder="Почніть писати" label="Ім’я" full />
        <Field placeholder="Почніть писати" label="Призвище" full />
      </div>
      <Divider />
      <Field label="Телефон" full phone placeholder="+38 (___) ___-__- __" />
      <Divider />
      <Field placeholder="Почніть писати" label="Пошта" full />
      <Divider />
      <Field placeholder="Почніть писати" label="Пароль" full />
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
