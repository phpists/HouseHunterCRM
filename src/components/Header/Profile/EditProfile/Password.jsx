import { styled } from "styled-components";
import { Section } from "./Section";
import { Field } from "./Field";

export const Password = () => (
  <StyledPassword>
    <Section>
      <div className="fields">
        <Field value="423432423" label="Пароль" password />
      </div>
    </Section>
  </StyledPassword>
);

const StyledPassword = styled.div`
  width: 100%;
`;
