import { styled } from "styled-components";

export const Avatar = ({ photo, zIndex }) => (
  <StyledAvatar avatarIcon={photo} zIndex={zIndex} />
);

const StyledAvatar = styled.div`
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 34px;
  border: 1.4px solid #323232;
  background: url(${({ avatarIcon }) => avatarIcon}) center/cover no-repeat;
  z-index: ${({ zIndex }) => zIndex};
`;
