import { styled } from "styled-components";

export const Slide = ({ photo }) => <StyledSlide photo={photo} />;

const StyledSlide = styled.div`
  width: 267px;
  height: 220px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  flex-shrink: 0;
`;
