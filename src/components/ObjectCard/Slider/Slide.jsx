import { styled } from "styled-components";

export const Slide = ({ photo }) => <StyledSlide photo={photo} />;

const StyledSlide = styled.div`
  width: 200px;
  min-height: 200px;
  height: 100%;
  flex-shrink: 0;
  border-radius: 8px;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  flex-shrink: 0;
`;
