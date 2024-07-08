import styled from "styled-components";
import photo from "../../../../../assets/images/avatar.png";

export const Avatar = () => <StyledAvatar photo={photo} />;

const StyledAvatar = styled.div`
  height: 34px;
  width: 34px;
  border-radius: 100%;
  border: 1px solid #b1ff91;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  flex-shrink: 0;
`;
