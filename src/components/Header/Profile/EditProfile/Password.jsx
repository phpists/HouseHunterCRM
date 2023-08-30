import { styled } from "styled-components";
import { Section } from "./Section";
import { ProfileField } from "../../../ProfileField";

export const Password = () => (
  <StyledPassword>
    <Section>
      <div className="fields">
        <ProfileField value="423432423" label="Пароль" password />
      </div>
    </Section>
  </StyledPassword>
);

const StyledPassword = styled.div`
  width: 100%;
`;
