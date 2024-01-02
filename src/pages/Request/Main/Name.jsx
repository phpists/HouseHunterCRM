import styled from "styled-components";
import { ProfileField } from "../../../components/ProfileField";

export const Name = ({ value, onChange, error }) => {
  return (
    <StlyedName>
      <ProfileField
        value={value}
        onChange={onChange}
        label="Назва підбірки"
        placeholder={"Введіть назву"}
        error={error}
      />
    </StlyedName>
  );
};

const StlyedName = styled.div`
  padding: 8px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
  .value {
    width: 95%;
  }
`;
