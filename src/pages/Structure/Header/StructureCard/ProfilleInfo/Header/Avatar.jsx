import styled from "styled-components";
import avatar from "../../../../../../assets/images/small-avatar-green.svg";
import { handleGetRoleAvatar } from "../../../../../../utilits";

export const Avatar = ({ onOpenInfo, color, level, photo }) => (
  <StyledAvatar
    avatar={photo?.length > 0 ? photo : handleGetRoleAvatar(level)}
    className="notClickable"
    onClick={onOpenInfo}
    color={color}
  />
);

const StyledAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 64px;
  border: 1px solid ${({ color }) => color};
  background: url(${({ avatar }) => avatar}), center/cover no-repeat;
  margin-right: 10px;
  background-size: 100%;
  flex-shrink: 0;
`;
