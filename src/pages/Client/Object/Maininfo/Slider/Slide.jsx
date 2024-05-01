import { styled } from "styled-components";

export const Slide = ({ photo, isOnePhoto, onOpen }) => (
  <StyledSlide photo={photo} isOnePhoto={isOnePhoto} onClick={onOpen} />
);

const StyledSlide = styled.div`
  width: 100%;
  height: 220px;
  flex-shrink: 0;
  border: 1px solid var(--bg-10);
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  flex-shrink: 0;
`;
