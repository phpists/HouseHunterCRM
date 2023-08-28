import { styled } from "styled-components";
import { Section } from "../Section";
import { Field } from "../Field";
import { Phones } from "./Phones";

export const Contact = () => (
  <StyledContact>
    <Section>
      <div className="fields">
        <Phones />
        <div className="divider" />
        <Field value="yuriyo@gmail.com" label="Пошта" />
      </div>
    </Section>
  </StyledContact>
);

const StyledContact = styled.div`
  width: 100%;
  .divider {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 6px 0;
  }
`;
