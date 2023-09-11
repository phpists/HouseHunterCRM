import styled from "styled-components";
import { ProfileField } from "../../../components/ProfileField";

export const Comment = () => {
  return (
    <StlyedComment>
      <ProfileField
        value="Дуже топова хата, Юра треба брати вже"
        label="Коментар"
        textarea
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
