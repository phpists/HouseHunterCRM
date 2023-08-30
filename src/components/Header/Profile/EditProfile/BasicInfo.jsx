import { styled } from "styled-components";
import { Section } from "./Section";
import { ProfileField } from "../../../ProfileField";

export const BasicInfo = () => (
  <StyledBasicInfo>
    <Section>
      <div className="fields">
        <ProfileField value="Мицавка" label="Прізвище" />
        <ProfileField value="Юрій" label="Ім'я" />
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
