import { styled } from "styled-components";

export const Avatar = ({ photo, zIndex }) => (
  <StyledAvatar avataricon={photo} zIndex={zIndex} />
);

const StyledAvatar = styled.div`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border-radius: 22px;
  border: 1.4px solid #323232;
  background: url(${({ avataricon }) => avataricon}) center/cover no-repeat;
  z-index: ${({ zIndex }) => zIndex};
`;
