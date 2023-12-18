import styled from "styled-components";
import avatar from "../../../../../assets/images/avatar.png";
import { handleGetRoleAvatar } from "../../../../../utilits";

export const Avatar = ({ photo, level }) => (
  <StyledAvatar
    avatar={photo?.length > 0 ? photo : handleGetRoleAvatar(level?.level)}
    className="clickable"
    color={level?.color}
  />
);

const StyledAvatar = styled.div`
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 34px;
  border: 1px solid ${({ color }) => color ?? "#b1ff91"};
  background: url(${({ avatar }) => avatar}) center/cover no-repeat;
  margin-right: 8px;
`;
