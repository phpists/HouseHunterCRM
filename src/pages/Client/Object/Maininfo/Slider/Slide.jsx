import { styled } from "styled-components";

export const Slide = ({ photo, isOnePhoto }) => (
  <StyledSlide photo={photo} isOnePhoto={isOnePhoto} />
);

const StyledSlide = styled.div`
  width: ${({ isOnePhoto }) => (isOnePhoto ? "100%" : "267px")};
  height: 220px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  flex-shrink: 0;
`;
