import { styled } from "styled-components";
import expandIcon from "../../../../assets/images/expend.svg";
import { useInView } from "react-intersection-observer";

export const Photo = ({ photo, active, onSelect }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <StyledPhoto
      photo={inView ? photo : ""}
      className={`flex items-center justify-center ${active && "active"}`}
      onClick={onSelect}
      ref={ref}
    >
      <img src={expandIcon} alt="" loading="lazy" />
    </StyledPhoto>
  );
};
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
    background: var(--bg-5);
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
