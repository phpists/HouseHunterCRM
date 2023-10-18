import { styled } from "styled-components";
import avatarIcon from "../../../../assets/images/small-avarar-orange.svg";

export const Avatar = ({ photo }) => (
  <StyledAvatar avatarIcon={photo?.length > 0 ? photo : avatarIcon} />
);

const StyledAvatar = styled.div`
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 10px;
  background: url(${({ avatarIcon }) => avatarIcon}) center/cover no-repeat;
  margin-right: 12px;
`;
