import { styled } from "styled-components";
import { ProfileField } from "../../../components/ProfileField";

export const Comment = ({ comment, onChange, readOnly }) => {
  return (
    <StyledComment>
      <ProfileField
        placeholder="Введіть коментар"
        value={comment}
        label="Змінити"
        textarea
        onChange={(val) => onChange(val)}
        readOnly={readOnly}
      />
    </StyledComment>
  );
};

const StyledComment = styled.div`
  padding: 3px;
  border-radius: 9px;
  background: var(--bg-20);
  margin-bottom: 18px;
  .value {
    word-break: break-all;
    max-width: 200px;
    white-space: normal;
  }
`;
