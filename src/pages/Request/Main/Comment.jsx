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
  background: var(--bg-10);
  margin-bottom: 15px;
  .value {
    width: 100%;
    word-break: break-all;
    white-space: normal;
  }
`;
