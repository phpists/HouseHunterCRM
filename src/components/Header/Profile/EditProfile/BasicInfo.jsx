import { styled } from "styled-components";
import { Section } from "./Section";
import { Field } from "./Field";

export const BasicInfo = () => (
  <StyledBasicInfo>
    <Section>
      <div className="fields">
        <Field value="Мицавка" label="Прізвище" />
        <Field value="Юрій" label="Ім'я" />
      </div>
    </Section>
  </StyledBasicInfo>
);

const StyledBasicInfo = styled.div`
  width: 100%;
  .fields {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 6px;
  }
`;
