import { styled } from "styled-components";
import avatarIcon from "../../../../../../assets/images/avatar.png";

export const Avatar = () => <StyledAvatar avatarIcon={avatarIcon} />;

const StyledAvatar = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 8px;
  background: url(${({ avatarIcon }) => avatarIcon}) center/cover no-repeat;
  margin-right: 12px;
`;
