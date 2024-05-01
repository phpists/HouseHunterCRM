import { styled } from "styled-components";
import { ReactComponent as ShowIcon } from "../../../../assets/images/eye-access.svg";
import { RemoveButton } from "./RemoveButton";

export const Photo = ({ photo, onRemove, onShow, readOnly }) => {
  return (
    <StyledPhotoWrapper
      className="relative"
      onClick={(e) =>
        e.target.classList.contains("noClickable") ? null : onShow()
      }
    >
      <StyledPhoto
        photo={photo}
        className="flex items-center justify-center"
        onClick={onShow}
      >
        {!readOnly ? (
          <>
            {/* <div className="btn noClickable">
            <ShowIcon onClick={onShow} className="noClickable" />
          </div> */}
          </>
        ) : null}
      </StyledPhoto>
      <RemoveButton onRemove={onRemove} />
    </StyledPhotoWrapper>
  );
};

const StyledPhotoWrapper = styled.div`
  .btn {
    transition: all 0.3s;
    opacity: 0;
    visibility: hidden;
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: calc(100% - 3px);
    height: 100%;
    background: var(--main-bg);
    opacity: 0;
    z-index: 5;
    transition: all 0.3s;
    border-radius: 7px;
  }

  &:hover {
    .btn {
      opacity: 1;
      visibility: visible;
    }
    g {
      opacity: 1;
    }
    &::before {
      opacity: 0.5;
    }
  }
`;

const StyledPhoto = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 7px;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  margin-right: 3px;

  svg {
    z-index: 3;
  }
  g {
    transition: all 0.3s;
    opacity: 0;
  }
  &:hover {
    border: var(--second-color-border);
    g {
      opacity: 1;
    }
  }
`;
