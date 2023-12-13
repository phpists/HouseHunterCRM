import { styled } from "styled-components";
import { ProfileField } from "../../../components/ProfileField";

export const BasicInfo = ({ firstName, lastName, onChangeField, readOnly }) => {
  return (
    <StyledBasicInfo>
      <ProfileField
        value={firstName}
        label="Ім'я"
        placeholder="Введіть ім'я"
        onChange={(val) => onChangeField("first_name", val)}
        readOnly={readOnly}
      />
      <ProfileField
        value={lastName}
        label="Прізвище"
        placeholder="Введіть прізвище"
        onChange={(val) => onChangeField("last_name", val)}
        readOnly={readOnly}
      />
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
  margin-bottom: 18px;
`;
