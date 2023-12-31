import { styled } from "styled-components";
import { Counter } from "./Counter";
import { Tag } from "./Tag";
import noPhoto from "../../../../assets/images/no-photo.svg";
import { ReactComponent as Remove } from "../../../../assets/images/remove.svg";
import { memo } from "react";

export const MainPhoto = memo(
  ({ photo, photosCount, onRemove, isPhoto, isCover, onMakeMain }) => (
    <StyledMainPhoto
      photo={photo?.url?.length > 0 ? photo?.url : noPhoto}
      photosCount={photosCount}
    >
      {photosCount > 1 && <Counter photosCount={photosCount} />}
      <div className="btns-wrapper flex items-center">
        {isPhoto && (
          <>
            <Tag isCover={isCover} onMakeMain={onMakeMain} />
            <div className="remove-btn" onClick={onRemove}>
              <Remove />
            </div>
          </>
        )}
      </div>
    </StyledMainPhoto>
  )
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
  .btns-wrapper {
    position: absolute;
    top: 15px;
    right: 15px;
    .remove-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 6px;
      flex-shrink: 0;
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(44, 44, 44, 0.5);
      backdrop-filter: blur(5px);
      height: 20px;
      width: 20px;
      z-index: 5;
      cursor: pointer;
      g {
        opacity: 1;
      }
      svg {
        display: block;
        height: 15px;
      }
    }
  }
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
