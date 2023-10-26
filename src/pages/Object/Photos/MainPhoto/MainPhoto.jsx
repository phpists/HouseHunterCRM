import { styled } from "styled-components";
import { Counter } from "./Counter";
import { Tag } from "./Tag";
import noPhoto from "../../../../assets/images/no-photo.svg";

export const MainPhoto = ({ photo, photosCount }) => (
  <StyledMainPhoto
    photo={
      photo?.type
        ? URL.createObjectURL(photo)
        : photo?.length > 0
        ? photo
        : noPhoto
    }
    photosCount={photosCount}
  >
    {photosCount > 1 && <Counter photosCount={photosCount}/>}
    <Tag />
  </StyledMainPhoto>
);

const StyledMainPhoto = styled.div`
  border-radius: 10px;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  width: 400px;
  height: calc(
    100svh - 326px -
      ${({ photosCount }) =>
        photosCount === 1 ? 0 : photosCount === 2 ? 110 : 210}px
  );
  flex-shrink: 0;
  margin-bottom: 15px;
  position: relative;
  @media (max-width: 1500px) {
    width: 350px;
  }
  @media (max-width: 1430px) {
    width: 330px;
  }
  @media (max-width: 1400px) {
    width: 280px;
  }
  @media (max-width: 1300px) {
    width: 100%;
    height: calc(
      453px -
        ${({ photosCount }) =>
          photosCount === 1 ? 0 : photosCount === 2 ? 220 : 210}px
    );
  }
`;
