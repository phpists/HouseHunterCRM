import styled from "styled-components";
import prevIcon from "../../../assets/images/prev-arrow.svg";
import nextIcon from "../../../assets/images/next-arrow.svg";
import { addZero } from "../../../utilits";

export const Arrows = ({ currentSlide, total, onChangeSlide }) => {
  return (
    <StyledArrows className="flex items-end slider-arrows">
      <div className="flex items-center justify-between btns">
        <button
          className="flex items-center justify-center"
          onClick={() =>
            currentSlide === 1 ? null : onChangeSlide(Number(currentSlide) - 1)
          }
        >
          <img src={prevIcon} alt="" />
        </button>
        <div className="text flex items-center">
          {addZero(currentSlide)} <span>/</span> {addZero(total)}
        </div>
        <button
          className="flex items-center justify-center"
          onClick={() =>
            currentSlide === total
              ? null
              : onChangeSlide(Number(currentSlide) + 1)
          }
        >
          <img src={nextIcon} alt="" />
        </button>
      </div>
    </StyledArrows>
  );
};

const StyledArrows = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(44, 44, 44, 0.3);
  z-index: 3;
  .btns {
    padding: 5px;
    border-top: 1px solid rgba(255, 255, 255, 0.4);
    width: 100%;

    button {
      width: 26px;
      height: 26px;
      flex-shrink: 0;
      border-radius: 5px;
      transition: all 0.3s;
      backdrop-filter: blur(0);
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      &:active {
        background: rgba(255, 255, 255, 0.4);
      }
    }
  }
  .text {
    color: #fff;
    text-align: center;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    span {
      color: rgba(255, 255, 255, 0.4);
    }
  }
`;
