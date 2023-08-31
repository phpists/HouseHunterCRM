import { styled } from "styled-components";
import { ProfileField } from "../../../components/ProfileField";

export const Comment = () => {
  return (
    <StyledComment>
      <ProfileField
        value="Топ клієнт готовий платити більше $800, але у нього є кіт."
        label="Змінити"
        textarea
      />
    </StyledComment>
  );
};

const StyledComment = styled.div`
  padding: 3px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 18px;
`;
