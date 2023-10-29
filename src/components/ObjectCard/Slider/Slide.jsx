import { styled } from "styled-components";

export const Slide = ({ photo, active, empty }) => (
  <StyledSlide photo={active ? photo : ""} empty={empty} />
);

const StyledSlide = styled.div`
  width: 200px;
  min-height: 200px;
  height: 100%;
  flex-shrink: 0;
  border-radius: 8px;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  flex-shrink: 0;
  ${({ empty }) => empty && "background-size: 150%;"}
  @media (max-width: 800px) {
    width: 100%;
    height: 250px;
  }
  @media (max-width: 1399.9px) {
    ${({ empty }) => empty && "height: 250px;"}
  }
  @media (min-width: 1400px) {
    ${({ empty }) => empty && "width: 250px;"}
  }
`;
