import { styled } from "styled-components";
import empty from "../../../../../../assets/images/small-avatar-green.svg";
import { handleGetRoleAvatar } from "../../../../../../utilits";

export const Avatar = ({ photo, level }) => (
  <StyledAvatar
    avatarIcon={photo?.length > 0 ? photo : handleGetRoleAvatar(level)}
  />
);

const StyledAvatar = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 8px;
  background: url(${({ avatarIcon }) => avatarIcon}) center/cover no-repeat;
  margin-right: 12px;
`;
