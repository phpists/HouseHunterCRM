import { styled } from "styled-components";
import { ProfileField } from "../../../components/ProfileField";

export const BasicInfo = () => {
  return (
    <StyledBasicInfo>
      <ProfileField value="Юрій" label="Ім'я" />
      <ProfileField value="Олексійович" label="Прізвище" />
    </StyledBasicInfo>
  );
};

const StyledBasicInfo = styled.div`
  padding: 3px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.2);
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 4px;
  margin-bottom: 25px;
`;
