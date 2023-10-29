import { styled } from "styled-components";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
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

export const Slider = ({ photos }) => {
  const slickRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleChangeSlide = (val) => {
    slickRef.current.slickGoTo(val - 1);
  };

  return (
    <StyledSlider
      className="flex items-center"
      isOnePhoto={photos?.length === 1}
    >
      <div className="relative slider">
        {photos?.length > 1 ? (
          <Counter current={currentSlide} total={photos.length} />
        ) : null}
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
          ref={slickRef}
        >
          {photos.map((photo, i) => (
            <Slide
              key={i}
              photo={photo}
              active={currentSlide === 1 + i}
              isOnePhoto={photos?.length === 1}
            />
          ))}
        </SlickSlider>
      </div>
      <Photos
        photos={photos}
        onSelect={handleChangeSlide}
        active={currentSlide}
      />
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
    ${({ isOnePhoto }) => isOnePhoto && "width: 100% !important;"}
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
  @media (min-width: 1400px) {
    .slider {
      width: 190px;
      height: 220px;
    }
  }
  @media (min-width: 1600px) {
    .slider {
      width: 267px;
      height: 220px;
    }
  }
`;
