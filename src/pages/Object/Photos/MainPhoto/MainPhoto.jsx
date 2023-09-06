import { styled } from "styled-components";
import { Counter } from "./Counter";
import { Tag } from "./Tag";

export const MainPhoto = ({ photo, photosCount }) => (
  <StyledMainPhoto photo={photo} photosCount={photosCount}>
    <Counter />
    <Tag />
  </StyledMainPhoto>
);

const StyledMainPhoto = styled.div`
  border-radius: 10px;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  width: 400px;
  height: calc(
    100svh - 346px -
      ${({ photosCount }) =>
        photosCount === 1 ? 0 : photosCount === 2 ? 110 : 210}px
  );
  flex-shrink: 0;
  margin-bottom: 15px;
  position: relative;
`;
