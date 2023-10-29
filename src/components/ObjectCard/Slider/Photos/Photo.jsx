import { styled } from "styled-components";
import expandIcon from "../../../../assets/images/expend.svg";

export const Photo = ({ photo, active, onSelect }) => (
  <StyledPhoto
    photo={photo}
    className={`flex items-center justify-center ${active && "active"}`}
    onClick={onSelect}
  >
    <img src={expandIcon} alt="" />
  </StyledPhoto>
);

const StyledPhoto = styled.div`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  border-radius: 5px;
  position: relative;
  transition: all 0.3s;
  cursor: pointer;
  overflow: hidden;
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(44, 44, 44, 0.5);
    opacity: 0;
    transition: all 0.3s;
    backdrop-filter: blur(1px);
  }
  img {
    z-index: 1;
    scale: 0;
    transition: all 0.3s;
  }

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.3);
    &:before {
      opacity: 1;
    }
    img {
      scale: 1;
    }
  }
  &.active {
    border: 1.6px solid #fff;
    &:before {
      opacity: 0 !important;
    }
    img {
      scale: 0 !important;
    }
  }
`;
