import { styled } from "styled-components";
import avatarIcon from "../../../../../assets/images/small-avatar-green.svg";

export const Avatar = ({ photo }) => (
  <StyledAvatar avatarIcon={photo?.length > 0 ? photo : avatarIcon} />
);

const StyledAvatar = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 100%;
  background: url(${({ avatarIcon }) => avatarIcon}) center/cover no-repeat;
`;
