import { styled } from "styled-components";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import prevIcon from "../../../../../assets/images/prev-arrow.svg";
import nextIcon from "../../../../../assets/images/next-arrow.svg";
import object1 from "../../../../../assets/images/object.png";
import object2 from "../../../../../assets/images/object2.png";
import { Slide } from "./Slide";
import { Counter } from "./Counter";
import { Photos } from "./Photos/Photos";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: false,
  touchMove: false,
};

const photos = [object1, object2, object1, object2];

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <StyledSlider className="flex items-center">
      <div className="relative slider">
        <Counter current={currentSlide} total={photos.length} />
        <SlickSlider
          {...settings}
          beforeChange={(currentSlide, nextSlide) =>
            setCurrentSlide(1 + nextSlide)
          }
          currentSlide={currentSlide}
          prevArrow={
            <button>
              <img src={prevIcon} alt="" />
            </button>
          }
          nextArrow={
            <button>
              <img src={nextIcon} alt="" />
            </button>
          }
        >
          {photos.map((photo, i) => (
            <Slide key={i} photo={photo} />
          ))}
        </SlickSlider>
      </div>
      <Photos photos={photos} />
    </StyledSlider>
  );
};

const StyledSlider = styled.div`
  position: relative;
  .slider {
    width: 267px;
    height: 220px;
    overflow: hidden;
    border-radius: 9px;
    flex-shrink: 0;
  }
  .slick-arrow {
    transition: all 0.3s;
    &::before {
      display: none;
    }
  }
  .slick-next,
  .slick-prev {
    width: 20px;
    height: 20px;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
  .slick-next {
    right: 8px;
    z-index: 4;
  }
  .slick-prev {
    left: 8px;
    z-index: 4;
  }
`;
