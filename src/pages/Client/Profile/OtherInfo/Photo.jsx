import { styled } from "styled-components";
import { ReactComponent as RemoveIcon } from "../../../../assets/images/remove.svg";

export const Photo = ({ photo, onRemove, onShow }) => {
  const handleClick = (e) =>
    !e.target.classList.contains("noClickable") ? onShow() : null;

  return (
    <StyledPhoto
      photo={photo}
      className="flex items-center justify-center"
      onClick={handleClick}
    >
      <div className="remove-btn noClickable">
        <RemoveIcon onClick={onRemove} className="noClickable" />
      </div>
    </StyledPhoto>
  );
};

const StyledPhoto = styled.div`
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 7px;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  margin-right: 3px;
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #2c2c2c;
    opacity: 0;
    transition: all 0.3s;
  }
  svg {
    z-index: 3;
  }
  g {
    transition: all 0.3s;
    opacity: 0;
  }
  .remove-btn {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.4);
    &::before {
      opacity: 0.5;
    }
    g {
      opacity: 1;
    }
  }
`;
