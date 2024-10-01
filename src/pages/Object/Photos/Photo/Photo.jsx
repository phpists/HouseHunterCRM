import { styled } from "styled-components";
import { Tag } from "./Tag";
import { ReactComponent as Remove } from "../../../../assets/images/remove.svg";
import { ReactComponent as Rotate } from "../../../../assets/images/refresh.svg";
import noPhoto from "../../../../assets/images/no-photo.svg";
import { memo } from "react";
import { useInView } from "react-intersection-observer";

export const Photo = memo(
  ({ photo, onRemove, onMakeMain, isFile, onOpen, onRotate }) => {
    const { ref, inView } = useInView({ triggerOnce: true });

    const handleOpen = (e) => {
      if (e.target.classList?.contains("openInfo")) {
        onOpen();
      }
    };

    return (
      <StyledPhoto
        photo={!inView ? "" : photo?.url?.length > 0 ? photo?.url : noPhoto}
        className="flex flex-col items-center justify-center openInfo"
        ref={ref}
        onClick={handleOpen}
      >
        <div className="photo-content flex flex-col items-center justify-cente openInfo">
          {!isFile && <Tag onClick={onMakeMain} />}
          <Remove onClick={onRemove} />
          {!isFile && <Rotate onClick={onRotate} />}
        </div>
      </StyledPhoto>
    );
  }
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
    background: var(--bg-5);
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
    width: 100%;
  }
`;
