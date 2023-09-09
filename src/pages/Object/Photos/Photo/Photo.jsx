import { styled } from "styled-components";
import { Tag } from "./Tag";
import { ReactComponent as Remove } from "../../../../assets/images/remove.svg";

export const Photo = ({ photo, onRemove }) => (
  <StyledPhoto
    photo={photo}
    className="flex flex-col items-center justify-center"
  >
    <div className="photo-content flex flex-col items-center justify-center">
      <Tag />
      <Remove onClick={onRemove} />
    </div>
  </StyledPhoto>
);

const StyledPhoto = styled.div`
  width: 193px;
  height: 193px;
  border-radius: 10px;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  position: relative;
  .photo-content {
    opacity: 0;
    transition: all 0.3s;
  }
  svg {
    margin-top: 10px;
    height: 40px;
    width: 40px;
    z-index: 10;
    cursor: pointer;
    transition: all 0.3s;
    g {
      opacity: 0.8;
    }
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(44, 44, 44, 0.5);
    transition: all 0.3s;
    backdrop-filter: blur(1px);
    opacity: 0;
  }

  &:hover {
    &::before,
    .photo-content {
      opacity: 1;
    }
  }
  @media (max-width: 1500px) {
    width: 90%;
  }
`;
