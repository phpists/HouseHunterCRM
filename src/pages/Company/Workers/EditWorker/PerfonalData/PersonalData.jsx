import { styled } from "styled-components";
import { Field } from "./Field/Field";
import { Phones } from "./Phones/Phones";

export const PersonalData = () => {
  return (
    <StyledPersonalData>
      <div className="fields-wrapper">
        <Field value="Дуда" label="Призвище" />
        <Field value="Віталій" label="Ім'я" />
      </div>
      <div className="divider" />
      <Phones />
      <div className="divider" />
      <Field value="x.corp.general@gmail.com" label="Пошта" />
      <div className="divider" />
      <Field value="vitalikdodo007" label="Логін" />
      <div className="divider" />
      <Field value="98dsq821qsuU32" label="Пароль" hide />
    </StyledPersonalData>
  );
};

const StyledPersonalData = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
  .fields-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
  .divider {
    width: 100%;
    height: 1px;
    margin: 6.5px 0;
    background: rgba(255, 255, 255, 0.1);
  }
`;
