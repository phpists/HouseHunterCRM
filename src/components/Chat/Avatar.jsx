import { styled } from "styled-components";
import avatarIcon from "../../assets/images/small-avatar-green.svg";

export const Avatar = ({ small, photo }) => (
  <StyledAvatar avatar={photo ?? avatarIcon} small={small} />
);

const StyledAvatar = styled.div`
  width: ${({ small }) => (small ? 40 : 50)}px;
  height: ${({ small }) => (small ? 40 : 50)}px;
  border-radius: 100px;
  background: url(${({ avatar }) => avatar}) center/cover no-repeat;
  flex-shrink: 0;
`;
