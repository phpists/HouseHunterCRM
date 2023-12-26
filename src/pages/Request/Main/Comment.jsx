import styled from "styled-components";
import { ProfileField } from "../../../components/ProfileField";

export const Comment = ({ value, onChange, error }) => {
  return (
    <StlyedComment>
      <ProfileField
        value={value}
        onChange={onChange}
        label="Коментар"
        placeholder={"Введіть коментар"}
        textarea
        error={error}
      />
    </StlyedComment>
  );
};

const StlyedComment = styled.div`
  padding: 8px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
  .value {
    width: 95%;
  }
`;
